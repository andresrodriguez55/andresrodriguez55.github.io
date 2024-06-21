import { mapToGetAllSubscribedEmailsResponse, mapToCreateSubscribedEmailResponse, 
    mapToUpdateSubscribedEmailResponse } from "../data/mapper/SubscribedEmailMapper";
import { mapToGetAllPageableResponse } from "../data/mapper/PageableMapper";
import ApiBase from "./ApiBase";

class ApiSubscribedEmailService extends ApiBase {
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = `subscribed-emails`;
    }

    async fetchSubscribedEmailsPageable(page, size) {
        const params = new URLSearchParams({
            page: page,
            size: size
        });

        const json = await super.get(`${this.endpoint}?${params.toString()}`);
        return mapToGetAllPageableResponse(json, mapToGetAllSubscribedEmailsResponse);
    }

    async postSubscribedEmail(subscribedEmailDto) {
        try {
            const response = await fetch(this.url, {
                    method: "POST", 
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify(subscribedEmailDto) });
            if (!response.ok) {
                const errorResponse = await response.json(); 
                const errorMessage = errorResponse.message || 'Failed to post subscribed email.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    async postSubscribedEmail(requestDto) {
        const responseJson = await super.post(this.endpoint, requestDto);
        return mapToCreateSubscribedEmailResponse(responseJson);
    }

    async putSubscribedEmail(id, requestDto) {
        await super.put(this.endpoint, id, requestDto);
        //return mapToUpdateSubscribedEmailResponse(responseJson);
    }

    async deleteSubscribedEmail(id) {
        await super.delete(this.endpoint, id);
    }
}

export default ApiSubscribedEmailService;