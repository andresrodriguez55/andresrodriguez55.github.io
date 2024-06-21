class CreatePostRequest {
    constructor(categoryId, title, content, coverPhotoLink) {
        this.categoryId = categoryId;
        this.title = title;
        this.content = content;
        this.coverPhotoLink = coverPhotoLink;
    }
}

export default CreatePostRequest;