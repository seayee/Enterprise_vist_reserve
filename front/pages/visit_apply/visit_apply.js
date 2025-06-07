// pages/visit_apply/visit_apply.js
Page({
  data: {
    errors: {},         // 错误信息
    isLoading: false    // 加载状态
  },

  // 表单验证函数
  validateName(e) {
    const value = e.detail.value.trim();
    this.setData({
      errors: {
        ...this.data.errors,
        visitorName: value.length < 2 ? '姓名至少2个字' : ''
      }
    });
  },

  // 被访者姓名
  validateVisitedName(e) {
    const value = e.detail.value.trim();
    this.setData({
      errors: {
        ...this.data.errors,
        visitedName: value.length < 2 ? '被访者姓名至少2个字' : ''
      }
    });
  },

  validatePhone(e) {
    const value = e.detail.value;
    const phoneRegex = /^1[3-9]\d{9}$/;
    this.setData({
      errors: {
        ...this.data.errors,
        visitorPhone: !phoneRegex.test(value) ? '请填写有效手机号' : ''
      }
    });
  },

  validateCompany(e) {
    const value = e.detail.value.trim();
    this.setData({
      errors: {
        ...this.data.errors,
        company: value.length < 3 ? '公司名称至少3个字' : ''
      }
    });
  },

  validateDepartment(e) {
    const value = e.detail.value.trim();
    this.setData({
      errors: {
        ...this.data.errors,
        department: value.length < 2 ? '部门名称至少2个字' : ''
      }
    });
  },

  validateCount(e) {
    const value = e.detail.value;
    this.setData({
      errors: {
        ...this.data.errors,
        visitorCount: value < 1 || value > 10 ? '人数范围1-10人' : ''
      }
    });
  },

  validateReason(e) {
    const value = e.detail.value.trim();
    this.setData({
      errors: {
        ...this.data.errors,
        reason: value.length < 10 ? '请详细说明原因（至少10字）' : ''
      }
    });
  },

  // 表单提交处理
  async onFormSubmit(e) {
    // 验证所有字段
    const { visitorName, visitedName, visitorPhone, company, department, visitorCount, reason } = e.detail.value;

    const errors = {
      visitorName: visitorName.length < 2 ? '姓名至少2个字' : '',
      visitedName: visitedName.length < 2 ? '被访者姓名至少2个字' : '',
      visitorPhone: !/^1[3-9]\d{9}$/.test(visitorPhone) ? '请填写有效手机号' : '',
      company: company.length < 3 ? '公司名称至少3个字' : '',
      department: department.length < 2 ? '部门名称至少2个字' : '',
      visitorCount: visitorCount < 1 || visitorCount > 10 ? '人数范围1-10人' : '',
      reason: reason.length < 4 ? '请详细说明原因（至少10字）' : ''
    };

    // 检查是否有错误
    const hasError = Object.values(errors).some(msg => msg);
    if (hasError) {
      this.setData({ errors });
      return;
    }

    // 显示加载状态
    this.setData({ isLoading: true });

    wx.request({
        url: 'http://localhost:8080/visit_apply',
        method: 'POST',
        data: {
          visitorName,
          visitedName,
          visitorPhone,
          company,
          department,
          visitorCount: parseInt(visitorCount),
          reason
        },
      success: (res) => {
        console.log(res.data);
        if (res.statusCode === 200) {
          wx.showToast({
            title: '申请提交成功',
            icon: 'none',
            duration: 2000
          });
          // 跳转至结果页面或返回上一页
          wx.navigateBack();
        } else {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      },
    fail: (error) => {
      console.error('提交失败:', error);
      wx.showToast({
        title: '网络请求失败',
        icon: 'none',
        duration: 2000
      });
    } 
    })
  }
});