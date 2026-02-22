package com.personalweb.configuration.security.listeners;

import com.personalweb.data.entities.security.LoginSuccess;
import com.personalweb.data.entities.security.User;
import com.personalweb.data.repository.security.LoginSuccessRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationSuccessListener {
    private final LoginSuccessRepository loginSuccessRepository;

    @Async(value = "authenticationLogExecutor")
    @EventListener
    public void onAuthenticationSuccessEvent(AuthenticationSuccessEvent event) {
        log.info("user logged in successfully");

        if (event.getSource() instanceof UsernamePasswordAuthenticationToken token) {
            LoginSuccess.LoginSuccessBuilder builder = LoginSuccess.builder();
            if (token.getPrincipal() instanceof User user) {
                builder.user(user);
                log.info("user logged in as {}", user.getUsername());
            }
            if (token.getDetails() instanceof WebAuthenticationDetails details) {
                builder.ip(details.getRemoteAddress());
                log.info("user logged with the ip: {}", details.getRemoteAddress());
            }

            LoginSuccess loginSuccess = builder.build();
            loginSuccessRepository.save(loginSuccess);
            log.info("login successfully saved, id: {}", loginSuccess.getId());
        }
    }
}
