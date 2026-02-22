package com.personalweb.business.dto.requests.create;

import com.personalweb.common.constants.Regex;
import com.personalweb.utils.constants.Messages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record CreateCommentRequest(@NotNull Long postId,
                                   Long parentCommentId,
                                   @Pattern(regexp = Regex.EMAIL, message = Messages.Comment.EmailNotValid)
                                   String email,
                                   @NotNull Boolean notifyEmail,
                                   @NotBlank @Length(min = 3) String nickname,
                                   @NotBlank @Length(min = 2, max = 120) String content,
                                   String country) {
}