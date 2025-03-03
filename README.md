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
- [2. 프로젝트 화면 구성](#3-프로젝트-화면-구성)
- [3. 내가 사용한 기술 스택](#4-사용한-기술-스택)
- [4. 기술적 이슈와 해결 과정](#5-기술적-이슈와-해결-과정)
- [5. 팀원](#6-팀원)

다음과 같은 목차로 구성되어 있습니다.

<br />

## 🚀 프로젝트 개요
💡 **실시간 공동 문서 작성**

💡 **AI 기반 문서초안 생성**

💡 **문서 산출물 조회**

💡 **Github, GitLab 소셜로그인**

<br />


## 👨‍💻 담당 역할
💡 **WithMe(Main, Explore, Aboutus, Workspace, Login, find 등) 개발**

💡 **SEO 작업**

💡 **반응형 디자인**

💡 **AWS 환경에서 Docker와 Github Actions을 통한 CI/CD 파이프라인 구축**

<br />

## 🖥️ 화면 구성
| **LiveBlocks 라이브러리를 활용한 Real-Time 협업 문서 작성** | **레포지토리 파일명을 기반으로 정확성 향상** | 
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/92c608c8-563e-46a9-b452-6b5df406c15e" width="450"/> | <img src="https://github.com/user-attachments/assets/886c1dda-d85c-4135-8c95-dd7e3e4e104a" width="450"/> |
| **LiveBlocks 라이브러리를 활용한 분업 제공** | **Github, GitLab API 사용** |
| <img src="https://github.com/user-attachments/assets/fc1dc17f-758c-4c66-a085-2a35f1539e52" width="450"/> | <img src="https://github.com/user-attachments/assets/e11a3dc6-725e-4e35-a488-7dad5b8251a9" width="450"/> |
| **Elastic Search를 활용해 본문 내용 검색** | **구글 검색 엔진 노출** |
| <img src="https://github.com/user-attachments/assets/df4f600d-ff7c-4e5b-ab7b-fbacc95f7295" width="450"/> | <img src="https://github.com/user-attachments/assets/f095304e-192b-4430-a1d1-9fb0cb866a78" width="450"/> |


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
<br />
<br />

## 🤔 기술적 이슈와 해결 과정
#### 1)  로드밸런싱 환경에서 캐싱 동기화 문제 해결법
<details>
  <summary>📌 기술 블로그</summary> 
  
  [SSG와 ISR을 활용한 캐싱 및 Redis를 이용한 동기화](https://qjatjs123123.tistory.com/45)
</details>

<br />


#### 2)  CDN을 활용한 JS, CSS, 이미지 파일 loaded시간 `60배` 향상
<details>
  <summary>📌 기술 블로그</summary> 
  
  [CDN으로 NEXT.JS 성능 개선](https://qjatjs123123.tistory.com/39)
</details>

<br />

#### 3)  Next/Image를 활용한 이미지 최적화, 로드된 이미지 총 용량이 `2MB → 240KB ` `10배` 향상
<details>
  <summary>📌 기술 블로그</summary>
  
  [NEXT/IMAGE를 활용한 웹 성능 최적화](https://qjatjs123123.tistory.com/40)
</details>

<br />

#### 4)  무한 스크롤 렌더링 최적화 → 1000개 데이터 렌더링 속도 `180ms → 18ms` `10배` 향상
<details>
  <summary>📌 기술 블로그</summary>
  
  [무한 스크롤 및 렌더링 최적화](https://qjatjs123123.tistory.com/46)
</details>

<br />

#### 5)  이미지 스프라이트 활용, 작은 이미지의 HTTP 요청 수를 `2 → 1`로 감소
<details>
  <summary>📌 기술 블로그</summary>
  
  [이미지 스프라이트로 로딩 시간 단축하기](https://qjatjs123123.tistory.com/41)
</details>

<br />

#### 6)  CSS 애니메이션 최적화, `1.5배` 개선
<details>
  <summary>📌 기술 블로그</summary>
  
  [CSS 애니메이션 성능 개선 방법](https://qjatjs123123.tistory.com/44)
</details>

<br />
<br />
<br />


## 💁‍♂️ 프로젝트 팀원
| **Frontend** | **Frontend** | **Frontend** | **Backend** | **Backend** | **Backend** |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/qjatjs123123.png?width=120&height=120) | ![](https://github.com/gyeongmann.png??width=120&height=120) | ![](https://github.com/Jaeyoung9999.png??width=120&height=120) | ![](https://github.com/DKL1231.png??width=120&height=120) | ![](https://github.com/taegun1011.png??width=120&height=120) | ![](https://github.com/wonchul98.png??width=120&height=120) |
| [홍범선](https://github.com/qjatjs123123) | [현경찬](https://github.com/gyeongmann) | [이재영](https://github.com/Jaeyoung9999) | [이동규](https://github.com/DKL1231) | [황태건](https://github.com/taegun1011) | [신원철](https://github.com/wonchul98) |



## 📲 링크
| 배포                                          | 기술블로그                                          |
|---------------------------------------------|---------------------------------------------------|
| [withMe Link](https://www.withme.my/)      | [withMe tech_blog](https://qjatjs123123.tistory.com/category/project/withMe) |



