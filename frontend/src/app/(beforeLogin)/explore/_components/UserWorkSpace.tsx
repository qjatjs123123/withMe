import ViewIcon from '@/app/(afterLogin)/workspace/_component/ViewIcon';
import Image from 'next/image';

interface Workspace {
  id: string;
  name: string;
  owner: string | null;
  thumbnail: string;
  repoUrl: string;
  readmeContent: string;
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string; // ISO 형식의 날짜 문자열
}

// UserWorkSpace는 workspace prop을 받아야 하므로, prop 타입을 지정합니다.
interface UserWorkSpaceProps {
  workspace: Workspace;
}

const UserWorkSpace: React.FC<UserWorkSpaceProps> = ({ workspace }) => {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  }
  return (
    <div
      style={{
        backgroundColor: workspace.thumbnail ? 'transparent' : '#CCCCCC',
      }}
      className="w-full relative  flex flex-col  aspect-[1/0.9]"
    >
      <div className="w-full h-[70%]"></div>
      <Image
        className="absolute workspace-image cursor-pointer "
        src={workspace.thumbnail}
        alt="Description of the image"
        width={0}
        height={0}
        sizes="100%"
        style={{ width: '100%', height: '70%', objectFit: 'contain', border: '1px solid #eeeeee' }}
        priority
      />

      <div style={{ height: '70%' }} className="workspace-item absolute flex flex-row  ">
        <div className="flex-1 flex justify-center items-center">
          <ViewIcon src={`/readme/${workspace.id}`} />
        </div>
      </div>

      <div
        style={{ fontSize: '30px' }}
        className="flex items-end mt-[20px] font-bold overflow-hidden whitespace-nowrap text-ellipsis "
      >
        {workspace.name}
      </div>
      <div>
        <a
          href={workspace.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'SamsungOneKorean-400' }}
        >
          {workspace.repoUrl}
        </a>
      </div>
      <div>
        <div className="flex mt-[20px] justify-between">
          <div style={{ fontSize: '12px', fontFamily: 'SamsungOneKorean-400' }} className="flex flex-row justify-start">
            <span>{workspace.owner}</span>
            <span style={{ marginLeft: '5px', marginRight: '5px' }}> | </span>
            <span>{formatDate(workspace.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWorkSpace;
