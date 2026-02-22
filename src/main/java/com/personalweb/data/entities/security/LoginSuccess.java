package com.personalweb.data.entities.security;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("success")
public class LoginSuccess extends BaseLogin {

}
