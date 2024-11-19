package com.ssafy.withme.global.openfeign.dto.response.github;

public record GHCommitResponseDTO(
        String sha,
        Commit commit
) {
    public record Commit(
            String message,
            Author author
    ) {
        public record Author(
                String name,
                String email,
                String date
        ) {}
    }
}
