'use client';
import { useEffect, useState } from 'react';
import { useSearchModalState } from './_provider/SearchModalProvider';
import Link from 'next/link';

export default function SearchHistoryList() {
  const [keyWord, setKeyword] = useState([]);
  const { setselectedKeyword } = useSearchModalState();

  useEffect(() => {
    const storedKeywords = localStorage.getItem('keyword_history');
    if (storedKeywords) {
      setKeyword(JSON.parse(storedKeywords));
    }
  }, []);

  return (
    <>
      {keyWord.length === 0 ? (
        <div>No search history</div>
      ) : (
        <>
          {keyWord.map((item, index) => (
            <div key={index} className="keyword-item cursor-pointer">
              <Link href={`/search/${item}`}>{item}</Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}
