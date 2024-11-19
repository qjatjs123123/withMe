/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPostWorkSpace } from '../page';
import { ApiResponse, RootResponse, WorkspaceContent } from '../model/workSpaceItem'; // 타입 파일 경로에 맞게 수정
import UserWorkSpace from './UserWorkSpace';
import { useRef, useEffect } from 'react';
import { WorkspaceStateProvider } from '../../_components/WorkspaceInfoProvider';

interface PageParam {
  page: number;
  cursor: string | null;
}
export default function WorkSpaceContainer() {
  const {
    data: apiResponse,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<RootResponse, Error, ApiResponse, ['workspace'], PageParam>({
    queryKey: ['workspace'],
    queryFn: ({ pageParam = { page: 0, cursor: null } }) => getPostWorkSpace({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const isLastPage = lastPage.data?.data?.last;
      return isLastPage ? null : { page: allPages.length, cursor: lastPage.data.timestamp || null };
    },
    initialPageParam: { page: 0, cursor: null },
  });

  const workspaces: WorkspaceContent[] = apiResponse?.pages.flatMap((page) => page.data.data.content) || [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }, // 요소가 완전히 보일 때만 트리거
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [fetchNextPage, hasNextPage]);
  if (!workspaces) {
    return <div></div>;
  }

  return (
    <>
      {workspaces.length === 0 ? (
        <div>
          <span className="text-[30px]" style={{ fontFamily: 'SamsungOneKorean-400' }}>
            Add 버튼을 클릭하여
          </span>
          <p className=" text-[30px]">레포지토리를 추가해주세요.</p>
        </div>
      ) : (
        workspaces.map((workspace) => (
          <WorkspaceStateProvider key={`${workspace.id}`}>
            <UserWorkSpace key={`${workspace.id}-user-workspace`} workspace={workspace} />
          </WorkspaceStateProvider>
        ))
      )}
      {hasNextPage && <div ref={observerRef} style={{ height: '20px', backgroundColor: 'transparent' }} />}
    </>
  );
}
