package com.ssafy.withme.domain.readme.dto.request;

import java.util.List;
import java.util.Map;

import static com.ssafy.withme.global.config.ChatGptConfig.*;

public record ChatGptRequest(
        String model,
        int maxTokens,
        double temperature,
        boolean stream,
        List<Map<String, String>> messages
) {
    // 팩토리 메서드로 기본값을 설정하면서 인스턴스를 생성
    public static ChatGptRequest of(String prompt) {
        return new ChatGptRequest(
                CHAT_MODEL, // model 기본값
                MAX_TOKEN,             // maxTokens 기본값
                TEMPERATURE,             // temperature 기본값
                STREAM,            // stream 기본값
                List.of(Map.of("role", "user", "content", prompt)) // messages 생성
        );
    }
}