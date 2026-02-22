package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.CommentService;
import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.business.dto.requests.update.UpdateCommentRequest;
import com.personalweb.business.dto.responses.create.CreateCommentResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsResponse;
import com.personalweb.business.dto.responses.get.GetCommentsByPostIdResponse;
import com.personalweb.business.dto.responses.update.UpdateCommentResponse;
import com.personalweb.common.constants.Roles;
import com.personalweb.data.entities.Comment;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping(path = "/api/v1/comments")
@RequiredArgsConstructor
public class CommentsController {
    private final CommentService commentService;

    @RolesAllowed(Roles.ADMIN)
    @GetMapping
    public ResponseEntity<Page<GetAllCommentsResponse>> getAll(@ParameterObject
                                                               @PageableDefault(page = 0, size = 5,
                                                                       sort = Comment.DATE,
                                                                       direction = Sort.Direction.DESC)
                                                               Pageable pageable) {
        return new ResponseEntity<>(commentService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/post/{postId}")
    public ResponseEntity<List<GetCommentsByPostIdResponse>> getByPostId(@PathVariable("postId") long postId) {
        return new ResponseEntity<>(commentService.getByPostId(postId), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreateCommentResponse> add(@Valid @RequestBody CreateCommentRequest request) {
        return new ResponseEntity<>(commentService.add(request), HttpStatus.CREATED);
    }

    @RolesAllowed(Roles.ADMIN)
    @PutMapping(path = "/{id}")
    public ResponseEntity<UpdateCommentResponse> update(@PathVariable("id") long id,
                                                        @Valid @RequestBody UpdateCommentRequest request) {
        return new ResponseEntity<>(commentService.update(id, request), HttpStatus.NO_CONTENT);
    }

    @RolesAllowed(Roles.ADMIN)
    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> remove(@PathVariable("id") long id) {
        commentService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}