package com.ssafy.withme.domain.member.dto;

import com.ssafy.withme.domain.member.entity.Provider;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GitToken {
    private Provider provider;
    private String tokenValue;
}
