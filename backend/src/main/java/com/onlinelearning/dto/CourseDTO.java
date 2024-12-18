package com.onlinelearning.dto;

import lombok.Data;

@Data
public class CourseDTO {
    private String id;
    private String title;
    private String instructor;
    private Double rating;
    private String imageUrl;
    private String description;
    private String duration;
    private Integer lessons;
    private Integer progress;
}