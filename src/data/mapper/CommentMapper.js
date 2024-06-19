import GetAllCommentDto from '../dto/response/get/GetAllCommentDto';

export const mapToGetAllCommentDto = (data) => {
    const childrenComments = data.childrenComments.map(child => mapToGetAllCommentDto(child));
    return new GetAllCommentDto(
        data.postId,
        data.id,
        data.nickname,
        data.content,
        data.date,
        childrenComments
    );
};