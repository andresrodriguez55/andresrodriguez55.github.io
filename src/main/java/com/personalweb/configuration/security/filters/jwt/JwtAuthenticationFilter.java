package com.personalweb.configuration.security.filters.jwt;

import com.personalweb.configuration.security.filters.context.ContextHolder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.io.IOException;


public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher,
                                   JwtService jwtService,
                                   UserDetailsService userDetailsService) {
        super(requiresAuthenticationRequestMatcher);
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Request is to process authentication");
        }

        try {
            Authentication authResult = this.attemptAuthentication(request, response);
            if (authResult != null) {
                this.successfulAuthentication(request, response, chain, authResult);
            } else {
                chain.doFilter(request, response);
//                unsuccessfulAuthentication(request, response, new UsernameNotFoundException(""));
            }
        } catch (AuthenticationException e) {
            unsuccessfulAuthentication(request, response, e);
        } finally {
            ContextHolder.clear();
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Authentication success. Updating SecurityContextHolder to contain: " + authResult);
        }

        SecurityContextHolder.getContext().setAuthentication(authResult);
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Authentication request failed: " + failed.toString(), failed);
            this.logger.debug("Updated SecurityContextHolder to contain null Authentication");
        }

//        this.rememberMeServices.loginFail(request, response);
//        this.failureHandler.onAuthenticationFailure(request, response, failed);
        response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        final String authenticationHeader = request.getHeader("Authorization");
        final String jwt;
        if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer ")) {
            return null;
        } else {
            jwt = authenticationHeader.substring(7);
        }

        try {
            final String username = jwtService.extractUsername(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                ContextHolder.getSessionInformation().setAuthenticated(true);
                ContextHolder.getSessionInformation().setUsername(username);

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                return authenticationToken;
            }
        } catch (Exception e) {

        }

        return null;
    }
}