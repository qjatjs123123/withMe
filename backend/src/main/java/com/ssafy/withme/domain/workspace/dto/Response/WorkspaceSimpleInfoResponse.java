package com.ssafy.withme.domain.workspace.dto.Response;


import com.ssafy.withme.domain.workspace.entity.Workspace;
import lombok.Builder;

import java.time.LocalDateTime;

public record WorkspaceSimpleInfoResponse(
        String name,
        String owner,
        String thumbnail,
        String repoUrl,
        String readmeContent,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){
    @Builder
    public WorkspaceSimpleInfoResponse{
    }

    public static WorkspaceSimpleInfoResponse from(Workspace workspace) {
        return WorkspaceSimpleInfoResponse.builder()
                .name(workspace.getName())
                .owner(workspace.getOwner())
                .thumbnail(workspace.getThumbnail())
                .repoUrl(workspace.getRepoUrl())
                .readmeContent(workspace.getReadmeContent())
                .createdAt(workspace.getCreatedAt())
                .updatedAt(workspace.getUpdatedAt())
                .build();
    }
}
