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
      </button>
      {isVisible && (
        <div
          ref={btnRef}
          className="flex flex-col justify-center  absolute top-[75px] right-[50px] font-gray w-[175px] bg-white rounded-lg cursor-pointer "
          onClick={handleWorkspaceClick}
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex justify-start items-center hover:bg-gray-100 p-2 font-bold">
            <Image src="/document.svg" alt="Document icon" width={24} height={24} className="mr-2" /> My Workspace
          </div>
          <div
            className="flex justify-start items-center cursor-pointer hover:bg-gray-100 p-2 font-bold"
            onClick={handleLogoutClick}
          >
            <Image src="/logout.svg" alt="Logout icon" width={24} height={24} className="mr-2" /> Logout
          </div>
        </div>
      )}
    </>
  );
}
