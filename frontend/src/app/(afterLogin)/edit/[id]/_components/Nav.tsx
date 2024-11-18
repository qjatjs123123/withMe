import Image from 'next/image';
import { useState } from 'react';
import LiveAvatars from './LiveAvatars';
import { CommitIcon } from '../_icons/CommitIcon';
import { CommitModal } from './CommitModal';
import { RoomProvider } from '@liveblocks/react';
import { useInfo } from '../_contexts/InfoContext';
import Link from 'next/link';

interface NavProps {
  isVertical: boolean;
}

export default function Nav({ isVertical }: NavProps) {
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
            height: isVertical ? '50px' : '90px',
          }}
          className="border-b-2 px-8 md:px-[50px]"
        >
          <div style={{ flex: '1 1 0%', display: 'flex', gap: '50px' }} className="items-center">
            <Link href={'/'}>
              <span
                className={`${isVertical} ? text-[24]px : text-3xl`}
                style={{ fontFamily: 'samsungsharpsans-bold' }}
              >
                WithMe
              </span>
            </Link>
            <Link href={'/workspace'}>
              <span
                style={{
                  display: window.innerWidth >= 768 ? 'inline' : 'none',
                  fontFamily: 'samsungsharpsans-bold',
                  paddingBottom: '0.25rem',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                Workspace
              </span>
            </Link>
          </div>
          <div style={{ flex: '2 1 0%', marginLeft: '10px' }}></div>
          <div style={{ flex: '1 1 0%' }}>
            <div className="flex justify-end items-center">
              <div
                style={{
                  display: window.innerWidth >= 768 ? 'block' : 'none',
                  marginRight: '1rem',
                }}
              >
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
