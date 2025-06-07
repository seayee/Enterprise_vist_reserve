package com.example.back.dao;

import com.example.back.entity.Visit_log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit_log, Long> {

    List<Visit_log> findById(long userId);
    List<Visit_log> findByVisitednameAndDepart(String visitedname, String depart);

    List<Visit_log> findByVisitedname(String visitedName);
}
