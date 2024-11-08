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
import useImageUpload from '@/app/(afterLogin)/workspace/business/useImageUpload';
import { API_URL } from '@/util/constants';

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

function BlockNote({ doc, provider }: EditorProps) {
  const room = useRoom();
  const { markdowns, setMarkdowns } = useMarkdown();
  const { editorsRef } = useEditor();
  const id = room.id.slice(5);
  const { userName, repoUrl } = useInfo();

  const uploadFile = async (file: File) => {
    useImageUpload(repoUrl);
    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.UPLOAD_IMAGE}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       repository_url: repoUrl,
    //       image: file,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Image upload failed');
    //   }

    //   const data = await response.json();
    //   return data.imageUrl;
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    //   throw error;
    // }
  };

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);

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
