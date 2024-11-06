import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

type CommitModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface GitHubCommitResponse {
  commit: {
    sha: string;
    html_url: string;
  };
}

export function CommitModal({ isOpen, onClose }: CommitModalProps) {
  const [repository, setRepository] = useState('BlockNote');
  const [branch, setBranch] = useState('main');
  const [author, setAuthor] = useState('Jaeyoung9999');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const createCommit = async (message: string) => {
    const token = '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';
    const content = btoa('# BlockNote\nThis is a test5 README file.');

    try {
      // 1. 현재 파일의 SHA 가져오기
      const getFileResponse = await fetch(`https://api.github.com/repos/${author}/${repository}/contents/README.md`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let sha = '';
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }

      // 2. 파일 업데이트 또는 생성 (SHA가 있으면 업데이트, 없으면 새로 생성)
      const response = await fetch(`https://api.github.com/repos/${author}/${repository}/contents/README.md`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content,
          sha, // SHA가 비어있으면 새로 생성, 있으면 업데이트
          branch,
          committer: {
            name: author,
            email: `${author}@users.noreply.github.com`,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('GitHub API Error:', errorData);
        throw new Error(`Failed to create commit: ${errorData.message}`);
      }

      return response.json() as Promise<GitHubCommitResponse>;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const commitMutation = useMutation({
    mutationFn: createCommit,
    onSuccess: (data) => {
      console.log('Commit created successfully:', data.commit.html_url);
      onClose();
    },
    onError: (error) => {
      console.error('Failed to create commit:', error);
    },
  });

  const handleCommit = () => {
    const message = messageRef.current?.value.trim();

    if (!message) {
      alert('커밋 메시지를 입력해주세요.');
      return;
    }

    commitMutation.mutate(message);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-5 z-50 border border-gray-200">
      <div className="w-[260px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Commit README.md</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl leading-none">
            &times;
          </button>
        </div>

        <div className="space-y-1 mb-4 text-sm text-gray-500">
          <div className="py-1">Repository: {repository}</div>
          <div className="py-1">Branch: {branch}</div>
          <div className="py-1">Author: {author}</div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Commit Message</label>
            <textarea
              ref={messageRef}
              className="w-full p-2 border border-gray-300 rounded-md h-14 text-sm"
              placeholder="Please enter your commit message..."
            />
          </div>

          <button
            className="w-full text-white py-2 px-4 rounded-md hover:opacity-75 transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#020623' }}
            onClick={handleCommit}
            disabled={commitMutation.isPending}
          >
            {commitMutation.isPending ? 'Committing...' : 'Commit Changes'}
          </button>

          {commitMutation.isError && (
            <p className="text-red-500 text-sm mt-2">Error creating commit. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
