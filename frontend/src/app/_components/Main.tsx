import Image from 'next/image';

export default function Main() {
  return (
    <div className="flex items-center w-full  responsive_container pt-[30px] flex-col">
      <div className=" w-full items-center  h-full">
        <div
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full justify-start"
        >
          <span>Create Together.</span>
          <span style={{ fontFamily: 'SamsungOneKorean-400', fontSize: 'clamp(24px, 4vw, 32px)' }}>
            협업을 통해 가치를 더하다
          </span>
        </div>
        <div></div>
        <div className="flex-1 mt-[30px] flex justify-center">
          <Image
            className="image"
            src="/MainImg1.png"
            alt="Main logo of the image"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: '80%', height: 'auto' }}
          />
        </div>
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full text-start"
        >
          <span>Collaborate with AI.</span>
          <span style={{ fontFamily: 'SamsungOneKorean-400', fontSize: 'clamp(24px, 4vw, 32px)' }}>
            체계적인 작성을 위한 인사이트를 제공하다
          </span>
        </div>
      </div>
      <div className="flex-1 mt-[30px] flex justify-center w-full">
        <Image
          className="image"
          src="/MainImage2.jpeg"
          alt="Main logo of the image"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: '100%', height: '60%' }}
        />
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full text-start"
        >
          <span>And Share Yours.</span>
          <span style={{ fontFamily: 'SamsungOneKorean-400', fontSize: 'clamp(24px, 4vw, 32px)' }}>
            아이디어를 공유하여 더 나은 결과를 만들다
          </span>
        </div>
      </div>
      <div className="flex-1 mt-[30px] flex justify-center w-full">
        <Image
          className="image"
          src="/MainLogo2.jpg"
          alt="Main logo of the image"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: '100%', height: '60%' }}
        />
      </div>
      <div className="h-[40px] flex flex-row text-[24px] mt-[200px] w-full text-start items-center gap-[20px]">
        WITHME
        <span style={{ fontFamily: 'SamsungOneKorean-400', fontSize: '16px' }}>© SSAFY All Rights Reserved</span>
      </div>
    </div>
  );
}
