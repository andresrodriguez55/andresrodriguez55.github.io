package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.PostService;
import com.personalweb.business.dto.requests.create.CreatePostRequest;
import com.personalweb.business.dto.requests.update.UpdatePostRequest;
import com.personalweb.business.dto.responses.create.CreatePostResponse;
import com.personalweb.business.dto.responses.get.GetAllPostsResponse;
import com.personalweb.business.dto.responses.get.GetPostResponse;
import com.personalweb.business.dto.responses.update.UpdatePostResponse;
import com.personalweb.common.constants.Roles;
import com.personalweb.data.entities.Post;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping(path = "/api/v1/posts")
@RequiredArgsConstructor
public class PostsController {
    private final PostService postService;

    @GetMapping("/download/{id}.{extension}")
    public ResponseEntity<InputStreamResource> downloadTool(@PathVariable("id") long id,
                                                            @PathVariable("extension") String extension) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"%d%s\"".formatted(id, extension))
                .contentType(MediaType.parseMediaType("application/x-mpegURL"))
                .body(new InputStreamResource(postService.downloadTool(id)));
    }

    @GetMapping
    public ResponseEntity<Page<GetAllPostsResponse>> getAll(@ParameterObject
                                                            @PageableDefault(page = 0, size = 4, sort = Post.DATE,
                                                                    direction = Sort.Direction.DESC) Pageable pageable,
                                                            @RequestParam(required = false) String categoryName,
                                                            @RequestParam(required = false) String title) {
        return new ResponseEntity<>(postService.getAll(pageable, categoryName, title), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<GetPostResponse> getById(@PathVariable("id") long id) {
        return new ResponseEntity<>(postService.getById(id), HttpStatus.OK);
    }

    @RolesAllowed(Roles.ADMIN)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreatePostResponse> add(@Valid @RequestBody CreatePostRequest request) {
        return new ResponseEntity<>(postService.add(request), HttpStatus.CREATED);
    }

    @RolesAllowed(Roles.ADMIN)
    @PutMapping(path = "/{id}")
    public ResponseEntity<UpdatePostResponse> update(@PathVariable("id") long id,
                                                     @Valid @RequestBody UpdatePostRequest request) {
        return new ResponseEntity<>(postService.update(id, request), HttpStatus.OK);
    }

    @RolesAllowed(Roles.ADMIN)
    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> remove(@PathVariable("id") long id) {
        postService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}