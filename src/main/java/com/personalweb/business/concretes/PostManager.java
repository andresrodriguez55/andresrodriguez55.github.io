package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.MailService;
import com.personalweb.business.abstracts.NotifierService;
import com.personalweb.business.abstracts.PostService;
import com.personalweb.business.dto.requests.create.CreatePostRequest;
import com.personalweb.business.dto.requests.update.UpdatePostRequest;
import com.personalweb.business.dto.responses.create.CreatePostResponse;
import com.personalweb.business.dto.responses.get.GetAllPostsResponse;
import com.personalweb.business.dto.responses.get.GetPostResponse;
import com.personalweb.business.dto.responses.update.UpdatePostResponse;
import com.personalweb.business.mappers.PostMapper;
import com.personalweb.business.rules.CategoryBusinessRules;
import com.personalweb.business.rules.PostBusinessRules;
import com.personalweb.data.dto.PostWithCategoryNameAndCommentsCountDto;
import com.personalweb.data.entities.Category;
import com.personalweb.data.entities.Post;
import com.personalweb.data.repository.PostRepository;
import com.personalweb.data.repository.SubscribedEmailRepository;
import com.personalweb.configuration.security.filters.context.ContextHolder;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PostManager implements PostService {
    private final PostRepository postRepository;
    private final SubscribedEmailRepository subscribedEmailRepository;
    private final PostBusinessRules postBusinessRules;
    private final CategoryBusinessRules categoryBusinessRules;
    private final NotifierService notifierService;
    private final CacheManager cacheManager;
    private final PostMapper postMapper;

    @Override
    public InputStream downloadTool(long id) {
        return postRepository.findByIdAndCategory_HideTrue(id)
                .map(post -> new ByteArrayInputStream(post.getContent().getBytes(StandardCharsets.UTF_8)))
                .orElse((new ByteArrayInputStream(new byte[0])));
    }

    @Override
    public Page<GetAllPostsResponse> getAll(Pageable pageable, String categoryName, String title) {
        Page<PostWithCategoryNameAndCommentsCountDto> postPage =
                postRepository.findAllWithCategoryNameAndCommentsCount(
                        categoryName, title, pageable);
        List<GetAllPostsResponse> postDtoPage = postPage.getContent().stream()
                .map(postMapper::toGetAllPostsResponse)
                .toList();
        return new PageImpl<>(postDtoPage, pageable, postPage.getTotalElements());
    }

    @Cacheable(
            value = Post.ENTITY_NAME,
            key = "#id",
            unless = "#result == null || #result.categoryHide")
    @Transactional(readOnly = true)
    @Override
    public GetPostResponse getById(long id) {
        return postRepository.findById(id)
                .filter(p -> {
                    boolean isPrivate = Optional.ofNullable(p.getCategory())
                            .map(Category::isHide)
                            .orElse(false);
                    return !isPrivate || ContextHolder.isAuthenticated();
                })
                .map(postMapper::toGetPostResponse)
                .orElse(null);
    }

    @Override
    @Transactional
    public CreatePostResponse add(CreatePostRequest request) {
        postBusinessRules.checkIfPostExistByTitleIgnoreCase(request.title());
        categoryBusinessRules.checkIfCategoryExistsById(request.categoryId());
        Post post = postRepository.save(postMapper.toPost(request));
        Optional.ofNullable(post.getCategory())
                .filter(category -> !category.isHide())
                .ifPresent((category -> notifierService.notifySubscribedEmailsForNewPost(post)));
        return postMapper.toCreatePostResponse(post);
    }

    @Transactional
    @Override
    public UpdatePostResponse update(long id, UpdatePostRequest request) {
        postBusinessRules.checkIfPostExistsById(id);
        postBusinessRules.checkIfPostNotExistsAnotherRecordByTitleIgnoreCase(id, request.title());
        categoryBusinessRules.checkIfCategoryExistsById(request.categoryId());
        Post post = postRepository.save(postMapper.toPost(id, request));
        Optional.ofNullable(cacheManager.getCache(Post.ENTITY_NAME))
                .ifPresent(cache ->
                        Optional.ofNullable(post.getCategory())
                                .filter(Category::isHide)
                                .ifPresentOrElse(
                                        c -> cache.evict(id),
                                        () -> cache.put(id, postMapper.toGetPostResponse(post))));
        return postMapper.toUpdatePostResponse(post);
    }

    @CacheEvict(
            value = Post.ENTITY_NAME,
            key = "#id")
    @Override
    public void delete(long id) {
        postBusinessRules.checkIfPostExistsById(id);
        postRepository.deleteById(id);
    }
}
