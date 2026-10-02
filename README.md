# sunworks

AI 바이브 코딩으로 자체 앱과 웹서비스를 만드는 sunworks의 회사 소개 사이트.

- 사이트: https://www.sunworks.kr
- 소스: https://github.com/sunworks-dev/sunworks-website
- 기반: Astro, TypeScript, CSS
- 배포: GitHub Pages, GitHub Actions

## 개발

Node.js 24 LTS 권장. `.nvmrc`를 제공합니다.

```sh
npm ci
npm run dev
```

개발 서버는 http://localhost:4321 에서 실행됩니다.

```sh
npm run verify  # 형식, 타입, 프로덕션 빌드
npm run preview
```

## 배포

`main`에 푸시하면 검사 통과 후 `dist/`를 GitHub Pages로 배포합니다. PR에서는 검사만 실행합니다.
커스텀 도메인은 `astro.config.mjs`, `public/CNAME`, GitHub Pages 설정에서 관리합니다.

## 프로젝트 문서

- [제품과 콘텐츠 기준](docs/PRODUCT.md)
- [디자인 시스템](docs/DESIGN.md)
- [백엔드 확장](docs/architecture.md)
- [배포와 도메인](docs/launch.md)

## 공개 범위

공개 저장소이며 npm 패키지로 배포하지 않습니다. 오픈소스 재사용 라이선스는 아직 지정하지 않았습니다.
비밀키, 환경 변수의 실제 값, 개인정보를 커밋하지 마세요. 외부 폰트 라이선스는 해당 자산과 함께 보관합니다.
