import { mapToGetAllPageableResponse } from "../data/mapper/PageableMapper";
import { mapToGetAllMoreCommentedPostsResponse, mapToGetAllMostCommentersResponse,
    mapToGetAllCommentsCountPerCountriesResponse, mapToGetAllCommentsCountPerMonthsResponse} 
    from "../data/mapper/StatisticsMapper";

class ApiStatisticsService {
    constructor(baseUrl) {
        this.url = `${baseUrl}statistics`;
    }

    async fetchMoreCommentedPostsPageable() {
        try {
            const params = new URLSearchParams({
                size: 5,
            });

            const response = await fetch(`${this.url}/posts?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts statistics');
            }
            const json = await response.json();
            return mapToGetAllPageableResponse(json, mapToGetAllMoreCommentedPostsResponse);
        } catch (error) {
            throw new Error(`Failed to fetch posts statistics: ${error.message}`);
        }
    }

    async fetchMostCommentersPageable() {
        try {
            const params = new URLSearchParams({
                size: 5,
            });

            const response = await fetch(`${this.url}/comments?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments statistics');
            }
            const json = await response.json();
            return mapToGetAllPageableResponse(json, mapToGetAllMostCommentersResponse);
        } catch (error) {
            throw new Error(`Failed to fetch comments statistics: ${error.message}`);
        }
    }

    async fetchCommentsCountPerMonths() {
        try {
            const response = await fetch(`${this.url}/months`);
            if (!response.ok) {
                throw new Error('Failed to fetch months statistics');
            }
            const json = await response.json();
            return json.map(mapToGetAllCommentsCountPerMonthsResponse);
        } catch (error) {
            throw new Error(`Failed to fetch months statistics: ${error.message}`);
        }
    }

    async fetchCommentsCountPerCountries() {
        try {
            const response = await fetch(`${this.url}/countries`);
            if (!response.ok) {
                throw new Error('Failed to fetch countries statistics');
            }
            const json = await response.json();
            return json.map(mapToGetAllCommentsCountPerCountriesResponse);
        } catch (error) {
            throw new Error(`Failed to fetch countries statistics: ${error.message}`);
        }
    }
}

export default ApiStatisticsService;