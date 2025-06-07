// pages/visitor/visitor.js
Page({
  data: {
    tabs: [
      { name: '全部' },
      { name: '待审核' },
      { name: '批准来访' },
      { name: '拒绝来访' },
      { name: '已来访' }
    ],
    records: [],
    currentTab: 0,
    searchValue: ''
  },
  onLoad: function(){
    const app = getApp();
    // 连接后端
    wx.request({
      url: 'http://localhost:8080/visited/records',
      method: 'POST',
      data: {
        username: app.globalData.userData.username,
        department: app.globalData.userData.department
      },
      success: (res) => {
        // console.log("username = " +app.globalData.userData.department);
        console.log("res = "+JSON.stringify(res.data));
        
        if(res.statusCode === 200){
          // 设置全局数据
          // const visitRecords = app.globalData.visitRecords

          // visitRecords = res.data;

          this.setData({
            records: res.data
          });
        }
      },
      fail: () =>{
        wx.showToast({
          title:'获取记录失败',
          icon: 'none'
        });
      }
    });
  },
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },
  onTabTap: function(e) {
    
    
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    this.filterRecords();
  },
  filterRecords: function () {
    const { records, currentTab, searchValue, tabs } = this.data;
    let filteredRecords = records;

    // 根据当前选中的标签过滤记录
    if (currentTab !== 0) {
      const status = tabs[currentTab].name;
      filteredRecords = records.filter(record => record.state === status);
    }

    // 根据搜索值过滤记录
    if (searchValue) {
      filteredRecords = filteredRecords.filter(record => {
        return record.name.includes(searchValue);
      });
    }

    this.setData({
      records:filteredRecords
    });
  }
});