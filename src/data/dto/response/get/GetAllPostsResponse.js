class GetAllPostsResponse {
    constructor(id, categoryName, title, date, coverPhotoLink, commentsCount) {
        this.id = id;
        this.categoryName = categoryName;
        this.title = title;
        this.date = date;
        this.coverPhotoLink = coverPhotoLink;
        this.commentsCount = commentsCount;
    }

    getPostHref() {
        return `#/post/${this.id}/${encodeURIComponent(this.title.replace(' ', '%20'))}`;
    }
}

export default GetAllPostsResponse;