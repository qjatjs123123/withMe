'use client'
import React from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';

interface ApiState {
  message: string;
  state: boolean;
}

const SnackBarUI = () => {
  // const { apiState } = useSnackBarState();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["apiMessage"],
    queryFn:  () => {
      const cachedData =  queryClient.getQueryData<ApiState>(["apiState"]);
      return cachedData ?? { message: "초기 상태", state: false };
    },
    staleTime: Infinity, 
  });

  return (
    <div
      className={`fixed w-[220px] h-[50px] bg-[#333333] text-white z-50 pr-[20px] pl-[20px] left-1/2 transform -translate-x-1/2 rounded-t-lg flex items-center justify-center text-center transition-all ${
        data?.state ? 'bottom-0' : 'bottom-[-50px]'
      }`}
    >
      <span className="font-bold">{data?.message}</span>
    </div>
  );
};

export default SnackBarUI;
