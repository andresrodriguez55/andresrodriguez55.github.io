import GetAllPostsResponse from "../dto/response/get/GetAllPostsResponse";
import GetPostResponse from "../dto/response/get/GetPostResponse";

export const mapToGetAllPostsResponse = (post) => {
    return new GetAllPostsResponse(
        post.id,
        post.categoryName,
        post.title,
        post.date,
        post.coverPhotoLink,
        post.commentsCount
    );
};

export const mapToGetPostResponse = (post) => {
    return new GetPostResponse(
        post.id,
        post.categoryName,
        post.title,
        post.content,
        post.date,
        post.coverPhotoLink
    );
};

