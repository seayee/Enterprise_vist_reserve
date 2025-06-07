// pages/admin/visit_code/visit_code.js
Page({
  data: {
    visitCodeUrl: '',  // 访客码URL
    userData: {},      // 用户信息
    qrcodeStatus: '加载中', // 二维码状态
    expiryDate: '',    // 有效期
    saving: false      // 保存按钮加载状态
  },

  onLoad(options) {
    const app = getApp();
    const userData = app.globalData.userData;
    
    if (!userData || !userData.id) {
      wx.showToast({
        title: '用户信息不存在',
        icon: 'none'
      });
      return;
    }
    
    this.setData({userData});
    this.fetchVisitCode(userData.id);
  },

  // 获取访客码
  fetchVisitCode(userId) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    
    wx.request({
      url: 'http://localhost:8080/visit_code',
      method: 'POST',
      data: {
        id: userId
      },
      success: (res) => {
        wx.hideLoading();
        console.log("data="+res.data);
        if (res.statusCode === 200) {
          // 更新全局数据
          const app = getApp();
          app.globalData.userData = res.data;
          console.log("data = "+JSON.stringify(res.data));

          // 成功获取二维码
          this.setData({
            visitCodeUrl: res.data.code,
            qrcodeStatus: '有效二维码',
          });
        } else {
          wx.showToast({
            title: '获取访客码失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        console.error('请求错误:', err);
      }
    });
  },

  // 格式化有效期日期
  formatExpiryDate(timestamp) {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  // 保存二维码图片
  saveQRCode() {
    if (!this.data.visitCodeUrl) {
      wx.showToast({
        title: '暂无二维码可保存',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ saving: true });
    
    // 下载图片
    wx.downloadFile({
      url: this.data.visitCodeUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存图片到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              if (err.errMsg.includes('auth deny')) {
                // 处理权限被拒绝的情况
                wx.showModal({
                  title: '提示',
                  content: '需要获取相册权限才能保存图片',
                  success: (res) => {
                    if (res.confirm) {
                      wx.openSetting();
                    }
                  }
                });
              } else {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
              }
            },
            complete: () => {
              this.setData({ saving: false });
            }
          });
        } else {
          wx.showToast({
            title: '下载图片失败',
            icon: 'none'
          });
          this.setData({ saving: false });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '下载图片失败',
          icon: 'none'
        });
        this.setData({ saving: false });
        console.error('下载失败:', err);
      }
    });
  },

  // 邀请访客
  inviteVisitor() {
    wx.showActionSheet({
      itemList: ['微信好友', '朋友圈', '复制链接'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            // 分享到微信好友
            this.showShareTips('微信好友');
            break;
          case 1:
            // 分享到朋友圈
            this.showShareTips('朋友圈');
            break;
          case 2:
            // 复制链接
            wx.setClipboardData({
              data: this.data.visitCodeUrl,
              success: () => {
                wx.showToast({
                  title: '链接已复制',
                  icon: 'success'
                });
              }
            });
            break;
        }
      }
    });
  },

  // 显示分享提示
  showShareTips(channel) {
    wx.showModal({
      title: `分享到${channel}`,
      content: `请点击右上角"..."按钮，选择"分享到${channel}"`,
      showCancel: false
    });
  },

  // 预览二维码
  previewQRCode() {
    if (this.data.visitCodeUrl) {
      wx.previewImage({
        urls: [this.data.visitCodeUrl]
      });
    }
  }
});