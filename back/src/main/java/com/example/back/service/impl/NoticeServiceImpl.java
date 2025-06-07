package com.example.back.service.impl;

import com.example.back.dao.NoticeRepository;
import com.example.back.entity.Notice_log;
import com.example.back.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public List<Notice_log> getNotices(){
        return noticeRepository.findAll();
    }
}
