import GetAllCategoriesResponse from "../dto/response/get/GetAllCategoriesResponse";
import UpdateCategoryResponse from "../dto/response/update/UpdateCategoryResponse";
import CreateCategoryResponse from "../dto/response/create/CreateCategoryResponse";

export const mapToGetAllCategoriesResponse = (data) => {
    return new GetAllCategoriesResponse(
        data.id,
        data.name,
        data.numberOfPosts
    );
};

export const mapToUpdateCategoryResponse = (data) => {
    return new UpdateCategoryResponse(
        data.id,
        data.name
    );
};

export const mapToCreateCategoryResponse = (data) => {
    return new CreateCategoryResponse(
        data.id,
        data.name
    );
};