// pages/addItem/addItem.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:["失物招领","二手信息","表白墙","其他"],
    index:'',
    title:'',
    des:'',
    isChoose:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.reLaunch({
        url: "/pages/login/login?toPage=addItem"
      })
    }
  },
  bindPickerChange:function(e){
    // console.log(object);s
    this.setData({
      index: e.detail.value,
      isChoose:true
    })
    // console.log(this.index);
  },
  onTitleInputEvent:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  onDesInputEvent:function(e){
    this.setData({
      des: e.detail.value
    })
  },
  add:function(){
    let that = this;
    // if (app.globalData.openid&&this.data.title&&this.data.des&&this.data.index) {
    //   console.log(1);
    // }else{
    //   console.log(0);
    // }
    if (app.globalData.userInfo&&this.data.title&&this.data.des&&this.data.index) {
      wx.showLoading({
        title: '正在上传中...',
      })
      wx.cloud.callFunction({
        name:'addItem',
        data:{
          dbName:'item',
          addData:{
            openid:app.globalData.openid,
            title: that.data.title,
            msg: that.data.des,
            tag: that.data.tags[that.data.index]
          }
        }
      }).then(res => {
        // console.log(res);
        wx.hideLoading();
        if (this.options.backPage) {
          wx.reLaunch({
            url: `/pages/${this.options.backPage}/${this.options.backPage}`
          })
        }else{
          wx.reLaunch({
            url: `/pages/user/user`
          })
        }
        
      }).catch(err => {
        console.log(err);
      })
    }else{
      console.log("填写完整");
    }
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