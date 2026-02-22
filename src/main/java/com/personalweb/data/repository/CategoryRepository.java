package com.personalweb.data.repository;

import com.personalweb.data.entities.Category;
import com.personalweb.data.repository.custom.CategoryCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>,
        JpaSpecificationExecutor<Category>,
        CategoryCustomRepository {
    @Query("""
                    SELECT c 
                    FROM Category c 
                    WHERE c.hide = true
            """)
    List<Category> findHiddenCategories();

    boolean existsCategoryByNameIgnoreCase(String name);

    boolean existsCategoryByIdNotAndNameIgnoreCase(long id, String name);
}
