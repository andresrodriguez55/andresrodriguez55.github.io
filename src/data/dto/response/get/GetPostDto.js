class GetPostDto {
    constructor(id, categoryName, title, content, date, coverPhotoLink) {
        this.id = id;
        this.categoryName = categoryName;
        this.title = title;
        this.content = content;
        this.date = date;
        this.coverPhotoLink = coverPhotoLink;
    }
}

export default GetPostDto;