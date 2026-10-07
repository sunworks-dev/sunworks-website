const press = document.querySelector<HTMLElement>('[data-idea-press]');
if (press) {
  const { lang, saving, saved, failed, cardTop, cardBottom } = press.dataset;
  const ideas: string[][] = JSON.parse(press.dataset.ideas!);
  // canvas font 단축 표기는 폭을 키워드로만 받는다.
  const questionFont =
    lang === 'en'
      ? 'semi-condensed 750 96px "Archivo Variable"'
      : '96px "Do Hyeon"';
  const sheet = press.querySelector<HTMLElement>('[data-print-sheet]')!;
  const question = press.querySelector<HTMLElement>('[data-print-question]')!;
  const count = press.querySelector<HTMLElement>('[data-print-count]')!;
  const controls = press.querySelector<HTMLElement>('[data-print-controls]')!;
  const next = press.querySelector<HTMLButtonElement>('[data-print-next]')!;
  const save = press.querySelector<HTMLButtonElement>('[data-print-save]')!;
  const status = press.querySelector<HTMLElement>('[data-print-status]')!;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let printAnimation: Animation | undefined;
  controls.hidden = false;
  next.addEventListener('click', () => {
    current = (current + 1) % ideas.length;
    question.replaceChildren();
    ideas[current].forEach((line, index) => {
      if (index) question.append(' ', document.createElement('br'));
      question.append(document.createTextNode(line));
    });
    count.textContent = `${current + 1} / ${ideas.length}`;
    status.textContent = '';
    printAnimation?.cancel();
    if (!reducedMotion.matches)
      printAnimation = sheet.animate(
        [
          { transform: 'translateY(-12px) rotate(-0.8deg)', opacity: 0.7 },
          { transform: 'translateY(0) rotate(0)', opacity: 1 },
        ],
        { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
  });
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
      // Chrome은 font 문자열의 폭 키워드를 무시해서 따로 지정한다.
      if (lang === 'en') ctx.fontStretch = 'semi-condensed';
      ideas[selected].forEach((line, index) =>
        ctx.fillText(line, 78, 350 + index * 145, 924),
      );
      ctx.fontStretch = 'normal';
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
    if (reducedMotion.matches) printAnimation?.cancel();
  });
}
