package com.personalweb.data.repository.custom;

import com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostCustomRepository {
    Page<PostWithCategoryNameAndCommentsCountDto>
    findAllWithCategoryNameAndCommentsCount(String categoryName, String title, Pageable pageable);
}
