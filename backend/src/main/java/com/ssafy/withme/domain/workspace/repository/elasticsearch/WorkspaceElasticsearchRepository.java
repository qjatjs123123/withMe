package com.ssafy.withme.domain.workspace.repository.elasticsearch;

import com.ssafy.withme.domain.workspace.entity.WorkspaceDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceElasticsearchRepository extends ElasticsearchRepository<WorkspaceDocument, Long> {

    @Query("{\"match_phrase\": {\"readme_content\": \"*?0*\"}}")
    List<WorkspaceDocument> findByReadmeContentContaining(String keyword);
}