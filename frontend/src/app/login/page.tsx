'use client';

import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    // window 객체를 사용하여 페이지 리디렉션
    window.location.href = '/';
  }, []);

  return <></>; // 컴포넌트는 아무것도 렌더링하지 않음
}
