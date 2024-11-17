import { useState, useRef, useEffect } from 'react';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useInfo } from '../_contexts/InfoContext';
import { useConnection } from '../_contexts/ConnectionContext';
import { getCookieValue } from '@/util/axiosConfigClient';
import useErrorHandler from '@/app/(afterLogin)/workspace/business/useErrorHandler';

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

interface GitLabCommitResponse {
  filename: string;
  branch: string;
}

export function CommitModal({ isOpen, onClose }: CommitModalProps) {
  const { userName, repoName, token, ownerName } = useInfo();
  const { saveMarkdowns, getAllMarkdowns } = useMarkdown();
  const { rooms } = useConnection();
  const [isCommitting, setIsCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultBranch, setDefaultBranch] = useState<string>('');
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { handlerMessage } = useErrorHandler();

  const userDataCookie = getCookieValue('userData');
  const userData = JSON.parse(userDataCookie as string);
  const provider = userData.provider;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const checkDefaultBranch = async () => {
    try {
      await handlerMessage('기본 브랜치 확인 중...');
      let url: string;
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };

      if (provider === 'github') {
        url = `https://api.github.com/repos/${ownerName}/${repoName}`;
      } else if (provider === 'gitlab') {
        const encodedPath = encodeURIComponent(`${ownerName}/${repoName}`);
        url = `https://lab.ssafy.com/api/v4/projects/${encodedPath}`;
      } else {
        throw new Error('Unsupported provider');
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Failed to fetch repository info: ${response.statusText}`);
      }

      const repoData = await response.json();
      setDefaultBranch(repoData.default_branch);
      await handlerMessage('브랜치 확인 완료');
    } catch (error) {
      console.error('Error fetching repository info:', error);
      await handlerMessage('브랜치 확인 실패');
      setDefaultBranch('main');
    }
  };

  useEffect(() => {
    if (defaultBranch) return;

    if (ownerName && repoName && provider) {
      checkDefaultBranch();
    }
  }, [ownerName, repoName, provider]);

  const createCommit = async (message: string) => {
    saveMarkdowns();
    await handlerMessage('커밋 내용 준비 중...');

    if (provider === 'github') {
      const encoder = new TextEncoder();
      const contentBytes = encoder.encode(getAllMarkdowns());
      const content = Buffer.from(contentBytes).toString('base64');
      await createGitHubCommit(message, content);
    } else if (provider === 'gitlab') {
      await createGitlabCommit(message, getAllMarkdowns());
    } else return;
  };

  const createGitHubCommit = async (message: string, content: string) => {
    try {
      await handlerMessage('현재 파일 상태 확인 중...');
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${ownerName}/${repoName}/contents/README.md?ref=${defaultBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      let sha = '';
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }

      await handlerMessage('커밋 생성 중...');
      const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/contents/README.md`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content,
          sha,
          branch: defaultBranch,
          committer: {
            name: userName,
            email: `${userName}@users.noreply.github.com`,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('GitHub API Error:', errorData);
        await handlerMessage('커밋 생성 실패');
        throw new Error(`Failed to create commit: ${errorData.message}`);
      }

      const data = (await response.json()) as GitHubCommitResponse;
      await handlerMessage('커밋이 성공적으로 생성되었습니다!');
      onClose();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const createGitlabCommit = async (commit_message: string, content: string) => {
    try {
      await handlerMessage('현재 파일 상태 확인 중...');
      const getFileResponse = await fetch(
        `https://lab.ssafy.com/api/v4/projects/${ownerName}%2F${repoName}/repository/files/README.md?ref=${defaultBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const method = getFileResponse.ok ? 'PUT' : 'POST';

      await handlerMessage('커밋 생성 중...');
      const response = await fetch(
        `https://lab.ssafy.com/api/v4/projects/${ownerName}%2F${repoName}/repository/files/README.md`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branch: defaultBranch,
            commit_message,
            content,
            author_name: userName,
            author_email: `${userName}@users.noreply.lab.ssafy.com`,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('GitLab API Error:', errorData);
        await handlerMessage('커밋 생성 실패');
        throw new Error(`Failed to create commit: ${errorData.message}`);
      }

      const data = (await response.json()) as GitLabCommitResponse;
      await handlerMessage('커밋이 성공적으로 생성되었습니다!');
      onClose();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleCommit = async () => {
    const message = messageRef.current?.value.trim();

    if (!message) {
      await handlerMessage('커밋 메시지를 입력해주세요');
      return;
    }

    setIsCommitting(true);
    setError(null);

    try {
      await createCommit(message);
    } catch (error) {
      setError('커밋 생성에 실패했습니다. 다시 시도해주세요.');
      console.error('Failed to create commit:', error);
    } finally {
      setIsCommitting(false);
    }
  };

  if (!isOpen) return null;

  const isCommitDisabled = isCommitting || rooms.size !== 10;

  return (
    <div
      ref={modalRef}
      className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-5 z-50 border border-gray-200"
    >
      <div className="w-[260px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Commit README.md</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl leading-none">
            &times;
          </button>
        </div>

        <div className="space-y-1 mb-4 text-sm text-gray-500">
          <div className="py-1">Repository: {repoName}</div>
          <div className="py-1">Author: {userName}</div>
          <div className="py-1">Branch: {defaultBranch}</div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">Commit Message</label>
            <textarea
              ref={messageRef}
              className="w-full p-2 border border-gray-300 rounded-md h-14 text-sm edit-scrollbar"
              placeholder="Please enter your commit message..."
              disabled={rooms.size !== 10}
            />
          </div>

          <button
            className="w-full text-white py-2 px-4 rounded-md hover:opacity-75 transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#020623' }}
            onClick={handleCommit}
            disabled={isCommitDisabled}
          >
            {isCommitting ? 'Committing...' : rooms.size === 10 ? 'Commit & Push' : 'Loading...'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
