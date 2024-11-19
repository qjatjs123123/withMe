package com.ssafy.withme.domain.auth.extractor;

import java.util.Map;

public class GitlabAttributeExtractor implements AttributeExtractor {

    @Override
    public String getUsername(Map<String, Object> attributes) {
        return attributes.get("preferred_username").toString();
    }

    @Override
    public String getImageUrl(Map<String, Object> attributes) {
        return attributes.get("picture").toString();
    }
}
