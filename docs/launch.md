# 출시 상태

## 목표

- 저장소: `sunworks-dev/sunworks-website`, public
- 호스트: GitHub Pages
- 대표 도메인: `www.sunworks.kr`

## DNS

2026-10-02 조회 기준 등록대행자는 아이티이지, 네임서버는 `ns1.ksdom.kr`, `ns2.ksdom.kr`입니다. 연결 전 루트와 www는 `222.234.220.139`를 가리켰습니다.

GitHub Pages에 커스텀 도메인을 설정하고 첫 배포를 마친 후 아래 레코드를 적용했습니다. 네임서버 레코드는 유지했습니다. 변경 전 메일·검증 레코드는 없었습니다.

| 이름 | 유형  | 목표                   |
| ---- | ----- | ---------------------- |
| www  | CNAME | sunworks-dev.github.io |
| @    | A     | 185.199.108.153        |
| @    | A     | 185.199.109.153        |
| @    | A     | 185.199.110.153        |
| @    | A     | 185.199.111.153        |

웹 레코드의 TTL은 600초입니다. 루트 도메인은 GitHub Pages에서 www로 이동합니다. 인증서 발급 후 HTTPS 강제를 활성화합니다.

공식 DNS 기준: [GitHub Pages 커스텀 도메인 관리](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 실행 기록

- 2026-10-02: 회사 사이트 구현, 어흥!한자 베타 링크와 실제 제품 자산 반영.
- 로컬 형식·타입 검사·프로덕션 빌드 통과. Phi 에이전트 Space에서 데스크톱·모바일 표시, 심벌 슬라이더, 콘솔·네트워크 확인.
- 독립 디자인 검수의 제품 제목 위 상태 문구 위치 지적 수정 후 재검수 통과.
- 최초 `main` 배포 성공. 저장소의 조직 이전 확인 후 로컬 원격 주소를 조직 주소로 갱신.
- www CNAME 및 루트 A 레코드 4개를 적용하고 권한 네임서버 응답으로 확인. www HTTP 200 확인.
- HTTPS 인증서 발급 대기. HTTPS 강제는 아직 활성화하지 않음.
- 인증서 발급 요청을 재시작했으나 GitHub가 아직 `The certificate does not exist yet`를 반환함. GitHub Actions 기본 토큰은 HTTPS 설정 변경 시 403을 반환하여 해당 워크플로를 제거함. 관리자 `gh` 로그인으로 실행하는 `npm run launch:https`가 최대 40회, 1분 간격으로 활성화를 재시도하고 TLS 및 HTTP 리디렉션을 검증함. 정기 실행이나 별도 토큰 저장은 없음.
- 자동 TypeScript 7 업데이트는 현재 `@astrojs/check`의 지원 범위와 충돌하여 PR을 닫고, TypeScript 메이저 자동 업데이트 제안을 보류함.
