package com.personalweb.business.dto.responses.create;

import java.time.LocalDateTime;


public record CreateSubscribedEmailResponse(Long id,
                                            String email,
                                            LocalDateTime date) {
}