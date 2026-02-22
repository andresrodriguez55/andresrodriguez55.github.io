package com.personalweb.business.rules;

import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.data.repository.UserRepository;
import com.personalweb.utils.constants.Messages;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserBusinessRules {
    private final UserRepository userRepository;

    public void checkIfUserExistsByUsername(String username) {
        if (!userRepository.existsByUsername(username)) {
            throw new BusinessException(Messages.User.NotExists);
        }
    }
}
