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

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  }

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
        backgroundColor: workspace.thumbnail ? 'transparent' : '#CCCCCC',
      }}
      className="w-full relative  flex flex-col  aspect-[1/0.9]"
    >
      {!isVisible ? (
        <div style={{ width: '100%', height: '70%', backgroundColor: '#CCCCCC' }} />
      ) : (
        <div className="w-full h-[70%] relative">
          <Image
            className="absolute workspace-image cursor-pointer "
            src={workspace.thumbnail}
            alt="Description of the image"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid #eeeeee' }}
            priority
          />
        </div>
      )}

      <div className="workspace-item absolute flex flex-row  ">
        <div className="flex-1 flex justify-center items-center">
          <ViewIcon src={`/readme/${curWorkspace.current.id}`} />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <EditIcon src={curWorkspace.current.id} />
        </div>
      </div>

      <div style={{ fontSize: '30px' }} className="flex items-end text-ellipsis1 font-bold overflow-hidden">
        {workspace.name}
      </div>
      <div className="h-[55px] text-ellipsis2">
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
        <div className="flex justify-between">
          <div
            style={{ fontSize: '12px', fontFamily: 'SamsungOneKorean-400' }}
            className="flex flex-row justify-start text-ellipsis1"
          >
            <span>{workspace.owner}</span>
            <span style={{ marginLeft: '5px', marginRight: '5px' }}> | </span>
            <span>{formatDate(workspace.updatedAt)}</span>
          </div>
          <MoreBtn />
        </div>
      </div>
    </div>
  );
};

export default UserWorkSpace;
