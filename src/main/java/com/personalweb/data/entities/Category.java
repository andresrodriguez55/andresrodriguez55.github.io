package com.personalweb.data.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.List;

@FilterDef(name = Category.NAME_FILTER_NAME,
        parameters = @ParamDef(name = Category.NAME_FILTER_ARGUMENT_NAME, type = String.class),
        defaultCondition = Category.NAME + " != :" + Category.NAME_FILTER_ARGUMENT_NAME)
@Filter(name = Category.NAME_FILTER_NAME)
@Entity
@Data
@Table(name = "categories")
public class Category extends BaseEntity {
    public static final String PRIVATE = "Private";

    public static final String NAME_FILTER_NAME = "nameFilter";
    public static final String NAME_FILTER_ARGUMENT_NAME = "name";

    public static final String NAME = "name";
    public static final String POSTS = "posts";
    public static final String HIDE = "hide";

    private String name;
    private boolean hide;
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Post> posts;
}
