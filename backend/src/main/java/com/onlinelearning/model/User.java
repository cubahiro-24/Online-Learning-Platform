package com.onlinelearning.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private UserRole role = UserRole.USER; // Default role
    private List<String> enrolledCourses = new ArrayList<>();

    // Enum for user roles
    public enum UserRole {
        ADMIN, USER
    }
}