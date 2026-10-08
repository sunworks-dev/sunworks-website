export type Lang = 'ko' | 'en';

export const productUrl = 'https://hanja-app.sunw.kr/';
export const appUrl = 'https://bryannamd.github.io/hanja-web/';

// 사업자등록증명(2026-07-29 발급) 기준. 연락처는 어흥!한자 운영 안내와 같은 주소다.
export const company = {
  bizNo: '463-11-02942',
  founded: '2026-06-12',
  email: 'support@sunworks.kr',
  // 소유자가 2026-10-07 직접 알려 준 회사 전화.
  tel: '+821051735351',
  // 국세청 홈택스 '사업자상태 조회(사업자등록번호)' 화면. 로그인 없이 조회된다.
  verifyUrl:
    'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=43&tm2lIdx=4306000000&tm3lIdx=4306080000',
};

// 줄 배열은 화면에서 줄바꿈 위치를 뜻한다. 문장은 번역하지 않고 언어마다 따로 썼다.
export const copy = {
  ko: {
    path: '/',
    meta: {
      title: '썬웍스 SunWorks — 쓸모 있는 딴생각.',
      description:
        '샤워하다 떠오른 생각, 그냥 흘려보내긴 아깝잖아요. 썬웍스는 그런 생각을 붙잡아 앱과 웹서비스로 만들어요. 첫 앱은 한자 공부 앱 어흥!한자예요.',
      ogImage: '/social-card.png',
      ogImageAlt: '썬웍스 SunWorks — 쓸모 있는 딴생각.',
      ogLocale: 'ko_KR',
    },
    skip: '본문으로 바로 가기',
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
      hook: ['샤워하다 떠오른 생각,', '그냥 흘려보내긴 아깝잖아요.'],
      intro: ['썬웍스는 그런 생각을 붙잡아', '앱과 웹서비스로 만들어요.'],
      cta: '만든 것부터 볼까요?',
      artAlt: '연필을 쥔 손이 노란 해를 그려내는 빈티지 인쇄풍 일러스트',
      caption: ['연필로 그린 해가', '하늘로 떠오르기까지.'],
      colophon: ['SMALL IDEAS. REAL THINGS.', '하남에서, 2026년부터'],
    },
    strip: ['DAYDREAMS DESERVE DAYLIGHT.', '딴생각도 빛을 봐야지.'],
    about: {
      title: ['불편한 걸 보면', '손이 근질근질.'],
      lead: ['“이런 거 있으면 좋겠는데.”', '그 한마디에 노트북을 열어요.'],
      body: [
        '한 번 누르면 될 걸 세 번 누르게 하는 앱, 사흘 만에 덮게 되는 단어장. 다들 그러려니 넘기는 데서 우리는 딴생각을 해요.',
        '일단 작게 만들어 직접 써 봐요. 걸리는 데가 있으면 고치고 또 써 보고요. 매일 써도 괜찮다 싶을 때 내놓아요.',
      ],
    },
    work: {
      title: ['첫 딴생각은', '한자였어요.'],
      intro: [
        '중학생 아들에게 한자를 가르치려고 만들었어요.',
        '아들 말을 들으며 고치고 또 고쳤어요.',
      ],
      sceneNote: '“아하!” 하는 순간, 옆에서 “어흥!”',
      tigerAlt: '붓과 두루마리를 든 어흥!한자의 호랑이 캐릭터',
      name: '어흥!한자',
      nameReading: '',
      tagline: ['깜지 대신', '호랑이랑 하는', '한자 공부.'],
      description: [
        '해 日과 달 月이 만나면 밝을 明.',
        '아는 조각을 모아 처음 보는 한자의 뜻을 짐작해 봐요.',
        '12시간 뒤에 다시 맞혀야 ‘익혔다’고 쳐 줘요.',
      ],
      featuresLabel: '제품 특징',
      features: [
        '급수 시험 8급부터 1급까지 3,500자',
        '잊을 때쯤 돌아오는 복습',
      ],
      homeCta: '어흥!한자 둘러보기',
      betaCta: '웹 베타 바로 써 보기',
      status: '정식 출시 준비 중 · 웹 베타 공개',
      note: '다음 앱은 아직 메모장에 있어요. 이번엔 공부 얘기가 아닐 수도 있고요.',
    },
    making: {
      title: ['빨리 만들고', '오래 고친다.'],
      intro: '재밌는 생각은 금방 식고, 쓰다 걸린 불편은 오래 남거든요.',
      practices: [
        {
          title: '일단 눌러 봐야 안다.',
          body: '엉성해도 손가락으로 눌러 볼 수 있는 것부터 만들어요. 자료 찾기와 코드 짜기는 AI와 같이 하고, 뭘 남길지는 사람이 정해요.',
          note: '빠른 실험 · 프로토타이핑 · AI 활용',
        },
        {
          title: '화면 뒤가 더 바쁘다.',
          body: '버튼 하나 뒤에서 학습 기록과 복습 일정이 한꺼번에 움직여요. 어제 푼 한자가 제때 다시 나오려면 이게 다 맞물려야 하죠. 안 보이는 쪽도 화면만큼 챙겨요.',
          note: '앱과 웹 · 데이터 · API 설계',
        },
        {
          title: '티는 작은 데서 난다.',
          body: '보자마자 뭔지 아는 버튼, 엄지가 편하게 닿는 자리, 덜 지루한 로딩 화면. 쓰는 사람은 이런 걸 귀신같이 알아채요.',
          note: '인터랙션 · 접근성 · 반응형 디자인',
        },
      ],
    },
    press: {
      title: ['딴생각도', '한 장 뽑고', '가세요.'],
      intro: [
        '자꾸 생각나서 모아 둔 질문이에요.',
        '만들겠다는 약속은 아니고요.',
      ],
      invitation: [
        '마음에 드는 질문은 카드로 저장해 두세요.',
        '답은 천천히 생각해도 돼요.',
      ],
      trim: ['SUNWORKS / DAYDREAM PRESS', '생각은 계속됩니다'],
      cardTop: '오늘 떠오른 딴생각',
      cardBottom: '썬웍스 딴생각 인쇄소',
      ideas: [
        ['두고 온 우산이', '혼자 집에', '돌아온다면?'],
        ['미뤄 둔 일이', '하고 싶어지는', '버튼이 있다면?'],
        ['잔소리가', '칭찬처럼', '들린다면?'],
        ['가족 단톡방이', '조금 덜', '시끄럽다면?'],
      ],
      next: '다음 딴생각',
      save: '카드 저장',
      saving: '카드에 잉크를 올리는 중…',
      saved: '카드를 준비했어요. 다운로드 목록에서 확인해 주세요.',
      failed: '카드를 저장하지 못했어요. 잠시 후 다시 눌러 주세요.',
    },
    closing: {
      title: ['끝까지 읽으셨네요.', '딴생각도 안 하고.'],
      body: '내친김에 첫 앱도 구경해 보세요.',
      cta: '어흥!한자 보러 가기',
    },
    footer: {
      line: '오늘도 딴생각 중이에요.',
      top: '맨 위로',
    },
    company: {
      title: '회사 정보',
      nameLabel: '상호',
      name: '썬웍스',
      nameOther: 'SunWorks',
      nameOtherLang: 'en',
      ceoLabel: '대표',
      ceo: '남선',
      foundedLabel: '설립일',
      founded: '2026년 6월 12일',
      bizNoLabel: '사업자등록번호',
      verify: '국세청에서 확인',
      addressLabel: '주소',
      address: '경기도 하남시 감일순환로 170, 306동(감이동, 감일 스타힐스)',
      phoneLabel: '전화',
      phone: '010-5173-5351',
      emailLabel: '이메일',
    },
  },
  en: {
    path: '/en/',
    meta: {
      title: 'SunWorks — Useful daydreams.',
      description:
        'Good shower thoughts shouldn’t go down the drain. SunWorks makes them work as apps and websites, starting with 어흥!한자, a study app for Hanja (Chinese characters).',
      ogImage: '/social-card-en.png',
      ogImageAlt: 'SunWorks — Useful daydreams.',
      ogLocale: 'en_US',
    },
    skip: 'Skip to main content',
    newWindow: '(opens in a new tab)',
    logoAlt: 'SunWorks',
    homeLabel: 'SunWorks, home',
    topLabel: 'SunWorks, back to top',
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
      hook: ['Good shower thoughts', 'shouldn’t go down the drain.'],
      intro: [
        'SunWorks catches them and makes them work as apps and websites worth keeping.',
      ],
      cta: 'See what we’ve made',
      artAlt:
        'Vintage screenprint-style illustration of a hand drawing a yellow sun with a pencil',
      caption: ['From a pencil sun', 'to a button you can tap.'],
      colophon: ['SMALL IDEAS. REAL THINGS.', 'Hanam, Korea · Est. 2026'],
    },
    strip: ['DAYDREAMS DESERVE DAYLIGHT.', 'If it’s fun, build it.'],
    about: {
      title: ['Little annoyances', 'make us itch to build.'],
      lead: ['“Wouldn’t it be nice if…”', 'Then the laptop comes out.'],
      body: [
        'An app that makes you tap three times for a one-tap job. A vocab list that’s boring by page two. Most people shrug and move on. That’s where we start daydreaming.',
        'So we build a small version and use it ourselves. When something snags, we fix it and try again. We only ship it once it feels right in our own hands.',
      ],
    },
    work: {
      title: ['Daydream', 'No. 001'],
      intro: [
        'A dad built this app for his son,',
        'then fixed it every time his son got stuck.',
      ],
      sceneNote: 'Every “aha!” earns a roar.',
      tigerAlt: 'The Eoheung! Hanja tiger holding a brush and a scroll',
      name: '어흥!한자',
      nameReading: 'Eoheung! Hanja',
      tagline: ['Trade worksheets', 'for a tiger.'],
      description: [
        'Hanja are the Chinese characters behind many Korean words. Sun 日 plus moon 月 makes bright 明. Know the pieces, and new characters start to make sense. Nothing counts as learned until you get it right again at least 12 hours later.',
      ],
      featuresLabel: 'Product highlights',
      features: [
        '3,500 characters, test levels 8 to 1',
        'Reviews that return just before you’d forget',
      ],
      homeCta: 'Visit the app’s website',
      betaCta: 'Try the web beta (in Korean)',
      status: 'Full launch in the works · Web beta now open',
      note: 'Our first app is for studying. The next one might have nothing to do with school.',
    },
    making: {
      title: ['Quick to build.', 'Slow to call it done.'],
      intro:
        'We build while an idea is still hot, then keep fixing until nothing snags.',
      practices: [
        {
          title: 'You don’t know till you tap it.',
          body: 'We start with a rough version you can tap. AI helps with the research and the code, and we decide what stays and what goes by using it ourselves.',
          note: 'Rapid experiments · Prototyping · AI-assisted',
        },
        {
          title: 'Most of the work is backstage.',
          body: 'One tap can set your study history and review schedule moving at once. If they fall out of step, the Hanja you studied yesterday won’t come back on time. So we build the parts you can’t see as carefully as the parts you can.',
          note: 'Apps & web · Data · API design',
        },
        {
          title: 'Sweat the small stuff.',
          body: 'Buttons you get at a glance, controls right where your thumb lands, loading screens that don’t drag. People notice every one of these.',
          note: 'Interaction · Accessibility · Responsive design',
        },
      ],
    },
    press: {
      title: ['Grab a', 'daydream', 'to go.'],
      intro: [
        'Stray questions we keep turning over.',
        'No plans for them. We just like them.',
      ],
      invitation: [
        'If a question sticks, save the card',
        'and take your time with the answer.',
      ],
      trim: ['SUNWORKS / DAYDREAM PRESS', 'Still thinking'],
      cardTop: 'Today’s daydream',
      cardBottom: 'SunWorks Daydream Press',
      ideas: [
        ['What if your', 'umbrella always', 'made it home?'],
        ['What if one button', 'could cure', 'procrastination?'],
        ['What if nagging', 'sounded like', 'a compliment?'],
        ['What if the family', 'group chat got', 'a little quieter?'],
      ],
      next: 'Next daydream',
      save: 'Save card',
      saving: 'Inking your card…',
      saved: 'Your card is ready. Check your downloads.',
      failed: 'Couldn’t save the card. Please try again in a moment.',
    },
    closing: {
      title: ['Still here?', 'Fellow daydreamer?'],
      body: 'See where our first daydream landed.',
      cta: 'Visit the app’s website',
    },
    footer: {
      line: 'Still daydreaming.',
      top: 'Back to top',
    },
    company: {
      title: 'Company information',
      nameLabel: 'Company',
      name: 'SunWorks',
      nameOther: '썬웍스',
      nameOtherLang: 'ko',
      ceoLabel: 'Representative',
      ceo: 'Sun Nam',
      foundedLabel: 'Founded',
      founded: 'June 12, 2026',
      bizNoLabel: 'Business registration no.',
      verify: 'Verify on Korea’s Hometax',
      addressLabel: 'Address',
      address:
        'Building 306, 170 Gamilsunhwan-ro, Hanam-si, Gyeonggi-do, 12908, Republic of Korea',
      phoneLabel: 'Phone',
      phone: '+82 10-5173-5351',
      emailLabel: 'Email',
    },
  },
} as const;

export type Copy = (typeof copy)[Lang];
