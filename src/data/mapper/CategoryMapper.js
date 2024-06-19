import GetAllCategoryDto from "../dto/response/get/GetAllCategoryDto";

export const mapToGetAllCategoryDto = (data) => {
    return new GetAllCategoryDto(
        data.id,
        data.name,
        data.numberOfPosts
    );
};