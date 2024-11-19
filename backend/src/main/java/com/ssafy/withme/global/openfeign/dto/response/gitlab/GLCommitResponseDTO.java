package com.ssafy.withme.global.openfeign.dto.response.gitlab;

public record GLCommitResponseDTO(
        String id,
        String shortId,
        String title,
        String message,
        String authoredDate,
        Author author
) {
    public record Author(
            String name,
            String email
    ) {}
}
