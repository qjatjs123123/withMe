package com.ssafy.withme.domain.auth;

import com.ssafy.withme.domain.member.controller.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {

    private final MemberService memberService;

    private final OidcUserService delegate = new OidcUserService();

    @Override
    public CustomOAuth2User loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String tokenValue = userRequest.getAccessToken().getTokenValue();

        return memberService.findUserByRequst(registrationId, tokenValue, oidcUser);
    }
}
