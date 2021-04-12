// components/indexItem/indexItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl:{
      type:String,
      value:""
    },
    msg:{
      type:String,
      value:""
    },
    pageTo:{
      type:String,
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
    toPage:function(){
      // console.log(this.properties.pageTo);
      let page = this.properties.pageTo
      wx.navigateTo({
        url:`/pages/${page}/${page}`
      })
    }
  }
})
