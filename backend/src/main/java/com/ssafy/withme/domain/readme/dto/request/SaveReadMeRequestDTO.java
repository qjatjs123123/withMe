package com.ssafy.withme.domain.readme.dto.request;

public record SaveReadMeRequestDTO(
        Long workspace_id,
        String readme_content
) {
}
