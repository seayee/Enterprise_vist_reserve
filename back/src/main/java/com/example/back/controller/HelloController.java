package com.example.back.controller;

import com.example.back.entity.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {

        return "Hello World";

//    测试数据库连接
//    @Autowired
//    private UserService userService;
//    @GetMapping
//    public List<User> getAllUser() {
//
//        return userService.getAllUser();
    }
}
