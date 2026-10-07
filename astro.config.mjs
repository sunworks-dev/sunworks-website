import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.sunworks.kr',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  // 작은 한글 글꼴 조각이 CSS에 base64로 들어가 첫 화면을 막지 않게 한다.
  vite: { build: { assetsInlineLimit: 0 } },
});
