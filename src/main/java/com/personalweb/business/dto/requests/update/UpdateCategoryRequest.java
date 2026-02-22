package com.personalweb.business.dto.requests.update;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record UpdateCategoryRequest(@NotBlank @Length(min = 1) String name) {

}
