import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

// 삼성 폰트 로컬 로드
// export const SamsungSharpSansBold = localFont({
//   src: '../fonts/subset-SamsungSharpSans-Bold.woff2',
//   weight: '700',
//   display: 'fallback', // 폰트 로딩 최적화
//   variable: '--SamsungSharpSansBold',
//   preload: true
// });

// export const SamsungSharpSansRegular = localFont({
//   src: '../fonts/SamsungSharpSansRegular.woff', // /public/fonts/로 시작하는 절대 경로
//   weight: '400',
//   style: 'normal',
//   display: 'swap',
//   variable: '--SamsungSharpSansRegular',
// });


// export const SamsungOneKorean400 = localFont({
//   src: '../fonts/subset-SamsungOneKorean-400.woff2', // /public/fonts/로 시작하는 절대 경로
//   weight: '400',
//   style: 'normal',
//   display: 'fallback',
//   variable: '--SamsungOneKorean400',
//   preload: false
// });

export const metadata: Metadata = {
  title: 'WithMe',
  description: 'ReadMe WithMe',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5499620003783411"
     crossOrigin="anonymous"></script>
        <meta name="google-site-verification" content="YwzE4AZx17ew5LwyrxNYc-PSgxOtp6BxJ6ox7yBLKu8" />
        <meta name="google-adsense-account" content="ca-pub-5499620003783411"></meta>
        <link rel="preload" href="/fonts/subset-SamsungSharpSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/subset-SamsungOneKorean-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/subset-SamsungOneKorean-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      </head>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
