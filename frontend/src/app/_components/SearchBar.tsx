'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SearchBtn from './SearchBtn';
import { useSearchModalState } from './_provider/SearchModalProvider';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const storedKeywordsRef = useRef<string[]>([]); // useRef로 저장된 키워드 관리
  const { selectedKeyword } = useSearchModalState();

  // 초기 로드 시 localStorage에서 키워드 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('keyword_history');
    if (stored) {
      storedKeywordsRef.current = JSON.parse(stored); // ref의 current에 키워드 배열 저장
    }
  }, []);

  useEffect(() => {
    setKeyword(selectedKeyword);
  }, [selectedKeyword]);

  const addKeyword = (keyword: string) => {
    const updatedKeyWords = [keyword, ...storedKeywordsRef.current];
    const limitedKeyWords = updatedKeyWords.slice(0, 5); // 최대 5개로 제한
    storedKeywordsRef.current = limitedKeyWords; // ref 업데이트
    localStorage.setItem('keyword_history', JSON.stringify(limitedKeyWords)); // localStorage에 저장
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      addKeyword(keyword.trim()); // 키워드 추가
      router.push(`/search/${encodeURIComponent(keyword)}`); // 검색 페이지로 이동
      setKeyword(''); // 입력란 초기화
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottom: '2px solid black',
        paddingBottom: '10px',
        gap: '8px',
        justifyContent: 'space-between',
      }}
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flexGrow: 1,
          backgroundColor: 'transparent',
          border: 'none',
          color: '#1F2937',
          outline: 'none',
        }}
        placeholder="Input Keyword"
      />
      <SearchBtn />
    </div>
  );
}
