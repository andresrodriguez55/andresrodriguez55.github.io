package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.SessionService;
import com.personalweb.business.dto.requests.authentication.AuthenticateUserRequest;
import com.personalweb.business.dto.responses.authentication.GetAuthenticationResponse;
import com.personalweb.business.mappers.SessionMapper;
import com.personalweb.configuration.security.filters.jwt.JwtService;
import com.personalweb.data.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionManager implements SessionService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SessionMapper sessionMapper;

    @Override
    public GetAuthenticationResponse authenticate(AuthenticateUserRequest request) {
        authenticationManager.authenticate(sessionMapper.toUsernamePasswordAuthenticationToken(request));
        return userRepository.findByUsername(request.username())
                .map(jwtService::generateToken)
                .map(sessionMapper::toGetAuthenticationResponse)
                .orElseThrow(RuntimeException::new);
    }
}
