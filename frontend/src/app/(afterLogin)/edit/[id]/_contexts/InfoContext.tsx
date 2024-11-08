import { createContext, useContext, useEffect, useState } from 'react';
import axios, { getCookieValue } from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_MENU_ITEMS = [
  { id: uuidv4(), label: 'Dashboard' },
  { id: uuidv4(), label: 'Projects' },
  { id: uuidv4(), label: 'Tasks' },
  { id: uuidv4(), label: 'Messages' },
  { id: uuidv4(), label: 'Settings' },
  { id: uuidv4(), label: 'Dashboard' },
  { id: uuidv4(), label: 'Projects' },
  { id: uuidv4(), label: 'Tasks' },
  { id: uuidv4(), label: 'Messages' },
  { id: uuidv4(), label: 'Settings' },
];

type InfoContextType = {
  repoName: string | null;
  setRepoName: (name: string) => void;
  repoUrl: string | null;
  setRepoUrl: (url: string) => void;
  roomId: string; // null 타입 제거
  setRoomId: (id: string) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

type WorkspaceResponse = {
  status: number;
  message: string;
  code: null;
  isSuccess: boolean;
  data: {
    id: number;
    isCreated: boolean;
    isPrivate: boolean;
    name: string;
    readmeContent: string;
    repoUrl: string;
    roomId: string;
    thumbnail: null;
  };
  timestamp: string;
};

type DecodedTokenType = {
  token: string;
};

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const workspaceId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [repoName, setRepoName] = useState<string | null>(null);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>(''); // 초기값을 빈 문자열로 설정
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Workspace 정보 가져오기
        const response = await axios.post<WorkspaceResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.WORKSPACE_INFO}`,
          {
            workspace_id: workspaceId,
          },
        );

        setRepoName(response.data.data.name);
        setRepoUrl(response.data.data.repoUrl);
        setRoomId(response.data.data.roomId);

        // 사용자 정보 처리
        const cookie = getCookieValue('userData');
        const userData = JSON.parse(cookie!);
        setUserName(userData.name);

        const accessToken = userData.access_token;
        if (accessToken) {
          const decodedToken = jwtDecode<DecodedTokenType>(accessToken);
          setToken(decodedToken.token);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing data:', error);
        // 에러 발생시 기본 roomId 설정
        setRoomId('WITHME_ROOM_ID_1515151515');
        setIsLoading(false);
      }
    };

    initializeData();
  }, [workspaceId]);

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트
  }

  return (
    <InfoContext.Provider
      value={{
        repoName,
        setRepoName,
        repoUrl,
        setRepoUrl,
        roomId,
        setRoomId,
        userName,
        setUserName,
        token,
        setToken,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error('useInfo must be used within an InfoProvider');
  }
  return context;
}
