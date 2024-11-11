'use client';

import AddModal from './AddModal';
import { useGlobalState } from '../../_components/RepoModalProvider';
export default function RepoBtn() {
  const { isVisible, modalRef, btnRef, setIsVisible } = useGlobalState();

  return (
    <div className="repoBtn-Wrapper">
      <style>
        {`
        .repoBtn-Wrapper{
            position:relative;
            height:100%;
        }
            .repoBtn {
            
              display: flex;
              justify-content: center; /* Center horizontally */
              align-items: center; /* Center vertically */
              border: 2px solid #020623; /* border color */
              color: #020623; /* font color */
              background-color: transparent; /* 배경 투명 */
              padding: 3px; /* 패딩 */
              font-size: 16px; /* 폰트 크기 */
              cursor: pointer; /* 커서 포인터 */
              border-radius: 10px;
              height: 100%;
              transition: background-color 0.3s, color 0.3s; /* 애니메이션 효과 */
              gap:5px;
              padding-left:5px;
              padding-right:5px;
              font-weight: bold;
            }
  
            .repoBtn:hover {
              background-color: #020623; /* hover 시 배경색 */
              color: #ffffff; /* hover 시 글자색 */
            }
  
            .repoBtn:hover .icon {
              fill: #ffffff; /* 호버 시 아이콘 색상 변경 */
            }
          `}
      </style>

      <button
        ref={btnRef}
        className="repoBtn flex justify-center items-center"
        onClick={() => setIsVisible(!isVisible)}
      >
        <svg className="icon" width="20" height="20" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="icon"
            d="M14.8415 22.9412H17.5399V17.5444H22.9367V14.846H17.5399V9.44916H14.8415V14.846H9.44464V17.5444H14.8415V22.9412ZM16.1907 29.6873C14.3243 29.6873 12.5703 29.3387 10.9288 28.6416C9.28723 27.922 7.85932 26.9551 6.64504 25.7408C5.43075 24.5265 4.46382 23.0986 3.74424 21.4571C3.04715 19.8156 2.69861 18.0616 2.69861 16.1952C2.69861 14.3288 3.04715 12.5748 3.74424 10.9333C4.46382 9.29175 5.43075 7.86384 6.64504 6.64955C7.85932 5.43527 9.28723 4.47958 10.9288 3.78249C12.5703 3.06291 14.3243 2.70312 16.1907 2.70312C18.0571 2.70312 19.811 3.06291 21.4526 3.78249C23.0941 4.47958 24.522 5.43527 25.7363 6.64955C26.9506 7.86384 27.9063 9.29175 28.6034 10.9333C29.3229 12.5748 29.6827 14.3288 29.6827 16.1952C29.6827 18.0616 29.3229 19.8156 28.6034 21.4571C27.9063 23.0986 26.9506 24.5265 25.7363 25.7408C24.522 26.9551 23.0941 27.922 21.4526 28.6416C19.811 29.3387 18.0571 29.6873 16.1907 29.6873ZM16.1907 26.9888C19.2039 26.9888 21.7562 25.9432 23.8474 23.8519C25.9387 21.7607 26.9843 19.2084 26.9843 16.1952C26.9843 13.182 25.9387 10.6297 23.8474 8.53844C21.7562 6.44717 19.2039 5.40154 16.1907 5.40154C13.1774 5.40154 10.6252 6.44717 8.53393 8.53844C6.44266 10.6297 5.39702 13.182 5.39702 16.1952C5.39702 19.2084 6.44266 21.7607 8.53393 23.8519C10.6252 25.9432 13.1774 26.9888 16.1907 26.9888Z"
            fill="#020623"
          />
        </svg>
        추가
      </button>
      {isVisible && <AddModal ref={modalRef} onClose={setIsVisible} />}
    </div>
  );
}
