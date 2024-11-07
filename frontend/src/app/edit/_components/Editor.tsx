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
import { getCookieValue } from '@/util/axiosConfigClient';

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};

export function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

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

async function uploadFile(file: File) {
  const body = new FormData();
  body.append('file', file);

  const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: body,
  });
  return (await ret.json()).data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
}

function BlockNote({ doc, provider }: EditorProps) {
  const room = useRoom();
  const { markdowns, setMarkdowns } = useMarkdown();
  const { editorsRef } = useEditor();
  const id = room.id.slice(5);
  const userDataCookie = getCookieValue('userData');
  const userData = JSON.parse(userDataCookie!);
  const userName = userData.name;

  const onChange = async () => {
    // 현재 에디터 내용을 마크다운으로 변환
    const markdown = await editor.blocksToMarkdownLossy(editor.document);

    // markdowns 배열을 순회하면서 id가 일치하는 항목만 content 업데이트
    const updatedMarkdowns = markdowns!.map((item) => {
      if (item.id === id) {
        return { ...item, content: markdown };
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
        color: '#ff0000',
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
    <div>
      <BlockNoteView editor={editor} onChange={onChange} editable={activeId === id} />
    </div>
  );
}
