package com.ssafy.withme.domain.workspace.repository.jpa;

import com.ssafy.withme.domain.workspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceJpaRepository extends JpaRepository<Workspace, Long> {
    Workspace findByRepoUrl(String repoUrl);
}
