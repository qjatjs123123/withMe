'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import ViewIcon from './ViewIcon';
import EditIcon from './EditIcon';
import TrashIcon from './TrashIcon';
import { WorkspaceContent } from '../model/workSpaceItem'; // 타입 파일 경로에 맞게 수정
import MoreBtn from '@/app/_components/MoreBtn';
import { useWorkspaceState } from '../../_components/WorkspaceInfoProvider';

interface UserWorkSpaceProps {
  workspace: WorkspaceContent; // WorkspaceContent 타입을 props로 받음
}

const UserWorkSpace: React.FC<UserWorkSpaceProps> = ({ workspace }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setWorkspace, curWorkspace } = useWorkspaceState();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorkspace(workspace);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '16px',
        border: '1px solid #CCCCCC',
        backgroundColor: workspace.thumbnail ? 'transparent' : '#CCCCCC',
      }}
      className="w-full relative rounded-[16px]  flex flex-col border-2 border-[#CCCCCC] aspect-[1/0.8]"
    >
      {!isVisible ? (
        <div className="rounded-t-[16px]" style={{ width: '100%', height: '80%', backgroundColor: '#CCCCCC' }} />
      ) : (
        <Image
          className="workspace-image cursor-pointer rounded-t-[16px]"
          src={workspace.thumbnail}
          alt="Description of the image"
          width={200}
          height={300}
          sizes="100%"
          style={{ width: '100%', height: '80%', objectFit: 'cover' }}
          onLoad={() => setIsVisible(true)}
          priority
        />
      )}

      <div className="workspace-item absolute flex flex-row rounded-t-[16px]">
        <div className="flex-1 flex justify-center items-center">
          <ViewIcon src={`/readme/${curWorkspace.current.id}`} />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <EditIcon src={curWorkspace.current.id} />
        </div>
      </div>
      <div
        style={{ padding: '10px', height: '20%', backgroundColor: 'white' }}
        className="p-[10px] flex items-center h-[20%] gap-2 rounded-b-[16px]"
      >
        <div
          style={{ fontSize: '16px' }}
          className="text-[16px] font-bold overflow-hidden whitespace-nowrap text-ellipsis flex-1 "
        >
          {workspace.name}
        </div>

        <div className="flex items-center justify-end">
          <MoreBtn />
        </div>
      </div>
    </div>
  );
};

export default UserWorkSpace;
