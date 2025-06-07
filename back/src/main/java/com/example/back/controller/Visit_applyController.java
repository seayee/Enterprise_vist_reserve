package com.example.back.controller;

import com.example.back.service.UserService;
import com.example.back.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Visit_applyController {
    @Autowired
    private VisitService visitService;

    @PostMapping("/visit_apply")
    public String visit_apply(@RequestBody Visit_applyRequest request){
        System.out.println("VisitorName: " + request.getVisitorName());
        System.out.println("VisitedName: " + request.getVisitedName());
        return visitService.visit_apply(request);

//        String data = visitService.visit_apply(request);
//        System.out.println("data = "+data);
//        return data;
    }

    // 请求体对象
    public static class Visit_applyRequest {
        private String visitorName;
        private String visitedName;
        private String visitorPhone;
        private String company;
        private String department;
        private Integer visitorCount;
        private String reason;

        // Getters and Setters
        public String getVisitorName() { return visitorName; }
        public void setVisitorName(String visitorName) { this.visitorName = visitorName; }

        public String getVisitedName() { return visitedName; }
        public void setVisitedName(String visitedName) { this.visitedName = visitedName; }

        public String getVisitorPhone() { return visitorPhone; }
        public void setVisitorPhone(String visitorPhone) { this.visitorPhone = visitorPhone; }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }

        public Integer getVisitorCount() { return visitorCount; }
        public void setVisitorCount(Integer visitorCount) { this.visitorCount = visitorCount; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
