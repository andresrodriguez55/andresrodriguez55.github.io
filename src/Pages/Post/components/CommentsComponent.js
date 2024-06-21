    import React from 'react';
    import DateUtil from '../../../util/DateUtil';
    import CommentFormComponent from './CommentFormComponent';
    import "./CommentsComponent.css";

    const CommentsComponent = ({ comments, commentParentId, setCommentParentId, postComment, clientCountry, postId }) => {
        const renderComments = (comments, parentId = null) => {
            return comments?.map(comment => (
                <div key={comment.id}>
                    <div className={`userCommentArea ${parentId ? 'childUserCommentArea' : ''}`} id={comment.id.toString()}>
                        <h4 className="userCommentNick">{comment.nickname}</h4>
                        <p className="userCommentDate">
                            {DateUtil.convertStringDateTimezoneToClient(comment.date)}
                        </p>
                        <p className="userCommentContent">
                            <div className="userCommentContent" dangerouslySetInnerHTML={{ __html: comment.content }} />
                        </p>
                        <p className="userCommentReply" onClick={() => setCommentParentId(commentParentId !== comment.id ? comment.id : null)}>
                            {commentParentId !== comment.id ? 'Reply' : 'Cancel reply'}
                        </p>
                    </div>
                    {commentParentId === comment.id && (
                        <CommentFormComponent
                            postComment={postComment}
                            clientCountry={clientCountry}
                            parentCommentId={commentParentId}
                            postId={postId}
                        />
                    )}
                    {comment.childrenComments && renderComments(comment.childrenComments, comment.id)}
                </div>
            ));
        };

        return <div className="usersCommentsArea">{renderComments(comments)}</div>;
    };

    export default CommentsComponent;