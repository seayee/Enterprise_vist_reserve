// pages/admin/notice/notice.js
Page({
  data: {
    isAdmin: false, 
    notices: [],  
    currentPage: 1, 
    totalPages: 1, 
    searchKeyword: '', 
    typeIndex: 0,     // 类型筛选索引
    typeOptions: ['全部', '重要', '公告', '普通'],
    statusIndex: 0,   // 状态筛选索引（管理员）/已读筛选（普通用户）
    statusOptions: ['全部', '已发布', '草稿'], // 管理员

    // 发布通知相关
    showPublishModal: false,
    publishTitle: '',
    publishTypeIndex: 0,
    publishTypeOptions: ['重要', '公告', '普通'],
    publishContent: '',
    attachmentUrl: ''
  },

  onLoad() {
    // 从全局数据获取用户权限
    const app = getApp();
    this.setData({
      isAdmin: app.globalData.userData.role === '管理员'
    });
    
    // 如果不是管理员，修改状态选项
    if (!this.data.isAdmin) {
      this.setData({
        statusOptions: ['全部', '已读', '未读']
      });
    }
    
    // 加载通知列表
    this.fetchNotices();
  },

  // 获取通知列表
  fetchNotices() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    
    // 调用后端API获取通知列表
    wx.request({
      url: 'http://localhost:8080/notices',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const notices = res.data;

          // 筛选处理
          let filteredData = notices;

          // 类型筛选
          if (this.data.typeIndex > 0) {
            filteredData = filteredData.filter(item => 
              item.type === this.data.typeOptions[this.data.typeIndex]
            );
          }

          // 状态筛选（管理员）/已读筛选（普通用户）
          if (this.data.statusIndex > 0) {
            if (this.data.isAdmin) {
              // 管理员按状态筛选
              const statusMap = {1: 'published', 2: 'draft'};
              filteredData = filteredData.filter(item => 
                item.status === statusMap[this.data.statusIndex]
              );
            } else {
              // 普通用户按已读筛选
              filteredData = filteredData.filter(item => 
                (this.data.statusIndex === 1 && item.isRead) || 
                (this.data.statusIndex === 2 && !item.isRead)
              );
            }
          }

          // 搜索筛选
          if (this.data.searchKeyword) {
            const keyword = this.data.searchKeyword.toLowerCase();
            filteredData = filteredData.filter(item => 
              item.title.toLowerCase().includes(keyword) || 
              item.summary.toLowerCase().includes(keyword)
            );
          }

          // 分页处理
          const pageSize = 5;
          const startIndex = (this.data.currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedData = filteredData.slice(startIndex, endIndex);

          // 计算总页数
          const totalPages = Math.ceil(filteredData.length / pageSize);

          this.setData({
            notices: paginatedData,
            totalPages
          });
        } else {
          wx.showToast({
            title: '通知获取失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 搜索输入处理
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 类型筛选处理
  onTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value,
      currentPage: 1
    });
    this.fetchNotices();
  },

  // 状态筛选处理
  onStatusChange(e) {
    this.setData({
      statusIndex: e.detail.value,
      currentPage: 1
    });
    this.fetchNotices();
  },

  // 上一页
  prevPage() {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
      this.fetchNotices();
    }
  },

  // 下一页
  nextPage() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.fetchNotices();
    }
  },

  // 查看通知详情
  viewNoticeDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/admin/notice-detail/notice-detail?id=${id}`
    });
  },

  // 显示发布通知弹窗
  showPublishModal() {
    this.setData({
      showPublishModal: true,
      publishTitle: '',
      publishTypeIndex: 0,
      publishContent: '',
      attachmentUrl: ''
    });
  },

  // 关闭发布通知弹窗
  closePublishModal() {
    this.setData({
      showPublishModal: false
    });
  },

  // 发布通知
  publishNotice() {
    if (!this.data.publishTitle.trim()) {
      wx.showToast({
        title: '请输入通知标题',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.publishContent.trim()) {
      wx.showToast({
        title: '请输入通知内容',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '发布中',
      mask: true
    });
    
    // 模拟API请求
    setTimeout(() => {
      // 更新本地数据（实际项目中应从服务器获取最新数据）
      const newNotice = {
        id: Date.now(),
        title: this.data.publishTitle,
        type: this.data.publishTypeOptions[this.data.publishTypeIndex],
        summary: this.data.publishContent.length > 50 ? 
                 this.data.publishContent.substring(0, 50) + '...' : 
                 this.data.publishContent,
        content: this.data.publishContent,
        publishTime: this.formatDate(new Date()),
        author: getApp().globalData.userData.username,
        status: "published",
        isRead: false,
        isNew: true,
        attachment: this.data.attachmentUrl
      };
      
      // 更新通知列表
      const notices = [newNotice, ...this.data.notices];
      this.setData({
        notices,
        showPublishModal: false
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  // 编辑器初始化
  onEditorReady() {
    // 获取编辑器上下文
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context;
    }).exec();
  },

  // 编辑器输入事件
  onEditorInput(e) {
    this.setData({
      publishContent: e.detail.html
    });
  },

  // 选择附件
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          attachmentUrl: res.tempFilePaths[0]
        });
      }
    });
  },

  // 删除附件
  removeAttachment() {
    this.setData({
      attachmentUrl: ''
    });
  },

  // 发布类型选择
  onPublishTypeChange(e) {
    this.setData({
      publishTypeIndex: e.detail.value
    });
  },

  // 标题输入
  onTitleInput(e) {
    this.setData({
      publishTitle: e.detail.value
    });
  }
});