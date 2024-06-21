import { mapToGetAllSubscribedEmailsResponse } from "../data/mapper/SubscribedEmailMapper";

class ApiSubscribedEmailService {
    constructor(baseUrl) {
        this.url = `${baseUrl}subscribed-emails`;
    }

    async fetchSubscribedEmails() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Failed to fetch subscribed emails');
            }
            const jsonArray = await response.json();
            return jsonArray.map(subscribedEmail => mapToGetAllSubscribedEmailsResponse(subscribedEmail));
        } catch (error) {
            throw new Error(`Failed to fetch subscribed emails: ${error.message}`);
        }
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
}

export default ApiSubscribedEmailService;