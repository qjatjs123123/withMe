import Footer from '@/app/_components/Footer';
import Image from 'next/image';

export const dynamic = 'force-static';

export default function AboutUs() {
  return (
    <div className="responsive_aboutResponsive ">
      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]" style={{height:'50%'}}>
        <div className="flex flex-col h-100 mr-[100px]" style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl">
            Build perfect <br />
            Readme, together.
          </span>{' '}
          <br />
          <span  className="text-xl text-[#ccc]">
            Capture your ideas, get feedback from teammates, <br />
            and ask AI to add the finishing touches.
          </span>
        </div>
        <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/edit.png"
            alt="Editor full view"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]">
        <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image border-4 border-gray-200 rounded-xl aboutImage "
            src="/markdown.png"
            alt="preview&markdown"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col h-100 text-end " style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl ">
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

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]">
        <div className="flex flex-col h-100 text-start" style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl leading-tight">
            AI-powered Drafts, <br />
            Tailored for Your Project.
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Leverage AI to generate a structured README draft <br />
            based on your project’s directory and goals.
          </span>
        </div>
        <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/AIDraft.png"
            alt="AIDraft"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]">
        <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image  "
            src="/tab_group.png"
            alt="tab_group"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col h-100 text-end" style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl leading-tight">
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

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]">
        <div className="flex flex-col h-100 text-start" style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl">
            The happier <br />
            workspace
          </span>{' '}
          <br />
          <span className="text-xl text-[#ccc]">
            Link a GitHub repository with <br />
            git social login
          </span>
        </div>
        <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image border-2 border-gray-200 rounded-xl"
            src="/capture1.PNG"
            alt="capture of the Editor image"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-2"></div>

      <div className="flex aboutus-responsive-image justify-between my-[100px] w-full gap-[100px]">
      <div className="" style={{flex : 2, height:'100%', position:'relative', paddingBottom:'30%',minHeight: '300px'}}>
          <Image
            className="image border-4 border-gray-200 rounded-xl"
            src="/capture2.PNG"
            alt="capture of the Editor image"
            sizes="100%"
            layout='fill'
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col h-100 text-end" style={{flex : 1}}>
          <span style={{ fontFamily:'SamsungSharpSansBold'}} className="text-5xl">
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
