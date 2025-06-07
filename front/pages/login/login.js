Page({
  data: {
    phoneNumber: '',
    password: '',
    showPassword: true,
    registerColor: 'blue',
    eye: '/images/隐藏密码.png'
  },

  onPhoneInput: function(event) {
    this.setData({
      phoneNumber: event.detail.value
    });
    console.log("Phone Input:", this.data.phoneNumber); // 打印手机号输入值
  },

  onPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
    console.log("Password Input:", this.data.password); // 打印密码输入值
  },

  togglePasswordVisibility: function() {
    this.setData({
      showPassword: !this.data.showPassword,
      eye: this.data.showPassword ? '/images/显示密码.png' : '/images/隐藏密码.png'
    });
  },
  onSubmit: function() {
    const { phoneNumber, password } = this.data;
    console.log("Phone:", phoneNumber);
    console.log("Password:", password);

    wx.request({
     url: 'http://localhost:8080/login',
      method: 'POST',
      data: {
        phoneNumber,
        password
      },
      success: (res) => {
        console.log("Login Response:", res.data);
        if (res.statusCode === 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });

          // 覆盖全局变量
          const app = getApp();
          app.globalData.userData = phoneNumber;

          // 跳转
          if(res.data === "管理员" || res.data === "普通用户" || res.data === "访客"){
            wx.switchTab({
              url: '/pages/admin/home/home'
            });
          }else if(res.data === "密码错误"){
            wx.showToast({
              title: '密码错误',
              icon: 'none'
            });
          }else if(res.data === "用户不存在"){
            wx.showToast({
              title: '用户不存在',
              icon: 'none'
            });
          }
        }else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error("Login Error:", err);
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },

  onRegister: function() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});