package com.ssafy.withme.domain.workspace.controller;

import com.ssafy.withme.domain.workspace.dto.Request.WorkspaceIdRequest;
import com.ssafy.withme.domain.workspace.dto.Response.IntegratedWorkspaceResponse;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceInfoResponse;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceSimpleInfoResponse;
import com.ssafy.withme.domain.workspace.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static com.ssafy.withme.global.consts.StaticConst.PAGEABLE_DEFAULT_SIZE;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @GetMapping("/visible")
    public Slice<WorkspaceInfoResponse> myVisibleWorkspace(@PageableDefault(size = PAGEABLE_DEFAULT_SIZE, sort = "updatedAt",
            direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(required = false) LocalDateTime cursor) {
        return workspaceService.getMyVisibleWorkspaces(pageable, cursor);
    }

    @GetMapping("/invisible")
    public List<WorkspaceInfoResponse> myInvisibleWorkspaces() {
        return workspaceService.getMyInvisibleWorkspaces();
    }


    @GetMapping("/refresh")
    public Map<String, List<WorkspaceInfoResponse>> refresh() {
        return workspaceService.refreshWorkspace();
    }

    @PostMapping("")
    public IntegratedWorkspaceResponse makeVisible(@RequestBody WorkspaceIdRequest workspaceIdRequest) {
        return workspaceService.makeVisible(workspaceIdRequest.workspaceId());
    }

    @DeleteMapping("")
    public IntegratedWorkspaceResponse makeInvisible(@RequestBody WorkspaceIdRequest workspaceIdRequest) {
        return workspaceService.makeInvisible(workspaceIdRequest.workspaceId());
    }

    @PostMapping("/info")
    public WorkspaceInfoResponse getWorkspaceInfo(@RequestBody WorkspaceIdRequest workspaceIdRequest) {
        return workspaceService.getWorkspaceInfo(workspaceIdRequest.workspaceId());
    }

    @PostMapping("/simple")
    public WorkspaceSimpleInfoResponse getWorkspaceSimpleInfo(@RequestBody WorkspaceIdRequest workspaceIdRequest) {
        return workspaceService.getWorkspaceSimpleInfo(workspaceIdRequest.workspaceId());
    }

    @PostMapping(path = "/thumbnail", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public String uploadThumbnail(@RequestParam MultipartFile image, @RequestParam String repository_url) {
        return workspaceService.uploadThumbnail(image, repository_url);
    }
}
