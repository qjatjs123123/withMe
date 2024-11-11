package com.ssafy.withme.domain.workspace.entity;

import jakarta.persistence.Column;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "workspace_index")
@Getter
public class WorkspaceDocument {

    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT", name = "readme_content")
    private String readmeContent = "";

    public WorkspaceDocument(Workspace workspace) {
        this.id = workspace.getId();
        this.name = workspace.getName();
        this.readmeContent = workspace.getReadmeContent();
    }
}
