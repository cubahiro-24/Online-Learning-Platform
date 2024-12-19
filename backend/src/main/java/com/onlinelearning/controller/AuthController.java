package com.onlinelearning.controller;

import com.onlinelearning.dto.AuthResponse;
import com.onlinelearning.dto.LoginRequest;
import com.onlinelearning.model.User;
import com.onlinelearning.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.findByUsername(loginRequest.getUsername())
            .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
            .map(user -> ResponseEntity.ok(new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().toString()
            )))
            .orElseGet(() -> ResponseEntity.badRequest().body(new AuthResponse(null, "Invalid credentials", null)));
    }
}