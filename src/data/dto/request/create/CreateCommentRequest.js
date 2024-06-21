class CreateCommentRequest {
    constructor(content, nickname, notifyEmail, postId, parentCommentId, email, country) {
        this.content = content;
        this.nickname = nickname;
        this.notifyEmail = notifyEmail;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
        this.email = email;
        this.country = country;
    }

}

export default CreateCommentRequest;