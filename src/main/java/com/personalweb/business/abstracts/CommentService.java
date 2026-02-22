package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.business.dto.requests.update.UpdateCommentRequest;
import com.personalweb.business.dto.responses.create.CreateCommentResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsResponse;
import com.personalweb.business.dto.responses.get.GetCommentsByPostIdResponse;
import com.personalweb.business.dto.responses.update.UpdateCommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {
    Page<GetAllCommentsResponse> getAll(Pageable pageable);

    List<GetCommentsByPostIdResponse> getByPostId(long postId);

    CreateCommentResponse add(CreateCommentRequest request);

    UpdateCommentResponse update(long id, UpdateCommentRequest request);

    void delete(long id);
}
