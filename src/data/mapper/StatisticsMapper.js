import GetAllMoreCommentedPostsResponse from "../dto/response/get/GetAllMoreCommentedPostsResponse"; 
import GetAllMostCommentersResponse from "../dto/response/get/GetAllMostCommentersResponse";
import GetAllCommentsCountPerMonthsResponse from "../dto/response/get/GetAllCommentsCountPerMonthsResponse ";
import GetAllCommentsCountPerCountriesResponse from "../dto/response/get/GetAllCommentsCountPerCountriesResponse";

export const mapToGetAllMoreCommentedPostsResponse = (data) => {
    return new GetAllMoreCommentedPostsResponse(
        data.id,
        data.title,
        data.commentsCount
    );
};

export const mapToGetAllMostCommentersResponse = (data) => {
    return new GetAllMostCommentersResponse(
        data.nickname,
        data.commentsCount
    );
};

export const mapToGetAllCommentsCountPerMonthsResponse = (data) => {
    return new GetAllCommentsCountPerMonthsResponse(
        data.monthNumber,
        data.commentsCount
    );
};

export const mapToGetAllCommentsCountPerCountriesResponse = (data) => {
    return new GetAllCommentsCountPerCountriesResponse(
        data.country,
        data.commentsCount
    );
};