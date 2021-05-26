// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let schedule = parseInt(this.getSchedule()*100);
    let scheduleP = (1-this.getSchedule()) * 290;
    this.setData({
      schedule:schedule,
      scheduleP:scheduleP
    })
    wx.request({
      url: 'https://news.topurl.cn/api', 
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          newList:res.data.data.newsList
        })
        // console.log(res.data)
      }
    })
  },
  toNotice:function(){
    wx.navigateTo({
      url: `/pages/notice/notice`
    })
  },
  toMiniProgram:function(){
    wx.navigateToMiniProgram({
      appId: 'wx8bbe27b496f888c0',
      path: 'pages/index/index',
      success(res) {
        console.log("success");
      }
    })
  },
  getSchedule:function () {
    let count = 0;
    let countP = 0;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    this.setData({
      year:year
    })
    switch (month) {
      case 1:
        count = day;
        break;
      case 2:
        count = 31 + day;
        break;
      case 3:
        count = 59 + day;
        break;
      case 4:
        count = 90 + day;
        break;
      case 5:
        count = 120 + day;
        break;
      case 6:
        count = 151 + day;
        break;
      case 7:
        count = 181 + day;
        break;
      case 8:
        count = 212 + day;
        break;
      case 9:
        count = 243 + day;
        break;
      case 10:
        count = 273 + day;
        break;
      case 11:
        count = 304 + day;
        break;
      case 12:
        count = 334 + day;
        break;
      default:
        break;
    }
    if (year % 4 == 0 && month > 2) {
      //闰年
      count++;
    }
    // console.log(count);
    if(year%4 == 0){
      countP = (count / 366);
    }else{
      countP = (count / 365);
    }
    return countP
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})