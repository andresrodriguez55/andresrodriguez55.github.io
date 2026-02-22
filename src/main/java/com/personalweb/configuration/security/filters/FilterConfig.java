package com.personalweb.configuration.security.filters;

import com.personalweb.configuration.security.filters.context.ContextHolderFilter;
import com.personalweb.configuration.security.filters.jwt.JwtAuthenticationFilter;
import com.personalweb.configuration.security.filters.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@RequiredArgsConstructor
public class FilterConfig { //todo qualifier for userdetailservice
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(@Lazy AuthenticationManager authenticationManager,
                                                           JwtService jwtService,
                                                           UserDetailsService userDetailsService) {
        JwtAuthenticationFilter customHeaderAuthenticationFilter =
                new JwtAuthenticationFilter(new AntPathRequestMatcher("/api/**"), jwtService, userDetailsService);
        customHeaderAuthenticationFilter.setAuthenticationManager(authenticationManager);
        return customHeaderAuthenticationFilter;
    }

    @Bean
    public ContextHolderFilter contextHolderFilter() {
        return new ContextHolderFilter();
    }
}
