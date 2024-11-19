package com.ssafy.withme.global.openfeign.dto.response.gitlab;

public record GLUserResponseIdentityDTO(
    String provider,
    String extern_uid
) {
}
