<div align="center">
<img src="https://github.com/user-attachments/assets/c072e981-652e-4e6a-8978-3d28290a3ebb" width="600"/>
  <br/>
<img src="https://github.com/user-attachments/assets/c127cbc3-413b-4d78-90d1-97992361e387" width="100" height="100"/>
  
### 개발자를 위한 AI 기반 문서 공동 작성 플랫폼 🖍️

[<img src="https://img.shields.io/badge/release-v0.0.0-ㅎㄱㄷ두?style=flat&logo=google-chrome&logoColor=white" />]() 
<br/> [<img src="https://img.shields.io/badge/프로젝트 기간-2024.10.14~2024.11.29-fab2ac?style=flat&logo=&logoColor=white" />]() <br/>
<img src="https://img.shields.io/badge/자율 프로젝트 우수상-FFD700?style=for-the-badge&logo=award&logoColor=white" alt="우수상">

</div> 


## 📝 목차
- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 담당 역할](#2-담당-역할)
- [3. 프로젝트 화면 구성](#3-프로젝트-화면-구성)
- [4. 내가 사용한 기술 스택](#4-사용한-기술-스택)
- [5. 기술적 이슈와 해결 과정](#5-기술적-이슈와-해결-과정)
- [6. 팀원](#6-팀원)

다음과 같은 목차로 구성되어 있습니다.

<br />

## 🚀 프로젝트 개요
💡 **실시간 공동 문서 작성**
- 문서를 최대 10명의 사용자가 실시간으로 분업하여 작성
- liveBlocks 라이브러리를 사용
- 연동된 Git 레포지토리에 실시간으로 Commit 및 Push 기능 제공

💡 **AI 기반 문서초안 생성**
- 레포지토리 파일명을 기반으로 문서 초안을 자동 생성하여 정확성을 향상
- 레포지토리 파일명 탐색 시 비동기 처리와 멀티쓰레드 기술을 사용하여 기존 대비 15배 빠른 속도 제공
- SSE방법으로 AI 답변 응답 속도 16배 향상

💡 **문서 산출물 조회**
- Elastic Search를 사용하여 LIKE문 대비 10배 빠른 검색 성능 제공.
- 구글 검색 엔진 및 SEO 최적화를 통해 검색 효율성을 강화.

💡 **Github, GitLab 소셜로그인**
- Github 및 GitLab 소셜 로그인 제공

<br />

## 👨‍💻 담당 역할
💡 **AWS 환경에서 Docker와 Github Actions을 통한 CI/CD 파이프라인 구축**

💡 **SEO 최적화 및 구글 검색 결과 노출**
- SSR(Server-Side-Rendering)
- 시멘틱 태그, 메타 태그를 사용하여 SEO 최적화

💡 **WithMe(Main, Explore, Aboutus, Workspace, Login, find 등) 개발**

💡 **레거시 코드 개선**
- Context API를 사용하여 Props Drilling을 줄이고 코드 구조를 단순화
- 이미지 업로드, 모달창, API 요청 메시지 처리를 담당하는 비즈니스 로직을 커스텀 훅으로 분리하여 유지보수성을 높임
- 공통 컴포넌트 등을 분리하여 Props로 실행 함수를 전달함으로서 모듈화와 재사용성 강화

💡 **API 호출 성능 최적화**
- React-Query를 사용하여 캐싱 처리

💡 **CLS, LCP등 LightHouse 점수 향상** 
- Next/Image, Skeleton UI로 CLS 향상
- Lazy Loading, 이미지 및 폰트 최적화

💡 **반응형 디자인**
- 모든 디바이스에서 사용할 수 있는 반응형 웹

 💡 **예외 처리** 

<br />

## 🖥️ 화면 구성
|Real-Time 협업 문서 작성과 간단한 AI 문서 생성|
|:---:|
|<img src="https://github.com/user-attachments/assets/92c608c8-563e-46a9-b452-6b5df406c15e" width="450"/>|
|LiveBlocks 라이브러리를 활용한 Real-Time 협업 문서 작성|


|AI 기반 문서 초안 작성성|
|:---:|
|<img src="https://github.com/user-attachments/assets/886c1dda-d85c-4135-8c95-dd7e3e4e104a" width="450"/>|
|레포지토리 파일명을 기반으로 정확성 향상| 

|Editor 화면 구성|
|:---:|
|<img src="https://github.com/user-attachments/assets/fc1dc17f-758c-4c66-a085-2a35f1539e52" width="450"/>|
|LiveBlocks 라이브러리를 활용한 분업 제공|

|GitHub/GitLab OAuth로 로그인 및 Repository 연동|
|:---:|
|<img src="https://github.com/user-attachments/assets/e11a3dc6-725e-4e35-a488-7dad5b8251a9" width="450"/>|
|Github, GitLab API 사용|

|Elastic Search를 활용해 본문 내용 검색|
|:---:|
|<img src="https://github.com/user-attachments/assets/df4f600d-ff7c-4e5b-ab7b-fbacc95f7295" width="450"/>|
|Elastic Search로 LIKE 속도 개선|

|구글 검색 엔진 노출|
|:---:|
|<img src="https://github.com/user-attachments/assets/f095304e-192b-4430-a1d1-9fb0cb866a78" width="450"/>|
|SEO 최적화를 통한 구글 검색 엔진 노출|
<br />

## ⚙ 내가 사용한 기술 스택
### Backend
<div>
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> 
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white">
</div>

### Frontend
<div>
<img src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind CSS-%2306B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white">
</div>

### Tools
<div>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white">
</div>

<br />

## 🤔 기술적 이슈와 해결 과정
> ### 인프라 설계
> <img src="https://github.com/user-attachments/assets/75e8a9ae-87bf-48d8-90c8-6bc922fedda1" width="450"/> <br/>
> - EC2 비용 문제로 인해, **프론트엔드, 백엔드, DB, Elasticsearch** 서버를 하나의 EC2 인스턴스에 모두 설치.  
> - 하나의 서버에서 에러가 발생하더라도 다른 서비스에 영향을 미치지 않도록, 모든 서비스를 **Docker** 환경으로 분리하여 실행.
> - **GitHub Actions**를 사용하여 **CI/CD** 파이프라인을 구축. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/.github/workflows/docker-image.yml#L1-L113)
<br />

> ### SEO 최적화
> - `generateMetadata`를 활용한 동적 메타태그  [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(beforeLogin)/readme/%5Bid%5D/page.tsx#L16-L47)
> - `SSR`를 활용한 서버 사이드 렌더링   [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(beforeLogin)/readme/%5Bid%5D/page.tsx#L48-L1613)
> - `ReactMarkdown`을 활용한 `시멘틱 태그` [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(beforeLogin)/readme/%5Bid%5D/page.tsx#L1597-L1599)
<br />

> ### 레거시 코드 개선
> - `props drilling`문제로 유지보수가 어려움. → `Context API`를 사용하여 코드의 가독성  개선 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(afterLogin)/_components/WorkspaceInfoProvider.tsx#L1-L27)
> - `모달창`이 닫힐 때 생기는 로직 중복 →  `모달창`이 닫힐 때 필요한 로직을 커스텀 훅으로 분리하여 재사용성 높임. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(afterLogin)/workspace/business/useModalClose.ts#L1-L36)
> - `이미지 업로드` 로직 중복 →  `이미지 업로드` 로직을 커스텀 훅으로 분리하여 재사용성 높임. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(afterLogin)/workspace/business/useModalClose.ts#L1-L76)
> - `API 호출 결과 메시지 핸들러` 로직의 중복 문제 → 이를 커스텀 훅으로 분리하여 재사용성을 높임. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(afterLogin)/workspace/business/useErrorHandler.ts#L1-L40)
> - 공통 컴포넌트를 분리하고, props를 통해 함수를 전달함으로써 재사용성을 높임. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/_components/CloseBtn.tsx#L5-L21)
<br />

> ### API 성능 최적화
> 💡 **상대적으로 오래 걸리는 GIHUB/GITLAB API를 효율적으로 사용하는 법**
> 
> - 레포지토리 정보가 자주 변경되지 않는다고 판단 → 모든 레포지토리 정보를 가져오는 API 캐싱처리 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/stores/server/getUserRepoQuery.ts#L1-L40)  
> - GitHub API로 레포지토리 정보를 처음 가져올 때 DB에 저장하고, 이후에는 DB에서 조회
<br />

> ### LightHouse 점수 향상
> 💡 **Next 잘 사용하기** 
> - Next/Image는 많은 것을 제공한다. webp형식으로 이미지파일을 최적화하고, LazyLoading, 이미지 로드 되기전 크기를 설정할 수 있어 `CLS(누적 레이아웃 이동)`를 방지하고 `페이지 속도 향상`를 향상시킴. [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(beforeLogin)/explore/_components/UserWorkSpace.tsx#L33-L53)  
> - `HTTP/1.1`에서 `HTTP/2.0`으로 프로토콜 버전을 업그레이드하여 `LCP(Largest Contentful Paint)`를 개선
> - 브라우저에서 직접 폰트를 가져오는 대신, `next/font`를 사용하여 폰트를 적용하고 최적화하여 렌더링 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/layout.tsx#L6-L40)
> - 뷰포트에 보이는 용량이 큰 이미지를 `preloading`으로 처리하여 `LCP`를 개선 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/_components/Main.tsx#L26-L33)
> - `Main 페이지`, `About 페이지` 등과 같은 단순 조회 기능은 `SSR(Server-Side Rendering)`로 처리
<br />

> ### 반응형 디자인
> - 뷰포트 크기에 맞춰서 Font 설정하기 → `clamp`사용 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/globals.css#L42-L44)
> - 뷰포트 크기에 맞춰서 Grid 조정하기 → `Grid`사용 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/globals.css#L100-L136)
> - 뷰포트 크기에 맞춰서 양쪽 여백 조정하기 → `미디어 쿼리` 사용 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/globals.css#L81-L98) 
<br />

> ### 예외 처리
> 💡 **로그인 하지 않는 사용자가 edit 페이지 접속할 때**
> - `middleware`에서 예외 처리 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/middleware.ts#L1-L15)
>   
> 💡 **이미지 형식이 아닌 것을 업로드 할 때**
> - `file Type` 체크 [코드 바로보기](https://github.com/qjatjs123123/withMe/blob/master/frontend/src/app/(afterLogin)/workspace/business/useImageUpload.ts#L27-L41)
<br />

> ### 사용자 경험(UX) 향상에 대한 고찰
> 💡 **SSE 적용으로 GPT 응답 속도 개선**
> - 기존에 GPT 응답이 완료한 후 전체 문장을 전송 → `SSE(Server-Sent Events)`를 적용하여 부분적으로 실시간으로 응답을 전송
>
> 💡 **Edit 페이지 입장 속도 개선**
> - 기존에는 LiveBlocks Room 생성을 위한 소켓 연결을 10개 완료한 후 입장 → 소켓 연결이 될 때마다 퍼센트가 증가하는 로딩 바 보여줌으로서 UX개선
>
> 💡 **사용자가 수행한 작업에 대한 피드백을 제공하는 UI**
> - alert 창  → 잠시 나타났다가 사라지는 `스낵바 UI` UX 개선

<br />

## 💁‍♂️ 프로젝트 팀원
| **Frontend** | **Frontend** | **Frontend** | **Backend** | **Backend** | **Backend** |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/qjatjs123123.png?width=120&height=120) | ![](https://github.com/gyeongmann.png??width=120&height=120) | ![](https://github.com/Jaeyoung9999.png??width=120&height=120) | ![](https://github.com/DKL1231.png??width=120&height=120) | ![](https://github.com/taegun1011.png??width=120&height=120) | ![](https://github.com/wonchul98.png??width=120&height=120) |
| [홍범선](https://github.com/qjatjs123123) | [현경찬](https://github.com/gyeongmann) | [이재영](https://github.com/Jaeyoung9999) | [이동규](https://github.com/DKL1231) | [황태건](https://github.com/taegun1011) | [신원철](https://github.com/wonchul98) |



## 📲 링크
| :: 배포                                                            |
| :------------------------------------------------------------------------------------- |
| :: [withMe Link](https://www.withme.my/) | 



