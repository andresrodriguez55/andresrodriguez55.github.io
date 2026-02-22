package com.personalweb.configuration.security.filters.ratelimiter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//Outside delegatingfilterproxy - filterchainproxy
@AllArgsConstructor
@Slf4j
@Service
public class RateLimiterFilter extends OncePerRequestFilter {
    private static Logger logger = LoggerFactory.getLogger(RateLimiterFilter.class);

    private InMemoryRateLimiter inMemoryRateLimiter;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String clientUniqueIdentifier = request.getRemoteAddr();
        logger.info("checking {} for rate limiting...", clientUniqueIdentifier);
        if (inMemoryRateLimiter.isAllowed(clientUniqueIdentifier)) {
            filterChain.doFilter(request, response);
        } else {
            response.sendError(HttpStatus.TOO_MANY_REQUESTS.value());
        }
    }
}
