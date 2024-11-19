package com.ssafy.withme.global.openfeign.dto.response.refined;

import com.ssafy.withme.global.openfeign.dto.response.github.GHUserResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLUserResponseDTO;

public record RefinedUserDTO(
        String username,
        String avatar_url,
        String provider_name
) {
    public RefinedUserDTO(GHUserResponseDTO responseDTO) {
        this(
                responseDTO.name(),
                responseDTO.avatar_url(),
                "github"
        );
    }

    public RefinedUserDTO(GLUserResponseDTO responseDTO) {
        this(
                responseDTO.name(),
                responseDTO.avatar_url(),
                "gitlab"
        );
    }
}
