package com.personalweb.business.dto.responses.get;

public record GetAllCategoriesResponse(Long id,
                                       String name,
                                       long numberOfPosts) {
}