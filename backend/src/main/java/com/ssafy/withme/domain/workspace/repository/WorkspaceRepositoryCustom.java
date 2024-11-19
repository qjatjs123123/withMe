package com.ssafy.withme.domain.workspace.repository;

import com.ssafy.withme.domain.workspace.entity.Workspace;
import java.util.List;

public interface WorkspaceRepositoryCustom {
    List<Workspace> searchByReadMeContent(String keyword);
}
