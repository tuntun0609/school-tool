// components/indexItem/indexItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl: {
      type: String,
      value: ""
    },
    msg: {
      type: String,
      value: ""
    },
    pageTo: {
      type: String,
      value: ""
    },
    options: {
      type: String,
      value: ""
    },
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
    toPage: function () {
      // console.log(this.properties.pageTo);
      if (this.properties.pageTo) {
        let page = this.properties.pageTo;
        if (!this.properties.options) {
          wx.navigateTo({
            url: `/pages/${page}/${page}`
          })
          // console.log('wu');
        } else {
          wx.navigateTo({
            url: `/pages/${page}/${page}?options=${this.properties.options}`
          })
          // console.log('you');
        }
      }else{
        wx.showToast({
          title: '即将上线',
          icon: 'error',
          duration: 1000
        })
      }


    }
  }
})