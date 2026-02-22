package com.personalweb.data.repository;

import com.personalweb.data.entities.SubscribedEmail;
import jakarta.persistence.QueryHint;
import org.hibernate.jpa.HibernateHints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface SubscribedEmailRepository extends JpaRepository<SubscribedEmail, Long> {
    boolean existsSubscribedMailByEmailIgnoreCase(String email);

    boolean existsSubscribedEmailByIdNotAndEmailIgnoreCase(long id, String email);

    @Query("SELECT s.email " +
            "FROM SubscribedEmail s")
    @QueryHints(value = {
            @QueryHint(name = HibernateHints.HINT_FETCH_SIZE, value = "" + Integer.MIN_VALUE), //Enable streaming via HINT_FETCH_SIZE
            @QueryHint(name = HibernateHints.HINT_CACHEABLE, value = "false"),
            @QueryHint(name = HibernateHints.HINT_READ_ONLY, value = "true")
            //@QueryHint(name = HibernateHints.HINT_PASS_DISTINCT_THROUGH, value = "false") //Remove duplicates in stream via HINT_PASS_DISTINCT_THROUGH
    })
    Stream<String> findAllEmailsAsStream();
}
