package com.example.back.dao;

import com.example.back.entity.Register_log;
import com.example.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;

public interface RegisterRepository extends JpaRepository<Register_log, Long> {

}
