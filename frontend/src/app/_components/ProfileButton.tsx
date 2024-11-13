'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useModalClose from '../(afterLogin)/workspace/business/useModalClose';

interface ProfileButtonProps {
  children: React.ReactNode;
}

export default function ProfileButton({ children }: ProfileButtonProps) {
  const router = useRouter();

  const { isVisible, modalRef, btnRef, setIsVisible } = useModalClose();

  const onClick = () => {
    setIsVisible(!isVisible);
  };

  const handleWorkspaceClick = () => {
    router.push('/workspace');
    setIsVisible(false);
  };

  const handleLogoutClick = () => {
    document.cookie = 'userData=; Max-Age=0; path=/';
    window.location.href = '/';
  };

  return (
    <>
      <button ref={modalRef} className="flex flex-row items-center focus:outline-none" onClick={onClick}>
        <div>{children}</div>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'black' }}
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </button>
      {isVisible && (
        <div
          ref={btnRef}
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
