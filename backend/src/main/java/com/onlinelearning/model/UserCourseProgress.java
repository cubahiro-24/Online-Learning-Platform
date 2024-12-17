package com.onlinelearning.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "user_course_progress")
public class UserCourseProgress {
    @Id
    private String id;
    private String userId;
    private String courseId;
    private int progressPercentage;
    private boolean isCompleted;
}