// components/foodList/foodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type:Object,
      value:""
    }
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
    foodDes:function(e){
      // wx.navigateTo({
      //   url:`/pages/foodDes/foodDes?name=${this.properties.items.shopName}`
      // })
      // console.log(this.properties.items.shopName);
      wx.navigateToMiniProgram({
        appId: 'wx2c348cf579062e56',
        path: this.properties.items.path,
        success(res) {
          console.log("success");
        }
      })
    },
    copyName:function(e){
      wx.setClipboardData({
        data: this.properties.items.shopName,
        success(res){
          wx.showToast({
            title: '复制成功',
          })
        }
      })
    }
  },
})
