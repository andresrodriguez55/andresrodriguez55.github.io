package com.personalweb.business.dto.responses.create;

import java.time.LocalDateTime;

public record CreatePostResponse(Long categoryId,
                                 Long id,
                                 String title,
                                 LocalDateTime date,
                                 String coverPhotoLink) {

}