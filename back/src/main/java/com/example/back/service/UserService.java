package com.example.back.service;

import com.example.back.entity.User;

import java.util.Optional;

public interface UserService {
    String registerUser(String username,String phoneNumber, String password, String role);
    String login(String phoneNumber, String password);
    Optional<User> findByPhone(String phoneNumber);
    User createVisitCode(long userid);
}