package com.personalweb.data.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.time.LocalDateTime;
import java.util.List;

@FilterDef(name = Post.CATEGORY_NAME_FILTER_NAME,
        parameters = @ParamDef(name = Category.NAME_FILTER_ARGUMENT_NAME, type = String.class))
@Entity
@Data
@Table(name = "posts")
public class Post extends BaseEntity {
    public static final String CATEGORY_NAME_FILTER_NAME = "categoryNameFilter";

    public static final String ENTITY_NAME = "Post";

    public final static String ID = "id";
    public final static String TITLE = "title";
    public final static String DATE = "date";
    public final static String CATEGORY = "category";
    public final static String COMMENTS = "comments";
    public final static String COVER_PHOTO_LINK = "coverPhotoLink";

    private String title;
    private String content;
    private LocalDateTime date;
    private String coverPhotoLink;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    //TODO fix filter
    @Filter(name = Post.CATEGORY_NAME_FILTER_NAME,
            condition = Category.NAME + " != :" + Category.NAME_FILTER_ARGUMENT_NAME)
    private Category category;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    private List<Comment> comments;
}
