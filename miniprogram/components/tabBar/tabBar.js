// components/tabBar/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chooseTag: {
      type: Number,
      value: "0"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    indexClick: function () {
      wx.reLaunch({
        url: "/pages/index/index"
      })
    },
    noticeClick: function () {
      wx.reLaunch({
        url: "/pages/wall/wall"
      })
    },
    userClick: function () {
      // app.globalData.tabChooseTag = 3;
      // this.data.chooseTag = 3;
      // console.log(this.data.chooseTag);

      if (!app.globalData.userInfo) {
        wx.reLaunch({
          url: "/pages/login/login?toPage=user"
        })
      } else {
        wx.reLaunch({
          url: "/pages/user/user"
        })
      }
    }
  },
})