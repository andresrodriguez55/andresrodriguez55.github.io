import GetAuthenticationResponse from "../dto/response/authentication/GetAuthenticationResponse";

export const mapToGetAuthenticationResponse = (data) => {
    return new GetAuthenticationResponse(
        data.token
    );
};