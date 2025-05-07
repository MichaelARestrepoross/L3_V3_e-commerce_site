package com.ecommerce.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/test")
    public String testEndpoint() {
        return "User controller is working!";
    }
}
