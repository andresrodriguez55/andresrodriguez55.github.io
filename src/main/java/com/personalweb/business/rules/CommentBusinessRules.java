package com.personalweb.business.rules;

import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.data.repository.CommentRepository;
import com.personalweb.utils.constants.Messages;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentBusinessRules {
    private final CommentRepository commentRepository;

    public void checkIfCommentExistsById(long id) {
        if (!commentRepository.existsById(id)) {
            throw new BusinessException(Messages.Comment.NotExists);
        }
    }

    public void checkIfIsNotSelfParent(long id, long parentId) {
        if (id == parentId) {
            throw new BusinessException(Messages.Comment.SelfParentIsNotValid);
        }
    }
}
