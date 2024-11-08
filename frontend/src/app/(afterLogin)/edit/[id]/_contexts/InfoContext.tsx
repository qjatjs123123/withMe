'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios, { getCookieValue } from '@/util/axiosConfigClient';
import { API_URL } from '@/util/constants';
import { jwtDecode } from 'jwt-decode';

type InfoContextType = {
  repoName: string | null;
  setRepoName: (name: string) => void;
  repoUrl: string | null;
  setRepoUrl: (url: string) => void;
  roomId: string | null;
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
  // 필요한 다른 필드들이 있다면 여기에 추가
};

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const [repoName, setRepoName] = useState<string | null>('BlockNote');
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post<WorkspaceResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.WORKSPACE_INFO}`,
          {
            workspace_id: 95,
          },
        );

        setRepoName(response.data.data.name);
        setRepoUrl(response.data.data.repoUrl);
        setRoomId(response.data.data.roomId);
      } catch (error) {
        console.error('Error fetching workspace info:', error);
      }
    })();

    try {
      const cookie = getCookieValue('userData');
      const userData = JSON.parse(cookie!);
      setUserName(userData.name);

      // JWT 토큰 디코드 후 token 필드만 저장
      const accessToken = userData.access_token;
      if (accessToken) {
        const decodedToken = jwtDecode<DecodedTokenType>(accessToken);
        console.log(decodedToken.token);
        setToken(decodedToken.token);
      }
    } catch (error) {
      console.error('Error processing user data:', error);
    }
  }, []);

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
