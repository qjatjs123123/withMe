import Redis from 'ioredis';

// Redis 클라이언트 설정
const redis = new Redis({
  host: 'localhost',  
  port: 6379,         
});

export default redis;