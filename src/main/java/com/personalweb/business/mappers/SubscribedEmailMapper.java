package com.personalweb.business.mappers;

import com.personalweb.business.dto.requests.create.CreateSubscribedEmailRequest;
import com.personalweb.business.dto.requests.update.UpdateSubscribedEmailRequest;
import com.personalweb.business.dto.responses.create.CreateSubscribedEmailResponse;
import com.personalweb.business.dto.responses.get.GetAllSubscribedEmailsResponse;
import com.personalweb.business.dto.responses.update.UpdateSubscribedEmailResponse;
import com.personalweb.common.constants.TimeZone;
import com.personalweb.data.entities.SubscribedEmail;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Component
public class SubscribedEmailMapper {
    public GetAllSubscribedEmailsResponse toGetAllSubscribedEmailsResponse(SubscribedEmail request) {
        return Optional.ofNullable(request)
                .map(r -> new GetAllSubscribedEmailsResponse(
                        r.getId(),
                        r.getEmail(),
                        r.getDate()))
                .orElse(null);
    }

    public SubscribedEmail toSubscribedEmail(CreateSubscribedEmailRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    SubscribedEmail response = new SubscribedEmail();
                    response.setEmail(r.email());
                    response.setDate(LocalDateTime.now(ZoneId.of(TimeZone.ISTANBUL.value())));
                    return response;
                })
                .orElse(null);
    }

    public CreateSubscribedEmailResponse toCreateSubscribedEmailResponse(SubscribedEmail request) {
        return Optional.ofNullable(request)
                .map(r -> new CreateSubscribedEmailResponse(
                        r.getId(),
                        r.getEmail(),
                        r.getDate()))
                .orElse(null);
    }

    public SubscribedEmail toSubscribedEmail(long id, UpdateSubscribedEmailRequest request) {
        return Optional.ofNullable(request)
                .map(r -> {
                    SubscribedEmail response = new SubscribedEmail();
                    response.setId(id);
                    response.setEmail(r.email());
                    response.setDate(LocalDateTime.now(ZoneId.of(TimeZone.ISTANBUL.value())));
                    return response;
                })
                .orElse(null);
    }

    public UpdateSubscribedEmailResponse toUpdateSubscribedEmailResponse(SubscribedEmail request) {
        return Optional.ofNullable(request)
                .map(r -> new UpdateSubscribedEmailResponse(
                        r.getId(),
                        r.getEmail(),
                        r.getDate()))
                .orElse(null);
    }
}
