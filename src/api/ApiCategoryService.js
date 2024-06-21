import { mapToGetAllCategoriesResponse, mapToCreateCategoryResponse,
    mapToUpdateCategoryResponse } from "../data/mapper/CategoryMapper";
import ApiBase from "./ApiBase";

class ApiCategoryService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = "categories";
    }

    async fetchCategories() {
        const jsonArray = await super.get(this.endpoint);
        return jsonArray.map(category => mapToGetAllCategoriesResponse(category));
    }

    async postCategory(requestDto) {
        const responseJson = await super.post(this.endpoint, requestDto);
        return mapToCreateCategoryResponse(responseJson);
    }

    async putCategory(id, requestDto) {
        await super.put(this.endpoint, id, requestDto);
        //return mapToUpdateCategoryResponse(responseJson);
    }

    async deleteCategory(id) {
        await super.delete(this.endpoint, id);
    }
}

export default ApiCategoryService;