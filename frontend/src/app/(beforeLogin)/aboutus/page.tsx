import Footer from '@/app/_components/Footer';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="responsive_aboutResponsive">
      <div className="flex justify-between mt-[100px] w-full mb-[50px]">
        <div className="flex flex-col h-100">
          <span className="text-5xl">
            Build perfect <br />
            Readme, together.
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Capture your ideas, get feedback from teammates, <br />
            and ask AI to add the finishing touches.
          </span>
        </div>
        {/* <div className="flex flex-col">
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
                src="/gitlabLogo.png"
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
        </div> */}
        {/* <div className="flex flex-col">
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
                src="/gitlabLogo.png"
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
        </div> */}
      </div>
      <div className="flex justify-center">
        <Image
          className="image "
          src="/capture.png"
          alt="capture of the Editor image"
          width={800}
          height={600}
          style={{ width: '100%' }}
          sizes="100%"
        />
      </div>
      <div className="flex justify-between mt-[200px] w-full mb-[30px]">
        <div className="flex flex-col h-100">
          <span className="text-5xl">
            The happier <br />
            workspace
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Link a GitHub repository with <br />
            git social login
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          className="image mr-5"
          src="/capture1.PNG"
          alt="capture of the Editor image"
          width={800}
          height={600}
          style={{ width: '100%' }}
          sizes="100%"
        />
      </div>

      <div className="flex justify-between mt-[200px] w-full mb-[30px]">
        <div className="flex flex-col h-100">
          <span className="text-5xl">
            Find everthing <br />
            Get Insight
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            No more endless searching. <br />
            Our built in Elastic Search Skill finds what you are <br />
            looking for in our apps
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          className="image mr-5"
          src="/capture2.PNG"
          alt="capture of the Editor image"
          width={800}
          height={600}
          style={{ width: '100%' }}
          sizes="100%"
        />
      </div>
      <Footer />
    </div>
  );
}
