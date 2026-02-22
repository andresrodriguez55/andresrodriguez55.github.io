package com.personalweb.data.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "comments")
public class Comment extends BaseEntity {
    public final static String ENTITY_NAME = "Comment";
    public final static String DATE = "date";

    private String email;
    private boolean notifyEmail;
    private String nickname;
    private String content;
    private String country;
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    private Comment parentComment;

    //@OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY)
    //private List<Comment> childrenComments;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;
}
