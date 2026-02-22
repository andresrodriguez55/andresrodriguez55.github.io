package com.personalweb.configuration.security;

import com.personalweb.configuration.security.filters.context.ContextHolderFilter;
import com.personalweb.configuration.security.filters.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@ComponentScan
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig implements WebMvcConfigurer {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ContextHolderFilter contextHolderFilter;

    @Bean
    public SecurityFilterChain
    securityFilterChain(HttpSecurity http,
                        AuthenticationManager authenticationManager) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors().and() //for allow preflight requests bypassing security
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(contextHolderFilter, JwtAuthenticationFilter.class)
                .authorizeRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/v1/sessions").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/subscribed-emails").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/statistics/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/posts").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/comments").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/comments").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/comments/post/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/categories").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html")
                        .permitAll()
                )
                .authorizeRequests()
                .anyRequest()
                .authenticated();

        return http.build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000/", "https://andresrodriguez55.github.io/")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(TimeUnit.DAYS.toMillis(3))
                .allowCredentials(true);
    }
}