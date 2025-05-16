
'use client';
const testData = [];
const data1= 
    {
        "id": 514,
        "name": "BreakFriendShip",
        "owner": "qjatjs123123",
        "thumbnail": "https://withme.s3.amazonaws.com/img/501c47f9-2f0b-40e6-8c8c-0612f06e59a1_breakfriendship.jfif",
        "repoUrl": "https://github.com/qjatjs123123/BreakFriendShip",
        "isCreated": true,
        "readmeContent": "# notice_board1111\n\nJSP를 활용한 게시판\n\n## 개요\n\n게시판을 만듦으로써 대용량 데이터일때 처리해야하는 페이징 처리, 민감한 정보를 저장할 때 암호화 처리, 이메일 인증 API, BACK End, Front End 공부를 하기 위해서 본 프로젝트를 수행하였다.\n\n## 페이징 처리 - 게시판\n\n페이징 처리란 데이터 베이스에 저장된 데이터가 소량일 경우는 상관이 없지만, 대량일 경우 한꺼번에 불러와서 처리하는 것은 비효율적이다. 그 이유는 사용자가 직접 보는 화면에는 소량의 데이터만 필요하기 때문이다.\n\n![carbon](<https://user-images.githubusercontent.com/74814641/160281871-b7ebbc90-6668-428e-8577-57f77bac259a.png>)\n\n위 코드는 DB에서 게시판 데이터를 불러와 ArrayList에 저장한 뒤 리턴하는 코드의 일부이다. 1페이지일 때 실행되는 코드로 쿼리문은 bbs(게시판)테이블에서 데이터를 불러오되 bbsID가 getNext()(이 함수는 데이터가 저장될 때 그 다음 bbsID를 가져오는 함수)보다 작고 bbsAvailable(1이면 존재, 0이면 삭제)가 1이고 bbsID를 내림차순으로 정렬하고 10개만 가져오는 쿼리이다.\n\n![image](<https://user-images.githubusercontent.com/74814641/160282559-cd442204-c56c-4452-bc72-02dc8444d74a.png>)\n\n위에 이미지를 보게되면 1페이지 임으로 해쉬맵 변수 head_list에 key값으로 1, value로는 23이 저장된다. tail_list에도 마찬가지로 key값으로 1, value로는 10이 저장된다.\n\n![image](<https://user-images.githubusercontent.com/74814641/160282901-5b9c5fda-7c17-43ac-b894-7b43d498b95d.png>)\n\n위에 이미지를 보게되면 2페이지 임으로 해쉬맵 변수 head_list에 key값으로 2, value로는 9가 저장된다. tail_list에도 마찬가지로 key값으로 2, value로는 1이 저장된다.\n\n![image](<https://user-images.githubusercontent.com/74814641/160282791-09933af6-c284-40bb-a267-7bb00dedaaa1.png>)\n\n위에 이미지는 해쉬맵에 저장된 head_list, tail_list를 가지고 데이터를 가져오는 코드이다. 이렇게 하여 페이지를 자유롭게 이동하여도 PageNumber를 key값으로 하여 해쉬맵에서 bbsID를 가져와서 데이터를 가져온다. 이렇게 하여 게시판 페이징 처리를 구현하였다.\n\n## 페이징 처리 - 댓글\n\n댓글에 모든 데이터를 불러와서 처리하기 보다는 현재 화면에 필요한 정보의 데이터만 가져오도록 구현하였다. 그 방법은 스크롤바가 화면 맨 아래에 닿았을 때 AJAX를 활용하여 10개의 데이터만 가져오도록 구현하였다.\n\n![image](<https://user-images.githubusercontent.com/74814641/160283538-ca22fc79-773b-4be5-bf12-34b0741ef450.png>)\n\nJQuery를 사용하였고 스크롤바가 화면 맨 아래에 있는지 확인하는 조건문이 있다. 그 조건을 만족한다면 AJAX를 활용하여 새로고침하지 않아도 댓글을 볼 수 있도록 하였다. replyListAction.jsp에서 전달받은 문자열을 가공처리하고 화면에 나타나는 함수이다.\n\n![ezgif com-gif-maker](<https://user-images.githubusercontent.com/74814641/160284125-e9f5497e-5f9d-45d9-b530-44547012d7bf.gif>)\n\n댓글 페이징 처리이다.\n\n## BCrpyt를 이용한 중요정보 암호화\n\n![image](<https://user-images.githubusercontent.com/74814641/160284270-c0883bcb-1573-4aff-84ce-0762d2fac544.png>)\n\n주민등록번호, 비밀번호, 이메일 인증에 필요한 해쉬값이 암호화 되어있는 것을 볼 수 있다.\n\n## Google Gmail API를 사용한 비밀번호 인증\n\n<https://user-images.githubusercontent.com/74814641/160284505-35d026f9-6978-4098-be32-a4ba6dc93552.mp4>\n\nURL 해쉬코드값과 DB에 저장된 해쉬코드값이랑 비교하여 인증을 한다.\n\n\n\n",
        "isPrivate": false,
        "roomId": "WITHME_ROOM_ID_5590256978741015135",
        "createdAt": "2024-11-14T00:54:53.189639",
        "updatedAt": "2024-11-17T13:15:17.874499"
    }   


for (let i = 0; i < 30000; i++) testData.push(data1);


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
    if (index === selectedRepo) setCurRepo(null);
    else setCurRepo(repo);
    setSelectedRepo(index === selectedRepo ? null : index);
  };

  // 검색 필터링: name에 searchText가 포함된 항목만 보여줌
  const filteredRepos = testData.filter((repo) => repo.name.toLowerCase().includes(searchText.toLowerCase()));

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

// import React, { useEffect, useState } from 'react';
// import RepoCheck from './RepoCheck';
// import { useUserRepoQuery } from '@/stores/server/getUserRepoQuery';
// import { useGlobalState } from '../../_components/RepoModalProvider';
// import { VirtualizedList } from './VirtualList';

// interface RepoListProps {
//   searchText: string;
//   setSelectedRepo;
//   selectedRepo;
// }

// const RepoList = ({ searchText, setSelectedRepo, selectedRepo }: RepoListProps) => {
//   const { data } = useUserRepoQuery(null);
//   const repos = data?.data ?? [];
//   const { setCurRepo } = useGlobalState();

//   const handleClick = (index: number, repo) => {
//     if (index === selectedRepo) setCurRepo(null);
//     else setCurRepo(repo);
//     setSelectedRepo(index === selectedRepo ? null : index);
//   };

//   // 검색 필터링: name에 searchText가 포함된 항목만 보여줌
//   const filteredRepos = testData.filter((repo) => repo.name.toLowerCase().includes(searchText.toLowerCase()));
//   const props = filteredRepos.map((repo, index) => (
//     <div key={index} className="repo-item flex justify-start items-center" onClick={() => handleClick(index, repo)}>
//       <div className="repo_check flex-shrink-0">{selectedRepo === index && <RepoCheck />}</div>
//       <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{repo.name}</div>
//     </div>
//   ));

//   return (
//     <VirtualizedList items={props} itemHeight={40} windowHeight={240} />

//   );
// };

// export default RepoList;
