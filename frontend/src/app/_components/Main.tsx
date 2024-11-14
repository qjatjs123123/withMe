import Image from 'next/image';

export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px]">
        <div className="flex my-28 justify-between">
          <div className="flex flex-col h-100 text-5xl font-bold mr-24">
            <span className="mb-4">
              With<span className=" text-[#49DCB0]">M</span>E 로
            </span>
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

        <div className="flex justify-between mb-20">
          <div className="flex flex-col h-100">
            <span className="text-5xl">
              Build perfect <br />
              docs, together.
            </span>{' '}
            <br />
            <span className="text-xl text-[#ccc]">
              Capture your ideas, get feedback from teammates, <br />
              and ask AI to add the finishing touches.
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div>
                <Image
                  className="image mr-5"
                  src="/githubLogo.png"
                  alt="github logo of the image"
                  width={60}
                  height={60}
                  sizes="100%"
                />
              </div>
              <div className="mt-2">
                <Image
                  className="image"
                  src="/gitLabLogo.png"
                  alt="github logo of the image"
                  width={60}
                  height={60}
                  sizes="100%"
                />
              </div>
            </div>
            <span className="mt-4 text-3xl">Connect</span>
            <span className="text-3xl">to your git</span>
            <span className="text-xl text-[#ccc] mt-3">
              Login github or gitLab, <br />
              and commit directly.
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div>
                <Image
                  className="image mr-5"
                  src="/githubLogo.png"
                  alt="github logo of the image"
                  width={60}
                  height={60}
                  sizes="100%"
                />
              </div>
              <div className="mt-2">
                <Image
                  className="image"
                  src="/gitLabLogo.png"
                  alt="github logo of the image"
                  width={60}
                  height={60}
                  sizes="100%"
                />
              </div>
            </div>
            <span className="mt-4 text-3xl">Connect</span>
            <span className="text-3xl">to your git</span>
            <span className="text-xl text-[#ccc] mt-3">
              Login github or gitLab, <br />
              and commit directly.
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            className="image mr-5"
            src="/capture.png"
            alt="capture of the Editor image"
            width={800}
            height={600}
            sizes="100%"
          />
        </div>
      </div>
    </div>
  );
}
