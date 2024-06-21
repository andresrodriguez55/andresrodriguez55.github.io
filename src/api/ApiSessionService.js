import { mapToGetAuthenticationResponse } from "../data/mapper/AuthenticationMapper";
import ApiBase from "./ApiBase";

class ApiSessionService extends ApiBase{
    constructor(baseUrl) {
        super(baseUrl);
        this.endpoint = `sessions`;
    }

    async authenticate(requestDto) {
        const json = await super.post(this.endpoint, requestDto);
        return mapToGetAuthenticationResponse(json);
    }
}

export default ApiSessionService;