class GetAllCommentsResponse {
    constructor(postId, parentCommentId, id, email, notifyEmail, nickname, content, country, date) {
        this.postId = postId;
        this.parentCommentId = parentCommentId;
        this.id = id;
        this.email = email;
        this.notifyEmail = notifyEmail;
        this.nickname = nickname;
        this.content = content;
        this.country = country;
        this.date = date;
    }
}

export default GetAllCommentsResponse;