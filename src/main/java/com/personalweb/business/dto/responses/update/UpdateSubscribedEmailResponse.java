package com.personalweb.business.dto.responses.update;

import java.time.LocalDateTime;

public record UpdateSubscribedEmailResponse(Long id,
                                            String email,
                                            LocalDateTime date) {

}