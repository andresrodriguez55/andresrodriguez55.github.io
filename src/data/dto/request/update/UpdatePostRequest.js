class UpdatePostRequest {
    constructor(categoryId, title, content, date, coverPhotoLink) {
        this.categoryId = categoryId;
        this.title = title;
        this.content = content;
        this.date = date;
        this.coverPhotoLink = coverPhotoLink;
    }
}

export default UpdatePostRequest;