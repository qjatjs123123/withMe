'use client';

import React from 'react';
import { ActiveIdProvider, useActiveId } from './_contexts/ActiveIdContext';
import { Editor } from './_components/Editor';
import { LeftBar } from './_components/LeftBar';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';

// 사이드바를 위한 별도의 컴포넌트
function SidebarRoom() {
  return (
    <RoomProvider
      id="sidebar-room"
      initialStorage={{
        menuItems: [
          { id: 1, label: 'Dashboard' },
          { id: 2, label: 'Projects' },
          { id: 3, label: 'Tasks' },
          { id: 4, label: 'Messages' },
          { id: 5, label: 'Settings' },
        ],
      }}
    >
      <div className="bg-gray-900">
        <LeftBar />
      </div>
    </RoomProvider>
  );
}

function EditorRoom({ roomId }: { roomId: null | number }) {
  return (
    <RoomProvider
      key={roomId}
      id={`room-${roomId}`}
      initialStorage={{
        menuItems: [],
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        <main className="h-full w-full p-4">
          <Editor />
        </main>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function EditPageContent() {
  const { activeId } = useActiveId();

  return (
    <div className="flex min-h-screen">
      <div className="fixed h-full">
        <SidebarRoom />
      </div>
      <div className="flex-1 ml-64">
        <EditorRoom roomId={activeId ? activeId : 1} />
        <div>{activeId}</div>
      </div>
    </div>
  );
}

export default function EditPage() {
  return (
    <ActiveIdProvider>
      <LiveblocksProvider publicApiKey="pk_dev_NrnSHcf8kdqt92bL0XiFaOWgfuIDEx7fzLUimbyv02xZ8vM_NSxIdwQ8KHPK_aNd">
        <EditPageContent />
      </LiveblocksProvider>
    </ActiveIdProvider>
  );
}
