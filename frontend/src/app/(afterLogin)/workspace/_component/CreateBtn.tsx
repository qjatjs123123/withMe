import axios from '@/util/axiosConfigClient';
import { useGlobalState } from '../../_components/RepoModalProvider';
import { API_URL, MESSAGE } from '@/util/constants';
import { useQueryClient } from '@tanstack/react-query';
import useErrorHandler from '../business/useErrorHandler';

export default function CreateBtn({ url }) {
  const { curRepo } = useGlobalState();
  const queryClient = useQueryClient();
  const { setModalOpen } = useGlobalState();
  const { handlerAxios } = useErrorHandler();

  const handleCreate = async () => {
    setModalOpen(false);
    await handlerAxios(
      async () => await axios.post(`${API_URL.CREATE_WORKSPACE}`, { workspace_id: curRepo.current.id }),
      () => {
        queryClient.invalidateQueries({ queryKey: ['workspace'] });
        queryClient.invalidateQueries({ queryKey: ['userReopKey'] });
      },
      MESSAGE.REPO_CREATE,
      MESSAGE.REPO_SUCCESS,
    );
  };

  return (
    <button
      onClick={handleCreate}
      className="p-[5px] bg-white text-black border-2 border-black mx-auto rounded-lg w-1/2 cursor-pointer transition-colors duration-200 hover:bg-[#020623] hover:text-white"
    >
      {url ? 'Join' : 'Create'}
    </button>
  );
}