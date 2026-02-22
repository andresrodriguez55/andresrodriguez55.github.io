package com.personalweb.business.dto.responses.update;

import java.time.LocalDateTime;

public record UpdatePostResponse(Long categoryId,
                                 Long id,
                                 String title,
                                 LocalDateTime date,
                                 String coverPhotoLink) {

}