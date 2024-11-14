import { createContext, useContext, useEffect, useState } from 'react';
import axios, { getCookieValue } from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Loading } from '../_components/Loading';
import { CommitIcon } from '../_icons/CommitIcon';
import ErrorModal from '../_components/ErrorModal';

export const INITIAL_MENU_ITEMS = [
  { id: uuidv4(), label: '헤더' },
  { id: uuidv4(), label: '프로젝트 소개' },
  { id: uuidv4(), label: '기획 배경' },
  { id: uuidv4(), label: '주요 기능' },
  { id: uuidv4(), label: '아키텍쳐' },
  { id: uuidv4(), label: '' },
  { id: uuidv4(), label: '' },
  { id: uuidv4(), label: '' },
  { id: uuidv4(), label: '' },
  { id: uuidv4(), label: '' },
];
export const MENU_ITEMS = INITIAL_MENU_ITEMS.slice(0, 5);

type InfoContextType = {
  repoName: string | null;
  setRepoName: (name: string) => void;
  repoUrl: string | null;
  setRepoUrl: (url: string) => void;
  roomId: string;
  setRoomId: (id: string) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  ownerName: string | null; // 추가된 부분
  setOwnerName: (owner: string) => void; // 추가된 부분
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
    owner: string; // 추가된 부분
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
  const [roomId, setRoomId] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

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
        console.log(response.data);
        setRepoName(response.data.data.name);
        setRepoUrl(response.data.data.repoUrl);
        setRoomId(response.data.data.roomId);
        setOwnerName(response.data.data.owner); // 추가된 부분

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
        if (error.response && error.response.status === 400) {
          setIsError(true);
        }
        setRoomId('WITHME_ROOM_ID_1515151515');
        setIsLoading(false);
      }
    };

    initializeData();
  }, [workspaceId]);

  if (isError) return <ErrorModal />;

  if (isLoading) {
    return (
      <>
        <div className="relative">
          <nav
            style={{
              // position: 'fixed',
              backgroundColor: 'white', // bg-[#020623]
              width: '100%',
              padding: '0px 50px', // p-[12px]
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: '15',
              height: '90px',
            }}
            className="border-b-2"
          >
            <div style={{ flex: '1 1 0%', display: 'flex', gap: '50px' }} className="items-center">
              <span className="ml-2 text-3xl" style={{ fontFamily: 'samsungsharpsans-bold' }}>
                WithMe
              </span>
              <span className="cursor-pointer-nav text-[20px]" style={{ fontFamily: 'samsungsharpsans-bold' }}>
                Workspace
              </span>
            </div>
            <div style={{ flex: '2 1 0%', marginLeft: '10px' }}></div>
            <div style={{ flex: '1 1 0%' }}>
              <div className="flex justify-end items-center">
                <div className="mr-4"></div>
                <div className="flex items-center">
                  <CommitIcon />
                  <span className="ml-1.5 font-bold text-lg">Commit</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="w-full flex justify-center items-center" style={{ height: `calc(100vh - 90px)` }}>
          <Loading />
        </div>
      </>
    );
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
        ownerName, // 추가된 부분
        setOwnerName, // 추가된 부분
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
