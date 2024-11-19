package com.ssafy.withme.global.openfeign.dto.response.github;

public record GHRepoPermissionsDTO(
        Boolean admin,
        Boolean push,
        Boolean pull
) {
}
