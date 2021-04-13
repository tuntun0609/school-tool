// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  userLogin:async function (params) {
    let that = this;
    wx.cloud.callFunction({
      name:'login'
    }).then(res => {
      // console.log(res);
      app.globalData.openid = res.result.openid;
    }).catch(err => {
      console.log(err);
    })
    wx.getUserProfile({
      desc: '用于完善资料', 
      success: (res) => {
        // console.log(res.userInfo);
        app.globalData.userInfo = res.userInfo;
        wx.navigateTo({
          url:`../../pages/${that.options.toPage}/${that.options.toPage}`
        })
        console.log(app.globalData);
      },
      fail: (err)=> {
        wx.showToast({
          title:'授权失败',
          icon:'error',
          duration: 1000
        })
      }
      
    })

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData);
    // console.log(options);
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