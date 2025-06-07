package com.example.back.dao;

import com.example.back.entity.Notice_log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice_log, Long> {
}
