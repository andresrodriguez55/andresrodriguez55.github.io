package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.authentication.AuthenticateUserRequest;
import com.personalweb.business.dto.responses.authentication.GetAuthenticationResponse;

public interface SessionService {
    GetAuthenticationResponse authenticate(AuthenticateUserRequest request);
}
