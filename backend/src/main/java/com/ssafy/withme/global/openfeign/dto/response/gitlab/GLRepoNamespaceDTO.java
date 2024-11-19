package com.ssafy.withme.global.openfeign.dto.response.gitlab;

public record GLRepoNamespaceDTO(
        Integer id,
        String name,
        String path,
        String kind,
        String full_path,
        Integer parent_id,
        String avatar_url,
        String web_url
) {
}
