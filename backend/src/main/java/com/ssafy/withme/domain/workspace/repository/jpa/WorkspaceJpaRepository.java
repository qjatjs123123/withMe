package com.ssafy.withme.domain.workspace.repository.jpa;

import com.ssafy.withme.domain.workspace.entity.Workspace;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceJpaRepository extends JpaRepository<Workspace, Long> {
    Workspace findByRepoUrl(String repoUrl);

    @Query(value = "SELECT * FROM workspace WHERE is_created = true AND readme_content <> '' ORDER BY updated_at DESC", nativeQuery = true)
    List<Workspace> findNonEmptyWorkspace(Pageable pageable);
}
