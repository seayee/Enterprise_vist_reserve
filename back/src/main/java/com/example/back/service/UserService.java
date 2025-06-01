package com.example.back.service;

import com.example.back.dao.UserRepository;
import com.example.back.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.antlr.v4.runtime.tree.xpath.XPath.findAll;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

}