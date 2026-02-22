package com.personalweb.data.repository.custom;

import com.personalweb.data.dto.CategoryWithNumberOfPostsDto;

import java.util.List;

public interface CategoryCustomRepository {
    List<CategoryWithNumberOfPostsDto> findAllWithNumberOfPostsOrderByNameAsc();
}
