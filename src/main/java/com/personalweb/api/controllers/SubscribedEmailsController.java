package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.SubscribedEmailService;
import com.personalweb.business.dto.requests.create.CreateSubscribedEmailRequest;
import com.personalweb.business.dto.requests.update.UpdateSubscribedEmailRequest;
import com.personalweb.business.dto.responses.create.CreateSubscribedEmailResponse;
import com.personalweb.business.dto.responses.get.GetAllSubscribedEmailsResponse;
import com.personalweb.business.dto.responses.update.UpdateSubscribedEmailResponse;
import com.personalweb.common.constants.Roles;
import com.personalweb.data.entities.SubscribedEmail;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping(path = "/api/v1/subscribed-emails")
@RequiredArgsConstructor
public class SubscribedEmailsController {
    private final SubscribedEmailService subscribedEmailService;

    @RolesAllowed(Roles.ADMIN)
    @GetMapping
    public ResponseEntity<Page<GetAllSubscribedEmailsResponse>> getAll(@ParameterObject
                                                                       @PageableDefault(page = 0, size = 5,
                                                                               sort = SubscribedEmail.DATE,
                                                                               direction = Sort.Direction.DESC)
                                                                       Pageable pageable) {
        return new ResponseEntity<>(subscribedEmailService.getAll(pageable), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreateSubscribedEmailResponse>
    add(@Valid @RequestBody CreateSubscribedEmailRequest request) {
        return new ResponseEntity<>(subscribedEmailService.add(request), HttpStatus.CREATED);
    }

    @RolesAllowed(Roles.ADMIN)
    @PutMapping(path = "/{id}")
    public ResponseEntity<UpdateSubscribedEmailResponse> update(@PathVariable("id") long id,
                                                                @Valid
                                                                @RequestBody UpdateSubscribedEmailRequest request) {
        return new ResponseEntity<>(subscribedEmailService.update(id, request), HttpStatus.OK);
    }

    @RolesAllowed(Roles.ADMIN)
    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> remove(@PathVariable("id") long id) {
        subscribedEmailService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}