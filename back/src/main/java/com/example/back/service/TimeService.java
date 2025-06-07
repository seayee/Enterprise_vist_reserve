package com.example.back.service;

import com.example.back.dao.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

@Service
public class TimeService{
    @Autowired
    private RegisterRepository registerRepository;
    public Timestamp saveCurrentTime() {
        // 获取当前时间
        LocalDateTime now = LocalDateTime.now(ZoneId.systemDefault());

        // 将 LocalDateTime 转换为 Date
        Date date = (Date) Date.from(now.toInstant(ZoneOffset.UTC));

        // 将 Date 转换为 Timestamp
        Timestamp timestamp = new Timestamp(date.getTime());
        return timestamp;
    }
}
