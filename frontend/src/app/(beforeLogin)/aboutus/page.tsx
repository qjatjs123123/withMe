import Footer from '@/app/_components/Footer';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="responsive_aboutResponsive ">
      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div className="flex flex-col h-100 mr-[100px]">
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
        <div className="">
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/edit.png"
            alt="Editor full view"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div className="">
          <Image
            className="image border-4 border-gray-200 rounded-xl aboutImage  mb-[30px]"
            src="/preview&markdown.png"
            alt="preview&markdown"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
        <div className="flex flex-col h-100 text-end">
          <span className="text-5xl ">
            Real-time Preview <br />
            and Markdown.
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            See your README take shape instantly with live previews, <br />
            and switch to Markdown anytime for precise control.
          </span>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div className="flex flex-col h-100 text-start">
          <span className="text-5xl leading-tight">
            AI-powered Drafts, <br />
            Tailored for Your Project.
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Leverage AI to generate a structured README draft <br />
            based on your project’s directory and goals.
          </span>
        </div>
        <div>
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/AIDraft.png"
            alt="AIDraft"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div>
          <Image
            className="image  mb-[30px]"
            src="/tab_group.png"
            alt="tab_group"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
        <div className="flex flex-col h-100 text-end">
          <span className="text-5xl leading-tight">
            Organized Sections, <br />
            Effortless Workflow.
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Break your README into clear, manageable sections <br />
            for streamlined collaboration and focused editing.
          </span>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div className="flex flex-col h-100 text-start">
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
        <div className="">
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/capture1.PNG"
            alt="capture of the Editor image"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full">
        <div className="">
          <Image
            className="image border-4 border-gray-200 rounded-xl mb-[30px]"
            src="/capture2.PNG"
            alt="capture of the Editor image"
            width={800}
            height={600}
            style={{ width: '100%' }}
            sizes="100%"
          />
        </div>
        <div className="flex flex-col h-100 text-end">
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

      <Footer />
    </div>
  );
}
