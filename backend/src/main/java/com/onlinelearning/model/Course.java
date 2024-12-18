package com.onlinelearning.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String title;
    private String instructor;
    private double rating;
    private String imageUrl;
    private String description;
    private String duration;
    private int lessons;
}