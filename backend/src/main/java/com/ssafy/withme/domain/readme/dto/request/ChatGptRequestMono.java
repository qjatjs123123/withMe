package com.ssafy.withme.domain.readme.dto.request;

import java.util.List;
import java.util.Map;

import static com.ssafy.withme.global.config.ChatGptConfig.*;

public record ChatGptRequestMono(
        String model,
//        int maxTokens,
//        double temperature,
//        List<Map<String, String>> response_format,
        List<Map<String, String>> messages
) {
    // 팩토리 메서드로 기본값을 설정하면서 인스턴스를 생성
    public static ChatGptRequestMono of(String prompt) {
        return new ChatGptRequestMono(
                CHAT_MODEL, // model 기본값
//                MAX_TOKEN,             // maxTokens 기본값
//                TEMPERATURE,             // temperature 기본값
//                List.of(Map.of( "type", "json_object" )),            // stream 기본값
                List.of(Map.of("role", "user", "content", prompt)) // messages 생성
        );
    }
}