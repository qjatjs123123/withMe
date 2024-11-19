package com.ssafy.withme.global.openfeign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignGithubConfig {

    @Bean
    public RequestInterceptor githubApiInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                template.header("Accept", "application/vnd.github+json");
                template.header("X-GitHub-Api-Version", "2022-11-28");
            }
        };
    }
}
