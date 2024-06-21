import { mapToGetCommentsByPostIdResponse, mapToCreateCommentResponse } from "../data/mapper/CommentMapper";

class ApiCommentService {
    constructor(baseUrl) {
        this.url = `${baseUrl}comments`;
    }

    async fetchComments(postId) {
        const url = `${this.url}/post/${postId.toString()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch comments...');
            }
            const json = await response.json();
            return json.map(mapToGetCommentsByPostIdResponse);
        } catch (error) {
            throw new Error(`Failed to fetch comments: ${error.message}`);
        }
    }

    async postComment(createCommentDto) {
        try {
            const response = await fetch(this.url, {
                    method: "POST", 
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify(createCommentDto) });
            if (!response.ok) {
                const errorMessage = responseJson.message || 'Failed to post comment.';
                throw new Error(errorMessage);
            }
            const responseJson = await response.json();
            return mapToCreateCommentResponse(responseJson);
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}

export default ApiCommentService;