package com.ssafy.withme.global.openfeign.dto.response.gitlab;

import java.util.List;

public record GLRepoResponseDTO(
        Integer id,
        String description,
        String name,
        String name_with_namespace,
        String path,
        String path_with_namespace,
        String created_at,
        String default_branch,
        List<String> tag_list,
        List<String> topics,
        String ssh_url_to_repo,
        String http_url_to_repo,
        String web_url,
        String avatar_url,
        Integer star_count,
        String last_activity_at,
        GLRepoNamespaceDTO namespace
    ){
}