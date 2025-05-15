package com.ecommerce.controllers;

import com.ecommerce.models.User;
import com.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get all users - requires authentication
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }


    // Register a new user - open to public
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Log the incoming data for debugging
            System.out.println("Received registration request: " + user);
            System.out.println("Username: " + user.getUsername());
            System.out.println("Password (plain): " + user.getPassword());
            System.out.println("Email: " + user.getEmail());

            // Validate the incoming user data
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                System.out.println("Password validation failed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password cannot be null or empty");
            }
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                System.out.println("Username validation failed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username cannot be null or empty");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                System.out.println("Email validation failed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email cannot be null or empty");
            }

            // Check if username or email already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                System.out.println("Username already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                System.out.println("Email already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            // Encode the password before saving
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            System.out.println("Encoded password: " + encodedPassword);  // Log the encoded password
            user.setPassword(encodedPassword);

            // Save the user
            User savedUser = userRepository.save(user);
            System.out.println("User created successfully with hashed password: " + savedUser.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            System.err.println("Error creating user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user");
        }
    }


    // Login a user - open to public
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            // Log the incoming login data for debugging
            System.out.println("Received login request for email: " + user.getEmail());
            System.out.println("Password provided: " + user.getPassword());

            // Check if the email exists
            return userRepository.findByEmail(user.getEmail()).map(existingUser -> {
                System.out.println("Found user in database: " + existingUser.getUsername());
                System.out.println("Stored hashed password: " + existingUser.getPassword());

                // Verify the password
                if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                    System.out.println("Login successful for: " + existingUser.getUsername());
                    return ResponseEntity.ok("Login successful");
                } else {
                    System.out.println("Password mismatch for: " + user.getEmail());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }
            }).orElseGet(() -> {
                System.out.println("User not found for email: " + user.getEmail());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            });
        } catch (Exception e) {
            System.err.println("Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login");
        }
    }


    


    // Get a specific user by ID - requires authentication
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update user details - requires authentication
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            // Update fields if provided
            if (updatedUser.getUsername() != null && !updatedUser.getUsername().trim().isEmpty()) {
                user.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().trim().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().trim().isEmpty()) {
                user.setEmail(updatedUser.getEmail());
            }

            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Delete a user - requires authentication
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Global exception handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
