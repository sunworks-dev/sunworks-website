const press = document.querySelector<HTMLElement>('[data-idea-press]');
if (press) {
  const ideas = [
    ['매일 하는 일이', '조금 더', '재밌어진다면?'],
    ['어려운 배움이', '작은 모험이', '된다면?'],
    ['귀찮은 일은', '짧게, 좋아하는', '일은 길게.'],
    ['나만의 취향이', '다음 무언가의', '시작이라면?'],
  ];
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
      if (index) question.append(document.createElement('br'));
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
    status.textContent = '카드에 잉크를 올리는 중…';
    try {
      const words = ideas[selected].join('');
      await document.fonts.load('96px "Gasoek One"', words);
      await document.fonts.load(
        '24px "Noto Sans KR Variable"',
        '오늘의 딴생각작은 질문이 무언가의 시작',
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
      ctx.fillText('오늘의 딴생각', 80, 106);
      ctx.textAlign = 'right';
      ctx.fillText(`${selected + 1} / ${ideas.length}`, 1000, 106);
      ctx.textAlign = 'left';
      ctx.font = '96px "Gasoek One"';
      ideas[selected].forEach((line, index) =>
        ctx.fillText(line, 78, 350 + index * 145),
      );
      ['#d94324', '#f47a32', '#ffd84b'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(965, 1110, 410 - i * 90, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#24211d';
      ctx.font = '500 24px "Noto Sans KR Variable"';
      ctx.fillText('작은 질문이, 무언가의 시작.', 80, 1200);
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
      status.textContent =
        '카드를 준비했어요. 다운로드 목록에서 확인해 주세요.';
    } catch {
      status.textContent = '카드를 저장하지 못했어요. 잠시 후 다시 눌러주세요.';
    } finally {
      save.disabled = false;
      save.removeAttribute('aria-busy');
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) printAnimation?.cancel();
  });
}
