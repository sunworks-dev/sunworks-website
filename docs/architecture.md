# 구조와 백엔드 확장

현재 사이트는 Astro로 빌드한 HTML·CSS·JavaScript를 GitHub Pages에서 제공합니다. 소개 콘텐츠는 빌드 시 생성하며 브라우저 상호작용은 필요한 영역에만 추가합니다.

## 별도 API

메일링, 게시판, 소셜 로그인은 필요할 때 별도 API와 DB로 추가할 수 있습니다. 현재 이러한 기능이나 API 서버가 배포된 것은 아닙니다.

| 기능        | 화면                    | 서버 역할                               |
| ----------- | ----------------------- | --------------------------------------- |
| 메일링      | 구독·해지 폼            | 동의 기록, 구독 관리, 발송 제공자 연동  |
| 게시판      | 글 목록·작성·댓글       | DB 저장, 입력 검증, 접근 권한 확인      |
| 소셜 로그인 | 로그인·로그아웃·계정 UI | OAuth 콜백, 토큰 검증, 세션·사용자 관리 |

배포 대상이 정해지면 `api.sunworks.kr`을 API 호스트에 연결할 수 있습니다. 브라우저의 공개 API 주소와 서버 비밀키를 구분합니다. CORS는 실제 사이트 출처로 제한하고, 인증·권한 확인은 서버에서 시행합니다. 인증에는 검증된 제공자를 사용하며, 쿠키 기반 세션을 사용한다면 Secure/HttpOnly, SameSite 및 CSRF 방어를 함께 설계합니다.

복잡한 게시판이나 계정 UI에는 React 컴포넌트를 필요한 페이지에만 추가할 수 있습니다. 서버에서 사용자별 HTML을 생성해야 하면 Astro 어댑터와 서버 호스팅으로 옮깁니다. GitHub Pages 자체에서는 서버 API나 SSR을 실행할 수 없습니다.

참고: [Astro 서버 렌더링](https://docs.astro.build/en/guides/on-demand-rendering/), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
