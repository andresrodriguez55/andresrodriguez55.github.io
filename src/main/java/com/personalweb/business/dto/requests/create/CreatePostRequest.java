package com.personalweb.business.dto.requests.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.Length;

public record CreatePostRequest(@Positive @NotNull Long categoryId,
                                @NotBlank @Length(min = 3) String title,
                                @NotBlank @Length(min = 1) String content,
                                String coverPhotoLink) {

}