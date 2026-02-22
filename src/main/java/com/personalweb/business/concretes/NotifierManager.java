package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.MailService;
import com.personalweb.business.abstracts.NotifierService;
import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.data.entities.Comment;
import com.personalweb.data.entities.Post;
import com.personalweb.data.repository.CommentRepository;
import com.personalweb.data.repository.PostRepository;
import com.personalweb.data.repository.SubscribedEmailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class NotifierManager extends NotifierService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final SubscribedEmailRepository subscribedEmailRepository;
    private final MailService mailService;

    @Override
    public void notifyParentCommentForNewComment(CreateCommentRequest request, Comment newCommentEntity) {
        if (request == null || request.parentCommentId() == null || newCommentEntity == null) {
            return;
        }
        commentRepository.findById(request.parentCommentId())
                .filter(Comment::isNotifyEmail)
                .ifPresent(ancestorComment ->
                        postRepository.findById(request.postId())
                                .ifPresent(post ->
                                        mailService.sendEmail(
                                                mailService.buildCommentReplySubject(
                                                        ancestorComment.getNickname(),
                                                        post.getTitle()),
                                                mailService.buildEmailCommentReplyContent(
                                                        ancestorComment,
                                                        newCommentEntity,
                                                        post),
                                                ancestorComment.getEmail())));
    }

    @Transactional
    @Override
    public void notifySubscribedEmailsForNewPost(Post newPostEntity) {
        try (Stream<String> emailsStream = subscribedEmailRepository.findAllEmailsAsStream()) {
            emailsStream.forEach(email ->
                    mailService.sendEmail(
                            mailService.getNewPostSubject(),
                            mailService.buildEmailNewPostContent(newPostEntity),
                            email));
        }
    }
}
