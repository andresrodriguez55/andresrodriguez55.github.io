package com.personalweb.business.dto.requests.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthenticateUserRequest(@NotBlank @Size(min = 3, max = 20) String username,
                                      @NotBlank @Size(min = 3, max = 20) String password) {

}