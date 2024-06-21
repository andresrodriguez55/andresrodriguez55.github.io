import GetAllPostsResponse from "../dto/response/get/GetAllPostsResponse";
import GetPostResponse from "../dto/response/get/GetPostResponse";
import CreatePostResponse from "../dto/response/create/CreatePostResponse";
import UpdatePostResponse from "../dto/response/update/UpdatePostResponse";

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

export const mapToCreatePostResponse = (post) => {
    return new CreatePostResponse(
        post.categoryId,
        post.id,
        post.title,
        post.date,
        post.coverPhotoLink
    );
};

export const mapToUpdatePostResponse = (post) => {
    return new UpdatePostResponse(
        post.categoryId,
        post.id,
        post.title,
        post.date,
        post.coverPhotoLink
    );
};

