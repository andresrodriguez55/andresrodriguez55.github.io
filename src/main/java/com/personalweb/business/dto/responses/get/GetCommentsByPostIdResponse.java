package com.personalweb.business.dto.responses.get;

import java.time.LocalDateTime;
import java.util.List;

public record GetCommentsByPostIdResponse(Long postId,
                                          Long id,
                                          String nickname,
                                          String content,
                                          LocalDateTime date,
                                          List<GetCommentsByPostIdResponse> childrenComments) {

}
