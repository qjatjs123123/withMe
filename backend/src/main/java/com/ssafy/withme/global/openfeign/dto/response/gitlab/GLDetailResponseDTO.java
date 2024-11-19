package com.ssafy.withme.global.openfeign.dto.response.gitlab;

public record GLDetailResponseDTO(
        String id,
        String name,
        String type,
        String path,
        String mode
) {
}
