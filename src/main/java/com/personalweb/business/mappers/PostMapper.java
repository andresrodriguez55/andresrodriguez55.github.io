package com.personalweb.business.mappers;

import com.personalweb.business.dto.requests.create.CreatePostRequest;
import com.personalweb.business.dto.requests.update.UpdatePostRequest;
import com.personalweb.business.dto.responses.create.CreatePostResponse;
import com.personalweb.business.dto.responses.get.GetAllPostsResponse;
import com.personalweb.business.dto.responses.get.GetPostResponse;
import com.personalweb.business.dto.responses.update.UpdatePostResponse;
import com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto;
import com.personalweb.data.entities.Category;
import com.personalweb.data.entities.Post;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class PostMapper {
    @PersistenceContext
    private EntityManager entityManager;

    public GetAllPostsResponse toGetAllPostsResponse(PostWithCategoryNameAndCommentsCountDto request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllPostsResponse(
                        r.id(),
                        r.categoryName(),
                        r.title(),
                        r.date(),
                        r.coverPhotoLink(),
                        r.commentsCount()))
                .orElse(null);
    }

    @Transactional
    public GetPostResponse toGetPostResponse(Post request) {
        return Optional.ofNullable(request)
                .map(p -> new GetPostResponse(
                        Optional.ofNullable(p.getCategory())
                                .map(Category::isHide)
                                .orElse(null),
                        Optional.ofNullable(p.getCategory())
                                .map(Category::getName)
                                .orElse(null),
                        Optional.ofNullable(p.getCategory())
                                .map(Category::getId)
                                .orElse(null),
                        p.getId(),
                        p.getTitle(),
                        p.getContent(),
                        p.getDate(),
                        p.getCoverPhotoLink()
                ))
                .orElse(null);
    }

    //todo osiv
    public Post toPost(CreatePostRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Post response = new Post();
                    response.setCategory(
                            Optional.ofNullable(r.categoryId())
                                    .map(id -> entityManager.getReference(Category.class, id))
                                    .orElse(null));
                    response.setTitle(request.title());
                    response.setContent(request.content());
                    response.setCoverPhotoLink(request.coverPhotoLink());
                    response.setDate(LocalDateTime.now());
                    return response;
                })
                .orElse(null);
    }

    @Transactional
    public CreatePostResponse toCreatePostResponse(Post request) {
        return Optional.ofNullable(request)
                .map(r -> new CreatePostResponse(
                        Optional.ofNullable(r.getCategory())
                                .map(Category::getId)
                                .orElse(null),
                        r.getId(),
                        r.getTitle(),
                        r.getDate(),
                        r.getCoverPhotoLink()))
                .orElse(null);
    }

    //todo osiv
    public Post toPost(long id, UpdatePostRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    Post response = new Post();
                    response.setId(id);
                    response.setCategory(Optional.ofNullable(r.categoryId())
                            .map(i -> entityManager.getReference(Category.class, i))
                            .orElse(null));
                    response.setTitle(request.title());
                    response.setContent(request.content());
                    response.setDate(request.date());
                    response.setCoverPhotoLink(request.coverPhotoLink());
                    return response;
                })
                .orElse(null);
    }

    @Transactional
    public UpdatePostResponse toUpdatePostResponse(Post request) {
        return Optional.ofNullable(request)
                .map(p -> new UpdatePostResponse(
                        Optional.ofNullable(p.getCategory())
                                .map(Category::getId)
                                .orElse(null),
                        p.getId(),
                        p.getTitle(),
                        p.getDate(),
                        p.getCoverPhotoLink()))
                .orElse(null);
    }
}
