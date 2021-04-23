// pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    da:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // wx.cloud.callFunction({
    //   name:'deleteCommentByItemId',
    //   data:{
    //     itemId:'b00064a7607a6f630ef4300803f21878'
    //   }
    // })
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  toMeituan:function(){
    wx.navigateToMiniProgram({
      appId: 'wx2c348cf579062e56',
      path: 'packages/restaurant/restaurant/restaurant?act_page_code=undefined&cTime=1618320186105&poi_id=900200602961041&ref_list_id=2b6104a5c906f055c53f8d68d1d2843e',
      success(res) {
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