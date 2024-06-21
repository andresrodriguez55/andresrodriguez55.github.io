import { getToken } from "../Tools/auth-helper";

class ApiBase {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': "application/json", 
            'Authorization' : getToken()
        };
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorResponse = await response.json(); 
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async put(endpoint, id, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}/${id.toString()}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorResponse = await response.json(); 
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            //return await response.json();
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async delete(endpoint, id) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}/${id.toString()}`, {
                method: 'DELETE',
                headers: this.headers
            });
            if (!response.ok) {
                const errorResponse = await response.json(); 
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}

export default ApiBase;