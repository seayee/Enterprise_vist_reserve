package com.example.back.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "visit_log")
public class Visit_log {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String visitedname;
    private String phone;
    private String company;
    private String visitdatetime;
    private String depart;
    private String reason;
    private String state;
    private String visitcode;
    private String applydatetime;
    private int peoplenum;

    public String getVisitedname() {
        return visitedname;
    }

    public void setVisitedname(String visitedname) {
        this.visitedname = visitedname;
    }

    public String getVisitdatetime() {
        return visitdatetime;
    }

    public void setVisitdatetime(String visitdatetime) {
        this.visitdatetime = visitdatetime;
    }

    public String getVisitcode() {
        return visitcode;
    }

    public void setVisitcode(String visitcode) {
        this.visitcode = visitcode;
    }

    public String getApplydatetime() {
        return applydatetime;
    }

    public void setApplydatetime(String applydatetime) {
        this.applydatetime = applydatetime;
    }

    public int getPeoplenum() {
        return peoplenum;
    }

    public void setPeoplenum(int peoplenum) {
        this.peoplenum = peoplenum;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDepart() {
        return depart;
    }

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    @Override
    public String toString() {
        return "Visit_log{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", visitedname='" + visitedname + '\'' +
                ", phone='" + phone + '\'' +
                ", company='" + company + '\'' +
                ", visitdatetime='" + visitdatetime + '\'' +
                ", depart='" + depart + '\'' +
                ", reason='" + reason + '\'' +
                ", state='" + state + '\'' +
                ", visitcode='" + visitcode + '\'' +
                ", applydatetime='" + applydatetime + '\'' +
                ", peoplenum=" + peoplenum +
                '}';
    }
}
