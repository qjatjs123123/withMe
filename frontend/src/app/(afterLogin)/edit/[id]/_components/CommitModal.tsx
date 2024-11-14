import { useState, useRef, useEffect } from 'react';
import { useMarkdown } from '../_contexts/MarkdownContext';
import { useInfo } from '../_contexts/InfoContext';
import { getCookieValue } from '@/util/axiosConfigClient';

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
  const { userName, repoName, token } = useInfo();
  const { saveMarkdowns, getAllMarkdowns } = useMarkdown();
  const [isCommitting, setIsCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultBranch, setDefaultBranch] = useState<string>('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const userDataCookie = getCookieValue('userData');
  const userData = JSON.parse(userDataCookie as string);
  const provider = userData.provider;

  // 레포지토리의 기본 브랜치 확인
  const checkDefaultBranch = async () => {
    try {
      //TODO: username 대신 owner를 사용하도록 수정

      const url =
        provider === 'github'
          ? `https://api.github.com/repos/${userName}/${repoName}`
          : `https://lab.ssafy.com/api/v4/projects/${userName}%2F${repoName}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const repoData = await response.json();
        setDefaultBranch(repoData.default_branch);
      } else {
        console.error('Failed to fetch repository info');
        setDefaultBranch('main'); // 기본값으로 main 설정
      }
    } catch (error) {
      console.error('Error fetching repository info:', error);
      setDefaultBranch('main'); // 에러 발생 시 main으로 설정
    }
  };

  useEffect(() => {
    if (isOpen && userName && repoName && provider) {
      checkDefaultBranch();
    }
  }, [isOpen, userName, repoName, provider]);

  const createCommit = async (message: string) => {
    saveMarkdowns();
    // UTF-8로 인코딩 후 base64로 변환
    const encoder = new TextEncoder();
    const contentBytes = encoder.encode(getAllMarkdowns());
    const content = Buffer.from(contentBytes).toString('base64');

    if (provider === 'github') {
      createGitHubCommit(message, content);
    } else if (provider === 'gitlab') {
      createGitlabCommit(message, content);
    } else return;
  };

  const createGitHubCommit = async (message: string, content: string) => {
    try {
      // 1. 현재 파일의 SHA 가져오기
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${userName}/${repoName}/contents/README.md?ref=${defaultBranch}`,
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

      // 2. 파일 업데이트 또는 생성
      const response = await fetch(`https://api.github.com/repos/${userName}/${repoName}/contents/README.md`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: 'Bearer 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',
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
        throw new Error(`Failed to create commit: ${errorData.message}`);
      }

      const data = (await response.json()) as GitHubCommitResponse;
      onClose();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const createGitlabCommit = async (commit_message: string, content: string) => {
    console.log(content);

    try {
      // 1. 현재 파일의 SHA 가져오기
      const getFileResponse = await fetch(
        `https://lab.ssafy.com/api/v4/projects/${userName}%2F${repoName}/repository/files/README.md?ref=${defaultBranch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(getFileResponse);
      // 2. 파일 유무에 따라 HTTP Method 변경
      const method = getFileResponse.ok ? 'PUT' : 'POST';

      // 3. 파일 업데이트 또는 생성
      const response = await fetch(
        `https://lab.ssafy.com/api/v4/projects/${userName}%2F${repoName}/repository/files/README.md`,
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
        throw new Error(`Failed to create commit: ${errorData.message}`);
      }

      const data = (await response.json()) as GitLabCommitResponse;
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
      alert('커밋 메시지를 입력해주세요.');
      return;
    }

    setIsCommitting(true);
    setError(null);

    try {
      await createCommit(message);
    } catch (error) {
      setError('Failed to create commit. Please try again.');
      console.error('Failed to create commit:', error);
    } finally {
      setIsCommitting(false);
    }
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
          <div className="py-1">Repository: {repoName}</div>
          <div className="py-1">Author: {userName}</div>
          <div className="py-1">Branch: {defaultBranch}</div>
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
            disabled={isCommitting}
          >
            {isCommitting ? 'Committing...' : 'Commit Changes'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
