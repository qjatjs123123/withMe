# for /f "delims=" %A in ('docker ps -q') do (set rm1=%A)
# for /f "delims=" %A in ('docker ps -a -q') do (set rm2=%A)
# for /f "delims=" %A in ('docker images -q') do (set rm3=%A)
# docker stop %rm1%
# docker rm %rm2%
# docker rmi -f %rm3%

# Step 1: Node.js 환경에서 Next.js 앱 빌드
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package.json package-lock.json ./

# 종속성 설치
RUN npm install

# 프로젝트 파일 복사
COPY . .

# Next.js 빌드
RUN npm run build

# Step 2: Node.js 런타임 환경으로 설정
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드 결과물 및 Node.js 환경 필요 파일 복사
COPY --from=build /app /app

# 포트 설정
EXPOSE 3000

# Next.js 애플리케이션 실행
CMD ["npm", "run", "start"]
