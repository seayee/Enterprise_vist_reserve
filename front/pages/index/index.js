Page({
  data:{
    weixin:"加载中。。。"
  },
  getdata(){
    const {weixin} = this.data;
    wx.request({
      url: 'http://localhost:8080/login',
      method: 'GET',
      success: (res) => {
        console.log("传递成功！"+res.data);
        console.log(res.statusCode)
        this.setData({
          weixin:res.data
        })
      },
      fail:(res) => {
          console.log("失败",res)
      }
    })
  },
  senddata(){
    wx.request({
      url: 'http://localhost:8080/login1',
      method:'POST',
      data:{
        age: 20
      },
      success: (res) => {
        const {weixin} = this.data;
        this.setData({
          weixin: JSON.stringify(res.data)
        });
        console.log("成功" + JSON.stringify(res.data));
      },
      fail:(res) => {
          console.log("失败")
      }
    })
  }
})