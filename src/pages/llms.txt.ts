import type { APIRoute } from 'astro';
import {
  appStoreUrl,
  appUrl,
  company,
  copy,
  playStoreUrl,
  productUrl,
} from '../i18n';

// AI 검색이 읽는 사이트 안내서(/llms.txt). 사실은 화면과 같은 i18n 값에서 가져와 어긋나지 않게 한다.
export const GET: APIRoute = ({ site }) => {
  const { ko, en } = copy;
  const url = (path: string) => new URL(path, site).href;
  const body = `# SunWorks (썬웍스)

> 썬웍스는 앱과 웹서비스를 직접 만들어 내놓는 회사입니다. 외주 개발은 하지 않습니다. 첫 제품은 한자 공부 앱 ${ko.work.name}입니다.

SunWorks builds and launches its own apps and websites. It does not do client work. Its first product is ${en.work.name} (read “${en.work.nameReading}”; not an official English name), a Hanja study app.

## 페이지 / Pages

- [썬웍스 (한국어)](${url(ko.path)}): 회사 소개, 첫 제품, 회사 정보
- [SunWorks (English)](${url(en.path)}): Company introduction and information
- [${ko.privacy.title}](${url(ko.privacy.path)})
- [${en.privacy.title}](${url(en.privacy.path)})

## 제품 / Products

- [${ko.work.name}](${productUrl}): ${ko.work.status}. ${ko.work.features.join(', ')}.
- [${ko.work.name} App Store](${appStoreUrl}): iOS 앱 다운로드 / Download for iOS.
- [${ko.work.name} Google Play](${playStoreUrl}): Android 앱 다운로드 / Download for Android.
- [${ko.work.name} 웹 베타](${appUrl}): 웹 브라우저에서 바로 쓰는 베타. 화면은 한국어만 지원합니다.

## 회사 정보 / Company

- 상호: ${ko.company.name} (${en.company.name}), 브랜드 표기 SunWorks
- 대표: ${ko.company.ceo} (${en.company.ceo})
- 설립일: ${company.founded}
- 사업자등록번호: ${company.bizNo}
- 통신판매업 신고번호: ${company.mailOrderNo}
- 주소: ${ko.company.address.join(' ')}
- Address: ${en.company.address.join(' ')}
- 전화: ${ko.company.phone}
- 이메일: ${company.email}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
