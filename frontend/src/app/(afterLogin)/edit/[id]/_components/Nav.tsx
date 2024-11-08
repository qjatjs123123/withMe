import Image from 'next/image';
import { useState } from 'react';
import LiveAvatars from './LiveAvatars';
import { CommitIcon } from '../_icons/CommitIcon';
import { CommitModal } from './CommitModal';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
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
          <Image
            className="workspace-image cursor-pointer"
            src="/Logo.png"
            alt="logo of the image"
            width={200}
            height={43.05}
            sizes="100%"
            style={{ width: '200px', height: '100%' }}
          />
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
  );
}
