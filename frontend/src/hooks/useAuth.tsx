'use client';

import { useRouter } from 'next/navigation';
import { API_URL } from '@/util/constants';

const useAuth = () => {
  const router = useRouter();
  const sendLoginAPI = async () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.LOGIN}`);
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
