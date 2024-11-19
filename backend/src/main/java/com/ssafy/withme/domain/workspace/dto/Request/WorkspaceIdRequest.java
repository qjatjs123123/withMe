package com.ssafy.withme.domain.workspace.dto.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record WorkspaceIdRequest(
        @JsonProperty("workspace_id")
        Long workspaceId
) {
}
