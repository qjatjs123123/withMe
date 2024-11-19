package com.ssafy.withme.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {

    @Value("${jwt.key-string}")
    private String keyString;

    @Bean
    protected SecretKeySpec secretKeySpec() {
        return new SecretKeySpec(keyString.getBytes(), "HmacSHA256");
    }

    @Bean
    protected JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(secretKeySpec()).build();
    }
}
