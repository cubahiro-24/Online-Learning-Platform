package com.onlinelearning.config;

import com.onlinelearning.model.Course;
import com.onlinelearning.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(CourseRepository courseRepository) {
        return args -> {
            if (courseRepository.count() == 0) {
                // Add some initial courses
                Course course1 = new Course();
                course1.setTitle("Modern Web Development");
                course1.setInstructor("John Doe");
                course1.setRating(4.8);
                course1.setImageUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80");
                course1.setDescription("Learn modern web development with React, Node.js, and more.");
                course1.setDuration("12 weeks");
                course1.setLessons(24);

                // Add more courses similarly...

                courseRepository.save(course1);
            }
        };
    }
}