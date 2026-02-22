package com.personalweb.business.rules;

import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.data.repository.CategoryRepository;
import com.personalweb.utils.constants.Messages;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryBusinessRules {
    private final CategoryRepository categoryRepository;

    public void checkIfCategoryExistsById(long id) {
        if (!categoryRepository.existsById(id)) {
            throw new BusinessException(Messages.Category.NotExists);
        }
    }

    public void checkIfCategoryNotExistsByNameIgnoreCase(String categoryName) {
        if (categoryRepository.existsCategoryByNameIgnoreCase(categoryName)) {
            throw new BusinessException(Messages.Category.Exists);
        }
    }

    public void checkIfCategoryNotExistsAnotherRecordByNameIgnoreCase(long id, String categoryName) {
        if (categoryRepository.existsCategoryByIdNotAndNameIgnoreCase(id, categoryName)) {
            throw new BusinessException(Messages.Category.Exists);
        }
    }
}
