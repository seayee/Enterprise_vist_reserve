// pages/visit_management/visit_management.js
Page({
  data: {
    currentTab: 'all',      // 当前选中的状态标签
    records: [],            // 访问记录列表
    loading: false,         // 加载状态
    page: 1,                // 当前页码
    hasMore: true           // 是否还有更多数据
  },

  onLoad() {
    // 页面加载时获取访问记录
    this.fetchVisitRecords();
  },

  // 跳转到访问申请页面
  navigateToVisitApply() {
    wx.navigateTo({
      url: '/pages/visit_apply/visit_apply'
    });
  },

  // 切换状态标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab !== this.data.currentTab) {
      this.setData({
        currentTab: tab,
        page: 1,
        hasMore: true,
        records: []
      });
      this.fetchVisitRecords();
    }
  },

  // 获取访问记录
  fetchVisitRecords() {
    if (this.data.loading || !this.data.hasMore) return;
    
    this.setData({ loading: true });
    
    wx.request({
      url: 'http://localhost:8080/visit/records',
      method: 'POST',
      data: {
        status: this.data.currentTab,
        page: this.data.page,
        pageSize: 10
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 200) {
          const newRecords = res.data.data || [];
          const hasMore = newRecords.length >= 10;
          
          this.setData({
            records: this.data.page === 1 ? newRecords : [...this.data.records, ...newRecords],
            page: this.data.page + 1,
            hasMore
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取记录失败',
          icon: 'none'
        });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  // 查看记录详情
  viewRecordDetail(e) {
    const recordId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/visit_detail/visit_detail?id=${recordId}`
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      hasMore: true,
      records: []
    });
    this.fetchVisitRecords();
    wx.stopPullDownRefresh();
  },

  // 上拉加载更多
  onReachBottom() {
    this.fetchVisitRecords();
  }
});