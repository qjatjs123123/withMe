package com.ssafy.withme.global.openfeign;

import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLCommitResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLDetailResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLRepoResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLUserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="GitlabAPI", url="https://lab.ssafy.com/api/v4", configuration = FeignGitlabConfig.class)
public interface FeignGitlabAPIClient {

    @GetMapping("/user")
    GLUserResponseDTO GetAuthenticatedUser(@RequestHeader("Authorization") String userToken);

    @GetMapping("/projects?min_access_level=30&membership=true&search=S11&")
    List<GLRepoResponseDTO> GetAuthenticatedUserRepos(@RequestHeader("Authorization") String userToken);

    @GetMapping("/projects/{owner}%2F{repo}/repository/tree?recursive=true&per_page=100")
    List<GLDetailResponseDTO> GetRepoDetails(@RequestHeader("Authorization") String userToken, @PathVariable String owner, @PathVariable String repo);

    @GetMapping("/projects/{id}/repository/commits")
    List<GLCommitResponseDTO> getCommits(
            @RequestHeader("Authorization") String bearerToken,
            @PathVariable("id") String projectId,
            @RequestParam(value = "ref_name", required = false) String refName,
            @RequestParam(value = "path", required = false) String path,
            @RequestParam(value = "since", required = false) String since,
            @RequestParam(value = "until", required = false) String until
    );
}
