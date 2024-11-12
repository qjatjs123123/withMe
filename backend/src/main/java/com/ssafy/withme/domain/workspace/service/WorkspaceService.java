package com.ssafy.withme.domain.workspace.service;

import com.ssafy.withme.domain.workspace.dto.Response.IntegratedWorkspaceResponse;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceInfoResponse;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceSimpleInfoResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface WorkspaceService {

    IntegratedWorkspaceResponse makeVisible(Long workspaceId);

    IntegratedWorkspaceResponse makeInvisible(Long workspaceId);

    Slice<WorkspaceInfoResponse> getMyVisibleWorkspaces(Pageable pageable, LocalDateTime cursor);

    List<WorkspaceInfoResponse> getMyInvisibleWorkspaces();

    Map<String, List<WorkspaceInfoResponse>> refreshWorkspace();

    WorkspaceInfoResponse getWorkspaceInfo(Long workspaceId);

    String uploadThumbnail(MultipartFile file, String repositoryUrl);

    WorkspaceSimpleInfoResponse getWorkspaceSimpleInfo(Long aLong);
}
