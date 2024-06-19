class GetAllCommentDto {
    constructor(id, postId, nickname, content, date, childrenComments = []) {
        this.id = id;
        this.postId = postId;
        this.nickname = nickname;
        this.content = content;
        this.date = date;
        this.childrenComments = childrenComments;
    }
}

export default GetAllCommentDto;