package com.personalweb.business.rules;

import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.data.repository.SubscribedEmailRepository;
import com.personalweb.utils.constants.Messages;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscribedEmailBusinessRules {
    private final SubscribedEmailRepository subscribedEmailRepository;

    public void checkIfSubscribedEmailExistsById(long id) {
        if (!subscribedEmailRepository.existsById(id)) {
            throw new BusinessException(Messages.SubscribedEmail.NotExists);
        }
    }

    public void checkIfSubscribedEmailExistByNameIgnoreCase(String name) {
        if (subscribedEmailRepository.existsSubscribedMailByEmailIgnoreCase(name)) {
            throw new BusinessException(Messages.SubscribedEmail.Exists);
        }
    }

    public void checkIfSubscribedEmailNotExistsAnotherRecordByNameIgnoreCaseIgnoreCase(long id, String categoryName) {
        if (subscribedEmailRepository.existsSubscribedEmailByIdNotAndEmailIgnoreCase(id, categoryName)) {
            throw new BusinessException(Messages.SubscribedEmail.Exists);
        }
    }
}
