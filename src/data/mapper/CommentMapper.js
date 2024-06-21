import GetCommentsByPostIdResponse from '../dto/response/get/GetCommentsByPostIdResponse';
import CreateCommentResponse from "../dto/response/create/CreateCommentResponse";

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