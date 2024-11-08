import { useState } from 'react';
import { useWorkspaceState } from '../(afterLogin)/_components/WorkspaceInfoProvider';
import useImageUpload from '../(afterLogin)/workspace/business/useImageUpload';
import { useQueryClient } from '@tanstack/react-query';
import axios from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';

export default function SettingModal({ isVisible, setIsVisible, ref }) {
  const { curWorkspace } = useWorkspaceState();
  const queryClient = useQueryClient();
  const { selectedImage, handleImageChange } = useImageUpload(curWorkspace.current.repoUrl);

  const deleteWorkspaceAPI = async () => {
    try {
      await axios.delete(`${API_URL.CREATE_WORKSPACE}`, {
        data: { workspace_id: curWorkspace.current.id },
      });
      queryClient.invalidateQueries({ queryKey: ['workspace'] });
      queryClient.invalidateQueries({ queryKey: ['userReopKey'] });
      setIsVisible(false);
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  const updateImageAPI = async (e) => {
    await handleImageChange(e);
    await queryClient.invalidateQueries({ queryKey: ['workspace'] });
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div
        ref={ref}
        className="absolute w-[120px] h-auto bg-white text-black z-[50] rounded-lg p-2"
        style={{
          bottom: '-70px',
          right: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <button
          className="font-bold block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
          onClick={deleteWorkspaceAPI}
        >
          숨기기
        </button>
        <input type="file" accept="image/*" onChange={updateImageAPI} id="file-input1" className="hidden" />
        <label
          htmlFor="file-input1"
          className="font-bold block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
        >
          이미지 수정
        </label>
      </div>
    )
  );
}
