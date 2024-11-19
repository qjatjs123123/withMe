package com.ssafy.withme.domain.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.withme.domain.auth.extractor.AttributeExtractor;
import com.ssafy.withme.domain.auth.extractor.AttributeExtractorFactory;
import com.ssafy.withme.domain.member.entity.Provider;
import com.ssafy.withme.global.util.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtils jwtUtils;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User principal = (CustomOAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = principal.getAttributes();
        Provider provider = principal.getMember().getProvider();
        AttributeExtractor extractor = AttributeExtractorFactory.getMapper(provider);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setProvider(provider.toString().toLowerCase());
        authResponse.setAccessToken(jwtUtils.issueToken(principal.getAccessToken(), principal.getMember().getId()));
        authResponse.setImageUrl(extractor.getImageUrl(attributes));
        authResponse.setUserName(extractor.getUsername(attributes));

        response.setContentType("application/json");
        objectMapper.writeValue(response.getWriter(), authResponse);
    }
}
