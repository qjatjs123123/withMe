import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { useCreateBlockNote } from '@blocknote/react';

interface ClipBoardButtonProps {
  message: string;
}

export default function ClipBoardButton({ message }: ClipBoardButtonProps) {
  const editor = useCreateBlockNote();

  return (
    <button
      onClick={async () => {
        const blocks = await editor.tryParseMarkdownToBlocks(message);
        const HTMLFromBlocks = await editor.blocksToHTMLLossy(blocks);

        // 클립보드 아이템 생성
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([HTMLFromBlocks], { type: 'text/html' }),
        });

        navigator.clipboard.write([clipboardItem]);
      }}
      className="absolute top-[0.2rem] right-[0.2rem] flex items-center text-xs px-2 py-1 rounded hover:bg-gray-200"
      style={{ zIndex: 10 }}
    >
      <HiOutlineClipboardCopy className="mr-1" size={20} />
      <strong>복사</strong>
    </button>
  );
}
