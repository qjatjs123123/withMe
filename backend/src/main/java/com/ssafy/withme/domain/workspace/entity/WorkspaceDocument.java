package com.ssafy.withme.domain.workspace.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "workspace_index")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkspaceDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text, name = "readme_content")
    private String readmeContent = "";

    public WorkspaceDocument(Workspace workspace) {
        this.id = workspace.getId();
        this.name = workspace.getName();
        this.readmeContent = workspace.getReadmeContent();
    }
}
