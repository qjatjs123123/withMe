'use client'; // 이 컴포넌트는 클라이언트 사이드에서만 실행되도록 설정

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavList({ fontClassName }) {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'border-b-2 border-black' : 'cursor-pointer-nav';
  };

  return (
    <div className={` ${fontClassName} flex flex-row text-[20px] items-center gap-[50px] hidden-header hidden`}>
      <Link href={'/explore'}>
        <div className={getLinkClassName('/explore')}>EXPLORE</div>
      </Link>

      <Link href={'/aboutus'}>
        <div className={getLinkClassName('/aboutus')}>ABOUT US</div>
      </Link>
    </div>
  );
}
