import GetAllPostDto from "../dto/response/get/GetAllPostDto";
import GetPostDto from "../dto/response/get/GetPostDto";

export const mapToGetAllPostDto = (post) => {
    return new GetAllPostDto(
        post.id,
        post.categoryName,
        post.title,
        post.date,
        post.coverPhotoLink,
        post.commentsCount
    );
};

export const mapToGetPostDto = (post) => {
    return new GetPostDto(
        post.id,
        post.categoryName,
        post.title,
        post.content,
        post.date,
        post.coverPhotoLink
    );
};

