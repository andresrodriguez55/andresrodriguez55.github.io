package com.personalweb.business.dto.responses.get;

import java.time.LocalDateTime;


public record GetAllCommentsResponse(Long postId,
                                     String postTitle,
                                     Long parentCommentId,
                                     Long id,
                                     String email,
                                     Boolean notifyEmail,
                                     String nickname,
                                     String content,
                                     String country,
                                     LocalDateTime date) {

}