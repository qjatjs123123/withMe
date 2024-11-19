package com.ssafy.withme.global.openfeign;

import com.ssafy.withme.global.openfeign.dto.response.github.GHCommitResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.github.GHDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.github.GHRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.github.GHUserResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLUserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="GithubAPI", url="https://api.github.com", configuration = FeignGithubConfig.class)
public interface FeignGithubAPIClient {

    @GetMapping("/user")
    GHUserResponseDTO GetAuthenticatedUser(@RequestHeader("Authorization") String userToken);

    @GetMapping("/user/repos")
    List<GHRepoResponseDTO> GetAuthenticatedUserRepos(@RequestHeader("Authorization") String userToken);

    @GetMapping("/repos/{owner}/{repo}/contents/{path}")
    List<GHDetailResponseDTO> GetRepoDetails(@RequestHeader("Authorization") String userToken, @PathVariable String owner, @PathVariable String repo, @PathVariable String path);

    @GetMapping("/repos/{owner}/{repo}/commits")
    List<GHCommitResponseDTO> getCommits(
            @RequestHeader("Authorization") String bearerToken,
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @RequestParam(value = "sha", required = false) String sha,
            @RequestParam(value = "path", required = false) String path,
            @RequestParam(value = "author", required = false) String author
    );
}
