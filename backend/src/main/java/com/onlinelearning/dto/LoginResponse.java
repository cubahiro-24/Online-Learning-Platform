package com.onlinelearning.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String userId;
    private String username;
    private String token;
    private String role;
}
