package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.create.CreateCommentRequest;
import com.personalweb.data.entities.Comment;
import com.personalweb.data.entities.Post;
import org.springframework.scheduling.annotation.Async;

public abstract class NotifierService {
    @Async("notifierExecutor")
    public abstract void notifyParentCommentForNewComment(CreateCommentRequest request, Comment newCommentEntity);

    @Async("notifierExecutor")
    public abstract void notifySubscribedEmailsForNewPost(Post newPostEntity);
}
