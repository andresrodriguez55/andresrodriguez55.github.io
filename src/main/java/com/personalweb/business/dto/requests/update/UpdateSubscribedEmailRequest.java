package com.personalweb.business.dto.requests.update;

import com.personalweb.common.constants.Regex;
import com.personalweb.utils.constants.Messages;
import jakarta.validation.constraints.Pattern;

public record UpdateSubscribedEmailRequest(
        @Pattern(regexp = Regex.EMAIL, message = Messages.SubscribedEmail.EmailNotValid)
        String email) {
}