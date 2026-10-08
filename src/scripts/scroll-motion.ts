// Content is visible before JS. Motion only accompanies the first arrival;
// the decorative layers follow native scrolling without controlling it.
export {};

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = matchMedia('(max-width: 760px)');
const entrances = new Map<HTMLElement, Animation>();
const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      revealObserver.unobserve(element);
      if (motionPreference.matches || typeof element.animate !== 'function')
        continue;
      const frames: Keyframe[] =
        element.dataset.reveal === 'ink'
          ? [
              { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(8px)' },
              { clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' },
            ]
          : element.dataset.reveal === 'paper'
            ? [
                { transform: 'translateY(32px) rotate(1.5deg)', opacity: 0.6 },
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
              ]
            : [
                { transform: 'translateY(22px)', opacity: 0.55 },
                { transform: 'translateY(0)', opacity: 1 },
              ];
      const animation = element.animate(frames, {
        duration: element.dataset.reveal === 'ink' ? 650 : 520,
        delay: Math.min(Number(element.dataset.revealDelay) || 0, 140),
        easing: ease,
        // A delayed item stays readable until its animation actually starts.
        fill: 'none',
      });
      entrances.set(element, animation);
      animation.onfinish = () => entrances.delete(element);
      animation.oncancel = () => entrances.delete(element);
    }
  },
  { rootMargin: '0px 0px -7% 0px', threshold: 0 },
);

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
  const bounds = element.getBoundingClientRect();
  // A refresh or direct anchor arrival starts with readable content.
  if (bounds.top >= innerHeight || bounds.bottom <= 0)
    revealObserver.observe(element);
});

const layers = Array.from(
  document.querySelectorAll<HTMLElement>('[data-parallax]'),
).map((element) => ({
  element,
  anchor:
    element.closest<HTMLElement>('.product-scene, .sun-strip, .making-body') ??
    element,
  amount: Number(element.dataset.parallax) || 0,
  horizontal: element.dataset.parallaxAxis === 'x',
}));
const activeAnchors = new Set<Element>();
let frame = 0;

const updateLayers = () => {
  frame = 0;
  if (motionPreference.matches || document.hidden) return;
  // Read all layout measurements before writing any transforms.
  const positions = new Map<Element, number>();
  for (const anchor of activeAnchors) {
    const bounds = anchor.getBoundingClientRect();
    positions.set(
      anchor,
      Math.max(
        -1,
        Math.min(
          1,
          (innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight,
        ),
      ),
    );
  }
  for (const layer of layers) {
    const progress = positions.get(layer.anchor);
    if (progress === undefined) continue;
    const distance = progress * layer.amount * (smallScreen.matches ? 0.5 : 1);
    layer.element.style.translate = layer.horizontal
      ? `${distance.toFixed(2)}px 0`
      : `0 ${distance.toFixed(2)}px`;
  }
};
const schedule = () => {
  if (
    !frame &&
    !motionPreference.matches &&
    !document.hidden &&
    activeAnchors.size
  )
    frame = requestAnimationFrame(updateLayers);
};
const layerObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) activeAnchors.add(entry.target);
    else activeAnchors.delete(entry.target);
  }
  schedule();
});
new Set(layers.map((layer) => layer.anchor)).forEach((anchor) =>
  layerObserver.observe(anchor),
);
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule, { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
  } else schedule();
});
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    entrances.forEach((animation) => animation.cancel());
    cancelAnimationFrame(frame);
    frame = 0;
    layers.forEach(({ element }) => element.style.removeProperty('translate'));
  } else schedule();
});
// Keyboard navigation should never land behind an entrance mask.
document.addEventListener('focusin', (event) => {
  if (!(event.target instanceof Element)) return;
  for (const [element, animation] of entrances)
    if (element.contains(event.target)) animation.cancel();
});
