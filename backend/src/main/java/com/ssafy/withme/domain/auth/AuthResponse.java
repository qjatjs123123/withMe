package com.ssafy.withme.domain.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AuthResponse {

    private String provider;

    @JsonProperty("access_token")
    private String accessToken;
    
    //TODO : refresh token 추가

    @JsonProperty("name")
    private String userName;

    @JsonProperty("image_url")
    private String imageUrl;
}
