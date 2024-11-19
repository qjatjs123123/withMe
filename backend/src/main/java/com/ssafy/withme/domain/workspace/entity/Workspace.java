package com.ssafy.withme.domain.workspace.entity;

import com.ssafy.withme.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE workspace SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Workspace extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String owner;

    @Column(length = 2083)
    private String thumbnail;

    @Column(length = 2083, name = "repo_url")
    private String repoUrl;

    @Column(nullable = false, name = "is_created", columnDefinition = "boolean default false")
    private Boolean isCreated = false;

    @Column(name = "readme_content", columnDefinition = "TEXT")
    private String readmeContent = "";

    @Column(nullable = false, name = "is_private", columnDefinition = "boolean default true")
    private Boolean isPrivate = true;

    @Column(nullable = false, name = "is_deleted", columnDefinition = "boolean default false")
    private Boolean isDeleted = false;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "workspace_info", columnDefinition = "TEXT")
    private String workspaceInfo;

    @Builder
    public Workspace(String name, String owner, String repoUrl, String thumbnail) {
        this.name = name;
        this.owner = owner;
        this.repoUrl = repoUrl;
        this.thumbnail = thumbnail;
    }

    public void changeReadmeContent(String readmeContent) {
        this.readmeContent = readmeContent;
    }

    public void changeIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public void changeIsCreated(Boolean isCreated) {
        this.isCreated = isCreated;
    }

    public void changeRoomId(Long roomId) { this.roomId = roomId; }

    public void changeName(String name) { this.name = name; }

    public void changeThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public void changeWorkspaceInfo(String workspaceInfo) { this.workspaceInfo = workspaceInfo; }
}
