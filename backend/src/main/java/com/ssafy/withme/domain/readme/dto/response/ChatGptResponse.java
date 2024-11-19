package com.ssafy.withme.domain.readme.dto.response;

import com.ssafy.withme.domain.readme.dto.response.detail.GptChoicesDTO;

import java.util.List;
import java.util.Map;

public record ChatGptResponse(
        List<GptChoicesDTO> choices
) {}
