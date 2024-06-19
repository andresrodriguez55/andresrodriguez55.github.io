import GetAllSubscribedEmailDto from "../dto/response/get/GetAllSubscribedEmailDto"; 

export const mapToGetAllSubscribedEmailDto = (data) => {
    return new GetAllSubscribedEmailDto(
        data.id,
        data.name,
        data.date
    );
};