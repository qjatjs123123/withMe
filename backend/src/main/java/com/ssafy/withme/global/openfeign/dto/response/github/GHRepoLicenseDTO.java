package com.ssafy.withme.global.openfeign.dto.response.github;

public record GHRepoLicenseDTO(
        String key,
        String name,
        String url,
        String spdx_id,
        String node_id,
        String html_url
) {
}
