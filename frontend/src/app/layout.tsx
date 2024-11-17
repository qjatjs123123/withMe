import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

// 삼성 폰트 로컬 로드
export const SamsungSharpSansBold = localFont({
  src: '../fonts/samsungsharpsans-bold.otf', // /public/fonts/로 시작하는 절대 경로
  weight: '700',
  display: 'swap', // 폰트 로딩 최적화
  variable: '--SamsungSharpSansBold',
});

export const SamsungSharpSansRegular = localFont({
  src: '../fonts/SamsungSharpSansRegular.woff', // /public/fonts/로 시작하는 절대 경로
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--SamsungSharpSansRegular',
});

export const SamsungOneKorean700 = localFont({
  src: '../fonts/SamsungOneKorean-700.ttf', // /public/fonts/로 시작하는 절대 경로
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--SamsungOneKorean700',
});

export const SamsungOneKorean400 = localFont({
  src: '../fonts/SamsungOneKorean-400.ttf', // /public/fonts/로 시작하는 절대 경로
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--SamsungOneKorean400',
});

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
        <meta name="google-site-verification" content="YwzE4AZx17ew5LwyrxNYc-PSgxOtp6BxJ6ox7yBLKu8" />
      </head>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
