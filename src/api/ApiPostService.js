import { mapToGetAllPostDto, mapToGetPostDto } from "../data/mapper/PostMapper";
import { mapToPageableDto } from "../data/mapper/PageableMapper";

class ApiPostService {
    constructor(baseUrl) {
        this.url = `${baseUrl}posts`;
    }

    async fetchPostsPageable(page, searchedToken, selectedCategory) {
        const params = new URLSearchParams({
            size: 4,
            page: page,
            title: searchedToken,
            ...(selectedCategory !== 'All' && { categoryName: selectedCategory }),
        });

        try {
            const response = await fetch(`${this.url}?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const json = await response.json();
            return mapToPageableDto(json, mapToGetAllPostDto);
        } catch (error) {
            throw new Error(`Failed to fetch posts: ${error.message}`);
        }
    }

    async fetchPost(id){
        const url = `${this.url}/${id.toString()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch post...');
            }
            const json = await response.json();
            return mapToGetPostDto(json, mapToGetPostDto);
        } catch (error) {
            throw new Error(`Failed to fetch post: ${error.message}`);
        }
    }
}

export default ApiPostService;