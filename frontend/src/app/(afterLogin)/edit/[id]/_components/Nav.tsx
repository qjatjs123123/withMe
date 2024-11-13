import Image from 'next/image';
import { useState } from 'react';
import LiveAvatars from './LiveAvatars';
import { CommitIcon } from '../_icons/CommitIcon';
import { CommitModal } from './CommitModal';
import { RoomProvider } from '@liveblocks/react';
import { INITIAL_MENU_ITEMS, MENU_ITEMS, useInfo } from '../_contexts/InfoContext';
import Link from 'next/link';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roomId } = useInfo();
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <RoomProvider
      id={roomId}
      initialStorage={{
        initialMenuItems: INITIAL_MENU_ITEMS,
        menuItems: MENU_ITEMS,
      }}
    >
      <div className="relative">
        <nav
          style={{
            backgroundColor: '#020623',
            width: '100%',
            padding: '12px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: '1 1 0%' }}>
            <Link href={'/workspace'}>
              <span className="ml-2 text-white text-3xl" style={{ fontFamily: 'samsungsharpsans-bold' }}>
                With<span className="text-[#49DCB0]">M</span>E.md
              </span>
            </Link>
          </div>
          <div style={{ flex: '2 1 0%', marginLeft: '10px' }}></div>
          <div style={{ flex: '1 1 0%' }}>
            <div className="flex justify-end items-center">
              <div className="mr-4">
                <LiveAvatars />
              </div>
              <div className="flex items-center cursor-pointer hover:opacity-75" onClick={handleToggleModal}>
                <CommitIcon />
                <span className="text-white ml-1.5 font-bold text-lg">Commit</span>
              </div>
            </div>
          </div>
        </nav>

        <CommitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </RoomProvider>
  );
}
