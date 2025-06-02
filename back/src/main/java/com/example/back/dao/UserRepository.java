package com.example.back.dao;

import com.example.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhone(String phone);

    Optional<User> findByPhone(String phoneNumber);
}