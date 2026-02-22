package com.personalweb.business.dto.responses.get;

import java.time.LocalDateTime;


public record GetAllPostsResponse(Long id,
                                  String categoryName,
                                  String title,
                                  LocalDateTime date,
                                  String coverPhotoLink,
                                  long commentsCount) {

}