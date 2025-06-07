package com.example.back.service.impl;

import com.example.back.controller.Visit_applyController;
import com.example.back.dao.UserRepository;
import com.example.back.dao.VisitRepository;
import com.example.back.entity.User;
import com.example.back.entity.Visit_log;
import com.example.back.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitServiceImpl implements VisitService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VisitRepository visitRepository;

    @Override
    @Transactional
    public String visit_apply(Visit_applyController.Visit_applyRequest request) {
        // 查询被访人是否是公司内部的
        User visitedUser = userRepository.findByUsernameAndDepartment(request.getVisitedName(), request.getDepartment())
                .orElse(null);

        if (visitedUser != null && visitedUser.getDepartment().equals(request.getDepartment())) {
            // 插入到数据表visit_log中，并且状态为“待审核”
            Visit_log visitLog = new Visit_log();
            visitLog.setName(request.getVisitorName());
            visitLog.setVisitedname(request.getVisitedName());
            visitLog.setPhone(request.getVisitorPhone());
            visitLog.setCompany(request.getCompany());
            visitLog.setDepart(request.getDepartment());
            visitLog.setReason(request.getReason());
            visitLog.setState("待审核");
            visitLog.setApplydatetime(String.valueOf(Timestamp.valueOf(LocalDateTime.now())));
            visitLog.setPeoplenum(request.getVisitorCount());
            visitRepository.save(visitLog);

            return "插入成功";
        } else {
            return "不存在该被访人";
        }
    }

    @Override
    public List<Visit_log> getVisitedRecords(String visited_name, String department) {
        System.out.println("visited_name = "+visitRepository.findByVisitedname(visited_name));
//        return visitRepository.findByVisitednameAndDepart(visited_name, department);
        return visitRepository.findByVisitedname(visited_name);
    }
}
