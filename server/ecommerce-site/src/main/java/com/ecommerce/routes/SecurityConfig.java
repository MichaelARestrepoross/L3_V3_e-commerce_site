package com.ecommerce.routes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Correct syntax to disable CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/**").permitAll()  // Allow public access to /api/users
                .anyRequest().authenticated()  // Protect other endpoints
            )
            .httpBasic();  // Enable basic HTTP authentication

        return http.build();
    }
}
