package com.example.back.controller;

import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        System.out.println("Role: " + request.getRole());
        System.out.println("Phone Number: " + request.getPhoneNumber());
        System.out.println("Confirm Password: " + request.getConfirmPassword());
//        处理注册

        return userService.registerUser(request.getPhoneNumber(), request.getConfirmPassword(), request.getRole());
    }

    // 请求体对象
    public static class RegisterRequest {
        private String role;
        private String phoneNumber;
        private String confirmPassword;

        // Getters and Setters
        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }
}