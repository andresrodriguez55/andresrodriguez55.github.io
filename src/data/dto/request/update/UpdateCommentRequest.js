class UpdateCommentRequest {
    constructor(content, nickname, notifyEmail, postId, parentCommentId, email, country, date) {
        this.content = content;
        this.nickname = nickname;
        this.notifyEmail = notifyEmail;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
        this.email = email;
        this.country = country;
        this.date = date;
    }

}

export default UpdateCommentRequest;s