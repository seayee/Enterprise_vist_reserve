package com.example.back.service;

import com.example.back.controller.Visit_applyController;
import com.example.back.entity.Visit_log;

import java.util.List;


public interface VisitService {
    String visit_apply(Visit_applyController.Visit_applyRequest request);

    List<Visit_log> getVisitedRecords(String visitedname, String department);
}
