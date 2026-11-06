export type Lang = 'ko' | 'en';

export const productUrl = 'https://hanja.sunw.kr/';
export const appUrl = 'https://hanja-app.sunw.kr/';
export const appStoreUrl = 'https://apps.apple.com/kr/app/id6823980453';
export const playStoreUrl =
  'https://play.google.com/store/apps/details?id=kr.sunworks.hanja';
export const contactFormUrl =
  'https://sunworks-formmail.quiet-poetry-c5be.workers.dev/form';

// 한글 사업자등록증·영문 사업자등록증명(2026-10-08 발급) 기준.
// 주소(호수 포함)·전화·통신판매업 신고번호는 소유자가 2026-10-16 직접 알려 준 값이다.
export const company = {
  bizNo: '463-11-02942',
  founded: '2026-06-12',
  email: 'support@sunworks.kr',
  tel: '+827087178850',
  mailOrderNo: '2026-서울송파-2924',
  // 공정위 통신판매사업자 정보공개. 보안문자를 입력해야 내용이 보인다.
  ftcUrl: 'https://www.ftc.go.kr/bizCommPop.do?wrkr_no=4631102942',
  // 국세청 홈택스 '사업자상태 조회(사업자등록번호)' 화면. 로그인 없이 조회된다.
  verifyUrl:
    'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=43&tm2lIdx=4306000000&tm3lIdx=4306080000',
};

// 처리방침 문장 조각. href가 있으면 링크, lang이 있으면 그 언어로 표시한다.
export interface Part {
  t: string;
  href?: string;
  lang?: string;
}
export type Rich = string | readonly Part[];
export interface PrivacySection {
  title: string;
  body?: Rich;
  items?: readonly { dt: string; dd: Rich }[];
  note?: Rich;
}
export interface PrivacyCopy {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  homeLabel: string;
  intro: Rich;
  effective: string;
  sections: readonly PrivacySection[];
}

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
      colophon: ['SMALL IDEAS. REAL THINGS.', '서울에서, 2026년부터'],
      motion: {
        play: '영상 재생',
        pause: '일시 정지',
        replay: '다시 재생',
        description:
          '종이의 틈에서 떠오른 해가 큰 활자를 지나 다시 처음으로 이어지는 16초 무음 영상.',
        failed: '영상을 불러오지 못했어요. 다시 재생해 주세요.',
      },
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
      storesLabel: '앱 내려받기',
      appStoreAlt: 'App Store에서 다운로드',
      playStoreAlt: 'Google Play에서 다운로드',
      status: '2026년 11월 6일 정식 출시 · 웹 베타 공개',
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
      privacy: '개인정보 처리방침',
    },
    company: {
      title: '회사 정보',
      nameLabel: '상호',
      name: '썬웍스',
      nameOther: 'Sunworks',
      nameOtherLang: 'en',
      ceoLabel: '대표',
      ceo: '남선',
      foundedLabel: '설립일',
      founded: '2026년 6월 12일',
      bizNoLabel: '사업자등록번호',
      verify: '국세청에서 확인',
      addressLabel: '주소',
      mailOrderLabel: '통신판매업 신고번호',
      ftcVerify: '공정위에서 확인',
      // 덩어리마다 줄을 바꾸지 않는다. 호수의 하이픈에서 줄이 갈라지지 않게 한다.
      address: [
        '서울특별시 송파구',
        '위례광장로 199,',
        '성희프라자 501-3-10호',
      ],
      phoneLabel: '전화',
      phone: '070-8717-8850',
      emailLabel: '이메일',
      contactLabel: '문의',
      contactCta: '의견·문의 보내기',
      contactNotice: '입력 정보 처리 안내는 문의폼에서 확인해 주세요.',
    },
    privacy: {
      path: '/privacy/',
      title: '개인정보 처리방침',
      metaTitle: '개인정보 처리방침 — 썬웍스 SunWorks',
      description:
        '썬웍스 회사 소개 사이트(www.sunworks.kr)에서 처리하는 정보를 안내합니다.',
      homeLabel: '썬웍스 홈',
      intro: [
        {
          t: '썬웍스 회사 소개 사이트(www.sunworks.kr)에서 처리하는 정보를 안내합니다. 어흥!한자 앱과 소개 사이트의 처리방침은 ',
        },
        { t: 'hanja.sunw.kr/privacy', href: 'https://hanja.sunw.kr/privacy' },
        { t: '에서 확인해 주세요.' },
      ],
      effective: '시행일 2026년 10월 16일',
      sections: [
        {
          title: '이 사이트에서 하지 않는 것',
          body: '회원가입·로그인·결제 기능이 없습니다. 쿠키와 브라우저 저장소를 쓰지 않고, 광고 SDK와 추적 쿠키도 없습니다. 딴생각 카드 넘기기와 PNG 저장은 브라우저 안에서만 동작하며 썬웍스로 전송하지 않습니다.',
        },
        {
          title: '방문 통계',
          body: '사이트를 어떻게 이용하는지 알고 개선하기 위해 PostHog Inc.의 방문 통계 서비스(PostHog Cloud EU)를 사용합니다. 쿠키와 브라우저 저장소를 쓰지 않으며, 이름·연락처·로그인 정보처럼 사람을 알아볼 수 있는 정보를 보내지 않습니다. 같은 사람이 다른 날 다시 방문해도 서로 연결하지 않습니다.',
          items: [
            {
              dt: '처리 항목',
              dd: '본 페이지 주소, 누른 버튼·링크와 그 글자, 들어온 경로(광고 캠페인 표시 포함), 브라우저·기기 종류, 화면 크기, 페이지 로딩 속도, 방문 시각, IP 주소',
            },
            {
              dt: 'IP 주소 처리',
              dd: 'PostHog 서버가 IP 주소와 브라우저 정보에 매일 바뀌는 값을 섞어 되돌릴 수 없는 값으로 바꾼 뒤, 그날의 방문자 수를 세는 데만 씁니다. 매일 바뀌는 값은 그날 처리가 끝나면 지워지고, IP 주소로 위치를 찾지 않습니다.',
            },
            {
              dt: '이전받는 자',
              dd: [
                { t: 'PostHog Inc. (' },
                {
                  t: 'privacy@posthog.com',
                  href: 'mailto:privacy@posthog.com',
                },
                { t: ')' },
              ],
            },
            {
              dt: '이전 국가·방법',
              dd: '독일(PostHog Cloud EU, 프랑크푸르트). 페이지를 열거나 누를 때 인터넷으로 전송합니다.',
            },
            { dt: '보유 기간', dd: '수집한 날부터 최대 1년' },
            {
              dt: '거부 방법',
              dd: '브라우저의 추적 차단 기능이나 광고 차단 확장을 쓰면 통계가 전송되지 않습니다. 이때도 사이트 이용에는 제한이 없습니다.',
            },
          ],
          note: [
            {
              t: 'PostHog 개인정보 처리방침',
              href: 'https://posthog.com/privacy',
              lang: 'en',
            },
          ],
        },
        {
          title: '호스팅 과정의 접속정보',
          body: [
            {
              t: '이 사이트의 파일은 Cloudflare, Inc.의 Cloudflare Pages에서 제공합니다. Cloudflare는 사이트를 전송하고 공격을 막기 위해 방문자의 IP 주소와 접속 시각, 요청한 주소 같은 요청 정보를 처리합니다. 썬웍스는 방문자별 IP 로그를 따로 수집하지 않습니다. 자세한 내용은 ',
            },
            {
              t: 'Cloudflare 개인정보 처리방침',
              href: 'https://www.cloudflare.com/privacypolicy/',
              lang: 'en',
            },
            { t: '에서 확인할 수 있습니다.' },
          ],
        },
        {
          title: '문의할 때',
          body: '의견·문의는 별도 보안 문의폼으로 받습니다. 문의폼은 Cloudflare Workers·Turnstile로 접수와 봇 확인을 처리하고, Resend와 Google Workspace로 support@sunworks.kr 메일함에 전달합니다. 입력한 정보의 처리 기준은 문의폼에서 안내합니다. 이메일을 직접 보내면 발신 주소와 이름, 본문이 전달됩니다.',
        },
        {
          title: '개인정보 보호책임자',
          body: '개인정보 처리에 관한 문의와 열람·정정·삭제 요청은 아래로 연락해 주세요.',
          items: [
            { dt: '성명', dd: '남선' },
            { dt: '직책', dd: '대표' },
            {
              dt: '이메일',
              dd: [{ t: company.email, href: `mailto:${company.email}` }],
            },
            {
              dt: '전화',
              dd: [{ t: '070-8717-8850', href: `tel:${company.tel}` }],
            },
          ],
        },
      ],
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
      colophon: ['SMALL IDEAS. REAL THINGS.', 'Seoul, Korea · Est. 2026'],
      motion: {
        play: 'Play film',
        pause: 'Pause',
        replay: 'Replay',
        description:
          'A silent, 16-second loop: a sun slips through folded paper and oversized type, then returns to the beginning.',
        failed: 'The film couldn’t load. Please try playing it again.',
      },
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
      storesLabel: 'Download the app',
      appStoreAlt: 'Download on the App Store',
      playStoreAlt: 'Get it on Google Play',
      status: 'Launched November 6, 2026 · Web beta now open',
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
      privacy: 'Privacy policy',
    },
    company: {
      title: 'Company information',
      nameLabel: 'Company',
      name: 'Sunworks',
      nameOther: '썬웍스',
      nameOtherLang: 'ko',
      ceoLabel: 'Representative',
      ceo: 'SUN NAM',
      foundedLabel: 'Founded',
      founded: 'June 12, 2026',
      bizNoLabel: 'Business registration no.',
      verify: 'Verify on Korea’s Hometax',
      addressLabel: 'Address',
      mailOrderLabel: 'Mail-order business report no.',
      ftcVerify: 'Verify on Korea’s FTC',
      address: [
        'Unit 501-3-10,',
        '199 Wiryegwangjang-ro,',
        'Songpa-gu, Seoul,',
        'Republic of Korea',
      ],
      phoneLabel: 'Phone',
      phone: '+82 70-8717-8850',
      emailLabel: 'Email',
      contactLabel: 'Contact',
      contactCta: 'Send feedback (Korean form)',
      contactNotice: 'Review how your information is handled on the form.',
    },
    privacy: {
      path: '/en/privacy/',
      title: 'Privacy policy',
      metaTitle: 'Privacy policy — SunWorks',
      description:
        'This page explains what information the SunWorks company site (www.sunworks.kr) handles.',
      homeLabel: 'SunWorks home',
      intro: [
        {
          t: 'This page explains what information the SunWorks company site (www.sunworks.kr) handles. For the ',
        },
        { t: '어흥!한자', lang: 'ko' },
        { t: ' app and its site, see ' },
        { t: 'hanja.sunw.kr/privacy', href: 'https://hanja.sunw.kr/privacy' },
        { t: '.' },
      ],
      effective: 'Effective October 16, 2026',
      sections: [
        {
          title: 'What this site doesn’t do',
          body: 'No accounts, sign-in, or payments. The site uses no cookies or browser storage, and has no ad SDKs or tracking cookies. Card swiping and PNG export run entirely in your browser and nothing is sent to us.',
        },
        {
          title: 'Visit statistics',
          body: 'To understand how the site is used and improve it, we use PostHog Cloud EU, a visit statistics service from PostHog Inc. It sets no cookies, uses no browser storage, and receives nothing that identifies you, such as your name, contact details, or account. Visits on different days are never linked together.',
          items: [
            {
              dt: 'Data processed',
              dd: 'page address, buttons and links you click and their text, how you arrived (including ad campaign tags), browser and device type, screen size, page load speed, time of visit, IP address',
            },
            {
              dt: 'IP address handling',
              dd: 'PostHog’s servers mix your IP address and browser details with a value that changes every day, turn the result into a one-way hash, and use it only to count that day’s visitors. The daily value is deleted once that day’s events are processed, and your IP address is not used to look up your location.',
            },
            {
              dt: 'Recipient',
              dd: [
                { t: 'PostHog Inc. (' },
                {
                  t: 'privacy@posthog.com',
                  href: 'mailto:privacy@posthog.com',
                },
                { t: ')' },
              ],
            },
            {
              dt: 'Location and method',
              dd: 'Germany (PostHog Cloud EU, Frankfurt), sent over the internet when you open or click a page',
            },
            { dt: 'Retention', dd: 'up to 1 year from collection' },
            {
              dt: 'How to opt out',
              dd: 'a browser’s tracking protection or an ad-blocking extension stops these statistics from being sent. The site works the same either way.',
            },
          ],
          note: [
            {
              t: 'PostHog privacy policy',
              href: 'https://posthog.com/privacy',
            },
          ],
        },
        {
          title: 'Hosting',
          body: [
            {
              t: 'The site is served by Cloudflare Pages from Cloudflare, Inc. To deliver pages and block attacks, Cloudflare processes request details such as your IP address, the time, and the address requested. We do not keep per-visitor IP logs. See ',
            },
            {
              t: 'Cloudflare’s privacy policy',
              href: 'https://www.cloudflare.com/privacypolicy/',
            },
            { t: ' for details.' },
          ],
        },
        {
          title: 'Contacting us',
          body: 'Feedback and questions go through a separate secure form. The form uses Cloudflare Workers and Turnstile to receive messages and check for bots, then Resend and Google Workspace deliver them to support@sunworks.kr. The form explains how your input is handled. If you email us directly, your address, name, and message reach us.',
        },
        {
          title: 'Privacy officer',
          body: 'For questions about your information, or to see, correct, or delete it, contact:',
          items: [
            { dt: 'Name', dd: 'SUN NAM' },
            { dt: 'Role', dd: 'Representative' },
            {
              dt: 'Email',
              dd: [{ t: company.email, href: `mailto:${company.email}` }],
            },
            {
              dt: 'Phone',
              dd: [{ t: '+82 70-8717-8850', href: `tel:${company.tel}` }],
            },
          ],
        },
      ],
    },
  },
} as const;

export type Copy = (typeof copy)[Lang];
