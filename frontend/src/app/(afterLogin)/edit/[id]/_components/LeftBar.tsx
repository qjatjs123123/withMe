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
import FoldButton from './FoldButton';

function LeftBarContent({ toggleSidebar }) {
  const { activeId, setActiveId } = useActiveId();
  const { initialItems, setInitialItems, menuItems, setMenuItems } = useMenuItems();
  const { editorsRef } = useEditor();
  const [draggedItem, setDraggedItem] = useState<MenuItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

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

      // 현재 사용 중인 id들을 Set으로 만들어 빠른 검색이 가능하게 함
      const usedIds = new Set(menuItems.map((item) => item.id));

      // initialItems에서 아직 사용되지 않은 첫 번째 id를 찾음
      const availableId = initialItems.find((item) => !usedIds.has(item.id))?.id;

      if (!availableId) return;

      const newTab: MenuItem = {
        id: availableId,
        label: '',
      };

      const updatedMenuItems = [...menuItems, newTab];
      storage.set('menuItems', updatedMenuItems);
      setMenuItems(updatedMenuItems);
      setActiveId(newTab.id);
      setEditingId(newTab.id);
      setEditValue('');
    },
    [menuItems, initialItems],
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
    [activeId],
  );

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (menuItems && menuItems.length <= 1) {
      alert('마지막 탭은 삭제할 수 없습니다.');
      return;
    }
    if (window.confirm('정말 이 탭을 삭제하시겠습니까?')) {
      deleteItem(id);
    }
  };

  const handleEditClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    setEditingId(item.id);

    setEditValue(item.label);
  };

  const handleEditSubmit = (id: string) => {
    if (editValue.trim()) {
      updateItemLabel({ id, newLabel: editValue.trim() });
    }
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
      <FoldButton toggleSidebar={toggleSidebar} />
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
            w-full px-4 py-3 rounded-lg
            transition-colors duration-200
            text-xl font-bold
            group
            ${editingId !== item.id ? 'cursor-grab active:cursor-grabbing' : ''}
            ${
              activeId === item.id
                ? 'bg-white bg-opacity-10 text-white'
                : 'text-gray-400 hover:bg-white hover:bg-opacity-5 hover:text-gray-200'
            }
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
              className="bg-transparent border-none outline-none flex-1 text-white"
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
            text-sm font-medium
            border border-dashed border-gray-600
            text-gray-300 hover:text-white
            hover:bg-white hover:bg-opacity-5
            hover:border-gray-400
            flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>새 탭 추가</span>
        </button>
      )}
    </div>
  );
}

export function LeftBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open and close the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ClientSideSuspense fallback={<div>Loading...</div>}>
      {() => (
        <div
          className={`bg-gray-900 w-60 border-r h-full relative transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-60'}`}
        >
          <LeftBarContent toggleSidebar={toggleSidebar} />
        </div>
      )}
    </ClientSideSuspense>
  );
}
