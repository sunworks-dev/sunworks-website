export type Lang = 'ko' | 'en';

export const productUrl = 'https://hanja-app.sunw.kr/';
export const appUrl = 'https://bryannamd.github.io/hanja-web/';

// 줄 배열은 화면에서 줄바꿈 위치를 뜻한다. 문장은 번역하지 않고 언어마다 따로 썼다.
export const copy = {
  ko: {
    path: '/',
    meta: {
      title: '썬웍스 sunworks — 쓸모 있는 딴생각.',
      description:
        '그냥 지나치기엔, 꽤 괜찮은 생각이니까. 썬웍스는 일상의 작은 발견을 직접 쓰고 싶은 앱과 웹서비스로 만듭니다. 우리의 생각과 첫 제품 어흥!한자를 만나보세요.',
      ogImage: '/social-card.png',
      ogImageAlt: '썬웍스 sunworks — 쓸모 있는 딴생각.',
      ogLocale: 'ko_KR',
    },
    skip: '본문으로 바로가기',
    newWindow: '(새 창)',
    logoAlt: '썬웍스',
    homeLabel: '썬웍스, 처음으로',
    topLabel: '썬웍스, 맨 위로',
    nav: {
      label: '주요 메뉴',
      about: '우리의 생각',
      work: '만든 것',
      press: '딴생각 인쇄소',
      switchHref: '/en/',
      switchText: 'EN',
      switchLabel: 'English',
      switchLang: 'en',
    },
    hero: {
      title: ['쓸모 있는', '딴생각.'],
      hook: ['그냥 지나치기엔,', '꽤 괜찮은 생각이니까.'],
      intro: [
        '썬웍스는 일상의 작은 발견을',
        '직접 쓰고 싶은 앱과 웹서비스로 만듭니다.',
      ],
      cta: '만든 것부터 볼까요?',
      artAlt: '연필을 쥔 손이 노란 해를 그려내는 빈티지 인쇄풍 일러스트',
      caption: ['연필 끝에서 시작해', '손끝에 닿기까지.'],
      colophon: ['SMALL IDEAS. REAL THINGS.', '조금 다르게, 끝까지.'],
    },
    strip: ['GOOD IDEAS DESERVE TO EXIST.', '재밌는 건 만들어 봐야지.'],
    about: {
      title: ['불편함엔 참견을.', '좋은 생각엔 고집을.'],
      lead: ['“이런 게 있으면 좋겠다.”', '우리에게는 꽤 진지한 시작입니다.'],
      body: [
        '써보니 어딘가 번거로운 순간. 배우다 문득 재미없어진 순간. 그냥 넘길 수도 있지만, 우리는 거기서 자꾸 딴생각을 합니다.',
        '작게 만들어 직접 써보고, 다시 고칩니다. 그렇게 나도 쓰고 남도 쓸 만한 것을 하나씩 내놓습니다.',
      ],
    },
    work: {
      title: ['생각만 하진', '않았습니다.'],
      intro: ['지금 만들고 있는 것.', '썬웍스가 처음 내놓는 제품입니다.'],
      sceneNote: '“아하!”가 “어흥!”이 되는 순간.',
      tigerAlt: '붓과 두루마리를 든 어흥!한자의 호랑이 캐릭터',
      name: '어흥!한자',
      nameReading: '',
      tagline: ['외우기만 하는', '지루한 얼굴 말고', '알아가는 미소!'],
      description: [
        '낯선 한자를 캐릭터와 함께 만나고,',
        '잊을 때쯤 한 번 더. ‘공부해야지’보다',
        '‘조금 더 해볼까’가 먼저인 배움을 만듭니다.',
      ],
      featuresLabel: '제품 특징',
      features: ['캐릭터와 익히는 한자', '기억에 맞춘 반복 학습'],
      homeCta: '어흥!한자 둘러보기',
      betaCta: '웹 베타 바로 써보기',
      status: '정식 출시 준비 중 · 웹 베타 공개',
      note: '첫 번째는 배움. 다음 딴생각은 일상 어디에서든.',
    },
    making: {
      title: ['만드는 손은 편하게.', '만드는 기준은 단단하게.'],
      intro: '재미있는 생각이 좋은 제품으로 남도록.',
      practices: [
        {
          title: '아이디어는 빨리 눈앞에.',
          body: '머릿속에서만 완벽한 아이디어보다 직접 눌러볼 수 있는 작은 시작이 좋습니다. AI로 찾아보고 만드는 속도를 높이되, 무엇을 남길지는 직접 써보며 정합니다.',
          note: '빠른 실험 · 프로토타이핑 · AI 활용',
        },
        {
          title: '화면 뒤도, 제대로.',
          body: '버튼을 누른 다음에 일어날 일까지 설계합니다. 앱과 웹, 데이터와 API가 매끄럽게 이어져야 처음의 재미도 오래갑니다.',
          note: '앱과 웹 · 데이터 · API 설계',
        },
        {
          title: '한 번 더 만져보게.',
          body: '설명 없이도 알 수 있는 버튼, 손가락이 편한 간격, 덜 지루한 기다림. 이런 작은 차이를 그냥 넘기지 않습니다. 결국 사람이 쓰는 거니까요.',
          note: '인터랙션 · 접근성 · 반응형 디자인',
        },
      ],
    },
    press: {
      title: ['딴생각도', '한 장 뽑고', '가세요.'],
      intro: [
        '아직 제품은 아닌, 언젠가의 시작들.',
        '쓸모를 찾기 전의 생각도 좋아합니다.',
      ],
      invitation: [
        '마음에 드는 질문은 카드로 저장해 두고',
        '답은 천천히 적어보세요.',
      ],
      trim: ['SUNWORKS / DAYDREAM PRESS', '생각은 계속됩니다'],
      cardTop: '오늘의 딴생각',
      cardBottom: '작은 질문에서 시작합니다.',
      ideas: [
        ['매일 하는 일이', '조금 더', '재밌어진다면?'],
        ['어려운 배움이', '작은 모험이', '된다면?'],
        ['귀찮은 일은', '짧게, 좋아하는', '일은 길게.'],
        ['나만의 취향이', '다음 무언가의', '시작이라면?'],
      ],
      next: '다음 딴생각',
      save: '카드 저장',
      saving: '카드에 잉크를 올리는 중…',
      saved: '카드를 준비했어요. 다운로드 목록에서 확인해 주세요.',
      failed: '카드를 저장하지 못했어요. 잠시 후 다시 눌러주세요.',
    },
    closing: {
      title: ['좋아하는 것을', '쓸모 있는 것으로.'],
      body: '다음 딴생각도 썬웍스답게.',
      cta: '첫 제품 어흥!한자 보러 가기',
    },
    footer: {
      line: '오늘도 딴생각 중입니다.',
      top: '맨 위로',
    },
  },
  en: {
    path: '/en/',
    meta: {
      title: 'sunworks — Useful daydreams.',
      description:
        'Some ideas are too good to walk past. sunworks turns small everyday discoveries into apps and web services people actually want to use. Meet our first product, 어흥!한자 (Eoheung! Hanja).',
      ogImage: '/social-card-en.png',
      ogImageAlt: 'sunworks — Useful daydreams.',
      ogLocale: 'en_US',
    },
    skip: 'Skip to main content',
    newWindow: '(opens in a new tab)',
    logoAlt: 'sunworks',
    homeLabel: 'sunworks, home',
    topLabel: 'sunworks, back to top',
    nav: {
      label: 'Main',
      about: 'About',
      work: 'Work',
      press: 'Daydream Press',
      switchHref: '/',
      switchText: 'KO',
      switchLabel: '한국어',
      switchLang: 'ko',
    },
    hero: {
      title: ['Useful', 'daydreams.'],
      hook: ['Some ideas are', 'too good to walk past.'],
      intro: [
        'sunworks turns small everyday discoveries into apps and web services people actually want to use.',
      ],
      cta: 'See what we’ve made',
      artAlt:
        'Vintage screenprint-style illustration of a hand drawing a yellow sun with a pencil',
      caption: ['From the tip of a pencil', 'to the tip of your finger.'],
      colophon: [
        'SMALL IDEAS. REAL THINGS.',
        'A little different, all the way.',
      ],
    },
    strip: ['GOOD IDEAS DESERVE TO EXIST.', 'If it’s fun, build it.'],
    about: {
      title: ['Nosy about annoyances.', 'Stubborn about good\u00a0ideas.'],
      lead: [
        '“Wouldn’t it be nice if…”',
        'For us, that’s a serious place to start.',
      ],
      body: [
        'A tool that’s oddly fiddly to use. A lesson that suddenly stops being fun. We could shrug those moments off, but that’s exactly where our minds start to wander.',
        'We build something small, use it ourselves, then fix it. One at a time, we put out things we’d use and think you might, too.',
      ],
    },
    work: {
      title: ['We didn’t stop', 'at thinking.'],
      intro: [
        'What we’re making right now:',
        'the first product from sunworks.',
      ],
      sceneNote: 'When “aha!” turns into a roar.',
      tigerAlt: 'The Eoheung! Hanja tiger holding a brush and a scroll',
      name: '어흥!한자',
      nameReading: 'Eoheung! Hanja',
      tagline: ['Trade the cramming frown', 'for a got-it grin!'],
      description: [
        'Meet unfamiliar Hanja, the Chinese characters behind many Korean words, through friendly illustrated guides, and see each one again right before you’d forget it. It’s learning where “one more?” comes before “I should study.”',
      ],
      featuresLabel: 'Product highlights',
      features: [
        'Learn with illustrated guides',
        'Reviews timed to your memory',
      ],
      homeCta: 'Explore Eoheung! Hanja',
      betaCta: 'Try the web beta',
      status: 'Full launch in the works · Web beta now open',
      note: 'First up: learning. The next daydream could come from anywhere.',
    },
    making: {
      title: ['Easy on the hands.', 'Firm on the standards.'],
      intro: 'So a fun idea grows into a product that lasts.',
      practices: [
        {
          title: 'Get it in front of us, fast.',
          body: 'We’d rather have a small start we can actually tap than a perfect idea that lives only in our heads. AI helps us explore and build faster, but we decide what stays only after trying each version ourselves.',
          note: 'Rapid experiments · Prototyping · AI-assisted',
        },
        {
          title: 'Solid behind the screen,\u00a0too.',
          body: 'We design what happens after the button press. When apps, web, data and APIs connect cleanly, the fun you feel on day one actually lasts.',
          note: 'Apps & web · Data · API design',
        },
        {
          title: 'Made to be picked up\u00a0again.',
          body: 'Buttons that explain themselves, spacing that suits your thumb, waits that feel shorter. We don’t let small details slide. People are the ones using it, after all.',
          note: 'Interaction · Accessibility · Responsive design',
        },
      ],
    },
    press: {
      title: ['Grab a', 'daydream', 'to go.'],
      intro: [
        'Not products yet, just beginnings for someday.',
        'We like ideas even before they find a use.',
      ],
      invitation: [
        'If a question sticks, save the card',
        'and take your time with the answer.',
      ],
      trim: ['SUNWORKS / DAYDREAM PRESS', 'Still thinking'],
      cardTop: 'Today’s daydream',
      cardBottom: 'Small questions start things.',
      ideas: [
        ['What if the things', 'you do every day', 'got more fun?'],
        ['What if hard', 'lessons felt like', 'small adventures?'],
        ['Keep the chores', 'short. Let the fun', 'stuff run long.'],
        ['What if your taste', 'were the start of', 'something new?'],
      ],
      next: 'Next daydream',
      save: 'Save card',
      saving: 'Inking your card…',
      saved: 'Your card is ready. Check your downloads.',
      failed: 'Couldn’t save the card. Please try again in a moment.',
    },
    closing: {
      title: ['Turning what we love', 'into something useful.'],
      body: 'The next daydream, the sunworks\u00a0way.',
      cta: 'Meet our first product',
    },
    footer: {
      line: 'Still daydreaming.',
      top: 'Back to top',
    },
  },
} as const;

export type Copy = (typeof copy)[Lang];
