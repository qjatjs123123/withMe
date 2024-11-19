package com.ssafy.withme.global.openfeign.dto.response.refined;

import com.ssafy.withme.global.openfeign.dto.response.github.GHDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLDetailResponseDTO;

public record RefinedRepoDetailDTO(
        String name,
        String path,
        String type
) {
    public RefinedRepoDetailDTO(GHDetailResponseDTO detailResponseDTO) {
        this(
                detailResponseDTO.name(),
                detailResponseDTO.path(),
                detailResponseDTO.type()
        );
    }

    public RefinedRepoDetailDTO(GLDetailResponseDTO detailResponseDTO) {
        this(
                detailResponseDTO.name(),
                detailResponseDTO.path(),
                "tree".equals(detailResponseDTO.type()) ? "dir" : "file"
        );
    }
}
