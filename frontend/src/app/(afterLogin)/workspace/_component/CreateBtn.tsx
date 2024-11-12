import axios from '@/util/axiosConfigClient';
import { useGlobalState } from '../../_components/RepoModalProvider';
import { API_URL, MESSAGE } from '@/util/constants';
import { useQueryClient } from '@tanstack/react-query';
import useErrorHandler from '../business/useErrorHandler';
import { useUserRepoQuery } from '@/stores/server/getUserRepoQuery';

export default function CreateBtn({ url }) {
  const { curRepo, setCurRepo } = useGlobalState();
  const queryClient = useQueryClient();
  const { setIsVisible } = useGlobalState();
  const { handlerAxios } = useErrorHandler();
  const { refetch: repoRefetch } = useUserRepoQuery(null);

  const handleCreate = async () => {
    setIsVisible(false);
    await handlerAxios(
      async () => await axios.post(`${API_URL.CREATE_WORKSPACE}`, { workspace_id: curRepo.current.id }),
      async () => {
        queryClient.invalidateQueries({ queryKey: ['workspace'] });
        await repoRefetch();
      },
      MESSAGE.REPO_CREATE,
      MESSAGE.REPO_SUCCESS,
    );
    setCurRepo(null);
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
