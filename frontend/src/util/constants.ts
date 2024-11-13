export const PAGE_HEADER = {
  workspace: '나의 작업공간',
  search: '검색 결과',
};

export const API_URL = {
  LOGIN: '/oauth2/authorization/github',
  WORKSPACE_O: '/api/workspace/visible',
  WORKSPACE_X: '/api/workspace/invisible',
  SYNC: '/api/workspace/refresh',
  LOGIN_LAB: '/oauth2/authorization/gitlab',
  CREATE_WORKSPACE: '/api/workspace',
  SAVE_README: '/api/readme',
  WORKSPACE_INFO: '/api/workspace/info',
  UPLOAD_IMAGE: '/api/workspace/image',
};

export const DELAY_TIME_START = 500;
export const DELAY_TIME_END = 3000;

export const MESSAGE = {
  API_ERROR: '오류가 발생하였습니다.',
  SYNC_START: '동기화 시작...',
  SYNC_SUCCESS: '동기화 완료',
  REPO_CREATE: '레포지토리 생성중...',
  REPO_SUCCESS: '레포지토리 생성완료...',
  VISIBLE: '레포지토리 숨기기...',
  VISIBLE_SUCCCESS: '숨기기 완료',
  IMAGE_CREATE: '이미지 등록중...',
  IMAGE_SUCCESS: '이미지 등록 완료',
};
