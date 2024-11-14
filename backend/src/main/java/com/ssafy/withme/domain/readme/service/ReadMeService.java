package com.ssafy.withme.domain.readme.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.withme.domain.readme.dto.request.ReadMeDraftRequest;
import com.ssafy.withme.domain.readme.dto.request.SaveReadMeRequestDTO;
import com.ssafy.withme.domain.readme.dto.response.GetReadMeResponseDTO;
import com.ssafy.withme.domain.readme.dto.response.SearchReadMeResponseDTO;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ReadMeService {

    String saveReadme(SaveReadMeRequestDTO readMeRequestDTO);

    GetReadMeResponseDTO getReadme(Long workspaceId);

    List<SearchReadMeResponseDTO> searchReadme(String keyword);

    Flux<String> makeReadMeDraft(ReadMeDraftRequest readMeDraftRequest) throws JsonProcessingException;

    List<SearchReadMeResponseDTO> listReadme(Integer size);
}
