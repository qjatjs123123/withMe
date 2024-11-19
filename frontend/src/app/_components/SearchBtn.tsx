'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SearchBtn() {
  const pathname = usePathname();

  // 현재 경로가 "/find"일 경우 버튼을 렌더링하지 않음
  if (pathname === '/find') return null;

  return (
    <Link href="/find">
      <svg
        className="cursor-pointer"
        fill="#000000"
        width="22px"
        height="22px"
        viewBox="-0.04 0 31.793 31.793"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-609.503 -130.759)">
          <path d="M622.914,132.759a11.41,11.41,0,1,1-11.411,11.41,11.424,11.424,0,0,1,11.411-11.41m0-2a13.41,13.41,0,1,0,13.41,13.41,13.41,13.41,0,0,0-13.41-13.41Z" />
          <path d="M640.208,162.552a1,1,0,0,1-.707-.292L631.64,154.4a1,1,0,1,1,1.414-1.414l7.861,7.86a1,1,0,0,1-.707,1.707Z" />
        </g>
      </svg>
    </Link>
  );
}
