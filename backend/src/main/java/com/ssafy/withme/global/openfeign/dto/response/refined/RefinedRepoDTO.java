package com.ssafy.withme.global.openfeign.dto.response.refined;

import com.ssafy.withme.global.openfeign.dto.response.github.GHRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLRepoResponseDTO;

public record RefinedRepoDTO(
        String name,
        String fullName,
        String htmlUrl,
        String description

) {
    public RefinedRepoDTO(GHRepoResponseDTO responseDTO) {
        this(
                responseDTO.name(),
                responseDTO.full_name(),
                responseDTO.html_url(),
                responseDTO.description()
        );
    }

    public RefinedRepoDTO(GLRepoResponseDTO responseDTO) {
        this(
                responseDTO.path(),
                responseDTO.path_with_namespace(),
                responseDTO.web_url(),
                responseDTO.description()
        );
    }
}