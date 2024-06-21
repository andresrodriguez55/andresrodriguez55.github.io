import { mapToGetCommentsByPostIdResponse, mapToCreateCommentResponse, 
    mapToUpdateCommentResponse, mapToGetAllCommentsResponse } from "../data/mapper/CommentMapper";
import { mapToGetAllPageableResponse } from "../data/mapper/PageableMapper";
import ApiBase from "./ApiBase";

class ApiCommentService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = `comments`;
    }

    async fetchCommentsPageable(page, pageSize) {
        const params = new URLSearchParams({
            size: pageSize,
            page: page
        });

        const json = await super.get(`${this.endpoint}?${params.toString()}`)
        return mapToGetAllPageableResponse(json, mapToGetAllCommentsResponse);
    }

    async fetchCommentsOfPost(postId) {
        const jsonArray = await super.get(`${this.endpoint}/post/${postId.toString()}`);
        return jsonArray.map(mapToGetCommentsByPostIdResponse);
    }

    async postComment(requestDto) {
        const responseJson = await super.post(this.endpoint, requestDto);
        return mapToCreateCommentResponse(responseJson);
    }

    async putComment(id, requestDto) {
        await super.put(this.endpoint, id, requestDto);
        //return mapToUpdateCommentResponse(responseJson);
    }

    async deleteComment(id) {
        await super.delete(this.endpoint, id);
    }
}

export default ApiCommentService;