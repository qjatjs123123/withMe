import ViewIcon from '@/app/(afterLogin)/workspace/_component/ViewIcon';
import Image from 'next/image';

interface TransformedWorkspace {
  id: number;
  name: string;
  thumbnail: string | null;
}

const UserWorkSpace: React.FC<TransformedWorkspace> = ({ id, name, thumbnail }) => {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid #CCCCCC',
        backgroundColor: thumbnail ? 'transparent' : '#CCCCCC',
      }}
      className="w-full relative rounded-[16px] flex flex-col border-2 border-[#CCCCCC] aspect-[1/0.8]"
    >
      <Image
        className="workspace-image cursor-pointer rounded-t-[16px]"
        src={thumbnail || '/placeholder-image.jpg'} // placeholder image in case thumbnail is null
        alt="Workspace thumbnail"
        width={200}
        height={300}
        sizes="100%"
        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
        priority
      />
      <div className="workspace-item absolute flex flex-row rounded-t-[16px]">
        <div className="flex-1 flex justify-center items-center">
          <ViewIcon src={`/readme/${id}`} />
        </div>
      </div>
      <div
        style={{ padding: '10px', height: '20%', backgroundColor: 'white' }}
        className="p-[10px] flex items-center h-[20%] gap-2 rounded-b-[16px]"
      >
        <div
          style={{ fontSize: '16px' }}
          className="text-[16px] font-bold overflow-hidden whitespace-nowrap text-ellipsis flex-1"
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default UserWorkSpace;
