package com.personalweb.data.repository;

import com.personalweb.data.dto.MostCommentedPost;
import com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto;
import com.personalweb.data.entities.Post;
import com.personalweb.data.repository.custom.PostCustomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>,
        PostCustomRepository,
        JpaSpecificationExecutor<Post> {
    boolean existsByIdAndCategory_HideFalse(long id);

    boolean existsPostByTitleIgnoreCase(String title);

    boolean existsPostByIdNotAndTitleIgnoreCase(Long id, String title);

    @Query("SELECT NEW com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto(p.id, " +
            "p.title, p.coverPhotoLink, ct.name, COUNT(cm), p.date) " +
            "FROM Post p " +
            "INNER JOIN p.category ct " +
            "LEFT JOIN p.comments cm " +
            "WHERE (:categoryName IS NULL OR ct.name = :categoryName) " +
            "AND (:title IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
            "GROUP BY p.id")
    Page<PostWithCategoryNameAndCommentsCountDto> findAllAuthenticatedWithCategoryNameAndCommentsCount(
            @Param("categoryName") String categoryName,
            @Param("title") String title,
            Pageable pageable);

    @Query("SELECT NEW com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto(p.id, " +
            "p.title, p.coverPhotoLink, ct.name, COUNT(cm), p.date) " +
            "FROM Post p " +
            "INNER JOIN p.category ct " +
            "LEFT JOIN p.comments cm " +
            "WHERE (:categoryName IS NULL OR ct.name = :categoryName) " +
            "AND (:title IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
            "AND (ct.hide = false) " +
            "GROUP BY p.id")
    Page<PostWithCategoryNameAndCommentsCountDto> findAllPublicWithCategoryNameAndCommentsCount(
            @Param("categoryName") String categoryName,
            @Param("title") String title,
            Pageable pageable);

    @Query("SELECT new com.personalweb.data.dto.MostCommentedPost(p.id, p.title, COUNT(c)) " +
            "FROM Post p " +
            "LEFT JOIN p.comments c " +
            "INNER JOIN p.category ct " +
            "WHERE ct.hide = false " +
            "GROUP BY p.id " +
            "ORDER BY COUNT(c) DESC")
    Page<MostCommentedPost> findAllPublicOrderByCommentsCountDesc(Pageable pageable);

    Optional<Post> findByIdAndCategory_HideTrue(Long id);
}
