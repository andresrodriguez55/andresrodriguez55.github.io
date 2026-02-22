package com.personalweb.business.abstracts;

import com.personalweb.business.dto.requests.create.CreateSubscribedEmailRequest;
import com.personalweb.business.dto.requests.update.UpdateSubscribedEmailRequest;
import com.personalweb.business.dto.responses.create.CreateSubscribedEmailResponse;
import com.personalweb.business.dto.responses.get.GetAllSubscribedEmailsResponse;
import com.personalweb.business.dto.responses.update.UpdateSubscribedEmailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscribedEmailService {
    Page<GetAllSubscribedEmailsResponse> getAll(Pageable pageable);

    CreateSubscribedEmailResponse add(CreateSubscribedEmailRequest request);

    UpdateSubscribedEmailResponse update(long id, UpdateSubscribedEmailRequest request);

    void delete(long id);
}
