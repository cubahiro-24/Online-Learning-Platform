// 1. Create new file: src/main/java/com/onlinelearning/dto/LoginRequest.java
package com.onlinelearning.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}