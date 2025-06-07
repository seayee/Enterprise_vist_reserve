// pages/admin/home/home.js
Page({
  data: {
    userData: {},
    isLoading: true
  },

  onLoad() {
    const app = getApp();
    const userData = app.globalData.userData;

      wx.request({
        url: 'http://localhost:8080/findByPhone',
        method:"POST",
        data:{
          phoneNumber: userData
        },
        success: (res)=>{
          if(res.statusCode == 200){
            console.log("User info: " + JSON.stringify(res.data));
            // 将获取的数据覆盖全局变量
            app.globalData.userData = res.data;
            // console.log(app.globalData.userData.username)
            if(userData.role !=='访客'){
              this.setData({
              // 将获取数据的name更新在当前页面name数据
              userData: res.data,
              isLoading: false
            });
            }else{
              // 动态判断跳转逻辑（可根据实际需求调整）
            if (userData.role === '访客') {
              wx.redirectTo({ url: '/pages/visitor/visitor' });
            }
            }
            
          }
        },
        fail: (err) => {
          console.error("Request Error:", err);
          wx.showToast({
            title: "请求失败",
            icon: 'none'
          });
        }
      })
  },
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    }
  },

  navigateToVisitor() {
    wx.redirectTo({ url: '/pages/visitor/visitor' });
  }
});