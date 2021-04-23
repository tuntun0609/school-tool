// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    await this.setData({
      openid: app.globalData.openid,
      userInfo: app.globalData.userInfo
    })
    wx.cloud.callFunction({
      name: 'getItemDetailByUser',
      data: {
        openid: this.data.openid
      }
    }).then(res => {
      this.setData({
        itemList: res.result.data
      })
      // console.log(res.result.data);
    }).catch(err => {
      console.log(err);
    })
  },
  add: function () {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: "/pages/addItem/addItem"
      })
    } else {
      wx.navigateTo({
        url: "/pages/login/login?toPage=addItem"
      })
    }
  },
  deleteItem: function (e) {
    let that = this;
    // console.log(e);
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "deleteItemById",
            data: {
              id: e.target.dataset.id
            }
          }).then(res => {
            wx.cloud.callFunction({
              name:"deleteCommentByItemId",
              data:{
                itemId:e.target.dataset.id
              }
            }).then(res=>{
              // console.log(res);
            })
            let list = that.data.itemList;
            list.forEach((item,index) => {
              if (item._id == e.target.dataset.id) {
                if (item.imgList.length != 0) {
                  wx.cloud.callFunction({
                    name:'deleteImg',
                    data:{
                      imgList:item.imgList
                    }
                  })
                }
                list.splice(index,1);
                that.setData({
                  itemList: list
                })
              }
            });
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
          })
          
        }
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