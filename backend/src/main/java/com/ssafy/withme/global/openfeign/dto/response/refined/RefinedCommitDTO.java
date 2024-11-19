package com.ssafy.withme.global.openfeign.dto.response.refined;

import com.ssafy.withme.global.openfeign.dto.response.github.GHCommitResponseDTO;
import com.ssafy.withme.global.openfeign.dto.response.gitlab.GLCommitResponseDTO;

public record RefinedCommitDTO(
        String id,
        String message,
        String authorName,
        String authorEmail,
        String date
) {
    public RefinedCommitDTO(GHCommitResponseDTO githubCommit) {
        this(
                githubCommit.sha(),
                githubCommit.commit().message(),
                githubCommit.commit().author().name(),
                githubCommit.commit().author().email(),
                githubCommit.commit().author().date()
        );
    }

    public RefinedCommitDTO(GLCommitResponseDTO gitlabCommit) {
        this(
                gitlabCommit.id(),
                gitlabCommit.message(),
                gitlabCommit.author().name(),
                gitlabCommit.author().email(),
                gitlabCommit.authoredDate()
        );
    }
}
