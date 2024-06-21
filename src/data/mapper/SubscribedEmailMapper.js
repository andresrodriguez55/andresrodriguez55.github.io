import GetAllSubscribedEmailsResponse from "../dto/response/get/GetAllSubscribedEmailsResponse";
import CreateSubscribedEmailResponse from "../dto/response/create/CreateSubscribedEmailResponse";
import UpdateSubscribedEmailResponse from "../dto/response/update/UpdateSubscribedEmailResponse";

export const mapToGetAllSubscribedEmailsResponse = (data) => {
    return new GetAllSubscribedEmailsResponse(
        data.id,
        data.email,
        data.date
    );
};

export const mapToUpdateSubscribedEmailResponse = (data) => {
    return new UpdateSubscribedEmailResponse(
        data.id,
        data.email,
        data.date
    );
};

export const mapToCreateSubscribedEmailResponse = (data) => {
    return new CreateSubscribedEmailResponse(
        data.id,
        data.email,
        data.date
    );
};