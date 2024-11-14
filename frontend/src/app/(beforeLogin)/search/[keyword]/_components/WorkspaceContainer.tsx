'use client';

import { WorkspaceStateProvider } from '@/app/(afterLogin)/_components/WorkspaceInfoProvider';
import UserWorkSpace from './UserWorkSpace';

interface Workspace {
  workspace_id: number;
  workspace_name: string;
  workspace_thumbnail: string | null;
}

interface TransformedWorkspace {
  id: number;
  name: string;
  thumbnail: string | null;
}

interface WorkSpaceContainerProps {
  workspaces: Workspace[] | null;
}

export default function WorkSpaceContainer({ workspaces }: WorkSpaceContainerProps) {
  if (!workspaces) {
    return <div></div>;
  }

  const transformedWorkspaces: TransformedWorkspace[] = workspaces.map((workspace) => ({
    id: workspace.workspace_id,
    name: workspace.workspace_name,
    thumbnail: workspace.workspace_thumbnail,
  }));

  return (
    <>
      {transformedWorkspaces.length === 0 ? (
        <p className="font-bold text-[30px]">죄송합니다. 검색 결과가 없습니다.</p>
      ) : (
        transformedWorkspaces.map((workspace) => (
          <WorkspaceStateProvider key={workspace.id}>
            <UserWorkSpace key={workspace.id} id={workspace.id} name={workspace.name} thumbnail={workspace.thumbnail} />
          </WorkspaceStateProvider>
        ))
      )}
    </>
  );
}
