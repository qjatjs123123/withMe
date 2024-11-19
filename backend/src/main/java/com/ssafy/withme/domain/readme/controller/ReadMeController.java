package com.ssafy.withme.domain.readme.controller;

import com.ssafy.withme.domain.readme.dto.request.ReadMeDraftRequest;
import com.ssafy.withme.domain.readme.dto.request.SaveReadMeRequestDTO;
import com.ssafy.withme.domain.readme.dto.response.GetReadMeResponseDTO;
import com.ssafy.withme.domain.readme.service.ReadMeService;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceSimpleInfoResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/readme")
public class ReadMeController {
    private static final Logger log = LoggerFactory.getLogger(ReadMeController.class);
    private final ReadMeService readMeService;

    @PostMapping("")
    public String saveReadMe(@RequestBody SaveReadMeRequestDTO readMeRequestDTO) {
        return readMeService.saveReadme(readMeRequestDTO);
    }

    @GetMapping("/{workspace_id}")
    public GetReadMeResponseDTO getReadMe(@PathVariable("workspace_id") Long workspaceId) {
        return readMeService.getReadme(workspaceId);
    }

    //TODO: 페이징 처리 추가
    @GetMapping("/search")
    public List<WorkspaceSimpleInfoResponse> getSearchReadMe(@RequestParam String keyword) {
        if(keyword == null || keyword.isEmpty())
            return readMeService.listReadme(30);

        return readMeService.searchReadme(keyword);
    }

    @PostMapping(value = "draft", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> makeReadMeDraft(@RequestBody ReadMeDraftRequest readMeDraftRequest) {
        try {
            return readMeService.makeReadMeDraftV2(readMeDraftRequest);
        } catch (Exception e) {
            return Flux.error(e);
        }
    }
}
