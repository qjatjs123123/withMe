package com.ssafy.withme.domain.repository.entity;

import com.ssafy.withme.domain.member.entity.Member;
import com.ssafy.withme.domain.workspace.entity.Workspace;
import com.ssafy.withme.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@SQLDelete(sql = "UPDATE repository SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Repo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(name = "is_visible", nullable = false, columnDefinition = "boolean default false")
    private Boolean isVisible = false;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")
    private Boolean isDeleted = false;

    @Builder
    public Repo(Member member, Workspace workspace) {
        this.member = member;
        this.workspace = workspace;
    }

    public void changeIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }
}
