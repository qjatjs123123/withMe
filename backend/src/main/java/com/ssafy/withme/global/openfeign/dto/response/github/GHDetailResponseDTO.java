package com.ssafy.withme.global.openfeign.dto.response.github;

public record GHDetailResponseDTO(
        String name,
        String path,
        String sha,
        Integer size,
        String url,
        String html_url,
        String git_url,
        String download_url,
        String type,
        GHDetailLinkDTO _links
) {
}
