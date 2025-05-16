import {createClient} from 'redis';

// Redis 클라이언트 생성 (로컬에서 실행하는 경우)
const client = createClient({
  socket: { host: "127.0.0.1", port: 6379 }, // 로컬 Redis 서버 연결 설정
});

// Redis 연결 시도
(async () => {
  try {
    await client.connect();
    console.log("Redis client connected successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
})();

// Redis 에러 핸들링
client.on("error", (error) => {
  console.error("Redis error:", error);
});

module.exports = class CacheHandler {
  // Redis에서 캐시 값 가져오기
  async get(key) {
    try {
      const value = await client.get(key);  // Redis에서 값 가져오기
      return value ? JSON.parse(value) : null;  // 값이 없으면 null 반환
    } catch (err) {
      console.error("Error fetching from Redis:", err);
    }
  }

  // Redis에 캐시 값 저장하기
  async set(key, value, ctx) {
    try {
      await client.set(key, JSON.stringify({
        value,
        lastModified: Date.now(),
        tags: ctx.tags,
      }));  // Redis에 값 저장
    } catch (err) {
      console.error("Error setting value in Redis:", err);
    }
  }

  // 특정 태그에 해당하는 캐시 데이터 삭제하기
  async revalidateTag(tag) {
    // 캐시의 모든 항목을 반복합니다
    for (let [key, value] of cache) {
      // 값의 태그에 지정된 태그가 포함된 경우 이 항목을 삭제합니다
      if (value.tags.includes(tag)) {
        cache.delete(key)
      }
    }
  }
};
