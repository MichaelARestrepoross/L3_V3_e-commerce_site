package com.ecommerce.routes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for simplicity (adjust as needed)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()  // Public endpoints
                .anyRequest().authenticated()  // Protect all other endpoints
            )
            .formLogin(form -> form
                .loginPage("/api/users/login")  // Set the login endpoint
                .permitAll()  // Allow access to the login page
            )
            .httpBasic(httpBasic -> httpBasic.disable())  // Disable basic authentication
            .formLogin(form -> form.disable())  // Disable form login
            .logout(logout -> logout.permitAll());  // Allow logout

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
