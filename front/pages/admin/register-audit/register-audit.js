// pages/admin/register-audit/register-audit.js
Page({
  data: {
    activeTab: 'admin', // 当前激活的标签页：admin 或 user
    applications: [],   // 申请列表数据
    statusOptions: ['全部', '待审核', '已通过', '已拒绝'],
    statusIndex: 0,     // 当前选择的状态索引
    timeOptions: ['全部时间', '今天', '本周', '本月', '近三个月'],
    timeIndex: 0,       // 当前选择的时间范围索引
    searchKeyword: '',  // 搜索关键词
    currentPage: 1,     // 当前页码
    totalPages: 1,      // 总页数
    showRejectModal: false, // 是否显示拒绝理由弹窗
    selectedId: null,   // 当前选中的申请ID
    rejectReason: ''    // 拒绝理由
  },

  onLoad() {
    // 页面加载时获取申请列表
    this.fetchApplications();
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab !== this.data.activeTab) {
      this.setData({
        activeTab: tab,
        currentPage: 1,
        applications: []
      });
      this.fetchApplications();
    }
  },

  // 获取申请列表
  fetchApplications() {
    // 显示加载中
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    // 模拟API请求
    setTimeout(() => {
      // 根据当前标签页获取不同类型的申请数据
      const mockData = this.generateMockData(this.data.activeTab);
      
      // 处理筛选条件
      let filteredData = mockData;
      
      // 状态筛选
      if (this.data.statusIndex > 0) {
        const statusMap = {1: 'pending', 2: 'approved', 3: 'rejected'};
        filteredData = filteredData.filter(item => item.status === statusMap[this.data.statusIndex]);
      }
      
      // 时间筛选（简化处理）
      if (this.data.timeIndex > 0) {
        // 实际项目中应根据选择的时间范围过滤数据
        filteredData = filteredData.slice(0, 3);
      }
      
      // 搜索关键词筛选
      if (this.data.searchKeyword) {
        const keyword = this.data.searchKeyword.toLowerCase();
        filteredData = filteredData.filter(item => 
          item.username.toLowerCase().includes(keyword) || 
          item.email.toLowerCase().includes(keyword)
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
        applications: paginatedData,
        totalPages
      });
      
      wx.hideLoading();
    }, 800);
  },

  // 生成模拟数据
  generateMockData(type) {
    const baseData = [
      {
        id: 1,
        applyId: 'AP2023001',
        username: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138001',
        avatarUrl: 'https://picsum.photos/seed/user1/100/100',
        roleName: type === 'admin' ? '系统管理员' : '普通用户',
        department: '技术部',
        reason: '因工作需要申请账号权限',
        applyTime: '2023-05-10 09:30',
        status: 'pending',
        statusText: '待审核'
      },
      {
        id: 2,
        applyId: 'AP2023002',
        username: '李四',
        email: 'lisi@example.com',
        phone: '13900139002',
        avatarUrl: 'https://picsum.photos/seed/user2/100/100',
        roleName: type === 'admin' ? '内容审核员' : '普通用户',
        department: '市场部',
        reason: '申请访问系统进行日常业务操作',
        applyTime: '2023-05-09 14:15',
        status: 'approved',
        statusText: '已通过'
      },
      {
        id: 3,
        applyId: 'AP2023003',
        username: '王五',
        email: 'wangwu@example.com',
        phone: '13700137003',
        avatarUrl: 'https://picsum.photos/seed/user3/100/100',
        roleName: type === 'admin' ? '数据分析师' : '普通用户',
        department: '数据分析部',
        reason: '需要查看系统数据进行分析',
        applyTime: '2023-05-08 11:45',
        status: 'rejected',
        statusText: '已拒绝'
      },
      {
        id: 4,
        applyId: 'AP2023004',
        username: '赵六',
        email: 'zhaoliu@example.com',
        phone: '13600136004',
        avatarUrl: 'https://picsum.photos/seed/user4/100/100',
        roleName: type === 'admin' ? '财务管理员' : '普通用户',
        department: '财务部',
        reason: '申请系统账号处理财务相关业务',
        applyTime: '2023-05-07 16:20',
        status: 'pending',
        statusText: '待审核'
      },
      {
        id: 5,
        applyId: 'AP2023005',
        username: '钱七',
        email: 'qianqi@example.com',
        phone: '13500135005',
        avatarUrl: 'https://picsum.photos/seed/user5/100/100',
        roleName: type === 'admin' ? '人力资源管理员' : '普通用户',
        department: '人力资源部',
        reason: '申请账号进行员工信息管理',
        applyTime: '2023-05-06 10:05',
        status: 'pending',
        statusText: '待审核'
      }
    ];
    
    // 如果是用户申请，添加更多模拟数据
    if (type === 'user') {
      return [
        ...baseData,
        {
          id: 6,
          applyId: 'AP2023006',
          username: '孙八',
          email: 'sunba@example.com',
          phone: '13400134006',
          avatarUrl: 'https://picsum.photos/seed/user6/100/100',
          roleName: '普通用户',
          department: '销售部',
          reason: '申请账号用于客户管理',
          applyTime: '2023-05-05 15:30',
          status: 'approved',
          statusText: '已通过'
        },
        {
          id: 7,
          applyId: 'AP2023007',
          username: '周九',
          email: 'zhoujiu@example.com',
          phone: '13300133007',
          avatarUrl: 'https://picsum.photos/seed/user7/100/100',
          roleName: '普通用户',
          department: '客服部',
          reason: '申请访问系统处理客户咨询',
          applyTime: '2023-05-04 14:45',
          status: 'rejected',
          statusText: '已拒绝'
        }
      ];
    }
    
    return baseData;
  },

  // 搜索输入处理
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 状态筛选处理
  onStatusChange(e) {
    this.setData({
      statusIndex: e.detail.value,
      currentPage: 1
    });
    this.fetchApplications();
  },

  // 时间筛选处理
  onTimeChange(e) {
    this.setData({
      timeIndex: e.detail.value,
      currentPage: 1
    });
    this.fetchApplications();
  },

  // 上一页
  prevPage() {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
      this.fetchApplications();
    }
  },

  // 下一页
  nextPage() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.fetchApplications();
    }
  },

  // 同意申请
  approveApplication(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认通过',
      content: '确定要通过该用户的注册申请吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟API请求
          wx.showLoading({
            title: '处理中',
            mask: true
          });
          
          setTimeout(() => {
            // 更新本地数据
            const applications = this.data.applications.map(item => {
              if (item.id === id) {
                return {
                  ...item,
                  status: 'approved',
                  statusText: '已通过'
                };
              }
              return item;
            });
            
            this.setData({ applications });
            
            wx.hideLoading();
            wx.showToast({
              title: '已通过申请',
              icon: 'success'
            });
          }, 800);
        }
      }
    });
  },

  // 拒绝申请 - 显示弹窗
  rejectApplication(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      showRejectModal: true,
      selectedId: id,
      rejectReason: ''
    });
  },

  // 输入拒绝理由
  onReasonInput(e) {
    this.setData({
      rejectReason: e.detail.value
    });
  },

  // 关闭拒绝理由弹窗
  closeRejectModal() {
    this.setData({
      showRejectModal: false,
      selectedId: null,
      rejectReason: ''
    });
  },

  // 确认拒绝
  confirmReject() {
    if (!this.data.rejectReason.trim()) {
      wx.showToast({
        title: '请输入拒绝理由',
        icon: 'none'
      });
      return;
    }
    
    // 模拟API请求
    wx.showLoading({
      title: '处理中',
      mask: true
    });
    
    setTimeout(() => {
      // 更新本地数据
      const applications = this.data.applications.map(item => {
        if (item.id === this.data.selectedId) {
          return {
            ...item,
            status: 'rejected',
            statusText: '已拒绝'
          };
        }
        return item;
      });
      
      this.setData({
        applications,
        showRejectModal: false,
        selectedId: null,
        rejectReason: ''
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '已拒绝申请',
        icon: 'success'
      });
    }, 800);
  }
});