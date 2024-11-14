'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import SearchBar from './SearchBar';
import { SearchModalProvider } from './_provider/SearchModalProvider';
import SearchHistoryList from './SearchHistoryList';
import useModalClose from '../(afterLogin)/workspace/business/useModalClose';

export default function SearchModal() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const { isVisible, modalRef, btnRef, setIsVisible } = useModalClose();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = (e) => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };
  if (pathname !== '/find') return null;
  return (
    <SearchModalProvider>
      <article
        onMouseDown={handleClose}
        ref={btnRef}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          ref={modalRef}
          className={`fixed  z-10 left-0 transition-transform duration-300 flex flex-col justify-center items-center ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          } bg-white w-full p-6 shadow-lg h-[45%]`}
          style={{ top: 0 }}
        >
          <div className="responsive_text">
            <SearchBar />
            <div className="flex flex-row pt-[15px] gap-[30px] text-[18px] overflow-x-auto whitespace-nowrap">
              <SearchHistoryList />
            </div>
          </div>
        </div>
      </article>
    </SearchModalProvider>
  );
}
