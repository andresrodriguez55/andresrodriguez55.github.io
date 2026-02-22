package com.personalweb.business.dto.responses.get;

import java.time.LocalDateTime;

public record GetPostResponse(Boolean categoryHide,
                              String categoryName,
                              Long categoryId,
                              Long id,
                              String title,
                              String content,
                              LocalDateTime date,
                              String coverPhotoLink) {

}