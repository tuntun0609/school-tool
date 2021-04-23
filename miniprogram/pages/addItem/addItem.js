// pages/addItem/addItem.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: ["失物招领", "二手信息", "表白墙", "其他"],
    index: '',
    title: '',
    des: '',
    isTagChoose: false,
    imgList: [],
    cloudImgList: [],
    isImgChoose: false,
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
  bindPickerChange: function (e) {
    // console.log(object);s
    this.setData({
      index: e.detail.value,
      isTagChoose: true
    })
    // console.log(this.index);
  },
  onTitleInputEvent: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  onDesInputEvent: function (e) {
    // let str = e.detail.value.split('\n').join('&hc')
    this.setData({
      des:  e.detail.value
    })
  },
  //选择图片
  imgChoose: async function () {
    let that = this;
    wx.chooseImage({
      count: 9,
      success(res) {
        const paths = res.tempFilePaths;
        that.setData({
          imgList: paths,
          isImgChoose: true
        });
        // console.log(paths);
      },
      fail(err) {
        console.log(err);
      }
    });
  },
  //上传图片返回云地址数组
  upImg: function () {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '图片上传中',
      })
      that.data.imgList.forEach(async (item, index) => {
        let obj = item.lastIndexOf("/");
        let imgName = item.substr(obj + 1);

        await wx.cloud.uploadFile({
          cloudPath: imgName,
          filePath: item,
        }).then(async res => {
          let temp = that.data.cloudImgList;
          temp.push(res.fileID);
          await that.setData({
            cloudImgList: temp
          })
          if (that.data.cloudImgList.length == that.data.imgList.length) {
            wx.hideLoading();
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
            resolve(1);
          }
          
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败',
            icon: 'error',
            duration: 1000
          })
          console.log(err);
        })
      });

      
    })
  },
  // 添加
  upItem: function () {
    let that = this;
    let now = new Date().getTime();
    wx.showLoading({
      title: '数据上传中',
    })
    wx.cloud.callFunction({
      name: 'addItem',
      data: {
        dbName: 'item',
        addData: {
          openid: app.globalData.openid,
          title: that.data.title,
          msg: that.data.des.trim(),
          tag: that.data.tags[that.data.index],
          imgList: that.data.cloudImgList,
          time: now
        }
      }
    }).then(res => {
      // console.log(res);
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
      // 重定向
      if (that.options.backPage) {
        wx.reLaunch({
          url: `/pages/${that.options.backPage}/${that.options.backPage}`
        })
      } else {
        wx.reLaunch({
          url: `/pages/user/user`
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  // 添加总逻辑
  addMain: async function () {
    let that = this;
    
    if (app.globalData.userInfo && this.data.title && this.data.des && this.data.index) {
      
      if (that.data.isImgChoose) {
        that.upImg().then(res => {
          that.upItem();
        });
      } else {
        that.upItem();
      }

    } else {
      console.log("填写完整,或上传图片");
      wx.showToast({
        title: '信息不完整',
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