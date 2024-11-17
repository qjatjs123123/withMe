'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InfoProvider } from './_contexts/InfoContext';
import { ActiveIdProvider } from './_contexts/ActiveIdContext';
import { MenuItemsProvider } from './_contexts/MenuItemsContext';
import { EditorProvider } from './_contexts/EditorContext';
import { LeftBar } from './_components/LeftBar';
import { LiveblocksProvider } from '@liveblocks/react/suspense';
import Nav from './_components/Nav';
import { MarkdownProvider } from './_contexts/MarkdownContext';
import RightMain from './_components/RightMain';
import LeftMain from './_components/LeftMain';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { ConnectionProvider } from './_contexts/ConnectionContext';
import SnackBarUI from '@/app/_components/SnackBarUI';
import { SnackBarProvider } from '@/app/(afterLogin)/_components/SnackBarProvider';

const LEFT_SIDEBAR_WIDTH = 240;

export default function EditPage() {
  const [leftSize, setLeftSize] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && mainContainerRef.current) {
      const containerWidth = mainContainerRef.current.offsetWidth;
      const sidebarWidth = isSidebarOpen ? LEFT_SIDEBAR_WIDTH : 0;
      if (isVertical) {
        const adjustedY = e.clientY - 90;
        const newLeftHeight = (adjustedY / (window.innerHeight - 90)) * 100;
        if (newLeftHeight > 0 && newLeftHeight < 100) {
          setLeftSize(newLeftHeight);
        }
      } else {
        const adjustedX = e.clientX - sidebarWidth;
        const newLeftWidth = (adjustedX / containerWidth) * 100;
        if (newLeftWidth > 0 && newLeftWidth < 100) {
          setLeftSize(newLeftWidth);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 컴포넌트 언마운트 시 overflow를 제거
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <InfoProvider>
      <ActiveIdProvider>
        <MenuItemsProvider>
          <ConnectionProvider>
            <MarkdownProvider>
              <EditorProvider>
                <SnackBarProvider>
                  <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
                    <div className="flex flex-col bg-white h-full">
                      <Nav />
                      <div className="flex h-full">
                        <div className="h-full bg-[#f9f9f9]" style={{ fontFamily: 'SamsungOneKorean-700' }}>
                          <LeftBar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                        </div>

                        <div
                          className="flex-1"
                          ref={mainContainerRef}
                          style={{ width: `calc(100% - ${LEFT_SIDEBAR_WIDTH}px)` }}
                        >
                          <div className="flex flex-col md:flex-row" style={{ height: `calc(100vh - 90px)` }}>
                            <div
                              style={isVertical ? { height: `${leftSize}%`, width: '100%' } : { width: `${leftSize}%` }}
                              className="h-full w-full edit-scrollbar"
                            >
                              <LeftMain />
                            </div>

                            <div
                              className="hide-below-md bg-gray-400 cursor-pointer flex flex-col items-center justify-around"
                              style={{
                                width: isVertical ? '100%' : '6px',
                                height: isVertical ? '6px' : '100%',
                                cursor: isVertical ? 'row-resize' : 'col-resize',
                              }}
                              onMouseDown={handleMouseDown}
                            >
                              <BiDotsVerticalRounded size={isVertical ? 48 : 24} />
                            </div>

                            <div
                              style={isVertical ? { height: `${100 - leftSize}%` } : { width: `${100 - leftSize}%` }}
                              className="h-full overflow-x-hidden"
                            >
                              <RightMain />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <SnackBarUI />
                  </LiveblocksProvider>
                </SnackBarProvider>
              </EditorProvider>
            </MarkdownProvider>
          </ConnectionProvider>
        </MenuItemsProvider>
      </ActiveIdProvider>
    </InfoProvider>
  );
}
