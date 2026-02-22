package com.personalweb.data.dto;

import java.time.LocalDateTime;

public record PostWithCategoryNameAndCommentsCountDto(Long id,
                                                      String title,
                                                      String coverPhotoLink,
                                                      String categoryName,
                                                      Long commentsCount,
                                                      LocalDateTime date) {
}
