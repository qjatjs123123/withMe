package com.ssafy.withme.domain.readme.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReadMeDraftRequest (
        @JsonProperty("repository_url")
        String repositoryUrl,
        @JsonProperty("section_name")
        String sectionName,
        @JsonProperty("user_prompt")
        String userPrompt
) {
}