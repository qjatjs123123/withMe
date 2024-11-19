package com.ssafy.withme.domain.auth.extractor;

import com.ssafy.withme.domain.member.entity.Provider;

import java.util.HashMap;
import java.util.Map;

public class AttributeExtractorFactory {
    private static final Map<Provider, AttributeExtractor> mappers = new HashMap<>();

    static {
        mappers.put(Provider.GITHUB, new GithubAttributeExtractor());
        mappers.put(Provider.GITLAB, new GitlabAttributeExtractor());
    }

    public static AttributeExtractor getMapper(Provider provider) {
        return mappers.get(provider);
    }
}
