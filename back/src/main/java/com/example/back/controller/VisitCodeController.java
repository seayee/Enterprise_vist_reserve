package com.example.back.controller;

import com.example.back.entity.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
//@RequestMapping("/api")
public class VisitCodeController {

    @Autowired
    private UserService userService;

    @PostMapping("/visit_code")
    public ResponseEntity<?> getVisitCode(@RequestBody Map<String, Long> request) {
        System.out.println("userId = "+request.get("id"));
//        return ResponseEntity.badRequest().body("用户ID不能为空");

        User visitCode = userService.createVisitCode(request.get("id"));

        System.out.println(visitCode);
        if (visitCode != null) {
            return ResponseEntity.ok(visitCode);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}