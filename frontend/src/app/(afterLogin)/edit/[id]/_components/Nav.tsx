import Image from 'next/image';
import { useState } from 'react';
import LiveAvatars from './LiveAvatars';
import { CommitIcon } from '../_icons/CommitIcon';
import { CommitModal } from './CommitModal';
import { RoomProvider } from '@liveblocks/react';
import { useInfo } from '../_contexts/InfoContext';
import Link from 'next/link';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roomId, menuItems } = useInfo();
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <RoomProvider
      id={roomId}
      initialStorage={{
        initialMenuItems: menuItems,
        menuItems: menuItems.slice(0, 4),
      }}
    >
      <div className="relative z-[9999]">
        <nav
          style={{
            // position: 'fixed',
            backgroundColor: 'white', // bg-[#020623]
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: '15',
            height: '90px',
          }}
          className="border-b-2 px-8 md:px-[50px]"
        >
          <div style={{ flex: '1 1 0%', display: 'flex', gap: '50px' }} className="items-center">
            <Link href={'/'}>
              <span className="text-3xl" style={{ fontFamily: 'samsungsharpsans-bold' }}>
                WithMe
              </span>
            </Link>
            <Link href={'/workspace'}>
              <span
                className="hide-below-md cursor-pointer-nav pb-1 text-[20px]"
                style={{ fontFamily: 'samsungsharpsans-bold' }}
              >
                Workspace
              </span>
            </Link>
          </div>
          <div style={{ flex: '2 1 0%', marginLeft: '10px' }}></div>
          <div style={{ flex: '1 1 0%' }}>
            <div className="flex justify-end items-center">
              <div className="mr-4 hide-below-md ">
                <LiveAvatars />
              </div>
              <div className="flex items-center cursor-pointer hover:opacity-75" onClick={handleToggleModal}>
                <CommitIcon />
                <span className=" ml-1.5 font-bold text-lg">Commit</span>
              </div>
            </div>
          </div>
        </nav>

        <CommitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </RoomProvider>
  );
}
