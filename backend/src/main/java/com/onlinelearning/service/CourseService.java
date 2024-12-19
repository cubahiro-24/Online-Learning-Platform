package com.onlinelearning.service;

import com.onlinelearning.model.Course;
import com.onlinelearning.dto.CourseDTO;
import com.onlinelearning.repository.CourseRepository;
import com.onlinelearning.repository.UserCourseProgressRepository;
import com.onlinelearning.model.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserCourseProgressRepository progressRepository;
    private final UserService userService;

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

    public List<CourseDTO> getEnrolledCourses(String userId) {
        User user = userService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return user.getEnrolledCourses().stream()
            .map(courseId -> courseRepository.findById(courseId)
                .map(course -> convertToCourseDTO(course, userId))
                .orElse(null))
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
}