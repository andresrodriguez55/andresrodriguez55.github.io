package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.CategoryService;
import com.personalweb.business.dto.requests.create.CreateCategoryRequest;
import com.personalweb.business.dto.requests.update.UpdateCategoryRequest;
import com.personalweb.business.dto.responses.create.CreateCategoryResponse;
import com.personalweb.business.dto.responses.get.GetAllCategoriesResponse;
import com.personalweb.business.dto.responses.update.UpdateCategoryResponse;
import com.personalweb.business.mappers.CategoryMapper;
import com.personalweb.business.rules.CategoryBusinessRules;
import com.personalweb.data.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryManager implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryBusinessRules categoryBusinessRules;
    private final CategoryMapper categoryMapper;

    @Override
    public List<GetAllCategoriesResponse> getAll() {
        return categoryRepository.findAllWithNumberOfPostsOrderByNameAsc().stream()
                .map(categoryMapper::toGetAllCategoriesResponse)
                .toList();
    }

    @Override
    public CreateCategoryResponse add(CreateCategoryRequest request) {
        categoryBusinessRules.checkIfCategoryNotExistsByNameIgnoreCase(request.name());
        return categoryMapper.toCreateCategoryResponse(categoryRepository.save(categoryMapper.toCategory(request)));
    }

    @Override
    public UpdateCategoryResponse update(long id, UpdateCategoryRequest request) {
        categoryBusinessRules.checkIfCategoryExistsById(id);
        categoryBusinessRules.checkIfCategoryNotExistsAnotherRecordByNameIgnoreCase(id, request.name());
        return categoryMapper.toUpdateCategoryResponse(categoryRepository.save(categoryMapper.toCategory(id, request)));
    }

    @Override
    public void delete(long id) {
        categoryBusinessRules.checkIfCategoryExistsById(id);
        categoryRepository.deleteById(id);
    }
}
