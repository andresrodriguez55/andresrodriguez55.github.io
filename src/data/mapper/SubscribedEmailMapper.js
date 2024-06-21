import GetAllSubscribedEmailsResponse from "../dto/response/get/GetAllSubscribedEmailsResponse";

export const mapToGetAllSubscribedEmailsResponse = (data) => {
    return new GetAllSubscribedEmailsResponse(
        data.id,
        data.name,
        data.date
    );
};