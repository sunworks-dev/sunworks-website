// Only the active language, viewport and supported codec receive a media URL.
// Poster-only remains a complete hero when JS, autoplay or the network is absent.
const root = document.querySelector<HTMLElement>('[data-motion-hero]');
if (root) {
  const video = root.querySelector<HTMLVideoElement>('video')!;
  const button = root.querySelector<HTMLButtonElement>('.motion-control')!;
  const label = root.querySelector<HTMLElement>('[data-control-label]')!;
  const status = root.querySelector<HTMLElement>('[data-motion-status]')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (
    navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const constrained = () =>
    !!connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '');
  let visible = false;
  let wanted = false;
  let finished = false;
  let started = false;
  let selected = false;
  let fallbackUsed = false;
  let format = '';
  let request = 0;
  let manual = false;
  let autoAttempted = false;
  video.muted = true;
  video.defaultMuted = true;
  button.hidden = false;

  const update = () => {
    const playing = !video.paused && !video.ended;
    root.toggleAttribute('data-playing', playing);
    label.textContent = playing
      ? button.dataset.pause!
      : finished
        ? button.dataset.replay!
        : button.dataset.play!;
  };
  const select = (webm = false) => {
    format ||= matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop';
    // Measured H.264 files are smaller than VP9 for this paper/type master.
    video.src = `${video.dataset.root}-${format}.${webm ? 'webm' : 'mp4'}`;
    selected = true;
  };
  const play = async (explicit = false) => {
    if (
      !explicit &&
      (reduce.matches || constrained() || document.hidden || !visible)
    )
      return;
    if (!explicit) autoAttempted = true;
    wanted = true;
    manual ||= explicit;
    const id = ++request;
    status.textContent = '';
    if (!selected) select();
    if (finished) {
      video.currentTime = 0;
      finished = false;
    }
    try {
      await video.play();
      if (id !== request || !wanted || document.hidden || !visible)
        video.pause();
    } catch (error) {
      // Autoplay rejection preserves the poster and a usable play button.
      if (id === request && video.error)
        status.textContent = button.dataset.failed!;
      if (
        id === request &&
        error instanceof DOMException &&
        error.name === 'NotAllowedError'
      )
        wanted = false;
    }
    update();
  };
  const pause = (user = false) => {
    request++;
    if (user) wanted = false;
    video.pause();
    update();
  };
  const auto = () => {
    if (
      autoAttempted ||
      started ||
      reduce.matches ||
      constrained() ||
      !visible ||
      document.hidden
    )
      return;
    // Let the high-priority responsive poster and page finish before media fetch.
    if ('requestIdleCallback' in window)
      window.requestIdleCallback(
        () => {
          if (!started) void play();
        },
        { timeout: 1500 },
      );
    else
      setTimeout(() => {
        if (!started) void play();
      }, 250);
  };
  const resume = () => {
    if (!visible || document.hidden || finished) return;
    if (wanted && selected && (manual || (!reduce.matches && !constrained())))
      void play(manual);
    else auto();
  };
  button.addEventListener('click', () => {
    if (!video.paused) pause(true);
    else {
      // An explicit retry may re-fetch a failed source; a blocked autoplay does not.
      if (video.error) {
        selected = false;
        fallbackUsed = false;
      }
      void play(true);
    }
  });
  video.addEventListener('playing', () => {
    started = true;
    root.setAttribute('data-frame-visible', '');
    update();
  });
  video.addEventListener('pause', update);
  video.addEventListener('ended', () => {
    wanted = false;
    finished = true;
    update();
  });
  video.addEventListener('error', () => {
    if (
      !fallbackUsed &&
      video.src.endsWith('.mp4') &&
      video.canPlayType('video/webm; codecs="vp9"')
    ) {
      fallbackUsed = true;
      select(true);
      if (wanted) void play(manual);
      return;
    }
    wanted = false;
    root.removeAttribute('data-frame-visible');
    status.textContent = button.dataset.failed!;
    update();
  });
  reduce.addEventListener('change', () => {
    if (reduce.matches) {
      manual = false;
      pause(true);
      root.removeAttribute('data-frame-visible');
    }
  });
  connection?.addEventListener('change', () => {
    if (constrained() && !manual) pause(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else resume();
  });
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      if (!visible) pause();
      else if (document.readyState === 'complete') resume();
    },
    { threshold: [0, 0.2] },
  ).observe(video);
  if (document.readyState === 'complete') auto();
  else window.addEventListener('load', auto, { once: true });
}
