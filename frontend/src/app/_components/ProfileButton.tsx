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
      <button className="flex flex-row items-center focus:outline-none" onClick={onClick}>
        <div>{children}</div>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'white' }}
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </button>
      {showMenu && (
        <div
          className="flex flex-col justify-center  absolute top-[72px] right-[10px] font-gray w-[165px] bg-white rounded-lg cursor-pointer "
          onClick={handleWorkspaceClick}
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex justify-start items-center hover:bg-gray-100 p-2 font-bold">
            <Image src="/document.svg" alt="Document icon" width={24} height={24} className="mr-2" /> 나의 작업공간
          </div>
          <div
            className="flex justify-start items-center cursor-pointer hover:bg-gray-100 p-2 font-bold"
            onClick={handleLogoutClick}
          >
            <Image src="/logout.svg" alt="Logout icon" width={24} height={24} className="mr-2" /> 로그아웃
          </div>
        </div>
      )}
    </>
  );
}
