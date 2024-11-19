package com.ssafy.withme.domain.repository.repository;

import com.ssafy.withme.domain.repository.entity.Repo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RepoRepository extends JpaRepository<Repo, Long> {

    Slice<Repo> findAllByMember_IdAndIsVisibleTrueAndUpdatedAtBefore(Long memberId, LocalDateTime cursor, Pageable pageable);

    List<Repo> findAllByMember_IdAndIsVisibleTrue(Long memberId);

    List<Repo> findAllByMember_IdAndIsVisibleFalse(Long memberId);

    List<Repo> findAllByMember_Id(Long memberId);

    Optional<Repo> findByMember_IdAndWorkspace_Id(Long memberId, Long workspaceId);

    Optional<Repo> findByMember_IdAndWorkspace_RepoUrl(Long memberId, String workspaceUrl);
}
