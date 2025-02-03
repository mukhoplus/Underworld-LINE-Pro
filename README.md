# Underworld LINE Pro

실시간 채팅 애플리케이션 `Made By Mukho`

## 프로젝트 소개

[Underworld LINE+](https://github.com/mukhoplus/Underworld-LINE-Plus)의 리뉴얼 프로젝트이자, [Underworld LINE](https://github.com/mukhoplus/Underworld-LINE) 서비스의 3.0 버전.

## 서비스 주소

[Underworld LINE Pro](https://linepro.mukho.r-e.kr)

## 기술 스택

### Frontend

- React 18.2.0
- TypeScript
- Recoil
- Styled-components
- Ant Design
- WebSocket

### Backend

- Java 17
- Spring Boot 3.4.1
- MySQL 8.0.35
- MyBatis
- WebSocket

### Infra & DevOps

- Oracle Cloud Infrastructure
- Docker
- Jenkins
- Nginx

## 주요 기능

### 1. 사용자 관리

- 회원가입/로그인
- 세션 기반 인증

### 2. 채팅

- 1:1 채팅
- 단체 채팅방
- 실시간 메시지 전송
- 읽지 않은 메시지 표시
- 메시지 알림 (구현 중)

### 3. 채팅방 관리

- 채팅방 생성 (1:1, 단체)
- 참여자 목록 확인 (단체)
- 채팅방 목록 조회
- 최근 메시지 및 업데이트 시간 표시

## 특징

- **실시간 통신**: WebSocket을 활용한 실시간 양방향 통신
- **반응형 디자인**: 모바일/데스크톱 환경 모두 지원
- **메시지 상태 관리**: 읽음 여부 실시간 동기화
- **알림 시스템**: 새 메시지 수신 시 브라우저 알림(구현 중)

## 프로젝트 구조

### Frontend (FE/)

```
src/
├── components/         # 리액트 컴포넌트
│   ├── hello/         # 로그인/회원가입 관련
│   └── main/          # 메인 채팅 관련
├── interfaces/        # TypeScript 타입 정의
├── services/         # API 및 WebSocket 서비스
├── stores/           # Recoil 상태 관리
├── styles/           # 공통 스타일
└── utils/            # 유틸리티 함수
```

### Backend (BE/)

```
src/main/
├── java/
│   └── com/mukho/linepro/
│       ├── config/     # 설정 파일
│       ├── controller/ # API 컨트롤러
│       ├── dto/        # 데이터 전송 객체
│       ├── mapper/     # MyBatis 매퍼
│       └── service/    # 비즈니스 로직
└── resources/
    ├── mapper/        # SQL 매퍼 XML
    └── application.yml # 애플리케이션 설정
```
