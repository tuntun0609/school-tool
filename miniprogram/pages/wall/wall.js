// pages/wall/wall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagNow: '失物招领',
    title: '失物招领',
    itemList: [],
    skipNum: 0,
    x:350,
    y:800
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

    wx.cloud.callFunction({
      name: 'getItemTotalNumByTag',
      data: {
        tag: this.data.tagNow
      }
    }).then(res => {
      // console.log(res);
      this.setData({
        totalNum: res.result.total
      })
      // console.log(this.data.totalNum);
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
        title: e.target.dataset.tag,
        skipNum: 0
      })
      wx.cloud.callFunction({
        name: 'getItemTotalNumByTag',
        data: {
          tag: this.data.tagNow
        }
      }).then(res => {
        // console.log(res);
        this.setData({
          totalNum: res.result.total
        })
        // console.log(this.data.totalNum);
      })
      // console.log(res.result.data);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })


  },
  prePage: function () {
    if (this.data.skipNum - 20 >= 0) {
      wx.showLoading({
        title: '正在加载中...'
      })
      wx.cloud.callFunction({
        name: 'getWallItemByTag',
        data: {
          tag: this.data.tagNow,
          skipNum: this.data.skipNum - 20
        }
      }).then(res => {
        this.setData({
          itemList: res.result.data,
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
    } else {
      wx.showToast({
        title: '已到第一页',
        icon: 'error',
        duration: 1000
      })
    }

  },
  nextPage: function () {
    if (this.data.skipNum + 20 < this.data.totalNum) {
      wx.showLoading({
        title: '正在加载中...'
      })
      wx.cloud.callFunction({
        name: 'getWallItemByTag',
        data: {
          tag: this.data.tagNow,
          skipNum: this.data.skipNum + 20
        }
      }).then(res => {
        // console.log(res.result.data);
        this.setData({
          itemList: res.result.data,
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
    } else {
      wx.showToast({
        title: '已到最后一页',
        icon: 'error',
        duration: 1000
      })
    }

  },
  addItem:function(){
    console.log("add");
    if (!app.globalData.userInfo){
      wx.navigateTo({
        url:'/pages/login/login?toPage=wall'
        // url: "/pages/warn/warn"
      })
    }else{
      wx.navigateTo({
        url:'/pages/addItem/addItem?backPage=wall'
        // url: "/pages/warn/warn"
      })
    }
    
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