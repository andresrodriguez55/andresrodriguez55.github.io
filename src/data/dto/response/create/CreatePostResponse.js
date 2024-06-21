class CreatePostResponse {
    constructor(categoryId, id, title, date, coverPhotoLink) {
        this.categoryId = categoryId;
        this.id = id;
        this.title = title;
        this.date = date;
        this.coverPhotoLink = coverPhotoLink;
    }
}

export default CreatePostResponse;