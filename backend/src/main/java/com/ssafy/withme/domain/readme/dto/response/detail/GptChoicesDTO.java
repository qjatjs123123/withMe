package com.ssafy.withme.domain.readme.dto.response.detail;

public record GptChoicesDTO(
        Integer index,
        GptChoicesMessageDTO message,
        Boolean logprobs,
        String finish_reason
) {
}
