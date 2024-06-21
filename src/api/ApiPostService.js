import { mapToGetAllPostsResponse, mapToGetPostResponse, 
    mapToCreatePostResponse, mapToUpdatePostResponse } from "../data/mapper/PostMapper";
import { mapToGetAllPageableResponse } from "../data/mapper/PageableMapper";
import ApiBase from "./ApiBase";

class ApiPostService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = `posts`;
    }

    async fetchPostsPageable(page, searchedToken, selectedCategory) {
        const params = new URLSearchParams({
            size: 4,
            page: page,
            title: searchedToken,
            ...(selectedCategory !== 'All' && { categoryName: selectedCategory }),
        });

        const json = await super.get(`${this.endpoint}?${params.toString()}`)
        return mapToGetAllPageableResponse(json, mapToGetAllPostsResponse);
    }

    async fetchPost(id){
        const json = await super.get(`${this.endpoint}/${id.toString()}`)
        return mapToGetPostResponse(json);
    }

    async postPost(requestDto) {
        const responseJson = await super.post(this.endpoint, requestDto);
        return mapToCreatePostResponse(responseJson);
    }

    async putPost(id, requestDto) {
        await super.put(this.endpoint, id, requestDto);
        //return mapToUpdatePostResponse(responseJson);
    }

    async deletePost(id) {
        await super.delete(this.endpoint, id);
    }
}

export default ApiPostService;