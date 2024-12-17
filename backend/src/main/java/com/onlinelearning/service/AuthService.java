package com.onlinelearning.service;

import com.onlinelearning.model.User;
import com.onlinelearning.repository.UserRepository;
import com.onlinelearning.dto.LoginRequest;
import com.onlinelearning.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate a simple token (in a real application, use JWT)
        String token = generateToken();

        return LoginResponse.builder()
            .userId(user.getId())
            .username(user.getUsername())
            .token(token)
            .role(user.getRole().name())
            .build();
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}