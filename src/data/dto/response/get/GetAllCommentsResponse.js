class GetAllCommentsResponse {
    constructor(postId, postTitle, parentCommentId, id, email, notifyEmail, nickname, content, country, date) {
        this.postId = postId;
        this.postTitle = postTitle;
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