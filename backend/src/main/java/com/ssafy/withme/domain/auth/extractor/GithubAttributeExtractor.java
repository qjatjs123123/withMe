package com.ssafy.withme.domain.auth.extractor;

import java.util.Map;

public class GithubAttributeExtractor implements AttributeExtractor {
    @Override
    public String getUsername(Map<String, Object> attributes) {
        return attributes.get("login").toString();
    }

    @Override
    public String getImageUrl(Map<String, Object> attributes) {
        return attributes.get("avatar_url").toString();
    }
}
