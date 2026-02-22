package com.personalweb.business.mappers;

import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.business.dto.requests.update.UpdateCommentRequest;
import com.personalweb.business.dto.responses.create.CreateCommentResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsResponse;
import com.personalweb.business.dto.responses.get.GetCommentsByPostIdResponse;
import com.personalweb.business.dto.responses.update.UpdateCommentResponse;
import com.personalweb.common.constants.TimeZone;
import com.personalweb.data.entities.Comment;
import com.personalweb.data.entities.Post;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.LinkedList;
import java.util.Optional;

@Component
public class CommentMapper {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public GetAllCommentsResponse toGetAllCommentsResponse(Comment request) {
        return Optional.ofNullable(request)
                .map(c -> new GetAllCommentsResponse(
                        Optional.ofNullable(c.getPost())
                                .map(Post::getId)
                                .orElse(null),
                        Optional.ofNullable(c.getPost())
                                .map(Post::getTitle)
                                .orElse(null),
                        Optional.ofNullable(c.getParentComment())
                                .map(Comment::getId)
                                .orElse(null),
                        c.getId(),
                        c.getEmail(),
                        c.isNotifyEmail(),
                        c.getNickname(),
                        c.getContent(),
                        c.getCountry(),
                        c.getDate()))
                .orElse(null);
    }

    //todo osiv
    public Comment toComment(long id, UpdateCommentRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Comment response = new Comment();
                    response.setId(id);
                    response.setParentComment(Optional.ofNullable(r.parentCommentId())
                            .map(i -> entityManager.getReference(Comment.class, i))
                            .orElse(null));
                    response.setPost(entityManager.getReference(Post.class, request.postId()));
                    response.setEmail(request.email());
                    response.setNotifyEmail(request.notifyEmail());
                    response.setNickname(request.nickname());
                    response.setContent(request.content());
                    response.setCountry(request.country());
                    response.setDate(request.date());
                    return response;
                })
                .orElse(null);
    }

    @Transactional
    public UpdateCommentResponse toUpdateCommentResponse(Comment request) {
        return Optional.ofNullable(request)
                .map(c -> new UpdateCommentResponse(
                        Optional.ofNullable(c.getPost())
                                .map(Post::getId)
                                .orElse(null),
                        Optional.ofNullable(c.getParentComment())
                                .map(Comment::getId)
                                .orElse(null),
                        c.getId(),
                        c.getEmail(),
                        c.isNotifyEmail(),
                        c.getNickname(),
                        c.getContent(),
                        c.getCountry(),
                        c.getDate()))
                .orElse(null);
    }

    //todo osiv?
    public Comment toComment(CreateCommentRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Comment response = new Comment();
                    response.setParentComment(Optional.ofNullable(r.parentCommentId())
                            .map(i -> entityManager.getReference(Comment.class, i))
                            .orElse(null));
                    response.setPost(entityManager.getReference(Post.class, request.postId()));
                    response.setEmail(request.email());
                    response.setNotifyEmail(request.notifyEmail());
                    response.setNickname(request.nickname());
                    response.setContent(request.content());
                    response.setCountry(request.country());
                    response.setDate(LocalDateTime.now(ZoneId.of(TimeZone.ISTANBUL.value())));
                    return response;
                })
                .orElse(null);
    }

    @Transactional
    public CreateCommentResponse toCreateCommentResponse(Comment request) {
        return Optional.ofNullable(request)
                .map(c -> new CreateCommentResponse(
                        Optional.ofNullable(c.getPost())
                                .map(Post::getId)
                                .orElse(null),
                        Optional.ofNullable(c.getParentComment())
                                .map(Comment::getId)
                                .orElse(null),
                        c.getId(),
                        c.getEmail(),
                        c.isNotifyEmail(),
                        c.getNickname(),
                        c.getContent(),
                        c.getCountry(),
                        c.getDate()))
                .orElse(null);
    }

    @Transactional
    public GetCommentsByPostIdResponse toGetCommentsByPostIdResponse(Comment request) {
        return Optional.ofNullable(request)
                .map(r -> new GetCommentsByPostIdResponse(
                        Optional.ofNullable(request.getPost())
                                .map(Post::getId)
                                .orElse(null),
                        request.getId(),
                        request.getNickname(),
                        Optional.ofNullable(request.getParentComment())
                                .map(Comment::getNickname)
                                .map(parentNickname -> String.format("<b>@%s</b> %s",
                                        parentNickname,
                                        request.getContent()))
                                .orElse(request.getContent()),
                        request.getDate(),
                        new LinkedList<>()
                ))
                .orElse(null);
    }
}
