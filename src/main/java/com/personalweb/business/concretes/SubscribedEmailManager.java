package com.personalweb.business.concretes;

import com.personalweb.business.abstracts.SubscribedEmailService;
import com.personalweb.business.dto.requests.create.CreateSubscribedEmailRequest;
import com.personalweb.business.dto.requests.update.UpdateSubscribedEmailRequest;
import com.personalweb.business.dto.responses.create.CreateSubscribedEmailResponse;
import com.personalweb.business.dto.responses.get.GetAllSubscribedEmailsResponse;
import com.personalweb.business.dto.responses.update.UpdateSubscribedEmailResponse;
import com.personalweb.business.mappers.SubscribedEmailMapper;
import com.personalweb.business.rules.SubscribedEmailBusinessRules;
import com.personalweb.data.entities.SubscribedEmail;
import com.personalweb.data.repository.SubscribedEmailRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscribedEmailManager implements SubscribedEmailService {
    private final SubscribedEmailRepository subscribedEmailRepository;
    private final SubscribedEmailBusinessRules subscribedEmailBusinessRules;
    private final SubscribedEmailMapper subscribedEmailMapper;

    @Override
    public Page<GetAllSubscribedEmailsResponse> getAll(Pageable pageable) {
        Page<SubscribedEmail> subscribedMailsPage = subscribedEmailRepository.findAll(pageable);
        List<GetAllSubscribedEmailsResponse> responses = subscribedMailsPage
                .getContent()
                .stream()
                .map(subscribedEmailMapper::toGetAllSubscribedEmailsResponse)
                .toList();
        return new PageImpl<>(responses, pageable, subscribedMailsPage.getTotalElements());
    }

    @Override
    public CreateSubscribedEmailResponse add(CreateSubscribedEmailRequest request) {
        subscribedEmailBusinessRules.checkIfSubscribedEmailExistByNameIgnoreCase(request.email());
        return subscribedEmailMapper.toCreateSubscribedEmailResponse(
                subscribedEmailRepository.save(
                        subscribedEmailMapper.toSubscribedEmail(request)));
    }

    @Override
    public UpdateSubscribedEmailResponse update(long id, UpdateSubscribedEmailRequest request) {
        subscribedEmailBusinessRules.checkIfSubscribedEmailExistsById(id);
        subscribedEmailBusinessRules
                .checkIfSubscribedEmailNotExistsAnotherRecordByNameIgnoreCaseIgnoreCase(id, request.email());
        return subscribedEmailMapper.toUpdateSubscribedEmailResponse(
                subscribedEmailRepository.save(
                        subscribedEmailMapper.toSubscribedEmail(id, request)));
    }

    @Override
    public void delete(long id) {
        subscribedEmailBusinessRules.checkIfSubscribedEmailExistsById(id);
        subscribedEmailRepository.deleteById(id);
    }
}
