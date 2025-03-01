import Image from 'next/image';
import { SamsungOneKorean400 } from '../layout';
import { SamsungSharpSansBold } from '../layout';

// 이미지 파일 import
const  MainImg1 =  '/MainImg1.png';
const MainImage2 =   '/MainImage2.jpeg';
const MainLogo2  =  '/MainLogo2.jpg';

export default function Main() {
  console.log("main");
  return (
    <div className="flex items-center w-full responsive_container pt-[30px] flex-col">
      <div className="w-full items-center h-full justify-center">
        <div
          style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          className="flex flex-col sm:mb-4 flex-1 w-full justify-start"
        >
          <span className={SamsungSharpSansBold.className}>Create Your ReadMe Together</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            리드미 작업, 협업으로 가치를 더하다
          </span>
        </div>
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', paddingLeft:'5%', paddingRight:'5%'}}>
          <div className="relative flex-1  mt-[30px] flex justify-center w-full items-center" style={{paddingBottom:'47.83%', marginTop:'30px', width:'100%'}}>
            
            <Image
              className="image"
              src={MainImg1}
              alt="Main logo of the image"
              sizes="100%"
              layout='fill'
              objectFit="contain"
            />

          </div>
        </div>
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div style={{ fontSize: 'clamp(24px, 4vw, 48px)' }} className="flex flex-col sm:mb-4 flex-1 w-full text-start">
          <span className={SamsungSharpSansBold.className}>Recommend your ReadMe draft</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            레포지토리 파일명 기반으로 리드미 초안 정확도를 높이다
          </span>
        </div>
      </div>
      <div className="relative flex-1 mt-[30px] flex justify-center w-full" style={{position:"relative", width:"100%",paddingBottom:'57.18%'}}>
      <Image
          className="image"
          src={MainImage2}
          alt="Main logo of the image"
          sizes="100%"
          layout='fill'
          objectFit="contain"

        />
      </div>

      <div className="flex-1 mt-[30px] flex justify-center w-full pt-[130px]">
        <div style={{ fontSize: 'clamp(24px, 4vw, 48px)' }} className="flex flex-col sm:mb-4 flex-1 w-full text-start">
          <span className={SamsungSharpSansBold.className}>Share your ReadMe</span>
          <span className={SamsungOneKorean400.className} style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
            작성한 리드미를 공유하여 더 나은 결과를 만들다
          </span>
        </div>
      </div>
      <div className="relative flex-1 mt-[30px] flex justify-center w-full" style={{ position:"relative", width:"100%", paddingBottom:'55.93%'}}>
      <Image
          className="image"
          src={MainLogo2}
          alt="Main logo of the image"
          sizes="100%"
          layout='fill'
          objectFit="contain"
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
