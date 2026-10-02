# 출시 상태

## 목표

- 저장소: `bryannamd/sunworks-website`, public
- 호스트: GitHub Pages
- 대표 도메인: `www.sunworks.kr`

## DNS

2026-10-02 조회 기준 등록대행자는 아이티이지, 네임서버는 `ns1.ksdom.kr`, `ns2.ksdom.kr`입니다. 연결 전 루트와 www는 `222.234.220.139`를 가리켰습니다.

GitHub Pages의 커스텀 도메인 설정과 첫 배포를 준비한 후 웹 DNS 레코드를 변경합니다. 기존 메일·검증 레코드는 보존합니다.

| 이름 | 유형  | 목표                |
| ---- | ----- | ------------------- |
| www  | CNAME | bryannamd.github.io |
| @    | A     | 185.199.108.153     |
| @    | A     | 185.199.109.153     |
| @    | A     | 185.199.110.153     |
| @    | A     | 185.199.111.153     |

루트 도메인은 GitHub Pages에서 www로 이동하도록 설정합니다. 인증서 발급 후 HTTPS 강제를 활성화합니다. DNS 전파와 TLS 응답을 실제로 확인해야 연결 완료로 판정합니다.

## 실행 기록

- 구현 및 GitHub 생성 진행 중.
- 아이티이지 로그인 필요. Phi 에이전트 Space `sunworks-launch`에서 사용자 로그인 인계.
