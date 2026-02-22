package com.personalweb.data.dto;

public record CategoryWithNumberOfPostsDto(Long id,
                                           String name,
                                           Long numberOfPosts) {

}
