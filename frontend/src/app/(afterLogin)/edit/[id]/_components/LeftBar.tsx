'use client';

import { useState, useEffect } from 'react';
import { useStorage, useMutation } from '@liveblocks/react/suspense';
import { ClientSideSuspense } from '@liveblocks/react/suspense';
import { MenuItem } from '../_types/MenuItem';
import { EditIcon } from '../_icons/EditIcon';
import { DeleteIcon } from '../_icons/DeleteIcon';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useMenuItems } from '../_contexts/MenuItemsContext';
import { useEditor } from '../_contexts/EditorContext';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useInfo } from '../_contexts/InfoContext';
import FoldButton from './FoldButton';
import { RoomProvider } from '@liveblocks/react';
import { Loading } from './Loading';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 w-80 max-w-md">
        <h3 className="text-lg font-semibold mb-2">탭 삭제</h3>
        <p className="text-gray-600 mb-6">이 탭을 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function LeftBarContent({ isOpen, toggleSidebar }) {
  const { activeId, setActiveId } = useActiveId();
  const { initialItems, setInitialItems, menuItems, setMenuItems } = useMenuItems();
  const { editorsRef } = useEditor();
  const [draggedItem, setDraggedItem] = useState<MenuItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { markdowns, setMarkdowns } = useMarkdown();

  const storageMenuItems = useStorage((root) => root.menuItems);
  const storageInitialMenuItems = useStorage((root) => root.initialMenuItems);

  useEffect(() => {
    setMenuItems(storageMenuItems);
    setInitialItems(storageInitialMenuItems);
  }, [storageMenuItems, setMenuItems, storageInitialMenuItems]);

  useEffect(() => {
    if (menuItems && menuItems.length > 0 && activeId === null) {
      setActiveId(menuItems[0].id);
    }
  }, [menuItems, activeId, setActiveId]);

  const handleItemClick = (id: string) => {
    if (editingId !== id) {
      setActiveId(id);
    }
  };

  const addNewTab = useMutation(
    ({ storage }) => {
      if (!menuItems || !initialItems) return;

      const usedIds = new Set(menuItems.map((item) => item.id));
      const availableId = initialItems.find((item) => !usedIds.has(item.id))?.id;

      if (!availableId) return;

      const newTab: MenuItem = {
        id: availableId,
        label: '새로운 탭',
      };
      const updatedMenuItems = [...menuItems, newTab];
      storage.set('menuItems', updatedMenuItems);
      setMenuItems(updatedMenuItems);
      setActiveId(newTab.id);
      setEditingId(newTab.id);
      setEditValue('');
    },
    [menuItems, initialItems, markdowns],
  );

  const updateItemLabel = useMutation(({ storage }, { id, newLabel }: { id: string; newLabel: string }) => {
    const menuItems = storage.get('menuItems');
    const updatedMenuItems = menuItems.map((item: MenuItem) => (item.id === id ? { ...item, label: newLabel } : item));
    storage.set('menuItems', updatedMenuItems);
    setMenuItems(updatedMenuItems);
  }, []);

  const deleteItem = useMutation(
    ({ storage }, id: string) => {
      const menuItems = storage.get('menuItems');
      if (menuItems.length <= 1) {
        return;
      }

      if (editorsRef.current) {
        const targetEditor = editorsRef.current.find((item) => item.id === id)?.editor;
        if (targetEditor) {
          const allBlocks = targetEditor.document;
          targetEditor.replaceBlocks(allBlocks, []);
        }
      }
      if (markdowns) {
        const updatedMarkdowns = markdowns.map((markdown) =>
          markdown.id === id ? { ...markdown, content: '' } : markdown,
        );
        setMarkdowns(updatedMarkdowns);
      }

      const updatedMenuItems = menuItems.filter((item: MenuItem) => item.id !== id);
      storage.set('menuItems', updatedMenuItems);
      setMenuItems(updatedMenuItems);

      if (activeId === id) {
        const nextItem = updatedMenuItems[0];
        if (nextItem) {
          setActiveId(nextItem.id);
        }
      }
    },
    [activeId, markdowns],
  );

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (menuItems && menuItems.length <= 1) {
      alert('마지막 탭은 삭제할 수 없습니다.');
      return;
    }
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      setItemToDelete(null);
    }
  };

  const handleEditClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.label);
  };

  const handleEditSubmit = (id: string) => {
    const newLabel = editValue.trim() || '새로운 탭';
    updateItemLabel({ id, newLabel });
    setEditingId(null);
    setEditValue('');
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: MenuItem) => {
    setDraggedItem(item);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useMutation(
    ({ storage }, { draggedItem, targetItem }: { draggedItem: MenuItem; targetItem: MenuItem }) => {
      const menuItems = storage.get('menuItems');
      const updatedItems = [...menuItems];
      const draggedIndex = updatedItems.findIndex((item: MenuItem) => item.id === draggedItem.id);
      const targetIndex = updatedItems.findIndex((item: MenuItem) => item.id === targetItem.id);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(targetIndex, 0, removed);
        storage.set('menuItems', updatedItems);
        setMenuItems(updatedItems);
      }
    },
    [],
  );

  if (!menuItems) return null;

  return (
    <div className="h-full px-4 py-6 space-y-2">
      <FoldButton toggleSidebar={toggleSidebar} isOpen={isOpen} />
      {menuItems.map((item: MenuItem) => (
        <div
          key={item.id}
          draggable={editingId !== item.id}
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            e.preventDefault();
            if (!draggedItem) return;
            handleDrop({ draggedItem, targetItem: item });
          }}
          className={`
            w-full px-4 py-2 rounded-lg
            transition-colors duration-200
            text-md font-semibold
            group
            ${editingId !== item.id ? 'cursor-grab active:cursor-grabbing' : ''}
            ${activeId === item.id ? 'bg-gray-200 bg-opacity-70 ' : ' hover:bg-gray-200 hover:bg-opacity-70'}
            flex items-center justify-between
          `}
          onClick={() => handleItemClick(item.id)}
        >
          {editingId === item.id ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleEditSubmit(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSubmit(item.id);
                if (e.key === 'Escape') {
                  setEditingId(null);
                  setEditValue('');
                }
              }}
              className="bg-transparent border-none outline-none w-[100px]"
              autoFocus
            />
          ) : (
            <span>{item.label}</span>
          )}
          {
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
              <button onClick={(e) => handleEditClick(e, item)} className="hover:text-green-500">
                <EditIcon />
              </button>
              <button onClick={(e) => handleDeleteClick(e, item.id)} className="hover:text-red-500">
                <DeleteIcon />
              </button>
            </div>
          }
        </div>
      ))}

      {menuItems.length <= 9 && (
        <button
          onClick={() => addNewTab()}
          className="w-full px-4 py-3 rounded-lg
            transition-all duration-200
            text-sm font-semibold
            border-[1.5px] border-dashed border-gray-600
            
            hover:bg-black
            hover:border-gray-400
            hover:text-white
            flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>새 탭 추가</span>
        </button>
      )}

      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export function LeftBar({ isOpen, toggleSidebar }) {
  const { roomId, menuItems } = useInfo();

  return (
    <RoomProvider
      id={roomId}
      initialStorage={{
        initialMenuItems: menuItems,
        menuItems: menuItems.slice(0, 4),
      }}
    >
      <ClientSideSuspense
        fallback={
          <div
            className="fixed bottom-0 flex w-full justify-center bg-white items-center z-[100]"
            style={{ height: `calc(100vh - 90px)` }}
          >
            <Loading />
          </div>
        }
      >
        {() => (
          <div className={`w-60 border-r-2 h-full relative transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-60'}`}>
            <LeftBarContent toggleSidebar={toggleSidebar} isOpen={isOpen} />
          </div>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
