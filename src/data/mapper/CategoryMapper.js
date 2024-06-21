import GetAllCategoriesResponse from "../dto/response/get/GetAllCategoriesResponse";

export const mapToGetAllCategoriesResponse = (data) => {
    return new GetAllCategoriesResponse(
        data.id,
        data.name,
        data.numberOfPosts
    );
};