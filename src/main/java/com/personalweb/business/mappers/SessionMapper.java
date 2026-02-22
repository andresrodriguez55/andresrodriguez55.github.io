package com.personalweb.business.mappers;

import com.personalweb.business.dto.requests.authentication.AuthenticateUserRequest;
import com.personalweb.business.dto.responses.authentication.GetAuthenticationResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Component
public class SessionMapper {
    public UsernamePasswordAuthenticationToken
    toUsernamePasswordAuthenticationToken(AuthenticateUserRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    UsernamePasswordAuthenticationToken response =
                            new UsernamePasswordAuthenticationToken(r.username(), r.password());

                    Optional.ofNullable((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                            .map(ServletRequestAttributes::getRequest)
                            .map(WebAuthenticationDetails::new)
                            .ifPresent(response::setDetails);

                    return response;
                })
                .orElse(null);
    }

    public GetAuthenticationResponse toGetAuthenticationResponse(String token) {
        return Optional.ofNullable(token)
                .map(r -> new GetAuthenticationResponse(token))
                .orElse(null);
    }
}
