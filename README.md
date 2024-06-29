# Login
- Nest.js / MongoDB 기반의 RESTful한 API 서버 
- Transaction을 지원해 Atomic Operation을 지원해 각 Request가 독립적인 Stateless Request 처리
- 메세지가 스스로 의미를 보일 수 있도록 URI 및 Method 로 동작을 구분하는 Uniform Interface 지원
- Client 의 종류에 상관없이 동작한는 Client / Server Architecture 기반
- Cache Interceptor 를 활용한 Caching 관련 정보 Header에 삽입
- Application Server / Database Server / Web Server Layer 분리

## 사용법 
1. Repo 를 다운로드 후에 .envexample 파일 설명에 맞게 .env 파일 생성 
2. npm install 로 필요 package 설치
3. nest start 명령어를 통해 시작

## .env File Example 
```bash
PORTNUMBER=사용할 포트 넘버
TZ=TimeZoneToUse
DB_URL=DBAddress
CONSUMER_URL=Kong Gateway Address/consumers
KEY_URL=Kong Gateway Address/key-auths/
```

## API Requests and Responses 
1. /user - POST 
- Id 와 password 로 계정 생성

2. /user/apikey - POST 
- Id 와 password 전달해 로그인 성공시 새로운 apikey 생성 

3. /user - GET 
- 전체 유저 조회

4. /user/:id - GET 
- id를 parameter로 전달해 해당 유저 정보 조회

5. /user/:id/password - PUT 
- Parameter로 전달하는 id 기반으로 DAO 안에 들어있는 내용으로 변경 - 비밀번호 등등

6. /user/:id - DELETE
- Parameter로 전달하는 id 기반으로 해당 계정 삭제