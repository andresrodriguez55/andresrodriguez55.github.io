package com.personalweb.business.dto.responses.create;

import java.time.LocalDateTime;

public record CreateCommentResponse(Long postId,
                                    Long parentCommentId,
                                    Long id,
                                    String email,
                                    boolean notifyEmail,
                                    String nickname,
                                    String content,
                                    String country,
                                    LocalDateTime date) {

}