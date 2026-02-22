package com.personalweb.configuration.security.listeners;

import com.personalweb.data.entities.security.LoginFailure;
import com.personalweb.data.entities.security.User;
import com.personalweb.data.repository.UserRepository;
import com.personalweb.data.repository.security.LoginFailureRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFailureListener {
    @PersistenceContext
    private EntityManager entityManager;

    private final LoginFailureRepository loginFailureRepository;
    private final UserRepository userRepository;

    @Async(value = "authenticationLogExecutor")
    @EventListener
    public void onAuthenticationFailureEvent(AuthenticationFailureBadCredentialsEvent event) {
        log.info("login failed");
        LoginFailure.LoginFailureBuilder builder = LoginFailure.builder();
        if (event.getSource() instanceof UsernamePasswordAuthenticationToken token) {
            if (token.getPrincipal() instanceof String username) {
                builder.username(username);
                userRepository.findIdByUsername(username)
                        .ifPresent(id -> builder.user(entityManager.getReference(User.class, id)));
            }
            if (token.getDetails() instanceof WebAuthenticationDetails details) {
                builder.ip(details.getRemoteAddress());
                log.info("user log failure with the ip: {}", details.getRemoteAddress());
            }
            LoginFailure loginFailure = loginFailureRepository.save(builder.build());
            log.debug("login failure saved, id: {}", loginFailure.getId());
        }
    }
}
