import { mapToGetAllPageableResponse } from "../data/mapper/PageableMapper";
import { mapToGetAllMoreCommentedPostsResponse, mapToGetAllMostCommentersResponse,
    mapToGetAllCommentsCountPerCountriesResponse, mapToGetAllCommentsCountPerMonthsResponse} 
    from "../data/mapper/StatisticsMapper";
import ApiBase from "./ApiBase";

class ApiStatisticsService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = "statistics";
    }

    async fetchMoreCommentedPostsPageable() {
        const params = new URLSearchParams({
            size: 5,
        });

        const response = await super.get(`${this.endpoint}/posts?${params.toString()}`);
        return mapToGetAllPageableResponse(response, mapToGetAllMoreCommentedPostsResponse);
    }

    async fetchMostCommentersPageable() {
        const params = new URLSearchParams({
            size: 5,
        });

        const response = await super.get(`${this.endpoint}/comments?${params.toString()}`);
        return mapToGetAllPageableResponse(response, mapToGetAllMostCommentersResponse);
    }

    async fetchCommentsCountPerMonths() {
        const response = await super.get(`${this.endpoint}/months`);
        return response.map(mapToGetAllCommentsCountPerMonthsResponse);
    }

    async fetchCommentsCountPerCountries() {
        const response = await super.get(`${this.endpoint}/countries`);
        return response.map(mapToGetAllCommentsCountPerCountriesResponse);
    }
}

export default ApiStatisticsService;