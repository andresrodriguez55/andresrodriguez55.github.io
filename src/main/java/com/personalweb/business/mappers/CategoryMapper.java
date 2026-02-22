package com.personalweb.business.mappers;

import com.personalweb.business.dto.requests.create.CreateCategoryRequest;
import com.personalweb.business.dto.requests.update.UpdateCategoryRequest;
import com.personalweb.business.dto.responses.create.CreateCategoryResponse;
import com.personalweb.business.dto.responses.get.GetAllCategoriesResponse;
import com.personalweb.business.dto.responses.update.UpdateCategoryResponse;
import com.personalweb.data.dto.CategoryWithNumberOfPostsDto;
import com.personalweb.data.entities.Category;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CategoryMapper {
    public GetAllCategoriesResponse toGetAllCategoriesResponse(CategoryWithNumberOfPostsDto request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllCategoriesResponse(
                        request.id(),
                        request.name(),
                        request.numberOfPosts()))
                .orElse(null);
    }

    public CreateCategoryResponse toCreateCategoryResponse(Category request) {
        return Optional.ofNullable(request)
                .map(r -> new CreateCategoryResponse(
                        request.getId(),
                        request.getName()))
                .orElse(null);
    }

    public Category toCategory(CreateCategoryRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Category response = new Category();
                    response.setName(r.name());
                    return response;
                })
                .orElse(null);
    }

    public UpdateCategoryResponse toUpdateCategoryResponse(Category request) {
        return Optional.ofNullable(request)
                .map(r -> new UpdateCategoryResponse(
                        request.getId(),
                        request.getName()))
                .orElse(null);
    }

    public Category toCategory(long id, UpdateCategoryRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Category response = new Category();
                    response.setId(id);
                    response.setName(r.name());
                    return response;
                })
                .orElse(null);
    }
}
