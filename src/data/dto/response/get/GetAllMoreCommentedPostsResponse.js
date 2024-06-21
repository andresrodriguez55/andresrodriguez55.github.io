class GetAllMoreCommentedPostsResponse {
    constructor(id, title, commentsCount) {
        this.id = id;
        this.title = title;
        this.commentsCount = commentsCount;
    }

    getPostHref() {
        return `#/post/${this.id}/${encodeURIComponent(this.title.replace(' ', '%20'))}`;
    }
}

export default GetAllMoreCommentedPostsResponse;