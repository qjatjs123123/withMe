import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { Editor } from './DynamicEditor';

export default function LeftMain() {
  const { initialItems } = useMenuItems();

  if (!initialItems || initialItems.length === 0) {
    return <div></div>;
  }

  return (
    <ClientSideSuspense fallback={<div></div>}>
      <div className="bg-white h-full w-full">
        {initialItems.map((item) => (
          <RoomWithEditor key={`room-${item.id}`} id={item.id} />
        ))}
      </div>
    </ClientSideSuspense>
  );
}

function RoomWithEditor({ id }: { id: string }) {
  const { activeId } = useActiveId();
  const { menuItems } = useMenuItems();
  const activeMenu = menuItems.find((menu) => menu.id === activeId);
  return (
    <RoomProvider
      id={`room-${id}`}
      initialStorage={{
        initialMenuItems: [],
        menuItems: [],
      }}
    >
      <ClientSideSuspense fallback={<div></div>}>
        <div
          className={`p-6 transition-opacity duration-300 h-full ${activeId === id ? '' : 'hidden pointer-events-none'}`}
        >
          <div className="text-xl ml-[53px] pb-2 border-b-2 mb-2">{activeMenu.label}</div>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}
