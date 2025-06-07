package com.example.back.dao;

import com.example.back.entity.User;
import com.example.back.entity.Visit_log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhone(String phone);

    Optional<User> findByPhone(String phoneNumber);

    boolean existsByPassword(String password);

    Optional<User> findByUsernameAndDepartment(String username, String department);

    Optional<User> findByIdAndRole(long id, String role);

}