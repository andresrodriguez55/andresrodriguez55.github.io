package com.personalweb.business.dto.responses.get;

public record GetAllCommentsCountPerMonthsResponse(Integer monthNumber,
                                                   Long commentsCount) {
}
