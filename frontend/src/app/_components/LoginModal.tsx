'use client';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen p-[10px]">
      <div className="container-login">
        <div className="flex flex-col w-full p-[35px] relative">
          <div className="absolute top-4 right-4">
            <CloseBtn handleClose={handleClose} />
          </div>
          <div style={{ fontFamily:'SamsungOneKorean700' }} className="font-bold text-[40px] flex justify-start w-full border-b-2 border-black pb-[30px]">
            <h1>로그인 하기</h1>
          </div>

          {/* 깃허브 로그인 */}
          <div className="pt-[30px] flex justify-start w-full">
            <span style={{ fontFamily:'SamsungOneKorean700' }}>깃허브 로그인</span>
          </div>
          <button
          style={{ fontFamily:'SamsungOneKorean400' }}
            className="border border-gray pl-[10px] flex gap-5 p-3 mt-[10px] items-center"
            onClick={() => sendLoginAPI(API_URL.LOGIN)}
          >
            <div className="bg-githubLogo"></div>
            Github
          </button>

          {/* SSAFY GitLab 로그인 */}
          <div className="pt-[30px] flex justify-start w-full">
            <span style={{ fontFamily:'SamsungOneKorean700' }}>SSAFY 깃 로그인</span>
          </div>
          <button
          style={{ fontFamily:'SamsungOneKorean400' }}
            className="border border-gray pl-[12px] flex gap-5 mt-[10px] p-3 items-center"
            onClick={() => sendLoginAPI(API_URL.LOGIN_LAB)}
          >
            <div className="bg-ssafy_logo"></div>
            <div className="-ml-[5px]">SSAFY GitLab</div>
          </button>

          {/* 안내 메시지 */}
          <div className="bg-[#F6F6F6] items-center justify-center mt-[30px]">
            <span style={{ fontFamily:'SamsungOneKorean400' }} className="block pt-[15px] pb-[15px]">
              Git 계정으로 간편하게 로그인해 보세요
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
