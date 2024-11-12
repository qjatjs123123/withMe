package com.ssafy.withme.domain.workspace.dto.Response;


import com.ssafy.withme.domain.workspace.entity.Workspace;
import lombok.Builder;

public record WorkspaceSimpleInfoResponse(
        String name,
        String thumbnail,
        String repoUrl,
        String readmeContent
){
    @Builder
    public WorkspaceSimpleInfoResponse{
    }

    public static WorkspaceSimpleInfoResponse from(Workspace workspace) {
        return WorkspaceSimpleInfoResponse.builder()
                .name(workspace.getName())
                .thumbnail(workspace.getThumbnail())
                .repoUrl(workspace.getRepoUrl())
                .readmeContent(workspace.getReadmeContent())
                .build();
    }
}
