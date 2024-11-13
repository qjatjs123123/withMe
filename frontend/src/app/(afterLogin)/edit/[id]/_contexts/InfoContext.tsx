import { createContext, useContext, useEffect, useState } from 'react';
import axios, { getCookieValue } from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Loading } from '../_components/Loading';
import { CommitIcon } from '../_icons/CommitIcon';

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
    return (
      <>
        <div className="relative h-[72px]">
          <nav
            style={{
              backgroundColor: '#020623',
              width: '100%',
              height: '72px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1 1 0%' }}>
              {/* <Link href={'/workspace'}> */}
              <span className="ml-2 text-white text-3xl" style={{ fontFamily: 'samsungsharpsans-bold' }}>
                With<span className="text-[#49DCB0]">M</span>E.md
              </span>
              {/* </Link> */}
            </div>
            <div style={{ flex: '2 1 0%', marginLeft: '10px' }}></div>
            <div style={{ flex: '1 1 0%' }}>
              <div className="flex justify-end items-center">
                <div className="mr-4">{/* <LiveAvatars /> */}</div>
                <div className="flex items-center">
                  <CommitIcon />
                  <span className="text-white ml-1.5 font-bold text-lg">Commit</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="w-full flex justify-center items-center" style={{ height: `calc(100vh - 72px)` }}>
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
