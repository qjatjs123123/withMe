'use client';

import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const sendLoginAPI = async (urlParam: string) => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}${urlParam}`);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 작성
  };

  return {
    sendLoginAPI,
    handleLogout,
  };
};

export default useAuth;
