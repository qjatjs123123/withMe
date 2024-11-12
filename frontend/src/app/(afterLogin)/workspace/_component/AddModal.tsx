'use client';
import React, { useEffect, useState } from 'react';
import CreateProject from './CreateProject';
import CreateImage from './CreateImage';
import { useGlobalState } from '../../_components/RepoModalProvider';

interface AddModalProps {
  onClose: (isClosed: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
}

const AddModal: React.FC<AddModalProps> = ({ onClose, ref }) => {
  const [isCreateImage, setIsCreateImage] = useState(false);

  const { setCurRepo } = useGlobalState();
  const handleNextClick = () => {
    setIsCreateImage(true);
  };

  useEffect(() => {
    return () => {
      setCurRepo(null);
    };
  }, []);

  const renderContent = () => {
    if (isCreateImage) {
      return <CreateImage />;
    }
    return <CreateProject onNextClick={handleNextClick} />;
  };

  return (
    <div className="modal" ref={ref}>
      <div className="modal-header">
        <h2 className="font-bold">Creating a New Project</h2>
        <button className="close" onClick={() => onClose(false)}>
          &times;
        </button>
      </div>
      {renderContent()}
      <style jsx>{`
        .modal {
          position: absolute;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 300px;
          padding: 20px;
          left: -230px;
          top: 50px;
          z-index: 5;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 18px;
        }
        .close {
          cursor: pointer;
          font-size: 20px;
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AddModal;
