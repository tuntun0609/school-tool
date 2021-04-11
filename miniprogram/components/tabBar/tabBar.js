// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
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
    noticeClick:function (){
      wx.reLaunch({
        url: "/pages/notice/notice"
      })
    },
    userClick:function (){
      wx.reLaunch({
        url: "/pages/user/user"
      })
    }
  },
})