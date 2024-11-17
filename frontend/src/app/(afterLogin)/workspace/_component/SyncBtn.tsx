'use client';

import { useUserSyncQuery } from '@/stores/server/getUserSyncQuery';
import { delaySetApiInfo } from '@/util/snackBarFunc';
import { useSnackBarState } from '../../_components/SnackBarProvider';
import useErrorHandler from '../business/useErrorHandler';
import { useUserRepoQuery } from '@/stores/server/getUserRepoQuery';

export default function SyncBtn() {
  const { refetch } = useUserSyncQuery();
  const { handlerRefetch } = useErrorHandler();
  const { refetch: repoRefetch } = useUserRepoQuery(null);
  const handleClick = async () => {
    await handlerRefetch(refetch, repoRefetch);
  };

  return (
    <>
      <style>
        {`
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

      <svg
        className="cursor-pointer"
        width="12"
        height="13"
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
      >
        <path
          className="icon"
          d="M0 26V22.75H4.64062L3.96562 22.1812C2.50312 20.9354 1.47656 19.5135 0.885938 17.9156C0.295313 16.3177 0 14.7063 0 13.0813C0 10.075 0.934875 7.40025 2.80462 5.057C4.67437 2.71375 7.1145 1.1635 10.125 0.40625V3.81875C8.1 4.52292 6.46875 5.72162 5.23125 7.41487C3.99375 9.10812 3.375 10.9969 3.375 13.0813C3.375 14.3 3.61406 15.4852 4.09219 16.6367C4.57031 17.7883 5.31562 18.8511 6.32812 19.825L6.75 20.2313V16.25H10.125V26H0ZM16.875 25.5938V22.1812C18.9 21.4771 20.5312 20.2789 21.7687 18.5868C23.0062 16.8946 23.625 15.0052 23.625 12.9187C23.625 11.7 23.3859 10.5154 22.9078 9.36487C22.4297 8.21437 21.6844 7.15108 20.6719 6.175L20.25 5.76875V9.75H16.875V0H27V3.25H22.3594L23.0344 3.81875C24.4125 5.14583 25.4182 6.58829 26.0516 8.14612C26.685 9.70396 27.0011 11.2948 27 12.9187C27 15.925 26.0651 18.5998 24.1954 20.943C22.3256 23.2863 19.8855 24.8365 16.875 25.5938Z"
          fill="black"
        />
      </svg>
    </>
  );
}
