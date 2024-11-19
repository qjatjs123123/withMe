package com.ssafy.withme.global.openfeign.service;

import com.ssafy.withme.domain.member.dto.GitToken;
import com.ssafy.withme.domain.member.entity.Provider;
import com.ssafy.withme.global.exception.BusinessException;
import com.ssafy.withme.global.exception.ErrorCode;
import com.ssafy.withme.global.openfeign.FeignGithubAPIClient;
import com.ssafy.withme.global.openfeign.FeignGitlabAPIClient;
import com.ssafy.withme.global.openfeign.dto.response.github.GHCommitResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.github.GHDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.github.GHRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLCommitResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedCommitDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedRepoDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedRepoDetailDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedUserDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class APICallServiceImpl implements APICallService {

    private final FeignGithubAPIClient feignGithubAPIClient;
    private final FeignGitlabAPIClient feignGitlabAPIClient;
    private final Set<String> visitedPaths = ConcurrentHashMap.newKeySet(); // 중복 요청 방지
    private final ExecutorService executorService = Executors.newFixedThreadPool(10); // 적절한 스레드 풀 설정

    @Override
    public RefinedUserDTO GetAuthenticatedUser(GitToken gitToken){
        if(gitToken == null) return null;

        if(gitToken.getProvider().equals(Provider.GITHUB)){
            return new RefinedUserDTO(feignGithubAPIClient.GetAuthenticatedUser(getBearerToken(gitToken)));
        }else{
            return new RefinedUserDTO(feignGitlabAPIClient.GetAuthenticatedUser(getBearerToken(gitToken)));
        }
    }

    private static String getBearerToken(GitToken gitToken) {
        return "Bearer " + gitToken.getTokenValue();
    }

    @Override
    public List<RefinedRepoDTO> GetAuthenticatedUserRepos(GitToken gitToken){
        if(gitToken == null) return null;

        if(gitToken.getProvider().equals(Provider.GITHUB)){
            List<GHRepoResponseDTO> RepoResponseDTOs = feignGithubAPIClient.GetAuthenticatedUserRepos(getBearerToken(gitToken));

            return RepoResponseDTOs.stream().map(RefinedRepoDTO::new).toList();
        }else{
            List<GLRepoResponseDTO> RepoResponseDTOs = feignGitlabAPIClient.GetAuthenticatedUserRepos(getBearerToken(gitToken));

            return RepoResponseDTOs.stream().map(RefinedRepoDTO::new).toList();
        }
    }

    @Override
    public List<RefinedRepoDetailDTO> getRepoDetails(GitToken gitToken, String owner, String repo, String path) {
        if(gitToken == null) return null;

        try {
            if(gitToken.getProvider().equals(Provider.GITHUB)){
                return getGHRepoDetails(gitToken, owner, repo, path)
                        .thenApply(details -> details.stream().map(RefinedRepoDetailDTO::new).toList())
                        .join();
            }else {
                return getGLRepoDetails(gitToken, owner, repo);
            }
        }
        catch (RuntimeException e) {
            throw new BusinessException(ErrorCode.REPO_NOT_FOUND);
        }
    }

    private List<RefinedRepoDetailDTO> getGLRepoDetails(GitToken gitToken, String owner, String repo) {
        String encodedOwner = URLEncoder.encode(owner, StandardCharsets.UTF_8);

        return feignGitlabAPIClient.GetRepoDetails(getBearerToken(gitToken), encodedOwner, repo).stream()
                .map(RefinedRepoDetailDTO::new).toList();
    }

    private CompletableFuture<List<GHDetailResponseDTO>> getGHRepoDetails(GitToken userToken, String owner, String repo, String path) {

        // 이미 방문한 경로는 다시 탐색하지 않음
        if (!visitedPaths.add(path)) {
            return CompletableFuture.completedFuture(Collections.emptyList());
        }

        // 디렉토리 및 파일 리스트 비동기 호출
        CompletableFuture<List<GHDetailResponseDTO>> detailsFuture = CompletableFuture.supplyAsync(() ->
                feignGithubAPIClient.GetRepoDetails(getBearerToken(userToken), owner, repo, path), executorService);

        return detailsFuture.thenCompose(details -> {
            List<CompletableFuture<List<GHDetailResponseDTO>>> futures = details.parallelStream()
                    .filter(this::shouldProcess) // 필요 없는 파일 필터링
                    .map(detail -> {
                        if ("dir".equals(detail.type())) {
                            // 하위 디렉토리 비동기 탐색
                            return getGHRepoDetails(userToken, owner, repo, detail.path());
                        } else {
                            return CompletableFuture.completedFuture(List.of(detail)); // 파일은 바로 추가
                        }
                    })
                    .toList();

            return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> futures.stream()
                            .flatMap(f -> f.join().stream())
                            .collect(Collectors.toList()));
        });
    }

    // 필터링 로직
    private boolean shouldProcess(GHDetailResponseDTO detail) {
        return !(detail.name().endsWith(".md") || detail.name().endsWith(".jpeg") ||
                detail.name().endsWith(".jpg") || detail.name().endsWith(".png") ||
                detail.name().endsWith(".gif"));
    }

    // Tree Node class with RefinedRepoDetailDTO
    public static class TreeNode {
        RefinedRepoDetailDTO detail;
        List<TreeNode> children;

        public TreeNode(RefinedRepoDetailDTO detail) {
            this.detail = detail;
            this.children = new ArrayList<>();
        }
    }

    @Override
    public TreeNode buildTree(List<RefinedRepoDetailDTO> items) {
        TreeNode root = new TreeNode(new RefinedRepoDetailDTO("root", "", "dir"));
        Map<String, TreeNode> pathMap = new HashMap<>();
        pathMap.put("", root);

        for (RefinedRepoDetailDTO item : items) {
            String[] parts = item.path().split("/");
            StringBuilder currentPath = new StringBuilder();
            TreeNode parent = root;

            for (int i = 0; i < parts.length; i++) {
                currentPath.append(i == 0 ? "" : "/").append(parts[i]);
                String subPath = currentPath.toString();

                // 만약 경로가 아직 맵에 추가되지 않았다면 dir 로서 추가
                if (!pathMap.containsKey(subPath)) {
                    RefinedRepoDetailDTO nodeDetail = new RefinedRepoDetailDTO(
                            parts[i],
                            subPath,
                            i == parts.length - 1 ? item.type() : "dir"  // Last part takes the item's type, others are "dir"
                    );
                    TreeNode node = new TreeNode(nodeDetail);
                    pathMap.put(subPath, node);
                    parent.children.add(node);
                }

                parent = pathMap.get(subPath);
            }
        }

        return root;
    }

    @Override
    public String buildTreeString(TreeNode node, String indent) {
        StringBuilder sb = new StringBuilder();
        sb.append(indent).append(node.detail.name()).append(" (").append(node.detail.type()).append(")\n");
        for (TreeNode child : node.children) {
            sb.append(buildTreeString(child, indent + "  "));
        }
        return sb.toString();
    }

    @Override
    public List<RefinedCommitDTO> getCommits(GitToken gitToken, String owner, String repo, String branchOrSHA) {
        if (gitToken == null) return null;

        if (gitToken.getProvider().equals(Provider.GITHUB)) {
            List<GHCommitResponseDTO> githubCommits = feignGithubAPIClient.getCommits(
                    getBearerToken(gitToken), owner, repo, branchOrSHA, null, null
            );
            return githubCommits.stream()
                    .map(RefinedCommitDTO::new)
                    .toList();
        } else {
            String projectId = encodeProjectId(owner + "/" + repo);
            List<GLCommitResponseDTO> gitlabCommits = feignGitlabAPIClient.getCommits(
                    getBearerToken(gitToken), projectId, branchOrSHA, null, null, null
            );
            return gitlabCommits.stream()
                    .map(RefinedCommitDTO::new)
                    .toList();
        }
    }

    private String encodeProjectId(String projectId) {
        try {
            return URLEncoder.encode(projectId, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new BusinessException(ErrorCode.INVALID_REQUEST);
        }
    }

}
