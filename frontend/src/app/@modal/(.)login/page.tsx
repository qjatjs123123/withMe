'use client';

import Image from 'next/image';
import CloseBtn from '@/app/_components/CloseBtn';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { API_URL } from '@/util/constants';

export default function LoginModal() {
  const router = useRouter();
  const { sendLoginAPI } = useAuth();

  const handleClose = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen  p-[10px] ">
      <div className="container-login">
        <div className="bg-[#04092F] p-[20px] flex items-center justify-center">
          <Image
            className=" "
            src="/loginLogo.png"
            alt="loginLogo of the image"
            layout="fixed"
            width={200} // 기본 폭
            height={300} // 기본 높이
            sizes="100%"
            style={{ objectFit: 'contain' }}
            priority
          />
          {/* <img
            className="workspace-image"
            src="/loginLogo.png"
            alt="loginLogo of the image"
            width={200} // 기본 폭
            height={300} // 기본 높이
            style={{ objectFit: 'contain' }} // 이미지의 비율을 유지하면서 영역에 맞게 표시
          /> */}
        </div>
        <div className="flex flex-col justify-center items-center w-full p-[35px] relative">
          <div className="absolute top-4 right-4">
            <CloseBtn handleClose={handleClose} />
          </div>
          <h1 className="font-bold text-[40px]">로그인</h1>
          <button
            className="rounded-3xl border border-black px-4 py-1 flex gap-5 mt-[30px]"
            onClick={() => sendLoginAPI(API_URL.LOGIN)}
          >
            <Image
              className="workspace-image cursor-pointer"
              src="/githubLogo.png"
              alt="loginLogo of the image"
              width={25}
              height={25}
              sizes="100%"
            />
            Login with Github
          </button>
          <button
            className="rounded-3xl border border-black px-4 py-1 flex gap-5 mt-[20px]"
            onClick={() => sendLoginAPI(API_URL.LOGIN_LAB)}
          >
            <Image
              className="workspace-image cursor-pointer"
              src="/ssafy_logo.png"
              alt="loginLogo of the image"
              width={25}
              height={25}
              sizes="100%"
            />
            Login with SSAFY
          </button>
        </div>
      </div>
    </div>
  );
}
