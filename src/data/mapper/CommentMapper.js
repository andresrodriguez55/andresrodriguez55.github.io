import GetCommentsByPostIdResponse from '../dto/response/get/GetCommentsByPostIdResponse';
import CreateCommentResponse from "../dto/response/create/CreateCommentResponse";
import UpdateCommentResponse from '../dto/response/update/UpdateCommentResponse';
import GetAllCommentsResponse from '../dto/response/get/GetAllCommentsResponse';

export const mapToGetCommentsByPostIdResponse = (data) => {
    const childrenComments = data.childrenComments.map(child => mapToGetCommentsByPostIdResponse(child));
    return new GetCommentsByPostIdResponse(
        data.id,
        data.postId,
        data.nickname,
        data.content,
        data.date,
        childrenComments
    );
};

export const mapToCreateCommentResponse = (data) => {
    return new CreateCommentResponse(
        data.postId,
        data.parentCommentId,
        data.id,
        data.email,
        data.notifyEmail,
        data.nickname,
        data.content,
        data.country,
        data.date
    );
};

export const mapToUpdateCommentResponse = (data) => {
    return new UpdateCommentResponse(
        data.postId,
        data.parentCommentId,
        data.id,
        data.email,
        data.notifyEmail,
        data.nickname,
        data.content,
        data.country,
        data.date
    );
};

export const mapToGetAllCommentsResponse = (data) => {
    return new GetAllCommentsResponse(
        data.postId,
        data.postTitle,
        data.parentCommentId,
        data.id,
        data.email,
        data.notifyEmail,
        data.nickname,
        data.content,
        data.country,
        data.date
    );
}