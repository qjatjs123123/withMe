import { useState } from 'react';
import { useWorkspaceState } from '../(afterLogin)/_components/WorkspaceInfoProvider';
import useImageUpload from '../(afterLogin)/workspace/business/useImageUpload';
import { useQueryClient } from '@tanstack/react-query';
import axios from '@/util/axiosConfigClient';
import { API_URL, MESSAGE } from '@/util/constants';
import UpdateImage from '../(afterLogin)/workspace/_component/UpdateImage';
import TrashIcon from '../(afterLogin)/workspace/_component/TrashIcon';
import useErrorHandler from '../(afterLogin)/workspace/business/useErrorHandler';

export default function SettingModal({ isVisible, changeState, ref }) {
  const { curWorkspace } = useWorkspaceState();
  const queryClient = useQueryClient();
  const { handleImageChange } = useImageUpload(curWorkspace.current.repoUrl);
  const { handlerAxios } = useErrorHandler();

  const deleteWorkspaceAPI = async (e) => {
    e.preventDefault();
    changeState(false);

    await handlerAxios(
      async () =>
        await axios.delete(`${API_URL.CREATE_WORKSPACE}`, {
          data: { workspace_id: curWorkspace.current.id },
        }),
      () => {
        queryClient.invalidateQueries({ queryKey: ['workspace'] });
        queryClient.invalidateQueries({ queryKey: ['userReopKey'] });
      },
      MESSAGE.VISIBLE,
      MESSAGE.VISIBLE_SUCCCESS,
    );
  };

  const updateImageAPI = async (e) => {
    await handleImageChange(e);
    await queryClient.invalidateQueries({ queryKey: ['workspace'] });
    changeState(false);
  };

  return (
    <div
      className="absolute w-[150px] h-auto bg-white text-black z-[50] rounded-lg p-2"
      style={{
        bottom: '-70px',
        right: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        className="font-bold block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md flex justify-start justify-between"
        onClick={deleteWorkspaceAPI}
      >
        <TrashIcon />
        레포 숨기기
      </button>
      <input type="file" accept="image/*" onChange={updateImageAPI} id="file-input1" className="hidden" />

      <label
        htmlFor="file-input1"
        className=" flex justify-start justify-between font-bold block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
      >
        <UpdateImage />
        이미지 수정
      </label>
    </div>
  );
}
