// 개별 작업 공간의 속성을 정의하는 인터페이스
export interface WorkspaceContent {
  id: number;
  name: string;
  thumbnail: string;
  repoUrl: string;
  isCreated: boolean;
  readmeContent: string;
  isPrivate: boolean;
  owner: string;
  updatedAt: string;
}

// 페이지 정보와 정렬 옵션을 정의하는 인터페이스
export interface SortOption {
  direction: 'ASC' | 'DESC';
  property: string;
  ignoreCase: boolean;
  nullHandling: 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';
  ascending: boolean;
  descending: boolean;
}

// 페이지 매개변수와 정렬 옵션을 포함하는 인터페이스
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortOption[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 페이지 데이터를 포함하는 인터페이스
export interface WorkspaceData {
  content: WorkspaceContent[];
  pageable: Pageable;
  size: number;
  number: number;
  sort: SortOption[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 최상위 응답 구조를 정의하는 인터페이스
export interface ApiResponse {
  status: number;
  message: string;
  code: string | null;
  isSuccess: boolean;
  data: WorkspaceData;
  timestamp: string; // ISO 8601 형식의 문자열로서 시간 정보
  pages: test[];
}

// 전체 JSON 데이터를 포괄하는 최종 타입
export interface RootResponse {
  data: ApiResponse;
}

export interface test {
  data: test1;
}

export interface test1 {
  data: WorkspaceData;
}
