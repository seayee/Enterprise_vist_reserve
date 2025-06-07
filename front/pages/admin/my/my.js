// pages/my/my.js
Page({
  data: {
    avatarUrl: '/images/用户.png', // 头像图片路径，替换为你的头像图片路径
    nickname: '点击编辑信息', // 用户昵称
  },
  
  // 页面的生命周期函数--监听页面加载
  onLoad: function(options) {
    const app = getApp();
    const userData = app.globalData.userData;
    console.log(userData);
    // 页面加载时获取用户信息
    this.setData({
      nickname: userData.username,
      avatarUrl: options.avatarUrl
    });
  },
  onEditInfo: function(event){
    wx.navigateTo({
      url: '/pages/admin/info-edit/info-edit',
    })
  },
  onVisitCode: function(event){
    wx.navigateTo({
      url: '/pages/admin/visit_code/visit_code'
    })
  }
});