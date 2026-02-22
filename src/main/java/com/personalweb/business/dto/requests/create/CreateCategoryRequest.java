package com.personalweb.business.dto.requests.create;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;


public record CreateCategoryRequest(@NotBlank() @Length(min = 1) String name) {
}
