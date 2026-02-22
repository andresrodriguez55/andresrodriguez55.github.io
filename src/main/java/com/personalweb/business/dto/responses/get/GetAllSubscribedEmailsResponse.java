package com.personalweb.business.dto.responses.get;

import java.time.LocalDateTime;

public record GetAllSubscribedEmailsResponse(Long id,
                                             String email,
                                             LocalDateTime date) {
}