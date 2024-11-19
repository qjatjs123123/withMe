package com.ssafy.withme.global.util;

import com.ssafy.withme.domain.member.dto.GitToken;
import com.ssafy.withme.domain.member.entity.Member;
import com.ssafy.withme.domain.member.repository.MemberRepository;
import com.ssafy.withme.global.exception.BusinessException;
import com.ssafy.withme.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final MemberRepository memberRepository;

    private Jwt getJwt(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken)
            return ((JwtAuthenticationToken) authentication).getToken();

        return null;
    }

    public Long getMemberId(){
        Jwt jwt = getJwt();
        if(jwt == null || jwt.getClaimAsString("id") == null)
            throw new BusinessException(ErrorCode.INVALID_ID_TOKEN);
        return Long.valueOf(jwt.getClaimAsString("id"));
    }

    public GitToken getGitToken(){
        Jwt jwt = getJwt();
        if(jwt == null || jwt.getClaimAsString("id") == null || jwt.getClaimAsString("token") == null)
            throw new BusinessException(ErrorCode.INVALID_ID_TOKEN);

        Long memberId = Long.valueOf(jwt.getClaimAsString("id"));
        Member member = memberRepository.findById(memberId).orElseThrow(()->new BusinessException(ErrorCode.INVALID_ID_TOKEN));
        return new GitToken(member.getProvider(), jwt.getClaimAsString("token"));
    }
}
