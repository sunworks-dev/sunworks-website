import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

type Pose = { position: Vector3; rotation: Quaternion; scale: Vector3 };
const COUNT = 120;
const TAU = Math.PI * 2;
const descriptions = [
  '가능성은 하나의 질문에서 시작됩니다.',
  '흩어진 아이디어에 작동하는 구조를 만듭니다.',
  '직접 쓰는 제품으로 세상과 연결합니다.',
];

function knot(t: number) {
  const radius = 1.65 + 0.64 * Math.cos(3 * t);
  return new Vector3(
    radius * Math.cos(2 * t),
    radius * Math.sin(2 * t),
    0.72 * Math.sin(3 * t),
  );
}

function makePoses(mode: number): Pose[] {
  return Array.from({ length: COUNT }, (_, index) => {
    const t = (index / COUNT) * TAU;
    const position = new Vector3();
    const rotation = new Quaternion();
    const scale = new Vector3(1, 1, 1);
    if (mode === 0) {
      position.copy(knot(t));
      const tangent = knot(t + 0.001)
        .sub(position)
        .normalize();
      rotation.setFromUnitVectors(new Vector3(0, 0, 1), tangent);
      rotation.multiply(
        new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), t * 1.5),
      );
    } else if (mode === 1) {
      const x = index % 5;
      const y = Math.floor(index / 5) % 4;
      const z = Math.floor(index / 20);
      position.set((x - 2) * 0.8, (y - 1.5) * 0.8, (z - 2.5) * 0.8);
      scale.set(0.73, 0.73, 5.6);
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), 0.12 * (y - 1.5));
    } else {
      const angle = ((index % 60) / 60) * TAU;
      const layer = index < 60 ? -1 : 1;
      const wave = Math.sin(angle * 3) * 0.16;
      position.set(
        Math.cos(angle) * 1.83,
        Math.sin(angle) * 1.83,
        layer * 0.44 + wave,
      );
      rotation.setFromAxisAngle(new Vector3(0, 0, 1), angle);
      rotation.multiply(
        new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), layer * 0.55),
      );
      scale.set(1.33, 0.13, 3.6);
    }
    return { position, rotation, scale };
  });
}

export function mountSolarEngine(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const viewport = root.querySelector<HTMLElement>('[data-solar-viewport]');
  const controls = root.querySelector<HTMLElement>('[data-engine-console]');
  const description = document.querySelector<HTMLElement>(
    '#engine-description',
  );
  if (!canvas || !viewport || !controls) return;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch {
    root.dataset.render = 'fallback';
    return;
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, finePointer.matches ? 1.6 : 1.25),
  );
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  const scene = new Scene();
  const room = new RoomEnvironment();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new AmbientLight(0xffffff, 0.6));
  const keyLight = new DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3, 5, 5);
  scene.add(keyLight);
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 11.5);
  const geometry = new RoundedBoxGeometry(0.85, 0.85, 0.12, 2, 0.045);
  const material = new MeshStandardMaterial({
    color: '#ff693b',
    metalness: 0.38,
    roughness: 0.27,
  });
  const sculpture = new InstancedMesh(geometry, material, COUNT);
  sculpture.frustumCulled = false;
  const group = new Group();
  group.add(sculpture);
  scene.add(group);
  const matrix = new Matrix4();
  const modes = [makePoses(0), makePoses(1), makePoses(2)];
  const current = modes[0].map((pose) => ({
    position: pose.position.clone(),
    rotation: pose.rotation.clone(),
    scale: pose.scale.clone(),
  }));
  let from = current.map((pose) => ({
    position: pose.position.clone(),
    rotation: pose.rotation.clone(),
    scale: pose.scale.clone(),
  }));
  let selected = 0;
  let transitionStart = -10000;
  let raf = 0;
  let visible = true;
  let disposed = false;
  let pointerX = 0;
  let pointerY = 0;
  let currentX = 0;
  let currentY = 0;
  const colors = [
    new Color('#ff693b'),
    new Color('#e8eddf'),
    new Color('#e5f598'),
  ];
  const startColor = material.color.clone();
  const enteredAt = performance.now();

  function draw(time: number) {
    raf = 0;
    if (!visible || document.hidden || disposed) return;
    const progress = reducedMotion.matches
      ? 1
      : Math.min(1, (time - transitionStart) / 850);
    const eased = 1 - Math.pow(1 - progress, 4);
    for (let i = 0; i < COUNT; i++) {
      const pose = current[i];
      const destination = modes[selected][i];
      pose.position.lerpVectors(from[i].position, destination.position, eased);
      pose.rotation.slerpQuaternions(
        from[i].rotation,
        destination.rotation,
        eased,
      );
      pose.scale.lerpVectors(from[i].scale, destination.scale, eased);
      matrix.compose(pose.position, pose.rotation, pose.scale);
      sculpture.setMatrixAt(i, matrix);
    }
    sculpture.instanceMatrix.needsUpdate = true;
    material.color.lerpColors(startColor, colors[selected], eased);
    currentX += (pointerX - currentX) * 0.09;
    currentY += (pointerY - currentY) * 0.09;
    const intro = reducedMotion.matches
      ? 1
      : Math.min(1, (time - enteredAt) / 1800);
    group.rotation.set(
      -0.22 + currentY * 0.18,
      0.4 + currentX * 0.25 + (1 - intro) ** 3 * 0.65,
      -0.24,
    );
    renderer.render(scene, camera);
    root.dataset.render = 'ready';
    if (
      progress < 1 ||
      intro < 1 ||
      Math.abs(pointerX - currentX) + Math.abs(pointerY - currentY) > 0.002
    )
      requestDraw();
  }
  function requestDraw() {
    if (!raf && !disposed && visible && !document.hidden)
      raf = requestAnimationFrame(draw);
  }
  function resize() {
    const width = viewport!.clientWidth;
    const height = viewport!.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.95 ? 12.4 : 11.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    requestDraw();
  }
  function onPointer(event: PointerEvent) {
    if (reducedMotion.matches || !finePointer.matches) return;
    const rect = viewport!.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    requestDraw();
  }
  function resetPointer() {
    pointerX = 0;
    pointerY = 0;
    requestDraw();
  }
  function onVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else requestDraw();
  }
  const buttons = root.querySelectorAll<HTMLButtonElement>(
    '[data-engine-state]',
  );
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const next = Number(button.dataset.engineState);
      if (selected === next) return;
      from = current.map((pose) => ({
        position: pose.position.clone(),
        rotation: pose.rotation.clone(),
        scale: pose.scale.clone(),
      }));
      startColor.copy(material.color);
      selected = next;
      transitionStart = performance.now();
      buttons.forEach((item) =>
        item.setAttribute('aria-pressed', String(item === button)),
      );
      if (description) description.textContent = descriptions[next];
      requestDraw();
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) requestDraw();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0 },
  );
  observer.observe(viewport);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewport);
  viewport.addEventListener('pointermove', onPointer, { passive: true });
  viewport.addEventListener('pointerleave', resetPointer);
  document.addEventListener('visibilitychange', onVisibility);
  reducedMotion.addEventListener('change', resetPointer);
  controls.hidden = false;
  resize();
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    disposed = true;
    cancelAnimationFrame(raf);
    root.dataset.render = 'fallback';
    controls.hidden = true;
  });
  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', resetPointer);
      geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
    },
    { once: true },
  );
}
