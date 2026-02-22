package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.create.CreatePostRequest;
import com.personalweb.business.dto.requests.update.UpdatePostRequest;
import com.personalweb.business.dto.responses.create.CreatePostResponse;
import com.personalweb.business.dto.responses.get.GetAllPostsResponse;
import com.personalweb.business.dto.responses.get.GetPostResponse;
import com.personalweb.business.dto.responses.update.UpdatePostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.InputStream;

public interface PostService {
    InputStream downloadTool(long id);

    Page<GetAllPostsResponse> getAll(Pageable pageable, String categoryName, String title);

    GetPostResponse getById(long id);

    CreatePostResponse add(CreatePostRequest request);

    UpdatePostResponse update(long id, UpdatePostRequest request);

    void delete(long id);
}
