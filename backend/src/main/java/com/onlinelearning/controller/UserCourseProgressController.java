package com.onlinelearning.controller;

import com.onlinelearning.model.UserCourseProgress;
import com.onlinelearning.service.UserCourseProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class UserCourseProgressController {
    private final UserCourseProgressService progressService;

    // Start a new course
    @PostMapping("/start")
    public ResponseEntity<UserCourseProgress> startCourse(
        @RequestParam String userId, 
        @RequestParam String courseId
    ) {
        UserCourseProgress progress = progressService.startCourse(userId, courseId);
        return ResponseEntity.ok(progress);
    }

    // Update course progress
    @PutMapping("/update")
    public ResponseEntity<UserCourseProgress> updateProgress(
        @RequestParam String userId, 
        @RequestParam String courseId, 
        @RequestParam int progressPercentage
    ) {
        UserCourseProgress progress = progressService.updateProgress(userId, courseId, progressPercentage);
        return ResponseEntity.ok(progress);
    }

    // Mark course as completed
    @PutMapping("/complete")
    public ResponseEntity<UserCourseProgress> completeCourse(
        @RequestParam String userId, 
        @RequestParam String courseId
    ) {
        UserCourseProgress progress = progressService.completeCourse(userId, courseId);
        return ResponseEntity.ok(progress);
    }

    // Get progress for a specific course
    @GetMapping("/course")
    public ResponseEntity<UserCourseProgress> getProgress(
        @RequestParam String userId, 
        @RequestParam String courseId
    ) {
        UserCourseProgress progress = progressService.getProgress(userId, courseId);
        return ResponseEntity.ok(progress);
    }

    // Get all progresses for a user
    @GetMapping("/user")
    public ResponseEntity<List<UserCourseProgress>> getUserProgresses(
        @RequestParam String userId
    ) {
        List<UserCourseProgress> progresses = progressService.getUserProgresses(userId);
        return ResponseEntity.ok(progresses);
    }
}