package com.example.back.controller;

import com.example.back.entity.Visit_log;
import com.example.back.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Visited_recordsController {
    @Autowired
    private VisitService visitService;

    @PostMapping("/visited/records")
    public ResponseEntity<?> visited_records(@RequestBody VisitRequest request){
        System.out.println("username = "+request.getUsername());

        String username = request.getUsername();
        String department =  request.getDepart();

        List<Visit_log> visitLogs = visitService.getVisitedRecords(username, department);

        System.out.println("visitLogs = "+visitLogs);
        for (Visit_log element : visitLogs) {
            System.out.println(element);
        }
        return ResponseEntity.ok(visitLogs);
    }

    public static class VisitRequest {
        private String username;
        private String depart;

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }

        public String getDepart() {
            return depart;
        }

        public void setDepart(String depart) {
            this.depart = depart;
        }
    }
}
