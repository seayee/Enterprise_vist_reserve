package com.example.back.controller;

import com.example.back.entity.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
//@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/findByPhone")
    public ResponseEntity<?> getUserInfo(@RequestBody Map<String,String> request) {
        System.out.println("phone = "+ request.get("phoneNumber"));

        Optional<User> userOptional = userService.findByPhone(request.get("phoneNumber"));
        if (userOptional.isPresent()) {
//            System.out.println("user = "+userOptional.get());
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/greeting")
    public ResponseEntity<String> greeting(@RequestBody String phoneNumber){
        System.out.println("phone="+phoneNumber);
        String mes = "Hello "+phoneNumber+"!";
        return ResponseEntity.ok(mes);
    }
}