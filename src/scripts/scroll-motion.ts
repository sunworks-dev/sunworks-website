export {};

// Scroll is the timeline: no playback, wheel interception, or catch-up loop.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const narrow = matchMedia('(max-width: 760px)');
const short = matchMedia('(max-height: 520px)');
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));
const smooth = (value: number) => value * value * (3 - 2 * value);
const scenes = Array.from(
  document.querySelectorAll<HTMLElement>('[data-scroll-scene]'),
).map((element) => ({
  element,
  kind: element.dataset.scrollScene,
  parts: {
    discs: Array.from(element.querySelectorAll<HTMLElement>('.daylight-disc')),
    lines: Array.from(
      element.querySelectorAll<HTMLElement>('.daylight-line, .type-line'),
    ),
    stage: element.querySelector<HTMLElement>('.daylight-stage'),
    lead: element.querySelector<HTMLElement>('.daylight-lead'),
    sun: element.querySelector<HTMLElement>('.product-sun, .closing-sun'),
    tiger: element.querySelector<HTMLElement>('.horang'),
    character: element.querySelector<HTMLElement>('.product-character'),
    sheet: element.querySelector<HTMLElement>('.print-deck'),
    ribbon: element.querySelector<HTMLElement>('.sun-strip-inner'),
    title: element.querySelector<HTMLElement>('h2'),
  },
}));
type Scene = (typeof scenes)[number];
const active = new Set<Scene>();
const touched = new Map<HTMLElement, Set<string>>();
let frame = 0;
function style(element: HTMLElement | null, property: string, value: string) {
  if (!element) return;
  element.style.setProperty(property, value);
  if (!touched.has(element)) touched.set(element, new Set());
  touched.get(element)!.add(property);
}
function render() {
  frame = 0;
  if (preference.matches || document.hidden) return;
  // Finish layout reads before any style write, including sticky stage height.
  const measurements = [...active].map((scene) => ({
    scene,
    bounds: scene.element.getBoundingClientRect(),
    stageHeight: scene.parts.stage?.offsetHeight ?? 0,
  }));
  const viewport = document.documentElement.clientHeight;
  for (const { scene, bounds, stageHeight } of measurements) {
    const { element, parts, kind } = scene;
    const enter = clamp((viewport - bounds.top) / (viewport * 0.85));
    if (kind === 'daylight') {
      const progress = short.matches
        ? enter
        : clamp(-bounds.top / Math.max(1, bounds.height - stageHeight));
      const bloom = smooth(phase(progress, 0.05, 0.9));
      const size = narrow.matches ? 4.8 : 3.5;
      parts.discs.forEach((disc, index) => {
        const expansion = smooth(
          phase(progress, index * 0.08, 0.82 + index * 0.07),
        );
        style(
          disc,
          'transform',
          `translate(-50%, calc(-50% + ${(1 - bloom) * 160}px)) scale(${0.16 - index * 0.045 + expansion * (size - index * 0.5)})`,
        );
      });
      parts.lines.forEach((line, index) => {
        const registration = smooth(phase(progress, 0, 0.5));
        style(
          line,
          'transform',
          `translateX(${(1 - registration) * (index ? -1 : 1) * (narrow.matches ? 14 : 80)}px)`,
        );
      });
      style(
        parts.lead,
        'transform',
        `translateY(${(1 - bloom) * 24}px) rotate(${-3 + bloom * 3}deg)`,
      );
      style(element, '--scene-progress', progress.toFixed(4));
    } else if (kind === 'product') {
      const arrive = smooth(phase(enter, 0.08, 0.9));
      style(
        parts.sun,
        'transform',
        `translateY(${(1 - arrive) * 80}px) scale(${0.35 + arrive * 0.65})`,
      );
      style(
        parts.tiger,
        'transform',
        `translateY(${(1 - arrive) * 150}px) rotate(${(1 - arrive) * -12}deg) scale(${0.68 + arrive * 0.32})`,
      );
      style(
        parts.character,
        'transform',
        `translate(${(1 - arrive) * -35}px, ${(1 - arrive) * -50}px) rotate(${-25 + arrive * 15}deg)`,
      );
    } else if (kind === 'type') {
      parts.lines.forEach((line, index) => {
        const progress = smooth(phase(enter, index * 0.11, 0.6 + index * 0.11));
        style(
          line,
          'transform',
          `translateX(${(1 - progress) * (index % 2 ? 1 : -1) * 38}%) skewX(${(1 - progress) * (index % 2 ? -5 : 5)}deg)`,
        );
      });
    } else if (kind === 'press') {
      const progress = smooth(phase(enter, 0.02, 0.42));
      // Swipe owns the sheet; scroll only moves its outer deck.
      const engaged =
        element.contains(document.activeElement) ||
        element.matches(':active') ||
        !!element.querySelector('[data-dragging]');
      style(
        parts.sheet,
        'transform',
        engaged
          ? 'none'
          : `translateY(${(1 - progress) * 90}px) rotate(${(1 - progress) * -7}deg)`,
      );
      style(element, '--press-rule', String(1 - progress));
    } else if (kind === 'closing') {
      const progress = smooth(phase(enter, 0, 0.88));
      style(
        parts.sun,
        'clip-path',
        `circle(${8 + progress * 115}% at 50% 100%)`,
      );
    } else if (kind === 'ribbon') {
      const travel =
        clamp((viewport - bounds.top) / (viewport + bounds.height)) - 0.5;
      style(
        parts.ribbon,
        'transform',
        `translateX(${travel * (narrow.matches ? -32 : -120)}px)`,
      );
    } else if (kind === 'heading') {
      const progress = smooth(phase(enter, 0, 0.62));
      style(
        parts.title,
        'transform',
        `translateX(${(1 - progress) * (narrow.matches ? 22 : 48)}px)`,
      );
    }
  }
}
function schedule() {
  if (!frame && !preference.matches && !document.hidden)
    frame = requestAnimationFrame(render);
}
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const scene = scenes.find(({ element }) => element === entry.target)!;
      if (entry.isIntersecting) active.add(scene);
      else active.delete(scene);
    }
    schedule();
  },
  { rootMargin: '100px 0px' },
);
function syncPreference() {
  cancelAnimationFrame(frame);
  frame = 0;
  if (preference.matches) {
    delete document.documentElement.dataset.scrollStory;
    touched.forEach((properties, element) =>
      properties.forEach((property) => element.style.removeProperty(property)),
    );
    touched.clear();
  } else {
    document.documentElement.dataset.scrollStory = '';
    schedule();
  }
}
scenes.forEach(({ element }) => observer.observe(element));
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule, { passive: true });
window.addEventListener('pageshow', schedule);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
  } else schedule();
});
document.addEventListener('focusin', schedule);
document.addEventListener('pointerdown', schedule, { passive: true });
preference.addEventListener('change', syncPreference);
narrow.addEventListener('change', schedule);
short.addEventListener('change', schedule);
new ResizeObserver(schedule).observe(document.body);
document.fonts.ready.then(schedule);
syncPreference();
