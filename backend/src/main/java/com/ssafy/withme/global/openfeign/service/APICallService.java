package com.ssafy.withme.global.openfeign.service;

import com.ssafy.withme.domain.member.dto.GitToken;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedCommitDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedRepoDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedRepoDetailDTO;
import com.ssafy.withme.global.openfeign.dto.response.refined.RefinedUserDTO;

import java.util.List;

public interface APICallService {
    RefinedUserDTO GetAuthenticatedUser(GitToken gitToken);

    List<RefinedRepoDTO> GetAuthenticatedUserRepos(GitToken gitToken);

    List<RefinedRepoDetailDTO> getRepoDetails(GitToken gitToken, String owner, String repo, String path);

    // 트리 구조를 생성하는 메소드
    APICallServiceImpl.TreeNode buildTree(List<RefinedRepoDetailDTO> items);

    // 디버깅용 트리 출력 메소드
    String buildTreeString(APICallServiceImpl.TreeNode node, String indent);

    // 커밋 목록 확인 매소드
    List<RefinedCommitDTO> getCommits(GitToken gitToken, String owner, String repo, String branchOrSHA);
}
