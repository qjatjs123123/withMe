import Image from 'next/image';

export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px]">
        <div className="flex my-28 justify-between">
          <div className="flex flex-col h-100 text-5xl font-bold mr-24">
            <span className="mb-4">WithME 로</span>
            <span className="mb-2">ReadMe</span>
            <span>작업을 손쉽게!</span>
          </div>
          <Image
            className="image mt-16"
            src="/MainImg1.png"
            alt="Main logo of the image"
            width={700}
            height={400}
            sizes="100%"
          />
        </div>
      </div>
    </div>
  );
}
