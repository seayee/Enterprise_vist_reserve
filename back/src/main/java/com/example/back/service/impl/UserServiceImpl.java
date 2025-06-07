package com.example.back.service.impl;

import com.example.back.dao.RegisterRepository;
import com.example.back.dao.UserRepository;
import com.example.back.entity.Register_log;
import com.example.back.entity.User;
import com.example.back.service.QRCodeService;
import com.example.back.service.TimeService;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QRCodeService qrCodeService;
    @Autowired
    private RegisterRepository registerRepository;
    @Autowired
    private TimeService timeService;

    //    注册用户
    @Override
    public String registerUser(String username, String phoneNumber, String password, String role) {  // 注意添加了sex参数
        Register_log register_log;

        if(role.equals( "管理员")){
            User user = userRepository.findByPhone(phoneNumber).orElse(null);
            if (user != null && user.getPassword().equals(password)&&user.getRole().equals(role)) {
                return "用户已注册";
            }

            register_log = new Register_log(username, phoneNumber, password, "待审核", role, String.valueOf(Timestamp.valueOf(LocalDateTime.now())));
            registerRepository.save(register_log);
            return "待审核";
        }
        if (userRepository.existsByPhone(phoneNumber)) {
            User user = userRepository.findByPhone(phoneNumber).orElse(null);
            if (user != null && user.getPassword().equals(password)) {
                return "用户已注册";
            }

            if (user != null && user.getUsername().equals(username)) {
                user.setPhone(phoneNumber);
                user.setPassword(password);
                user.setRole(role);
                userRepository.save(user);

//                System.out.println("当前时间是："+ Timestamp.valueOf(LocalDateTime.now()));

                register_log = new Register_log(username, phoneNumber, password, "成功",role, String.valueOf(Timestamp.valueOf(LocalDateTime.now())));
                registerRepository.save(register_log);

                return "注册成功";
            }
        }

        register_log = new Register_log(username, phoneNumber, password, "待审核",role,  String.valueOf(Timestamp.valueOf(LocalDateTime.now())));
        registerRepository.save(register_log);
        return "待审核";
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
                }else if (user.getRole().equals("访客")){
                    return "访客";                }
            } else {
                return "密码错误";
            }
        }

        return "用户不存在";
    }

//    通过手机号获取用户信息
    @Override
    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    // 制作访客码
    @Override
    public User createVisitCode(long userId) {
        User user = userRepository.findById(userId).orElse(null);
//        System.out.println(user);
        if (user == null) {
            return null;
        } else {
            String qrCodeUrl = qrCodeService.generateQRCode(user.getId(), user.getUsername());
            System.out.println("qrCodeUrl = " + qrCodeUrl);
            user.setCode(qrCodeUrl);
            userRepository.save(user);
            System.out.println(user);
            return user;
        }
    }
}