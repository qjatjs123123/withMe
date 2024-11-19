package com.ssafy.withme.domain.member.controller;

import com.ssafy.withme.domain.auth.CustomOAuth2User;
import com.ssafy.withme.domain.auth.extractor.AttributeExtractor;
import com.ssafy.withme.domain.auth.extractor.AttributeExtractorFactory;
import com.ssafy.withme.domain.member.entity.Member;
import com.ssafy.withme.domain.member.entity.Provider;
import com.ssafy.withme.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public CustomOAuth2User findUserByRequst(String registrationId, String tokenValue, OAuth2User oAuth2User) throws AuthenticationException {
        Provider provider = getProvider(registrationId);
        String username = getUsername(provider, oAuth2User);

        Optional<Member> result = memberRepository.findByUsernameAndProvider(username, provider);
        Member member = result.orElseGet(() -> {
            Member newMember = new Member(username, provider);

            newMember = memberRepository.save(newMember);
            return newMember;
        });

        return new CustomOAuth2User(oAuth2User, tokenValue, member);
    }

    private String getUsername(Provider provider, OAuth2User oAuth2User) {
        AttributeExtractor extractor = AttributeExtractorFactory.getMapper(provider);
        return extractor.getUsername(oAuth2User.getAttributes());
    }

    private Provider getProvider(String registrationId) {
        if (registrationId.equals(String.valueOf(Provider.GITHUB).toLowerCase()))
            return Provider.GITHUB;
        if (registrationId.equals(String.valueOf(Provider.GITLAB).toLowerCase()))
            return Provider.GITLAB;
        throw new OAuth2AuthenticationException("Invalid registration id " + registrationId);
    }
}
