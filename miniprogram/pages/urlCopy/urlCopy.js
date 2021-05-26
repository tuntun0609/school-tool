// pages/urlCopy/urlCopy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.option) {
      wx.showLoading({
        title: '正在加载中...',
      })
      wx.cloud.callFunction({
        name: 'getUrlByTag',
        data:{
          tag:options.option
        }
      }).then(res => {
        this.setData({
          url: res.result.data[0].url
        })
        wx.hideLoading();
        // console.log(res.result.data);
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      })
    }
  },
  copyUrl:function(){
    wx.setClipboardData({
      data: this.data.url,
      success(res){
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 1000
        })
      }
    })
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