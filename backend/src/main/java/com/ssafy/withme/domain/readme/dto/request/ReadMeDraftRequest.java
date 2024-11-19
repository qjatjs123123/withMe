package com.ssafy.withme.domain.readme.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReadMeDraftRequest (
        @JsonProperty("workspace_id")
        Long workspaceId,
        @JsonProperty("section_name")
        String sectionName,
        @JsonProperty("user_prompt")
        String userPrompt
) {
}
