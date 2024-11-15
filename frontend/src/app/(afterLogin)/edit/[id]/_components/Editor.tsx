'use client';

import { useEffect, useState } from 'react';
import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { useRoom } from '@liveblocks/react/suspense';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useEditor } from '../_contexts/EditorContext';
import { useActiveId } from '../_contexts/ActiveIdContext';
import { useInfo } from '../_contexts/InfoContext';
import { API_URL } from '@/util/constants';
import axios from 'axios';
import { useStatus } from '@liveblocks/react/suspense';
import { Loading } from './Loading';
import { useConnection } from '../_contexts/ConnectionContext';
import { getRandomColor } from '../_utils/getRandomColor';

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const status = useStatus();
  const connection = useConnection();

  useEffect(() => {
    if (status === 'connected' && !connection.isRoomConnected(room.id)) {
      connection.rooms.add(room.id);
    }
  }, [status, room.id, connection]);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} />;
}

function BlockNote({ doc, provider }: EditorProps) {
  const room = useRoom();
  const { markdowns, setMarkdowns } = useMarkdown();
  const { editorsRef } = useEditor();
  const id = room.id.slice(5);
  const { userName, repoUrl } = useInfo();
  const status = useStatus();

  const uploadFile = async (file: File) => {
    const body = new FormData();
    body.append('image', file);
    body.append('repository_url', repoUrl);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.UPLOAD_IMAGE}`, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Image upload failed');
      }

      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  // const fixTableMarkdown = (markdown: string): string => {
  //   // 각 표를 개별적으로 찾아서 처리
  //   return markdown.replace(
  //     /\|((?:\s*\|\s*)+)\n(\|(?:\s*-+\s*\|)+)\n(\|(?:[^|\n]*\|)+)(?:\n|$)/g,
  //     (match, firstRow, separator, contentRow) => {
  //       // 각 표마다 내용행, 구분선행 순서로 재배치
  //       return `${contentRow}\n${separator}\n`;
  //     },
  //   );
  // };
  const fixTableMarkdown = (markdown: string): string => {
    // 빈 행으로 시작하는 표를 찾아서 수정하는 정규식
    const pattern = /\|(\s*\|\s*)+\n(\|(?:\s*-+\s*\|)+)\n(\|(?:[^|\n]*\|)+(?:\n\|(?:[^|\n]*\|)+)*)/g;

    return markdown.replace(pattern, (match, emptyRow, separator, content) => {
      // 내용의 첫 번째 행을 추출
      const contentRows = content.split('\n');
      const firstContentRow = contentRows[0];
      const remainingContent = contentRows.slice(1).join('\n');

      // 새로운 순서로 재구성
      return `${firstContentRow}\n${separator}${remainingContent ? '\n' + remainingContent : ''}`;
    });
  };
  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    const fixedMarkdown = fixTableMarkdown(markdown);

    const updatedMarkdowns = markdowns!.map((item) => {
      if (item.id === id) {
        return { ...item, content: fixedMarkdown };
      }
      return item;
    });

    setMarkdowns(updatedMarkdowns);
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment('document-store'),
      user: {
        name: userName,
        color: getRandomColor(),
      },
    },
    uploadFile,
  });

  useEffect(() => {
    if (editorsRef.current) {
      const updatedEditors = editorsRef.current.map((e) => {
        if (e.id === id) {
          return { ...e, editor };
        }
        return e;
      });
      editorsRef.current = updatedEditors;
    }
  }, [editor.document]);

  const { activeId } = useActiveId();

  return (
    <div className="h-full">
      {status === 'connected' ? (
        <BlockNoteView editor={editor} onChange={onChange} editable={activeId === id} />
      ) : (
        <div className="flex h-full justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Editor;
