Page({
  data: {
    // 角色
    role: '管理员',
    adminBgColor: 'black',
    adminTextColor: 'white',
    userBgColor: 'white',
    userTextColor: 'black',
    // 输入
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    // 隐藏密码
    eye:'/images/隐藏密码.png',
    eye1:'/images/隐藏密码.png',
    showPassword: false,
    showConfirmPassword: false,
    // 
    loginColor: '#6bbbea'
  },

  // 角色切换
  toggleColors: function(event) {
    const role = event.currentTarget.dataset.role; 

    if (role === '管理员') {
      // 点击管理员，管理员变白，普通用户变黑

      this.setData({
        role: '管理员',
        adminBgColor: 'black',
        adminTextColor: 'white',
        userBgColor: 'white',
        userTextColor: 'black'
      });
    } else if (role === '普通用户') {
      // 点击普通用户，普通用户变白，管理员变黑
      this.setData({
        role: '普通用户',
        adminBgColor: 'white',
        adminTextColor: 'black',
        userBgColor: 'black',
        userTextColor: 'white'
      });
    }
  },
  // 输入
  onPhoneInput: function(event) {
    this.setData({
      phoneNumber: event.detail.value
    });
  },

  onPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },

  onPasswordConfirm: function(event) {
    // const { password } = this.data; // 获取当前输入的密码
    // const confirmPassword = event.detail.value; // 获取确认密码的输入值

    // if (!password) {
    //   // 如果密码为空，提示输入密码为空
    //   wx.showToast({
    //     title: '输入密码为空',
    //     icon: 'none'
    //   });
    // } else if (password !== confirmPassword) {
    //   // 如果两次密码不一致，提示密码不一致
    //   wx.showToast({
    //     title: '密码不一致',
    //     icon: 'none'
    //   });
    // } else {
    //   // 如果两次密码一致，更新数据并继续后续逻辑
    //   this.setData({
    //     confirmPassword: confirmPassword
    //   });
    // }
    this.setData({
      confirmPassword: event.detail.value
    });
  },
  // 隐藏密码
  togglePasswordVisibility: function(){
    this.setData({
      showPassword: !this.data.showPassword,
      eye: this.data.showPassword ? '/images/显示密码.png' : '/images/隐藏密码.png'
    });
  },
  toggleConfirmPasswordVisibility: function() {
    this.setData({
      showConfirmPassword: !this.data.showConfirmPassword,
      eye1: this.data.showConfirmPassword ? '/images/显示密码.png' : '/images/隐藏密码.png'
    });
  },
  // 注册
  onSubmit: function() {
    const { role, phoneNumber, password, confirmPassword } = this.data;

    // 验证手机号是否为空
    if (!phoneNumber) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      });
      return;
    }
    // 验证手机号格式是否正确
    const phoneRegex = /^1[3-9]\d{9}$/; // 匹配手机号的正则表达式
    if (!phoneRegex.test(phoneNumber)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    // 验证密码是否为空
    if(!password){
      wx.showToast({
        title: '密码为空',
        icon: 'none'
      });
      return;
    }
    if(!confirmPassword){
      wx.showToast({
        title: '请确认密码',
        icon: 'none'
      });
      return;
    }

    // 验证密码格式
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      wx.showToast({
        title: '密码要求大小写字母以及数字同时存在',
        icon: 'none'
      });
      return;
    }
    // 验证两次密码是否相同
    if (password !== confirmPassword) {
        // 如果两次密码不一致，提示密码不一致
        wx.showToast({
          title: '密码不一致',
          icon: 'none'
        });
      }
    // 传入后端
    wx.request({
      url: 'http://localhost:8080/register',
      method: 'POST',
      data: {
        role: role,
        phoneNumber:phoneNumber,
        confirmPassword:confirmPassword
      },
      header: {
        'content-type': 'application/json' // 确保发送的是 JSON 数据
      },
      success: (res) => {
        if(res.statusCode == 200){
          if(res.data === "注册成功"){
            // 注册成功
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            });
          }else if(res.data === "用户已注册"){
            wx.showToast({
              title: '用户已注册',
              icon: 'none'
            });
          }
        }else{
          wx.showToast({
            title: '网络连接错误',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '注册失败',
          icon: 'none'
        });
      }
    })
  },
  // TOlogin
  onLogin: function(event){
    // this.setData({
    //   loginColor: 'black'
    // })
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});