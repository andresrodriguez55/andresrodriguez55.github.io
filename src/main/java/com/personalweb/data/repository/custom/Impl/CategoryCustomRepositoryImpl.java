package com.personalweb.data.repository.custom.Impl;

import com.personalweb.data.dto.CategoryWithNumberOfPostsDto;
import com.personalweb.data.entities.Category;
import com.personalweb.data.entities.Post;
import com.personalweb.data.repository.custom.CategoryCustomRepository;
import com.personalweb.configuration.security.filters.context.ContextHolder;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import java.util.List;

public class CategoryCustomRepositoryImpl implements CategoryCustomRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CategoryWithNumberOfPostsDto> findAllWithNumberOfPostsOrderByNameAsc() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<CategoryWithNumberOfPostsDto> criteriaQuery =
                criteriaBuilder.createQuery(CategoryWithNumberOfPostsDto.class);

        Root<Category> categoryRoot = criteriaQuery.from(Category.class);
        Join<Category, Post> postJoin = categoryRoot.join(Category.POSTS, JoinType.LEFT);

        if (!ContextHolder.isAuthenticated()) {
            criteriaQuery.where(criteriaBuilder.isFalse(categoryRoot.get(Category.HIDE)));
        }

        criteriaQuery.groupBy(categoryRoot.get(Category.ID));

        criteriaQuery.orderBy(criteriaBuilder.asc(categoryRoot.get(Category.NAME)));

        Expression<Long> postCountExpression = criteriaBuilder.count(postJoin.get(Post.ID));
        criteriaQuery.select(
                criteriaBuilder.construct(
                        CategoryWithNumberOfPostsDto.class,
                        categoryRoot.get(Category.ID),
                        categoryRoot.get(Category.NAME),
                        postCountExpression
                ));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
