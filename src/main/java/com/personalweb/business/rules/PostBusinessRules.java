package com.personalweb.business.rules;

import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.data.repository.PostRepository;
import com.personalweb.utils.constants.Messages;
import com.personalweb.configuration.security.filters.context.ContextHolder;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostBusinessRules {
    private final PostRepository postRepository;

    public void checkIfPostExistsById(long id) {
        if (ContextHolder.isAuthenticated()) {
            if (!postRepository.existsById(id)) {
                throw new BusinessException(Messages.Post.NotExists);
            }
        } else {
            if (!postRepository.existsByIdAndCategory_HideFalse(id)) {
                throw new BusinessException(Messages.Post.NotExists);
            }
        }

    }

    public void checkIfPostExistByTitleIgnoreCase(String title) {
        if (postRepository.existsPostByTitleIgnoreCase(title)) {
            throw new BusinessException(Messages.Post.Exists);
        }
    }

    public void checkIfPostNotExistsAnotherRecordByTitleIgnoreCase(long id, String title) {
        if (postRepository.existsPostByIdNotAndTitleIgnoreCase(id, title)) {
            throw new BusinessException(Messages.Category.Exists);
        }
    }
}
