const press = document.querySelector<HTMLElement>('[data-idea-press]');
if (press) {
  const { lang, saving, saved, failed, cardTop, cardBottom } = press.dataset;
  const ideas: string[][] = JSON.parse(press.dataset.ideas!);
  // canvas font 단축 표기는 폭을 키워드로만 받는다.
  const questionFont =
    lang === 'en'
      ? 'semi-condensed 750 96px "Archivo Variable"'
      : '96px "Gasoek One"';
  const sheet = press.querySelector<HTMLElement>('[data-print-sheet]')!;
  const question = press.querySelector<HTMLElement>('[data-print-question]')!;
  const count = press.querySelector<HTMLElement>('[data-print-count]')!;
  const controls = press.querySelector<HTMLElement>('[data-print-controls]')!;
  const next = press.querySelector<HTMLButtonElement>('[data-print-next]')!;
  const save = press.querySelector<HTMLButtonElement>('[data-print-save]')!;
  const status = press.querySelector<HTMLElement>('[data-print-status]')!;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const deck = press.querySelector<HTMLElement>('[data-print-deck]')!;
  const pagination = press.querySelector<HTMLElement>(
    '[data-print-pagination]',
  )!;
  const pages = Array.from(
    pagination.querySelectorAll<HTMLButtonElement>('[data-print-index]'),
  );
  let current = 0;
  let printAnimation: Animation | undefined;
  let outgoingAnimation: Animation | undefined;
  let outgoing: HTMLElement | undefined;
  let dragFrame = 0;
  let gesture:
    | {
        id: number;
        x: number;
        y: number;
        dx: number;
        dy: number;
        started: number;
        axis: 'x' | 'y' | null;
      }
    | undefined;
  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const stopAnimation = () => {
    printAnimation?.cancel();
    outgoingAnimation?.cancel();
    outgoing?.remove();
    outgoing = undefined;
  };
  const settle = () => {
    const transform = getComputedStyle(sheet).transform;
    sheet.style.removeProperty('transform');
    printAnimation?.cancel();
    if (!reducedMotion.matches && transform !== 'none')
      printAnimation = sheet.animate(
        [{ transform }, { transform: 'translateX(0) rotate(0deg)' }],
        { duration: 240, easing: ease },
      );
  };
  const changeCard = (index: number, direction: number) => {
    stopAnimation();
    if (!reducedMotion.matches) {
      outgoing = sheet.cloneNode(true) as HTMLElement;
      outgoing.classList.add('print-outgoing');
      outgoing.setAttribute('aria-hidden', 'true');
      outgoing.inert = true;
      outgoing.removeAttribute('tabindex');
      outgoing.removeAttribute('data-print-sheet');
      outgoing.removeAttribute('aria-labelledby');
      outgoing.querySelectorAll('[id], [aria-live]').forEach((element) => {
        element.removeAttribute('id');
        element.removeAttribute('aria-live');
      });
      deck.append(outgoing);
      const leaving = outgoing;
      outgoingAnimation = leaving.animate(
        [
          { transform: getComputedStyle(sheet).transform, opacity: 1 },
          {
            transform: `translateX(${-direction * 65}%) rotate(${-direction * 6}deg)`,
            opacity: 0,
          },
        ],
        { duration: 240, easing: ease, fill: 'forwards' },
      );
      outgoingAnimation.onfinish = () => leaving.remove();
    }
    current = (index + ideas.length) % ideas.length;
    sheet.style.removeProperty('transform');
    question.replaceChildren();
    ideas[current].forEach((line, index) => {
      if (index) question.append(' ', document.createElement('br'));
      question.append(document.createTextNode(line));
    });
    count.textContent = `${current + 1} / ${ideas.length}`;
    pages.forEach((page, index) =>
      page.setAttribute('aria-pressed', String(index === current)),
    );
    status.textContent = '';
    if (!reducedMotion.matches)
      printAnimation = sheet.animate(
        [
          {
            transform: `translateX(${direction * 32}%) rotate(${direction * 2}deg)`,
            opacity: 0.5,
          },
          { transform: 'translateX(0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 420, easing: ease },
      );
  };
  controls.hidden = false;
  pagination.hidden = false;
  sheet.tabIndex = 0;
  sheet.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight');
  deck.setAttribute('data-swipe-ready', '');
  next.addEventListener('click', () => {
    changeCard(current + 1, 1);
  });
  pages.forEach((page, index) =>
    page.addEventListener('click', () => {
      if (index !== current) changeCard(index, index > current ? 1 : -1);
    }),
  );
  sheet.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    changeCard(current + direction, direction);
  });
  const resetGesture = () => {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    const id = gesture?.id;
    gesture = undefined;
    deck.removeAttribute('data-dragging');
    if (id !== undefined && sheet.hasPointerCapture(id))
      sheet.releasePointerCapture(id);
  };
  sheet.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || gesture) return;
    stopAnimation();
    gesture = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dx: 0,
      dy: 0,
      started: performance.now(),
      axis: null,
    };
    sheet.setPointerCapture(event.pointerId);
    if (event.pointerType === 'mouse') {
      event.preventDefault();
      sheet.focus({ preventScroll: true });
    }
  });
  sheet.addEventListener('pointermove', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    gesture.dx = event.clientX - gesture.x;
    gesture.dy = event.clientY - gesture.y;
    if (
      !gesture.axis &&
      Math.max(Math.abs(gesture.dx), Math.abs(gesture.dy)) > 10
    )
      gesture.axis =
        Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2 ? 'x' : 'y';
    if (gesture.axis !== 'x' || reducedMotion.matches) return;
    deck.setAttribute('data-dragging', '');
    if (!dragFrame)
      dragFrame = requestAnimationFrame(() => {
        dragFrame = 0;
        if (!gesture) return;
        const width = sheet.offsetWidth;
        const distance = Math.max(
          -width * 0.6,
          Math.min(width * 0.6, gesture.dx),
        );
        sheet.style.transform = `translateX(${distance}px) rotate(${(distance / width) * 6}deg)`;
      });
  });
  sheet.addEventListener('pointerup', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const { axis, started } = gesture;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    const distance = Math.abs(dx);
    const threshold = Math.min(100, Math.max(48, sheet.offsetWidth * 0.2));
    const quick =
      distance > 24 &&
      distance / Math.max(1, performance.now() - started) > 0.5;
    resetGesture();
    if (
      axis === 'x' &&
      distance > Math.abs(dy) * 1.2 &&
      (distance >= threshold || quick)
    ) {
      const direction = dx < 0 ? 1 : -1;
      changeCard(current + direction, direction);
    } else settle();
  });
  const cancelGesture = () => {
    if (!gesture) return;
    resetGesture();
    settle();
  };
  sheet.addEventListener('pointercancel', cancelGesture);
  sheet.addEventListener('lostpointercapture', cancelGesture);
  window.addEventListener('blur', cancelGesture);
  save.addEventListener('click', async () => {
    const selected = current;
    save.disabled = true;
    save.setAttribute('aria-busy', 'true');
    status.textContent = saving!;
    try {
      const words = ideas[selected].join('');
      await document.fonts.load(questionFont, words);
      await document.fonts.load(
        '24px "Noto Sans KR Variable"',
        `${cardTop}${cardBottom}`,
      );
      await document.fonts.load('700 30px "Archivo Variable"', 'sunworks.kr');
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      ctx.fillStyle = '#f4eddf';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = '#24211d';
      ctx.font = '500 27px "Noto Sans KR Variable"';
      ctx.fillText(cardTop!, 80, 106);
      ctx.textAlign = 'right';
      ctx.fillText(`${selected + 1} / ${ideas.length}`, 1000, 106);
      ctx.textAlign = 'left';
      ctx.font = questionFont;
      // 화면 카드 질문과 같은 행간 비율(--display-leading: 한국어 1.06, 영어 0.95)이다.
      const lineStep = 96 * (lang === 'en' ? 0.95 : 1.06);
      // Chrome은 font 문자열의 폭 키워드를 무시해서 따로 지정한다.
      if (lang === 'en') ctx.fontStretch = 'semi-condensed';
      // 화면 제목과 같은 자간(0.03em × 96px)을 준다.
      else ctx.letterSpacing = '3px';
      ideas[selected].forEach((line, index) =>
        ctx.fillText(line, 78, 350 + index * lineStep, 924),
      );
      ctx.fontStretch = 'normal';
      ctx.letterSpacing = '0px';
      ['#d94324', '#f47a32', '#ffd84b'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(965, 1110, 410 - i * 90, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#24211d';
      ctx.font = '500 24px "Noto Sans KR Variable"';
      ctx.fillText(cardBottom!, 80, 1200);
      ctx.font = '700 30px "Archivo Variable", sans-serif';
      ctx.fillText('sunworks.kr', 80, 1260);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (value) =>
            value ? resolve(value) : reject(new Error('Export unavailable')),
          'image/png',
        ),
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sunworks-daydream-${selected + 1}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = saved!;
    } catch {
      status.textContent = failed!;
    } finally {
      save.disabled = false;
      save.removeAttribute('aria-busy');
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      stopAnimation();
      resetGesture();
      sheet.style.removeProperty('transform');
    }
  });
}
