package com.personalweb.data.repository.security;

import com.personalweb.data.entities.security.LoginSuccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginSuccessRepository extends JpaRepository<LoginSuccess, Long> {
}
