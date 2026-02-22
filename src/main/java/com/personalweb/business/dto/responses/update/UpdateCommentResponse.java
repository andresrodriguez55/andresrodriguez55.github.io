package com.personalweb.business.dto.responses.update;

import java.time.LocalDateTime;

public record UpdateCommentResponse(Long postId,
                                    Long parentCommentId,
                                    Long id,
                                    String email,
                                    boolean notifyEmail,
                                    String nickname,
                                    String content,
                                    String country,
                                    LocalDateTime date) {

}