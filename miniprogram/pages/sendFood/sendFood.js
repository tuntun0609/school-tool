// pages/sendFood/sendFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skipNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'getFoodShop'
    }).then(res => {
      this.setData({
        list: res.result.data
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
    wx.cloud.database().collection("foodShop")
    .count()
    .then(res=>{
      this.setData({
        totalNum: res.total
      })
      // console.log(this.data.totalNum);
    })
  },
  prePage: function () {
    if (this.data.skipNum-20>=0) {
      wx.showLoading({
        title: '正在加载中...'
      })
      wx.cloud.callFunction({
        name: 'getFoodShop',
        data: {
          skipNum: this.data.skipNum-20
        }
      }).then(res => {
        this.setData({
          list: res.result.data,
          skipNum: this.data.skipNum - 20
        })
        wx.hideLoading();
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      })
    }else{
      wx.showToast({
        title: '已到第一页',
        icon: 'error',
        duration: 1000
      })
    }
    
  },
  nextPage: function () {
    if (this.data.skipNum+20<this.data.totalNum) {
      wx.showLoading({
        title: '正在加载中...'
      })
      wx.cloud.callFunction({
        name: 'getFoodShop',
        data: {
          skipNum: this.data.skipNum+20
        }
      }).then(res => {
        this.setData({
          list: res.result.data,
          skipNum: this.data.skipNum + 20
        })
        wx.hideLoading();
        console.log(this.data.skipNum);
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      })
    }else{
      wx.showToast({
        title: '已到最后一页',
        icon: 'error',
        duration: 1000
      })
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