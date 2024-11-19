package com.ssafy.withme.domain.readme.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.withme.domain.readme.dto.request.ReadMeDraftRequest;
import com.ssafy.withme.domain.readme.dto.request.SaveReadMeRequestDTO;
import com.ssafy.withme.domain.readme.dto.response.GetReadMeResponseDTO;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceSimpleInfoResponse;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ReadMeService {

    String saveReadme(SaveReadMeRequestDTO readMeRequestDTO);

    GetReadMeResponseDTO getReadme(Long workspaceId);

    List<WorkspaceSimpleInfoResponse> searchReadme(String keyword);

    Flux<String> makeReadMeDraft(ReadMeDraftRequest readMeDraftRequest) throws JsonProcessingException;

    Flux<String> makeReadMeDraftV2(ReadMeDraftRequest readMeDraftRequest) throws JsonProcessingException;

    List<WorkspaceSimpleInfoResponse> listReadme(Integer size);
}
