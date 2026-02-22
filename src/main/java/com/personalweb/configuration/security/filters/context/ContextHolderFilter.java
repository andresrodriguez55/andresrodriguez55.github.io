package com.personalweb.configuration.security.filters.context;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class ContextHolderFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
                ContextHolder.getSessionInformation().setAuthenticated(true);
                ContextHolder.getSessionInformation().setUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName());
            }

            filterChain.doFilter(request, response);
        } finally {
            ContextHolder.clear();
        }
    }
}
