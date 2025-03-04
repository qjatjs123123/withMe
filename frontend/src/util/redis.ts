import Redis from 'ioredis';

// Redis 클라이언트 설정
export const subscriber = new Redis({
  host: 'localhost',
  port: 6379,
  // 필요한 옵션 추가
});

// 발행 전용 클라이언트
export const publisher = new Redis({
  host: 'localhost',
  port: 6379,
  // 필요한 옵션 추가
});