// pages/wallDetail/wallDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // msg: {
    //   imgList: ["cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/OPfttIdWASKVc839f4e827c9a933f2105c7656316770.jpg"],
    //   msg: "失物招领",
    //   openid: "oV9Sv4rxRwpKQEFreVWA-e4blV8w",
    //   tag: "失物招领",
    //   time: 1618636644710,
    //   title: "失物招领test",
    //   _id: "b00064a7607a6f630ef4300803f21878"
    // },
    // date: '2021-4-17 14:38',
    keyboardHeight: 0,
    des: '',
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'getItemDetailById',
      data: {
        id: options.id
      }
    }).then(res => {
      let date = new Date();
      date.setTime(res.result.data[0].time);
      let dateStr = '';
      if (date.getMinutes()<10) {
        dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:0${date.getMinutes()}`;
      }else{
        dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      }
      that.setData({
        msg: res.result.data[0],
        date: dateStr
      })
      //加载评论
      wx.cloud.callFunction({
        name: 'login'
      }).then(res => {
        if (that.data.msg.openid == res.result.openid) {
          // console.log('发帖者本人');
          wx.cloud.callFunction({
            name: "getCommentByItemId",
            data: {
              id: that.data.msg._id,
              isAll: true
            }
          }).then(res => {
            // console.log(res);
            let msg = res.result.data;
            msg.forEach((item, index) => {
              let date = new Date();
              date.setTime(item.time);
              let dateStr = '';
              if (date.getMinutes()<10) {
                dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:0${date.getMinutes()}`;
              }else{
                dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              }
              item.time = dateStr;
            });
            that.setData({
              commentList: msg
            })
            // console.log(msg);
          })
        } else {
          console.log('不是本人');
          wx.cloud.callFunction({
            name: "getCommentByItemId",
            data: {
              id: that.data.msg._id,
              isAll: false
            }
          }).then(res => {
            let msg = res.result;
            // console.log(res);
            msg = msg[0].data.concat(msg[1].data);
            msg.sort((a,b)=>{
              return b.time-a.time
            })
            msg.forEach((item, index) => {
              let date = new Date();
              date.setTime(item.time);
              let dateStr = '';
              if (date.getMinutes()<10) {
                dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:0${date.getMinutes()}`;
              }else{
                dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              }
              item.time = dateStr;
            });
            that.setData({
              commentList: msg
            })
            // console.log(msg);
          })
        }
      }).catch(err => {
        console.log(err);
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
  onDesInputEvent: function (e) {
    this.setData({
      des: e.detail.value
    })
  },
  //预览图片
  previewImage: function (e) {
    // console.log(e.currentTarget.dataset.src);
    let that = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: that.data.msg.imgList
    })
  },
  //输入框上移
  commentInputFocus: function (e) {
    // console.log(e.detail.height);
    if (e.detail.height) {
      this.setData({
        keyboardHeight: e.detail.height * 2 + 28
      })
    } else {
      this.setData({
        keyboardHeight: 0
      })
    }

  },
  //上传数据
  upData: function (params) {
    let that = this;
    let time = new Date().getTime();
    wx.showLoading({
      title: '数据上传中',
    })
    wx.cloud.callFunction({
      name: 'addComment',
      data: {
        itemId: params.itemId,
        time: time,
        isHidden: params.isHidden,
        msg: that.data.des.trim()
      }
    }).then(res => {
      wx.hideLoading();
      let commentList = that.data.commentList;
      let dateStr = '';
      let time = new Date();
      if (time.getMinutes()<10) {
        dateStr = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:0${time.getMinutes()}`;
      }else{
        dateStr = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
      }
      commentList.unshift({
        itemId: params.itemId,
        time: dateStr,
        isHidden: params.isHidden,
        msg: that.data.des.trim()
      })
      that.setData({
        des: '',
        commentList:commentList
      })
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
    })
  },
  //是否对他人不可见
  hide: function (params) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否设为私密留言',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.showModal({
            title: '提示',
            content: '确认留言',
            success (res) {
              if (res.confirm) {
                that.upData({
                  itemId: params.itemId,
                  isHidden: true
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          wx.showModal({
            title: '提示',
            content: '确认留言？',
            success (res) {
              if (res.confirm) {
                that.upData({
                  itemId: params.itemId,
                  isHidden: false
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  //添加留言总逻辑
  toAddComment: function () {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: `/pages/login/login?toPage=wallDetail&id=${this.data.msg._id}`
      })
    } else {
      if (this.data.des.trim()) {
        this.hide({
          itemId: this.data.msg._id,
        })
      } else {
        wx.showToast({
          title: '留言不可为空',
          icon: 'error',
          duration: 1000
        })
      }
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