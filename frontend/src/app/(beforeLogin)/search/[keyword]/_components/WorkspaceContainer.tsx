'use client';

import { WorkspaceStateProvider } from '@/app/(afterLogin)/_components/WorkspaceInfoProvider';
import UserWorkSpace from './UserWorkSpace';

// Workspace 타입에 id를 추가합니다.
interface Workspace {
  id: string; // id 필드를 추가
  name: string;
  owner: string | null;
  thumbnail: string;
  repoUrl: string;
  readmeContent: string;
  createdAt: string; // ISO 형식의 날짜 문자열
  updatedAt: string; // ISO 형식의 날짜 문자열
}

// WorkSpaceContainer 컴포넌트의 props 타입을 정의합니다.
interface WorkSpaceContainerProps {
  workspaces: Workspace[] | null;
}

export default function WorkSpaceContainer({ workspaces }: WorkSpaceContainerProps) {
  if (!workspaces) {
    return <div></div>;
  }
  return (
    <>
      {workspaces.length === 0 ? (
        <p className="font-bold text-[30px]">죄송합니다. 검색 결과가 없습니다.</p>
      ) : (
        workspaces.map((workspace) => (
          <WorkspaceStateProvider key={`${workspace.id}-user1-workspace`}>
            <UserWorkSpace key={`${workspace.id}-user-workspace`} workspace={workspace} />
          </WorkspaceStateProvider>
        ))
      )}
    </>
  );
}
