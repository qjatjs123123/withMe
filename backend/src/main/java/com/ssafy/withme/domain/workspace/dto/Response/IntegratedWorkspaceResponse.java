package com.ssafy.withme.domain.workspace.dto.Response;

import lombok.Builder;
import org.springframework.data.domain.Slice;
import java.util.List;

public record IntegratedWorkspaceResponse(
        Slice<WorkspaceInfoResponse> visibleWorkspaces,
        List<WorkspaceInfoResponse> invisibleWorkspaces
) {
    @Builder
    public IntegratedWorkspaceResponse{
    }

    public static IntegratedWorkspaceResponse from(Slice<WorkspaceInfoResponse> visibleWorkspaces,
                                          List<WorkspaceInfoResponse> invisibleWorkspaces) {
        return IntegratedWorkspaceResponse.builder()
                .visibleWorkspaces(visibleWorkspaces)
                .invisibleWorkspaces(invisibleWorkspaces)
                .build();
    }
}
