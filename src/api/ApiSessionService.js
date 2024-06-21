import { mapToGetAuthenticationResponse } from "../data/mapper/AuthenticationMapper";

class ApiSessionService {
    constructor(baseUrl) {
        this.url = `${baseUrl}sessions`;
    }

    async authenticate(authenticateUserRequest) {
        try {
            const response = await fetch(this.url, {
                    method: "POST", 
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify(authenticateUserRequest) });
            if (!response.ok) {
                const errorResponse = await response.json(); 
                const errorMessage = errorResponse.message || 'Failed to authenticate.';
                throw new Error(errorMessage);
            }
            const responseJson = await response.json();
            return mapToGetAuthenticationResponse(responseJson);
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}

export default ApiSessionService;