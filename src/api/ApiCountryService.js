class ApiCountryService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetchClientCountry(){
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch country.');
            }
            const json = await response.json();
            return json.country_name;
        } catch (error) {
            throw new Error(`Failed to fetch country: ${error.message}`);
        }
    }

}

export default ApiCountryService;