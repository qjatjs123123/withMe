'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <svg
        className="cursor-pointer"
        width="20"
        height="15"
        viewBox="0 0 85 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.6525 10.1865C30.5196 10.1865 23.6789 12.8695 18.6351 17.6454C13.5914 22.4213 10.7579 28.8988 10.7579 35.6529C10.7579 42.407 13.5914 48.8844 18.6351 53.6603C23.6789 58.4362 30.5196 61.1192 37.6525 61.1192C44.7855 61.1192 51.6262 58.4362 56.67 53.6603C61.7137 48.8844 64.5472 42.407 64.5472 35.6529C64.5472 28.8988 61.7137 22.4213 56.67 17.6454C51.6262 12.8695 44.7855 10.1865 37.6525 10.1865ZM1.18649e-06 35.6529C1.13485e-05 30.0057 1.41668 24.4394 4.13334 19.4122C6.85001 14.385 10.789 10.0408 15.6258 6.7372C20.4627 3.43364 26.0592 1.26527 31.9543 0.41065C37.8495 -0.443971 43.8747 0.0396036 49.5338 1.82155C55.193 3.6035 60.3241 6.63285 64.5048 10.6601C68.6855 14.6874 71.796 19.5975 73.5804 24.9859C75.3647 30.3743 75.7717 36.0871 74.768 41.6536C73.7642 47.2202 71.3783 52.4813 67.8069 57.0039L84.4869 72.793L76.8811 80L60.2064 64.2109C54.6097 68.1751 47.9582 70.5861 40.9965 71.1739C34.0347 71.7616 27.0377 70.5029 20.7886 67.5388C14.5395 64.5746 9.28501 60.0219 5.61347 54.3905C1.94194 48.759 -0.00175313 42.271 1.18649e-06 35.6529Z"
          fill="black"
        />
      </svg>
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
