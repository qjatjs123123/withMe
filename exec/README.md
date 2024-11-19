# 1. gitlab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정 값, 버전

- JVM : `OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)`
- 웹서버 : `nginx/1.15.12`
- WAS : `Apache Tomcat/10.1.30`
- IDE : `IntelliJ IDEA 2024.1.4`, `Visual Studio Code`

2. 빌드 시 사용되는 환경 변수 등의 내용 상세 기재

(Frontend)
| 환경변수 | 값 |
| ------------- | -------- |
| LIVEBLOCKS_SECRET_KEY | sk_dev_geLmFPHwToTLH4qzy8S56nMUcezY0kPI2R88Qu5VTdy2LHPSjB7Mwbgp2DtfoT1d |
| NEXT_PUBLIC_BACKEND_URL | https://k11a507.p.ssafy.io |
| NEXT_PUBLIC_BACKEND_URL_D | https://www.withme.my |

(Backend)
| 환경변수 | 값 |
| -------------- | -------- |
| JASYPT_ENCRYPTOR_PASSWORD | withme |

3. 배포 시 특이사항

- 싸피 교육생들의 원활한 테스트를 위해, **Gitlab 계정에서는 이름에 `S11`이 포함된 repository만 동기화가 가능**합니다.

4. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

- 각 DB는 도커 컨테이너로 구동됩니다.

| DB            | 포트번호 | 계정 | 암호   |
| ------------- | -------- | ---- | ------ |
| MySQL         | 3306     | root | withme |
| ElasticSearch | 9200     |      |        |

- 프로퍼티가 정의된 파일 목록
  - `backend\src\main\resources\application.yml`
  - `backend\src\main\resources\application-production.yml`

# 2. 프로젝트에서 사용하는 외부 서비스 정보를 정리한 문서

1. ChatGPT API

- AI 초안 생성과 차후에 적용할 실시간 제안 기능을 위해 도입했습니다.
- `gpt-4-turbo` 모델을 사용합니다.

2. LiveBlock

- YJS (동시 편집 기술)가 적용된 동시 편집, 노션과 유사한 블록 방식의 텍스트 작성을 지원하는 javascript 라이브러리입니다.
- 이미지 업로드 등 **기존 서비스에서 불편함이 느껴지는 기능은 직접 커스텀**했습니다.

3. Github, Gitlab

- 형상 관리나 저장소 연동을 위해 API를 호출합니다.
- OAuth2 기반의 로그인 API 호출에 필요한 토큰을 발급받습니다.

# 4. 시연 시나리오

별첨한 pdf 파일을 참고해주세요
