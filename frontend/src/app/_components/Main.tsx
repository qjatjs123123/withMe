import Image from 'next/image';
import { SamsungOneKorean400 } from '../layout';
import { SamsungSharpSansBold } from '../layout';
export default function Main() {
  return (
    <div className="flex items-center w-full  responsive_container pt-[30px] flex-col">
      <div className=" w-full items-center  h-full">
        <div
          style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full justify-start"
        >
          <span className={SamsungSharpSansBold.className}>Create Your ReadMe Together</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            리드미 작업, 협업으로 가치를 더하다
          </span>
        </div>
        <div></div>
        <div className="flex-1 mt-[30px] flex justify-center w-[80%] h-[auto] items-center">
          <Image
            className="image"
            src="/MainImg1.png"
            alt="Main logo of the image"
            width={16}
            height={9}
            sizes="100%"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div
          style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full text-start"
        >
          <span className={SamsungSharpSansBold.className}>Recommend your ReadMe draft</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            레포지토리 파일명 기반으로 리드미 초안 정확도를 높이다
          </span>
        </div>
      </div>
      <div className="flex-1 mt-[30px] flex justify-center w-full h-[60%]">
        <Image
          className="image"
          src="/MainImage2.jpeg"
          alt="Main logo of the image"
          width={16}
          height={9}
          sizes="100%"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div
          style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          className="flex flex-col sm:mb-4  flex-1  w-full text-start"
        >
          <span className={SamsungSharpSansBold.className}>Share your ReadMe</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            작성한 리드미를 공유하여 더 나은 결과를 만들다
          </span>
        </div>
      </div>
      <div className="flex-1 mt-[30px] flex justify-center w-full">
        <Image
          className="image"
          src="/MainLogo2.jpg"
          alt="Main logo of the image"
          width={16}
          height={9}
          sizes="100%"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className={`${SamsungSharpSansBold.className} h-[40px] flex flex-row text-[24px] mt-[200px] w-full text-start items-center gap-[20px]`}
      >
        WITHME
        <span className={SamsungOneKorean400.className} style={{ fontSize: '16px' }}>
          © SSAFY All Rights Reserved
        </span>
      </div>
    </div>
  );
}
