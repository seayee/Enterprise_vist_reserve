package com.example.back.dao;

import com.example.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByPhone(String Phone);
    List<User> findByEmail(String email);
}