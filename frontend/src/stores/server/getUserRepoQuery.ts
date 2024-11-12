import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/util/constants";
import axios from '@/util/axiosConfigClient';

// WorkspaceItem 인터페이스
interface WorkspaceItem {
    id: number;
    name: string;
    thumbnail: string;
    repoUrl: string;
    isCreated: boolean;
    readmeContent: string;
    isPrivate: boolean;
  }
  
  // API 응답 인터페이스
  interface ApiResponse {
    status: number;
    message: string;
    code: string | null;
    isSuccess: boolean;
    data: WorkspaceItem[];
    timestamp: string;
  }
  

  export function useUserRepoQuery(enabled) { 
    const isEnabled = enabled ?? true; 
    return useQuery<ApiResponse, Error>({
      queryKey: ['userRepoKey'],
      queryFn: async () => {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.WORKSPACE_X}`,
        );
        return response.data;
      },
      staleTime: 100000,
      enabled: isEnabled,  
    });
  }