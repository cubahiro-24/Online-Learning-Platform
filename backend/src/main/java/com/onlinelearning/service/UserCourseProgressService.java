package com.onlinelearning.service;

import com.onlinelearning.model.UserCourseProgress;
import com.onlinelearning.repository.UserCourseProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserCourseProgressService {
    private final UserCourseProgressRepository progressRepository;

    // Start a new course progress
    public UserCourseProgress startCourse(String userId, String courseId) {
        // Check if progress already exists
        return progressRepository.findByUserIdAndCourseId(userId, courseId)
            .orElseGet(() -> {
                UserCourseProgress progress = new UserCourseProgress();
                progress.setUserId(userId);
                progress.setCourseId(courseId);
                progress.setProgressPercentage(0);
                progress.setCompleted(false);
                return progressRepository.save(progress);
            });
    }

    // Update course progress
    public UserCourseProgress updateProgress(String userId, String courseId, int progressPercentage) {
        UserCourseProgress progress = progressRepository.findByUserIdAndCourseId(userId, courseId)
            .orElseThrow(() -> new RuntimeException("Course progress not found"));

        // Update progress
        progress.setProgressPercentage(Math.min(100, Math.max(0, progressPercentage)));
        
        // Auto-mark as completed if reaches 100%
        if (progressPercentage >= 100) {
            progress.setCompleted(true);
        }

        return progressRepository.save(progress);
    }

    // Mark course as completed
    public UserCourseProgress completeCourse(String userId, String courseId) {
        UserCourseProgress progress = progressRepository.findByUserIdAndCourseId(userId, courseId)
            .orElseThrow(() -> new RuntimeException("Course progress not found"));

        progress.setProgressPercentage(100);
        progress.setCompleted(true);
        return progressRepository.save(progress);
    }

    // Get progress for a specific user and course
    public UserCourseProgress getProgress(String userId, String courseId) {
        return progressRepository.findByUserIdAndCourseId(userId, courseId)
            .orElseThrow(() -> new RuntimeException("Course progress not found"));
    }

    // Get all course progresses for a user
    public List<UserCourseProgress> getUserProgresses(String userId) {
        return progressRepository.findByUserId(userId);
    }
}