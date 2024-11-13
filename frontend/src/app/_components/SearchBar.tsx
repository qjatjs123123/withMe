'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBtn from './SearchBtn';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      router.push(`/search/${encodeURIComponent(keyword)}`);
      setKeyword('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid #D1D5DB',
        borderRadius: '30px',
        padding: '8px 16px',
        gap: '8px',
      }}
    >
      <SearchBtn />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%', // w-full
          backgroundColor: 'transparent',
          border: 'none',
          color: '#1F2937', // text-gray-800
          outline: 'none',
        }}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}
