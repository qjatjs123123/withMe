'use client';

import React, { useEffect, useState } from 'react';
import RepoCheck from './RepoCheck';
import { useUserRepoQuery } from '@/stores/server/getUserRepoQuery';
import { useGlobalState } from '../../_components/RepoModalProvider';

interface RepoListProps {
  searchText: string;
  setSelectedRepo;
  selectedRepo;
}

const RepoList = ({ searchText, setSelectedRepo, selectedRepo }: RepoListProps) => {
  const { data } = useUserRepoQuery(null);
  const repos = data?.data ?? [];
  const { setCurRepo } = useGlobalState();

  const handleClick = (index: number, repo) => {
    setSelectedRepo(index === selectedRepo ? null : index);
    setCurRepo(repo);
  };

  // 검색 필터링: name에 searchText가 포함된 항목만 보여줌
  const filteredRepos = repos.filter((repo) => repo.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <ul className="repo-list scrollbar">
      {filteredRepos.map((repo, index) => (
        <li key={index} className="repo-item flex justify-start items-center" onClick={() => handleClick(index, repo)}>
          <div className="repo_check flex-shrink-0">{selectedRepo === index && <RepoCheck />}</div>
          <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{repo.name}</div>
        </li>
      ))}
      <style jsx>{`
        .repo_check {
          width: 20px;
          height: inherit;
        }
        .repo-list {
          list-style: none;
          padding: 0;
          margin: 10px 0;
          height: 200px;
        }
        .repo-item {
          padding: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
        }
        .repo-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </ul>
  );
};

export default RepoList;
