Page({
  data: {
    phone: '',
    password: ''
  },
  // 输入手机号
  onPhoneInput(event) {
    this.setData({
      phone: event.detail.value
    });
  },
  // 输入密码
  onPasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },
  // 登录
  onLoginTap() {
    const { phone, password } = this.data;
    this.setData({
      phone: res.data
    });
    // 发起登录请求
    wx.request({
      url: 'https://localhost:8080/login', // 替换为你的登录接口
      // method: 'POST',
      success: (res) => {
        console.log(res.statusCode)
        if (res.statusCode === 200) {
          this.setData({
            phone: res.data
          });
        }
      },
    })
  }
})