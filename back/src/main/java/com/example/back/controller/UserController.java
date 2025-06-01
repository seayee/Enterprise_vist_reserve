package com.example.back.controller;

import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
public class UserController {

    @GetMapping("/login")
    public String login() {
        return "success";
    }

    @PostMapping("/login1")
    public String login1(@RequestParam("age") String age){
        System.out.println(age);
        return age;
    }
}