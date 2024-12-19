package com.onlinelearning.service;

import com.onlinelearning.model.Course;
import com.onlinelearning.dto.CourseDTO;
import com.onlinelearning.repository.CourseRepository;
import com.onlinelearning.repository.UserCourseProgressRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserCourseProgressRepository progressRepository;

    public List<CourseDTO> getAllCourses(String userId) {
        return courseRepository.findAll().stream()
            .map(course -> convertToCourseDTO(course, userId))
            .collect(Collectors.toList());
    }

    public CourseDTO getCourseById(String courseId, String userId) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        return convertToCourseDTO(course, userId);
    }

    private CourseDTO convertToCourseDTO(Course course, String userId) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setInstructor(course.getInstructor());
        dto.setRating(course.getRating());
        dto.setImageUrl(course.getImageUrl());
        dto.setDescription(course.getDescription());
        dto.setDuration(course.getDuration());
        dto.setLessons(course.getLessons());

        // Fetch progress if userId is provided
        if (userId != null) {
            progressRepository.findByUserIdAndCourseId(userId, course.getId())
                .ifPresent(progress -> dto.setProgress(progress.getProgressPercentage()));
        }

        return dto;
    }

    public Course getCourseByIdOrThrow(String id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Optional<Course> findById(String id) {
        return courseRepository.findById(id);
    }

    public Course updateCourse(String id, Course courseDetails) {
        Course course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setImageUrl(courseDetails.getImageUrl());
        
        return courseRepository.save(course);
    }

    public void deleteCourse(String id) {
        Course course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        courseRepository.delete(course);
    }

    @PostConstruct
public void init() {
    // Check if courses collection is empty
    if (courseRepository.count() == 0) {
        // Add some sample courses
        Course course1 = new Course();
        course1.setTitle("Modern Web Development");
        course1.setInstructor("John Doe");
        course1.setRating(4.8);
        course1.setImageUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085");
        course1.setDescription("Learn modern web development with React, Node.js, and more.");
        course1.setDuration("12 weeks");
        course1.setLessons(24);
        courseRepository.save(course1);

        Course course2 = new Course();
        course2.setTitle("Data Science Fundamentals");
        course2.setInstructor("Jane Smith");
        course2.setRating(4.9);
        course2.setImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71");
        course2.setDescription("Master the basics of data science and analytics.");
        course2.setDuration("10 weeks");
        course2.setLessons(20);
        courseRepository.save(course2);
    }
}
}