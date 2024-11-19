package com.ssafy.withme.domain.member.controller;

import com.ssafy.withme.domain.member.dto.GitToken;
import com.ssafy.withme.global.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    private static final Logger log = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private SecurityUtils securityUtils;

    @GetMapping("/info")
    public String info() {
        GitToken gitToken = securityUtils.getGitToken();
        Long memberId = securityUtils.getMemberId();
        return "You are member " + memberId + ", your git token is " + gitToken.getTokenValue() + " : " + String.valueOf(gitToken.getProvider());
    }
}
