package com.personalweb.data.repository.custom.Impl;

import com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto;
import com.personalweb.data.repository.PostRepository;
import com.personalweb.data.repository.custom.PostCustomRepository;
import com.personalweb.configuration.security.filters.context.ContextHolder;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class PostCustomRepositoryImpl implements PostCustomRepository {
    private final PostRepository postRepository;

    public PostCustomRepositoryImpl(@Lazy PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Page<PostWithCategoryNameAndCommentsCountDto>
    findAllWithCategoryNameAndCommentsCount(String categoryName, String title, Pageable pageable) {
        if (ContextHolder.isAuthenticated()) {
            return postRepository.findAllAuthenticatedWithCategoryNameAndCommentsCount(categoryName, title, pageable);
        }
        return postRepository.findAllPublicWithCategoryNameAndCommentsCount(categoryName, title, pageable);
    }
}
