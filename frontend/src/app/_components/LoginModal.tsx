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
        <div className="flex flex-col  w-full p-[35px] relative">
          <div className="absolute top-4 right-4">
            <CloseBtn handleClose={handleClose} />
          </div>
          <div className="font-bold text-[40px] flex justify-start w-full border-b-2 border-black pb-[30px]">
            <h1>로그인 하기</h1>
          </div>
          <div className="pt-[30px] flex justify-start w-full">
            <span>깃허브 로그인</span>
          </div>
          <button
            className="border border-gray pl-[10px]  flex gap-5 p-3 mt-[30px]items-center"
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
            Github
          </button>
          <div className="pt-[30px] flex justify-start w-full">
            <span>SSAFY 깃 로그인</span>
          </div>
          <button
            className=" border border-gray pl-[10px] flex gap-5 p-3  items-center"
            onClick={() => sendLoginAPI(API_URL.LOGIN_LAB)}
          >
            <Image
              className="workspace-image cursor-pointer"
              src="/gitlabLogo.png"
              alt="loginLogo of the image"
              width={25}
              height={25}
              sizes="100%"
            />
            SSAFY GitLab
          </button>

          <div className=" bg-[#F6F6F6] items-center justify-center mt-[30px]">
            <span className="block pt-[15px] pb-[15px]">Git 계정으로 간편하게 로그인해 보세요</span>
          </div>
        </div>
      </div>
    </div>
  );
}
