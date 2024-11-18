package com.ssafy.withme.domain.readme.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.ssafy.withme.domain.member.dto.GitToken;
import com.ssafy.withme.domain.member.repository.MemberRepository;
import com.ssafy.withme.domain.readme.dto.request.ChatGptRequest;
import com.ssafy.withme.domain.readme.dto.request.ChatGptRequestMono;
import com.ssafy.withme.domain.readme.dto.request.ReadMeDraftRequest;
import com.ssafy.withme.domain.readme.dto.request.SaveReadMeRequestDTO;
import com.ssafy.withme.domain.readme.dto.response.ChatGptResponse;
import com.ssafy.withme.domain.readme.dto.response.GetReadMeResponseDTO;
import com.ssafy.withme.domain.workspace.dto.Response.WorkspaceSimpleInfoResponse;
import com.ssafy.withme.domain.workspace.entity.Workspace;
import com.ssafy.withme.domain.workspace.entity.WorkspaceDocument;
import com.ssafy.withme.domain.workspace.repository.elasticsearch.WorkspaceElasticsearchRepository;
import com.ssafy.withme.domain.workspace.repository.jpa.WorkspaceJpaRepository;
import com.ssafy.withme.global.exception.BusinessException;
import com.ssafy.withme.global.exception.ErrorCode;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedRepoDetailDTO;
import com.ssafy.withme.global.openfeign.service.APICallService;
import com.ssafy.withme.global.openfeign.service.APICallServiceImpl.TreeNode;
import com.ssafy.withme.global.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class ReadMeServiceImpl implements ReadMeService {

    private final WorkspaceJpaRepository workspaceJpaRepository;
    private final WebClient webClient;
    private final SecurityUtils securityUtils;
    private final APICallService apiCallService;
    private final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE );
    private final MemberRepository memberRepository;
    private final WorkspaceElasticsearchRepository workspaceElasticsearchRepository;

    @Override
    public String saveReadme(SaveReadMeRequestDTO readMeRequestDTO) {
        Workspace workspace = workspaceJpaRepository.findById(readMeRequestDTO.workspace_id())
                .orElseThrow(() -> new BusinessException(ErrorCode.WORKSPACE_NOT_FOUND));
        workspace.changeReadmeContent(readMeRequestDTO.readme_content());
        workspaceJpaRepository.save(workspace);
        workspaceElasticsearchRepository.save(new WorkspaceDocument(workspace));
        return "successfully saved readme";
    }

    @Override
    public GetReadMeResponseDTO getReadme(Long workspace_id) {
        Workspace workspace = workspaceJpaRepository.findById(workspace_id)
                .orElseThrow(() -> new BusinessException(ErrorCode.WORKSPACE_NOT_FOUND));
        return new GetReadMeResponseDTO(workspace.getReadmeContent());
    }

    @Override
    public List<WorkspaceSimpleInfoResponse> searchReadme(String keyword) {
        return workspaceElasticsearchRepository.findByReadmeContentContaining(keyword).stream()
                .map(document -> workspaceJpaRepository.findById(document.getId()).orElse(null))
                .map(workspace -> workspace != null ? WorkspaceSimpleInfoResponse.from(workspace) : null)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public Flux<String> makeReadMeDraft(ReadMeDraftRequest readMeDraftRequest) throws JsonProcessingException {
        String message = readMeDraftRequest.userPrompt();
        Workspace workspace = workspaceJpaRepository.findById(readMeDraftRequest.workspaceId())
                .orElseThrow(() -> new BusinessException(ErrorCode.WORKSPACE_NOT_FOUND));
        String repoUrl = workspace.getRepoUrl();

        //parse url
        String postfix = ".com/";
        String ownerAndRepo = repoUrl.substring(repoUrl.indexOf(postfix) + postfix.length());
        int lastIndex = ownerAndRepo.lastIndexOf("/");
        String owner = ownerAndRepo.substring(0, lastIndex);
        String repo = ownerAndRepo.substring(lastIndex + 1);

        String repoTreeStructure = getRepoTree(owner, repo);

        String prompt = makePrompt(readMeDraftRequest.sectionName(), repoTreeStructure, message);
        ChatGptRequest chatGptRequest = ChatGptRequest.of(prompt);
        String requestValue = objectMapper.writeValueAsString(chatGptRequest);
        return webClient.post()
                .uri("/v1/chat/completions")
                .bodyValue(requestValue)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class);
    }

    @Override
    public Flux<String> makeReadMeDraftV2(ReadMeDraftRequest readMeDraftRequest) throws JsonProcessingException {
        String workspaceInfo;
        String message = readMeDraftRequest.userPrompt();
        Workspace workspace = workspaceJpaRepository.findById(readMeDraftRequest.workspaceId())
                .orElseThrow(() -> new BusinessException(ErrorCode.WORKSPACE_NOT_FOUND));

        if(workspace.getWorkspaceInfo() == null){
            String repoTreeStructure;
            String repoUrl = workspace.getRepoUrl();

            //parse url
            String postfix = ".com/";
            String ownerAndRepo = repoUrl.substring(repoUrl.indexOf(postfix) + postfix.length());
            int lastIndex = ownerAndRepo.lastIndexOf("/");
            String owner = ownerAndRepo.substring(0, lastIndex);
            String repo = ownerAndRepo.substring(lastIndex + 1);
            repoTreeStructure = getRepoTree(owner, repo);

            workspaceInfo = getWorkspaceInfoFromGPT(repoTreeStructure);
            workspace.changeWorkspaceInfo(workspaceInfo);
            workspaceJpaRepository.save(workspace);
        }
        else{
            workspaceInfo = workspace.getWorkspaceInfo();
        }

        String prompt = makePrompt(readMeDraftRequest.sectionName(), workspaceInfo, message);
        ChatGptRequest chatGptRequest = ChatGptRequest.of(prompt);
        String requestValue = objectMapper.writeValueAsString(chatGptRequest);
        return webClient.post()
                .uri("/v1/chat/completions")
                .bodyValue(requestValue)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class);
    }

    @Override
    public List<WorkspaceSimpleInfoResponse> listReadme(Integer size) {
        assert(size != null && size > 0);

        Pageable pageable = PageRequest.ofSize(size);

        return workspaceJpaRepository.findNonEmptyWorkspace(pageable).stream()
                .map(WorkspaceSimpleInfoResponse::from)
                .limit(size).toList();
    }

    private static String makePrompt(String sectionName, String repoTreeStructure, String message) {

        return String.format("""
        The following is the file structure of a Git Remote repository along with a specific section for which we want to generate README content.
        Based on the provided structure and section, please draft suitable content in markdown format for the README file in Korean.
    
        Repository Structure:
        %s
    
        Section: %s
    
        Instructions:
        - If the section is "Introduction", provide a summary of the repository based on the structure.
        - If the section is "Core Technologies", identify the main technologies used based on the filenames or directories.
        - If the section is "Features", list out potential features that might be inferred from the repository structure.
        - Use a formal tone, aiming for content that can be directly included in a README file.
    
        Prompt:
        %s
        """, repoTreeStructure, sectionName, message);
    }

    private String getRepoTree(String owner, String repo) {
        GitToken userToken = securityUtils.getGitToken();

        List<RefinedRepoDetailDTO> repoItems = apiCallService.getRepoDetails(
                userToken,
                owner,
                repo,
                ""
        );
        TreeNode root = apiCallService.buildTree(repoItems);
        return apiCallService.buildTreeString(root, "");
    }

    private String getWorkspaceInfoFromGPT(String repoTreeStructure) {
        // GPT 모델에 전달할 프롬프트 생성
        String prompt = String.format(
                "Analyze the following repository structure and summarize the project's purpose or topic in 10 lines or less:\n\n%s\n\n"
                + "Focus on the project's main functionality and purpose based on its directories and files, "
                + "not detailed structural descriptions."



                ,
                repoTreeStructure
        );

        // ChatGPT 요청 생성 (ChatGptRequest.of 사용)
        ChatGptRequestMono chatGptRequest = ChatGptRequestMono.of(prompt);

        try {
            // WebClient를 통해 ChatGPT API 호출
            String response = webClient.post()
                    .uri("/v1/chat/completions")
                    .bodyValue(chatGptRequest)
                    .retrieve()
                    .bodyToMono(String.class) // OpenAI 응답은 JSON 형식으로 반환됨
                    .block();

            // 응답을 파싱하여 반환
            return parseGptResponse(response);

        } catch (Exception e) {
            throw new BusinessException(ErrorCode.GPT_API_ERROR);
        }
    }

    // GPT 응답을 파싱하는 메서드
    private String parseGptResponse(String response) {
        try {
            // 응답 JSON을 파싱하여 메시지 내용 추출
            ChatGptResponse gptResponse = objectMapper.readValue(response, ChatGptResponse.class);

            if (gptResponse != null && !gptResponse.choices().isEmpty()) {
                return gptResponse.choices().get(0).message().content();
            } else {
                throw new BusinessException(ErrorCode.GPT_RESPONSE_EMPTY);
            }
        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.JSON_PROCESSING_ERROR);
        }
    }
}
