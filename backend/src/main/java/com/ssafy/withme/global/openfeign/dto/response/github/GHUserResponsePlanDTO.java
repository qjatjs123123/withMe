package com.ssafy.withme.global.openfeign.dto.response.github;

public record GHUserResponsePlanDTO(
    String name,
    Integer space,
    Integer private_repos,
    Integer collaborators
) {
}
