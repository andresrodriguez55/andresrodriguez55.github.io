package com.personalweb.data.entities.security;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("failure")
public class LoginFailure extends BaseLogin {
    private String username;
}
