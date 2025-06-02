package com.example.back.service;

public interface UserService {
    String registerUser(String phoneNumber, String password, String role);
    String login(String phoneNumber, String password);
}