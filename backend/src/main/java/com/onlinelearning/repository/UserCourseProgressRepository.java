package com.onlinelearning.repository;

import com.onlinelearning.model.UserCourseProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface UserCourseProgressRepository extends MongoRepository<UserCourseProgress, String> {
    List<UserCourseProgress> findByUserId(String userId);
    Optional<UserCourseProgress> findByUserIdAndCourseId(String userId, String courseId);
}