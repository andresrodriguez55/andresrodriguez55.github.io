package com.personalweb.data.repository.security;

import com.personalweb.data.entities.security.LoginFailure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginFailureRepository extends JpaRepository<LoginFailure, Long> {

}
