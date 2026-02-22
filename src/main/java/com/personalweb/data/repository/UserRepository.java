package com.personalweb.data.repository;

import com.personalweb.data.entities.security.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("""
            SELECT u.id
            FROM User u
            WHERE u.username = :username
            """)
    Optional<Long> findIdByUsername(String username);
}
