'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProfileButtonProps {
  children: React.ReactNode;
}

export default function ProfileButton({ children }: ProfileButtonProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const onClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleWorkspaceClick = () => {
    router.push('/workspace');
    setShowMenu(false);
  };

  const handleLogoutClick = () => {
    document.cookie = 'userData=; Max-Age=0; path=/';
    window.location.href = '/';
  };

  return (
    <>
      <button className="flex flex-col items-end focus:outline-none" onClick={onClick}>
        <div>{children}</div>
      </button>
      {showMenu && (
        <div
          className="flex flex-col justify-center absolute top-[72px] right-[10px] text-gray w-48 h-20 bg-white rounded-lg cursor-pointer"
          onClick={handleWorkspaceClick}
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex justify-center items-center">
            <Image src="/document.svg" alt="Document icon" width={24} height={24} className="mr-2" /> 나의 작업공간
          </div>
          <div className="border-t-2 border-gray-200 my-2"></div>
          <div className="flex justify-center items-center cursor-pointer" onClick={handleLogoutClick}>
            <Image src="/logout.svg" alt="Logout icon" width={24} height={24} className="mr-2" /> 로그아웃
          </div>
        </div>
      )}
    </>
  );
}
