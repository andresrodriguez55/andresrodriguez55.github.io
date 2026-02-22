package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.CommentService;
import com.personalweb.business.abstracts.NotifierService;
import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.business.dto.requests.update.UpdateCommentRequest;
import com.personalweb.business.dto.responses.create.CreateCommentResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsResponse;
import com.personalweb.business.dto.responses.get.GetCommentsByPostIdResponse;
import com.personalweb.business.dto.responses.update.UpdateCommentResponse;
import com.personalweb.business.mappers.CommentMapper;
import com.personalweb.business.rules.CommentBusinessRules;
import com.personalweb.business.rules.PostBusinessRules;
import com.personalweb.configuration.security.filters.context.ContextHolder;
import com.personalweb.data.entities.Comment;
import com.personalweb.data.repository.CommentRepository;
import com.personalweb.data.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentManager implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentBusinessRules commentBusinessRules;
    private final CommentMapper commentMapper;
    private final NotifierService notifierService;
    private final PostRepository postRepository;
    private final PostBusinessRules postBusinessRules;

    @Override
    public Page<GetAllCommentsResponse> getAll(Pageable pageable) {
        Page<Comment> commentsPage = commentRepository.findAllByOrderByDateDesc(pageable);
        List<GetAllCommentsResponse> responses = commentsPage.getContent()
                .stream()
                .map(commentMapper::toGetAllCommentsResponse)
                .toList();
        return new PageImpl<>(responses, pageable, commentsPage.getTotalElements());
    }

    //TODO: improve performance, decrease the number of queries
    //TODO filter by session
    @Transactional
    @Override
    public List<GetCommentsByPostIdResponse> getByPostId(long postId) {
        List<Comment> commentList;
        if (ContextHolder.isAuthenticated()) {
            commentList = commentRepository.findAllAuthenticatedByPostIdOrderByDateAsc(postId);
        } else {
            commentList = commentRepository.findAllPublicByPostIdOrderByDateAsc(postId);
        }

        Map<Long, Long> commentsAncestorIds = new HashMap<>();
        commentList.forEach(comment ->
        {
            Long parentId = comment.getParentComment() != null ? comment.getParentComment().getId() : null;
            Long ancestorId = commentsAncestorIds.getOrDefault(parentId, comment.getId());
            commentsAncestorIds.put(comment.getId(), ancestorId);
        });

        List<GetCommentsByPostIdResponse> response = new ArrayList<>(commentsAncestorIds.size());
        Map<Long, Long> parentCommentListIndex = new HashMap<>();

        commentList.forEach(comment ->
        {
            Comment parentComment = comment.getParentComment();
            GetCommentsByPostIdResponse dto = commentMapper.toGetCommentsByPostIdResponse(comment);
            if (parentComment == null) {
                parentCommentListIndex.put(comment.getId(), (long) response.size());
                response.add(dto);
            } else {
                Long listIndex = parentCommentListIndex.get(commentsAncestorIds.get(parentComment.getId()));
                response.get(Math.toIntExact(listIndex)).childrenComments().add(dto);
            }
        });

        return response;
    }

    @Override
    public CreateCommentResponse add(CreateCommentRequest request) {
        postBusinessRules.checkIfPostExistsById(request.postId());
        Optional.ofNullable(request.parentCommentId())
                .ifPresent(commentBusinessRules::checkIfCommentExistsById);
        Comment comment = commentRepository.save(commentMapper.toComment(request));
        notifierService.notifyParentCommentForNewComment(request, comment);
        return commentMapper.toCreateCommentResponse(comment);
    }

    @Override
    public UpdateCommentResponse update(long id, UpdateCommentRequest request) {
        postBusinessRules.checkIfPostExistsById(request.postId());
        commentBusinessRules.checkIfCommentExistsById(id);
        Optional.ofNullable(request.parentCommentId())
                .ifPresent(parentCommentId -> {
                    commentBusinessRules.checkIfIsNotSelfParent(id, request.parentCommentId());
                    commentBusinessRules.checkIfCommentExistsById(request.parentCommentId());
                });
        return commentMapper.toUpdateCommentResponse(commentRepository.save(commentMapper.toComment(id, request)));
    }

    @Override
    public void delete(long id) {
        commentBusinessRules.checkIfCommentExistsById(id);
        commentRepository.deleteById(id);
    }
}