// Offline, deterministic paper choreography. This renderer never ships to the site.
// No radiating lines, spokes, sunburst imagery, generated logos or stock footage.
const C = {
  paper: '#f4eddf',
  ink: '#24211d',
  yellow: '#ffd84b',
  orange: '#f47a32',
  red: '#d94324',
};
const canvas = document.querySelector('#film');
const ctx = canvas.getContext('2d', { alpha: false });
const params = new URLSearchParams(location.search);
const lang = params.get('lang') === 'en' ? 'en' : 'ko';
const mobile = params.get('format') === 'mobile';
const W = mobile ? 900 : 1600,
  H = mobile ? 1200 : 800;
const DURATION = 16,
  FPS = 30,
  TAU = Math.PI * 2;
canvas.width = W * 1.2;
canvas.height = H * 1.2;
const copy = (await (await fetch('./copy.json')).json())[lang];
await Promise.all([
  document.fonts.load(
    '400 120px "Gasoek One"',
    copy.title.join('') + copy.daylight,
  ),
  document.fonts.load(
    '750 120px "Archivo Variable"',
    'Useful daydreams. LET THE SUN IN. PUT THE WORK IN. DAYDREAMS DESERVE DAYLIGHT.',
  ),
  document.fonts.load(
    '600 24px "Noto Sans KR Variable"',
    copy.caption.join(''),
  ),
]);
await document.fonts.ready;
const clamp = (x) => Math.max(0, Math.min(1, x));
const mix = (a, b, t) => a + (b - a) * t;
const phase = (t, a, b) => clamp((t - a) / (b - a));
const ease = (x) => {
  x = clamp(x);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const out = (x) => 1 - (1 - clamp(x)) ** 4;
function rgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
function shade(a, b, t) {
  const aa = rgb(a),
    bb = rgb(b);
  return `rgb(${aa.map((v, i) => Math.round(mix(v, bb[i], clamp(t)))).join(',')})`;
}
function rect(x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}
function disc(x, y, r, c = C.yellow) {
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.001, r), 0, TAU);
  ctx.fillStyle = c;
  ctx.fill();
}
function poly(points, c) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = c;
  ctx.fill();
}
function setFont(size, latin = false, body = false) {
  const ko = lang === 'ko' && !latin && !body;
  ctx.font = `${ko ? 400 : body ? 600 : 750} ${size}px "${ko ? 'Gasoek One' : body && lang === 'ko' ? 'Noto Sans KR Variable' : 'Archivo Variable'}"`;
  ctx.fontStretch = ko || body ? 'normal' : 'condensed';
  ctx.letterSpacing = ko
    ? `${size * 0.03}px`
    : body
      ? '0px'
      : `${-size * 0.012}px`;
  ctx.textBaseline = 'alphabetic';
}
function text(
  value,
  x,
  y,
  size,
  color = C.ink,
  { latin = false, body = false, align = 'left' } = {},
) {
  ctx.save();
  setFont(size, latin, body);
  ctx.textAlign = align;
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
  ctx.restore();
}
function fit(value, size, max, latin = false) {
  ctx.save();
  setFont(size, latin);
  const width = ctx.measureText(value).width;
  ctx.restore();
  return Math.min(size, (size * max) / width);
}
function background(c = C.paper) {
  rect(0, 0, W, H, c);
}
function caption(x, y, dark = false) {
  text(
    'DAYDREAMS DESERVE DAYLIGHT.',
    x,
    y,
    mobile ? 19 : 18,
    dark ? C.paper : C.ink,
    { latin: true, body: true },
  );
}
// Paper is shaded by its surface normal, not by a decorative background gradient.
function rotate([x, y, z], ax, ay, az) {
  let yy = y * Math.cos(ax) - z * Math.sin(ax),
    zz = y * Math.sin(ax) + z * Math.cos(ax);
  let xx = x * Math.cos(ay) + zz * Math.sin(ay);
  zz = -x * Math.sin(ay) + zz * Math.cos(ay);
  return [
    xx * Math.cos(az) - yy * Math.sin(az),
    xx * Math.sin(az) + yy * Math.cos(az),
    zz,
  ];
}
function ribbon(
  {
    x,
    y,
    r,
    width,
    ax = 0,
    ay = 0,
    az = 0,
    twist = 1,
    turn = 0,
    scale = 1,
    dark = false,
    opening = 0,
  },
  front,
) {
  const segments = 280,
    across = 8,
    faces = [];
  const point = (a, u) => {
    const theta = a + turn;
    const bend = theta * 0.5 * twist;
    const rad = r + u * Math.cos(bend);
    const ring = [
      rad * Math.cos(theta),
      rad * Math.sin(theta),
      u * Math.sin(bend),
    ];
    const strip = [
      (a / TAU - 0.5) * r * 5,
      Math.sin(a + turn) * r * 0.34 + u * 0.7,
      Math.cos(a + turn) * r * 0.5 + u * 0.4,
    ];
    return rotate(
      ring.map((v, i) => mix(v, strip[i], opening)),
      ax,
      ay,
      az,
    );
  };
  const project = ([px, py, pz]) => {
    const s = (scale * 1500) / (1500 - pz);
    return [x + px * s, y + py * s];
  };
  for (let i = 0; i < segments; i++)
    for (let j = 0; j < across; j++) {
      const a = (i / segments) * TAU,
        b = ((i + 1) / segments) * TAU,
        u = (j / across - 0.5) * width,
        v = ((j + 1) / across - 0.5) * width;
      const q = [point(a, u), point(b, u), point(b, v), point(a, v)];
      const depth = q.reduce((s, p) => s + p[2], 0) / 4;
      if (depth >= 0 !== front) continue;
      const e = q[1].map((p, k) => p - q[0][k]),
        f = q[3].map((p, k) => p - q[0][k]);
      const n = [
        e[1] * f[2] - e[2] * f[1],
        e[2] * f[0] - e[0] * f[2],
        e[0] * f[1] - e[1] * f[0],
      ];
      const norm = Math.hypot(...n) || 1;
      const light = clamp(
        0.5 + ((-n[0] * 0.25 - n[1] * 0.5 + n[2] * 0.6) / norm) * 0.5,
      );
      const centerA = point(a, 0),
        centerB = point(b, 0),
        centerU = point(a, width * 0.1);
      const ex = centerB[0] - centerA[0],
        ey = centerB[1] - centerA[1],
        fx = centerU[0] - centerA[0],
        fy = centerU[1] - centerA[1];
      const face = ex * fy - ey * fx > 0 ? 1 : 0;
      const frontColor = shade(
        dark ? '#908675' : '#b5a68f',
        C.paper,
        0.2 + 0.8 * light,
      );
      const backColor = shade(C.red, C.orange, 0.18 + 0.82 * light);
      const color =
        face > 0.99 ? frontColor : face < 0.01 ? backColor : frontColor;
      faces.push({ q: q.map(project), depth, color });
    }
  faces.sort((a, b) => a.depth - b.depth);
  faces.forEach(({ q, color }) => {
    poly(q, color);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.65;
    ctx.stroke();
  });
}
function sun(x, y, r, { offset = 0, alpha = 1 } = {}) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  disc(x + offset, y + offset * 0.4, r, C.orange);
  disc(x, y, r, C.yellow);
  ctx.restore();
}
function shadow(x, y, rx, ry, alpha = 0.14) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(rx, ry);
  const g = ctx.createRadialGradient(0, 0, 0.05, 0, 0, 1);
  g.addColorStop(0, `rgba(36,33,29,${alpha})`);
  g.addColorStop(1, 'rgba(36,33,29,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, TAU);
  ctx.fill();
  ctx.restore();
}
function headline(
  t,
  {
    x = mobile ? 58 : 78,
    y = mobile ? 250 : 290,
    scale = 1,
    color = C.ink,
    roll = 0,
    wide = false,
  } = {},
) {
  const max = mobile ? W - 116 : wide ? W - 156 : W * 0.61;
  const size =
    Math.min(
      ...copy.title.map((v) =>
        fit(
          v,
          lang === 'ko'
            ? mobile
              ? wide
                ? 195
                : 175
              : wide
                ? 290
                : 183
            : mobile
              ? 160
              : wide
                ? 330
                : 215,
          max,
        ),
      ),
    ) * scale;
  copy.title.forEach((value, row) => {
    ctx.save();
    setFont(size);
    let xx = x;
    const baseline = y + row * size * 1.13;
    [...value].forEach((ch, i) => {
      const width = ctx.measureText(ch).width;
      const wave = Math.sin(t * 2.2 - i * 0.46 - row * 0.7) * roll;
      ctx.save();
      ctx.translate(xx + width * 0.5, baseline + wave * 34);
      ctx.transform(1, wave * 0.07, -wave * 0.13, 1, 0, 0);
      // Short, physical ink extrusion while the type rolls into register.
      if (roll > 0.015)
        for (let z = 8; z >= 1; z--) {
          ctx.fillStyle = shade(C.orange, C.red, z / 10);
          ctx.fillText(ch, -width * 0.5 + z * roll * 0.85, z * roll * 0.9);
        }
      ctx.fillStyle = color;
      ctx.fillText(ch, -width * 0.5, 0);
      ctx.restore();
      xx += width;
    });
    ctx.restore();
  });
}
// 0–4s / 14–16s: the same physical composition is the seamless loop joint.
function opening(t, still = false) {
  background();
  const p = still ? 0 : t;
  const travel = ease(phase(p, 1.7, 3.2));
  const cx = mix(mobile ? W * 0.61 : W * 0.79, W * 0.73, travel);
  const cy = mix(mobile ? H * 0.7 : H * 0.52, H * 0.52, travel);
  const radius = mobile ? 182 : 173;
  const band = {
    x: cx,
    y: cy + 75,
    r: mobile ? 175 : 172,
    width: mobile ? 235 : 230,
    ax: 0.78 + travel * 0.2,
    ay: -0.22 + travel * 0.9,
    az: -0.19 + travel * 0.4,
    turn: p * 0.42,
    twist: 1,
    dark: false,
    opening: 1 - travel * 0.4,
  };
  shadow(cx, cy + 238, 330, 61, 0.17);
  const fly = ease(phase(p, 2.65, 3.55));
  ribbon(band, false);
  if (!fly) sun(cx, cy - 43 + Math.sin(p * 1.4) * 18, radius, { offset: 7 });
  ribbon(band, true);
  // Type is the hero, not a credit on a title card. It stays clear of the sculpture.
  headline(p, {
    y: mobile ? 242 : 290,
    roll: Math.sin(Math.PI * phase(p, 0, 1.6)) * 0.12,
  });
  caption(mobile ? 62 : 86, mobile ? H * 0.45 : H * 0.78);
  if (fly > 0) {
    const xx = mix(cx, W * 0.55, fly),
      yy = mix(cy - 43 + Math.sin(p * 1.4) * 18, H * 0.48, fly);
    sun(xx, yy, mix(radius, Math.max(W, H) * 1.25, ease(phase(p, 3.2, 4))), {
      offset: 7 * (1 - fly),
    });
    // Reveal the next composition inside the sun, with no blank colour frame.
    const aperture = Math.max(W, H) * 1.4 * ease(phase(p, 3.42, 4));
    if (aperture > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(xx, yy, aperture, 0, TAU);
      ctx.clip();
      workshop(4);
      ctx.restore();
    }
  }
}
// 4–8s: paper turns over, then unthreads into a long printed ribbon.
function workshop(t) {
  background(C.ink);
  const p = t - 4,
    enter = out(phase(p, 0, 0.6));
  const open = ease(phase(p, 2.0, 3.45));
  const cx = mobile ? W * 0.52 : W * 0.72,
    cy = mobile ? H * 0.66 : H * 0.52;
  const band = {
    x: cx,
    y: cy,
    r: mobile ? 230 : 254,
    width: mobile ? 190 : 196,
    ax: 0.62 + p * 0.17,
    ay: -0.65 + Math.sin(p * 0.8) * 0.5,
    az: -0.28 - p * 0.16,
    turn: p * 0.82,
    twist: 1,
    scale: 0.76 + 0.24 * enter,
    dark: true,
    opening: open,
  };
  ribbon(band, false);
  sun(cx + Math.sin(p * 0.7) * 70, cy - 25, 115 + 18 * Math.sin(p * 0.7), {
    offset: 5,
  });
  ribbon(band, true);
  const switcher = ease(phase(p, 1.65, 2.35));
  const x = mobile ? 58 : 80,
    y = mobile ? 190 : 237;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x - 12, y - 95, mobile ? 780 : 700, mobile ? 300 : 380);
  ctx.clip();
  const size = mobile ? 150 : 190;
  for (let i = 0; i < 2; i++) {
    const dy = (i - switcher) * (mobile ? 320 : 390);
    text(i ? 'PUT THE' : 'LET THE', x, y + dy, mobile ? 44 : 48, C.paper, {
      latin: true,
    });
    text(
      i ? 'WORK IN.' : 'SUN IN.',
      x,
      y + dy + size * 1.08,
      fit(i ? 'WORK IN.' : 'SUN IN.', size, mobile ? 780 : 670, true),
      C.yellow,
      { latin: true },
    );
  }
  ctx.restore();
  // One sheet pulled across the lens replaces an unrelated hard scene cut.
  const wipe = ease(phase(p, 3.45, 4));
  if (wipe > 0) {
    ctx.save();
    const edge = W * (1 - wipe) * 1.35;
    poly(
      [
        [edge, -H],
        [W * 2, -H],
        [W * 2, H * 2],
        [edge - H * 0.24, H * 2],
      ],
      C.yellow,
    );
    ctx.clip();
    typework(8);
    ctx.restore();
  }
}
// 8–12s: rolling ink forms, over/under masking, then the printed sheet peels away.
function typework(t) {
  const p = t - 8;
  background(C.yellow);
  const settle = 1 - ease(phase(p, 0.05, 1.15));
  const x = mobile ? 58 : 82,
    y = mobile ? 350 : 300;
  const sweep = Math.sin(Math.PI * ease(phase(p, 0.2, 2.7)));
  const sx = mix(W * 0.82, W * 0.3, sweep),
    sy = mobile ? mix(H * 0.74, H * 0.39, sweep) : H * 0.54;
  const rise = ease(phase(p, 1.75, 3.1));
  disc(sx, sy, mobile ? 238 : 263, C.orange);
  // The sun is occluded by lettering, then returns in front as a paper cutout.
  headline(p, { x, y, color: C.ink, roll: settle * 0.95, wide: true });
  if (rise > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(sx, sy, mobile ? 238 : 263, 0, TAU);
    ctx.clip();
    headline(p, { x, y, color: C.paper, roll: settle * 0.95, wide: true });
    ctx.restore();
  }
  // A single, broad curled edge. Its shadow and underside follow the same curve.
  const peel = ease(phase(p, 2.15, 4));
  if (peel > 0) {
    const edge = W * 1.6 * (1 - peel) - W * 0.4;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(edge, -H * 0.2);
    ctx.bezierCurveTo(
      edge + W * 0.3,
      H * 0.2,
      edge - W * 0.13,
      H * 0.8,
      edge + W * 0.14,
      H * 1.2,
    );
    ctx.lineTo(W * 2, H * 1.2);
    ctx.lineTo(W * 2, -H * 0.2);
    ctx.closePath();
    ctx.clip();
    daylight(12);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(edge, -H * 0.2);
    ctx.bezierCurveTo(
      edge + W * 0.3,
      H * 0.2,
      edge - W * 0.13,
      H * 0.8,
      edge + W * 0.14,
      H * 1.2,
    );
    ctx.lineTo(edge + W * 0.24, H * 1.2);
    ctx.bezierCurveTo(
      edge + W * 0.01,
      H * 0.8,
      edge + W * 0.4,
      H * 0.2,
      edge + W * 0.1,
      -H * 0.2,
    );
    ctx.closePath();
    const g = ctx.createLinearGradient(edge, 0, edge + W * 0.2, 0);
    g.addColorStop(0, C.paper);
    g.addColorStop(0.6, '#d3c4a9');
    g.addColorStop(1, C.orange);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  }
}
// 12–14s: offset die-cut sheets become a horizon; the same solid disc rises.
function daylight(t) {
  const p = t - 12;
  background();
  const cx = mobile ? W * 0.65 : W * 0.79,
    cy = mobile ? H * 0.7 : H * 0.55;
  const lift = ease(phase(p, 0, 1.6));
  const radius = mobile ? 201 : 219;
  for (let i = 5; i >= 0; i--) {
    const offset = i * (mobile ? 28 : 27);
    ctx.save();
    ctx.translate(cx + offset * 0.55, cy + offset * 0.6);
    ctx.rotate(-0.12 - i * 0.025 + lift * 0.1);
    ctx.beginPath();
    ctx.rect(-radius * 1.35, -radius * 1.4, radius * 2.7, radius * 2.8);
    ctx.arc(0, 0, radius - i * 9, 0, TAU, true);
    ctx.shadowColor = 'rgba(36,33,29,.10)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = i % 2 ? shade(C.paper, C.orange, 0.07 * i) : C.paper;
    ctx.fill('evenodd');
    ctx.restore();
  }
  sun(cx - 15, cy - lift * 66, radius * 0.66, { offset: 6 });
  const x = mobile ? 58 : 80,
    y = mobile ? 212 : 246;
  const values =
    lang === 'ko'
      ? ['딴생각도', '빛을 봐야지.']
      : ['DAYDREAMS', 'DESERVE', 'DAYLIGHT.'];
  const max = mobile ? W - 116 : W * 0.59;
  const size = Math.min(
    ...values.map((v) =>
      fit(
        v,
        lang === 'ko' ? (mobile ? 119 : 144) : mobile ? 120 : 140,
        max,
        lang === 'en',
      ),
    ),
  );
  values.forEach((value, i) =>
    text(value, x, y + i * size * 1.12, size, C.ink, { latin: lang === 'en' }),
  );
}
function returning(t) {
  // A broad moving paper fold connects the daylight pages to the opening image.
  const p = ease(phase(t, 14, 15.5));
  daylight(14);
  ctx.save();
  ctx.beginPath();
  const edge = W * (1 - p) * 1.3 - W * 0.15;
  ctx.moveTo(edge, -H * 0.3);
  ctx.bezierCurveTo(
    edge + W * 0.15,
    H * 0.2,
    edge - W * 0.15,
    H * 0.85,
    edge,
    H * 1.3,
  );
  ctx.lineTo(W * 2, H * 1.3);
  ctx.lineTo(W * 2, -H * 0.3);
  ctx.closePath();
  ctx.clip();
  opening(0, true);
  ctx.restore();
  if (t >= 15.5) opening(0, true);
}
let heldOpening;
function render(time, { poster = false } = {}) {
  const t = Math.max(0, Math.min(DURATION, time));
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  if (heldOpening && (poster || t === 0 || t >= 15.5))
    ctx.drawImage(heldOpening, 0, 0, W, H);
  else if (poster) opening(0, true);
  else if (t < 4) opening(t);
  else if (t < 8) workshop(t);
  else if (t < 12) typework(t);
  else if (t < 14) daylight(t);
  else returning(t);
  document.querySelector('#readout').value = t.toFixed(2);
  return t;
}
window.film = {
  render,
  canvas,
  lang,
  mobile,
  ready: true,
  duration: DURATION,
  fps: FPS,
  frame: (n) => {
    render(n / FPS);
    return canvas.toDataURL('image/png').split(',')[1];
  },
  poster: () => {
    render(0, { poster: true });
    return canvas.toDataURL('image/png').split(',')[1];
  },
};
let playing = false,
  start = 0,
  offset = 0;
const slider = document.querySelector('#time');
slider.max = String(DURATION - 1 / FPS);
slider.addEventListener('input', () => {
  playing = false;
  offset = Number(slider.value);
  render(offset);
});
document.querySelector('#play').addEventListener('click', () => {
  playing = !playing;
  start = performance.now();
});
function tick(now) {
  if (playing) {
    const t = (offset + (now - start) / 1000) % DURATION;
    render(t);
    slider.value = String(t);
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
render(0);
// Reuse identical pixels at the loop joint, including antialiased paper edges.
heldOpening = document.createElement('canvas');
heldOpening.width = canvas.width;
heldOpening.height = canvas.height;
heldOpening.getContext('2d').drawImage(canvas, 0, 0);
