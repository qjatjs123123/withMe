package com.ssafy.withme.domain.workspace.repository;

import com.ssafy.withme.domain.workspace.entity.Workspace;
import lombok.AllArgsConstructor;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@AllArgsConstructor
public class WorkspaceRepositoryCustomImpl implements WorkspaceRepositoryCustom {

    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<Workspace> searchByReadMeContent(String keyword){
        Criteria criteria = Criteria.where("readmeContent").matches(keyword);
        CriteriaQuery query = new CriteriaQuery(criteria);

        return elasticsearchOperations.search(query, Workspace.class)
                .stream()
                .map(SearchHit::getContent)
                .toList();
    }
}
