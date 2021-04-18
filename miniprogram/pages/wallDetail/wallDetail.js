// pages/wallDetail/wallDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // msg: {
    //   imgList: ["cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/tmp_0a67d868d35d3992386f900d903da81f00fb9096eb90bd45.jpg","cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/tmp_0a67d868d35d3992386f900d903da81f00fb9096eb90bd45.jpg","cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/tmp_0a67d868d35d3992386f900d903da81f00fb9096eb90bd45.jpg", "cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/tmp_7b764144f28dfb59bc5f9d3fb3619a4352bb0b673b2ae25b.jpg"],
    //   msg: "手机测试111设计费里世界地理佛家富婆祭扫见佛牌识破打飞机破碎大家破防就破世纪东方空间放搜到金佛破手机都放假平都是富婆就付家坡水电费破警示牌沙发垫哦啊哦屌丝活动啊胡搜大都和DOI啊好哦ID哈都和DOI啊好的好和和DOI啊好哦ID号和红豆红",
    //   openid: "oV9Sv4rxRwpKQEFreVWA-e4blV8w",
    //   tag: "失物招领",
    //   time: 1618641530606,
    //   title: "手机测试",
    //   _id: "17453ede607a827a022b66cc028ad96e"
    // },
    // date:'2021-4-17 14:38'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // console.log(options.id);
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
      let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      // console.log(dateStr);
      that.setData({
        msg: res.result.data[0],
        date: dateStr
      })
      // console.log(that.data.msg);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
  previewImage:function(e){
    // console.log(e.currentTarget.dataset.src);
    let that = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: that.data.msg.imgList
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