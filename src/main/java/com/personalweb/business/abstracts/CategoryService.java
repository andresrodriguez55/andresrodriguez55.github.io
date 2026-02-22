package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.create.CreateCategoryRequest;
import com.personalweb.business.dto.requests.update.UpdateCategoryRequest;
import com.personalweb.business.dto.responses.create.CreateCategoryResponse;
import com.personalweb.business.dto.responses.get.GetAllCategoriesResponse;
import com.personalweb.business.dto.responses.update.UpdateCategoryResponse;

import java.util.List;

public interface CategoryService {
    List<GetAllCategoriesResponse> getAll();

    CreateCategoryResponse add(CreateCategoryRequest request);

    UpdateCategoryResponse update(long id, UpdateCategoryRequest request);

    void delete(long id);
}
