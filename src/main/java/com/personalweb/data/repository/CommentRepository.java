package com.personalweb.data.repository;

import com.personalweb.data.dto.CountryCommentsCount;
import com.personalweb.data.dto.MonthCommentsCount;
import com.personalweb.data.dto.TopCommenter;
import com.personalweb.data.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByOrderByDateDesc(Pageable pageable);

    @EntityGraph(attributePaths = "parentComment")
    @Query("""
            SELECT c
            FROM Comment c
            INNER JOIN c.post p
            INNER JOIN p.category cat
            WHERE c.post.id = :postId
                AND cat.hide = false
            ORDER BY c.date ASC
            """)
    List<Comment> findAllPublicByPostIdOrderByDateAsc(@Param("postId") long postId);

    @Query("""
            SELECT c
            FROM Comment c
            WHERE c.post.id = :postId
            ORDER BY c.date ASC
            """)
    List<Comment> findAllAuthenticatedByPostIdOrderByDateAsc(@Param("postId") long postId);

    @Query("""
            SELECT new com.personalweb.data.dto.TopCommenter(LOWER(c.nickname), COUNT(*))
            FROM Comment AS c
            INNER JOIN c.post p
            INNER JOIN p.category cat
            WHERE cat.hide = false
            GROUP BY LOWER(c.nickname)
            ORDER BY COUNT(*) DESC
            """)
    List<TopCommenter> findPublicTopCommentersOrderByCountDesc(Pageable pageable);

    @Query("""
            SELECT new com.personalweb.data.dto.MonthCommentsCount(MONTH(c.date), COUNT(*))
            FROM Comment AS c
            INNER JOIN c.post p
            INNER JOIN p.category cat
            WHERE c.date IS NOT NULL
                AND cat.hide = false
            GROUP BY MONTH(c.date)
            ORDER BY MONTH(c.date) ASC
            """)
    List<MonthCommentsCount> findPublicMonthCommentsCountOrderByMonthAsc();

    @Query("""
            SELECT new com.personalweb.data.dto.CountryCommentsCount(c.country, COUNT(*))
            FROM Comment AS c
            INNER JOIN c.post p
            INNER JOIN p.category cat
            WHERE cat.hide = false
            GROUP BY c.country
            ORDER BY COUNT(*) DESC
            """)
    List<CountryCommentsCount> findPublicCountryCommentsCountOrderByCountDesc();
}
