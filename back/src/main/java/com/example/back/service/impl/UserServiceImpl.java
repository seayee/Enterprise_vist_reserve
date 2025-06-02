package com.example.back.service.impl;

import com.example.back.dao.UserRepository;
import com.example.back.entity.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

//    注册用户
    @Override
    public String registerUser(String phoneNumber, String password, String role) {  // 注意添加了sex参数
        if (userRepository.existsByPhone(phoneNumber)) {
            return "用户已注册";
        }

        User newUser = new User();
        newUser.setPhone(phoneNumber);
        newUser.setPassword(password);
        newUser.setRole(role);

        userRepository.save(newUser);

        return "注册成功";
    }

//    登录
    @Override
    public String login(String phoneNumber, String password) {
        User user = userRepository.findByPhone(phoneNumber)
                .orElse(null);

        if (user != null) {
            if (user.getPassword().equals(password)) {
                if (user.getRole().equals("管理员")) {
                    return "管理员";
                } else if (user.getRole().equals("普通用户")) {
                    return "普通用户";
                }
            } else {
                return "密码错误";
            }
        }

        return "用户不存在";

    }
}