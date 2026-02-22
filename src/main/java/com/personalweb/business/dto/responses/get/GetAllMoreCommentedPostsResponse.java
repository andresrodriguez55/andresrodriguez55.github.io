package com.personalweb.business.dto.responses.get;

public record GetAllMoreCommentedPostsResponse(Long id,
                                               String title,
                                               Long commentsCount) {

}
