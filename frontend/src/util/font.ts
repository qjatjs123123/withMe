import localFont from 'next/font/local';

// 삼성 폰트 로컬 로드
export const SamsungSharpSansBold = localFont({
  src: '/fonts/samsungsharpsans-bold.otf', // /public/fonts/로 시작하는 절대 경로
  weight: '700',
  style: 'normal',
  display: 'swap', // 폰트 로딩 최적화
});

export const SamsungSharpSansRegular = localFont({
  src: '../public/fonts/SamsungSharpSansRegular.woff', // /public/fonts/로 시작하는 절대 경로
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const SamsungOneKorean700 = localFont({
  src: '../public/fonts/SamsungOneKorean-700.ttf', // /public/fonts/로 시작하는 절대 경로
  weight: '700',
  style: 'normal',
  display: 'swap',
});

export const SamsungOneKorean400 = localFont({
  src: '../public/fonts/SamsungOneKorean-400.ttf', // /public/fonts/로 시작하는 절대 경로
  weight: '400',
  style: 'normal',
  display: 'swap',
});
