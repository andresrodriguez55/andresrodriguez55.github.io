import { mapToGetAllCategoriesResponse } from "../data/mapper/CategoryMapper";

class ApiCategoryService {
    constructor(baseUrl) {
        this.url = `${baseUrl}categories`;
    }

    async fetchCategories() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const jsonArray = await response.json();
            return jsonArray.map(category => mapToGetAllCategoriesResponse(category));
        } catch (error) {
            throw new Error(`Failed to fetch categories: ${error.message}`);
        }
    }
}

export default ApiCategoryService;