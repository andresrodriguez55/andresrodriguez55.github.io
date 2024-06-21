import ApiBase from "./ApiBase";

class ApiCountryService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
    }

    async fetchClientCountry(){
        const json = await super.get("");
        return json.country_name;
    }

}

export default ApiCountryService;