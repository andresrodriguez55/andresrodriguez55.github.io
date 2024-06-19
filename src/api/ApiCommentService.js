import { mapToGetAllCommentDto } from "../data/mapper/CommentMapper";

class ApiCommentService {
    constructor(baseUrl) {
        this.url = `${baseUrl}comments/post`;
    }

    async fetchComments(postId) {
        const url = `${this.url}/${postId.toString()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch comments...');
            }
            const json = await response.json();
            return json.map(mapToGetAllCommentDto);
        } catch (error) {
            throw new Error(`Failed to fetch comments: ${error.message}`);
        }
    }
}

export default ApiCommentService;