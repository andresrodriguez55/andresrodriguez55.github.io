package com.personalweb.data.entities.security;

import com.personalweb.data.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Setter
@Getter
@Entity
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "loginType")
@Table(name = "logins")
public class BaseLogin extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private String ip;
}
