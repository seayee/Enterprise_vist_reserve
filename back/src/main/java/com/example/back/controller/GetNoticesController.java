package com.example.back.controller;

import com.example.back.entity.Notice_log;
import com.example.back.entity.Visit_log;
import com.example.back.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetNoticesController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notices")
    public ResponseEntity<?> getNotices(){
        List<Notice_log> noticelog = noticeService.getNotices();

        System.out.println("Noticelog = "+noticelog);
        for (Notice_log element : noticelog) {
            System.out.println(element);
        }
        return ResponseEntity.ok(noticelog);
    }
}
