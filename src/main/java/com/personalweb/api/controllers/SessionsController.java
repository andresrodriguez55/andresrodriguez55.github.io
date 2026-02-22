package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.SessionService;
import com.personalweb.business.dto.requests.authentication.AuthenticateUserRequest;
import com.personalweb.business.dto.responses.authentication.GetAuthenticationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/v1/sessions")
@RequiredArgsConstructor
public class SessionsController {
    private final SessionService sessionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<GetAuthenticationResponse> authenticate(@RequestBody
                                                                  @Valid AuthenticateUserRequest
                                                                          request) {
        return new ResponseEntity<>(sessionService.authenticate(request), HttpStatus.CREATED);
    }
}
