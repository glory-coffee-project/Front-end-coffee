# 베이스 이미지 선택 (Node.js)
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY package.json package-lock.json ./

# 패키지 설치
RUN npm install

# 프로젝트 소스 코드 복사
COPY . .

# Vite로 빌드
RUN npm run build

# Nginx로 정적 파일 제공
FROM nginx:1.23-alpine

# 빌드된 파일 복사
COPY --from=0 /app/dist /usr/share/nginx/html

# Nginx 기본 설정 덮어쓰기 (필요시)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 컨테이너 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]