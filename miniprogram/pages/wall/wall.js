// pages/wall/wall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagNow: '失物招领',
    title: '失物招领',
    itemList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'getWallItemByTag',
      data: {
        tag: '失物招领'
      }
    }).then(res => {
      this.setData({
        itemList: res.result.data
      })
      // console.log(res.result.data);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tagChoose: function (e) {
    let that = this;
    // console.log(e.target.dataset.tag);
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'getWallItemByTag',
      data: {
        tag: e.target.dataset.tag
      }
    }).then(res => {
      that.setData({
        tagNow: e.target.dataset.tag,
        itemList: res.result.data,
        title: e.target.dataset.tag
      })
      // console.log(res.result.data);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })


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