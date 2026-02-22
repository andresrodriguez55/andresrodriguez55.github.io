package com.personalweb.business.dto.requests.update;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;


public record UpdatePostRequest(@NotNull Long categoryId,
                                @NotBlank @Length(min = 3) String title,
                                @NotBlank @Length(min = 1) String content,
                                @NotNull LocalDateTime date,
                                String coverPhotoLink) {
}