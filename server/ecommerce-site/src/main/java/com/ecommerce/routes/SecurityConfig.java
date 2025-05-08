// package com.ecommerce.routes;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.context.annotation.Bean;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()  // Disable CSRF for testing
//             .authorizeHttpRequests(auth -> auth
//                 .anyRequest().permitAll()  // Allow all requests without authentication
//             )
//             .httpBasic().disable()  // Disable HTTP Basic Authentication
//             .formLogin().disable();  // Disable form-based login

//         return http.build();
//     }
// }
