// components/wallItem/wallItem.js
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
    time:'',
    msg:''
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // console.log(this.properties.items);
      let date = new Date();
      date.setTime(this.properties.items.time);
      // console.log(date);
      let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      // let msg = this.properties.items.msg.split('&hc').join(' ');
      this.setData({
        time:dateStr
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getWallDetail:function(e){
      console.log(e)
      let item = this.properties.items;
      wx.navigateTo({
        url:`/pages/wallDetail/wallDetail?id=${item._id}`
      })
    }
  }
})
