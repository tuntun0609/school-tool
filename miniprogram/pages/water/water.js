const util = require('./util.js') //日期格式处理
const hotSubsidy = 8
const coldSubsidy = 8
const electricitySubsidy = 32
Page({
  data: {
    array: ['T1', 'T2', 'T3', 'T4', 'T5', 'T10', 'T11', 'T12'],
    storgeData: {
      chooseDormitory: "点击选择宿舍楼号",
      dormitory: '',
      room: '',
      isChoosing: false,
    },
    id: '',
    status: false,
    userData: {
      detail: {
        balance: '',
        isInsufficient: false //余额不足判断
      },
      subsidy: {
        electricity: '',
        hotWater: '',
        coldWater: ''
      },
      time: '',
    },
    calcData: {
      //剩余占比
      electricityRatio: '',
      hotRatio: '',
      coldRatio: ''
    }
  },
  onLoad() {
    wx.getStorage({
      key: 'storgeData',
    }).then(res => {
      this.setData({
        storgeData: res.data
      })
    }).catch(err => {
      console.log("getStorage fail");
    })
  },
  formReset: function (e) {
    this.setData({
      ['storgeData.chooseDormitory']: "点击选择宿舍楼号",
      ['storgeData.isChoosing']: false,
    })
  },
  bindPickerChange: function (e) {
    //Picker处理
    this.setData({
      ['storgeData.isChoosing']: true,
      ['storgeData.chooseDormitory']: this.data.array[e.detail.value],
    })
  },
  formSubmit: function (e) {
    let room = e.detail.value.room
    this.handleData(room);
  },
  handleData: function (room) {
    let roomRule = /^\d{2,4}A?$/ //3,4位数字，或匹配一个或零个A
    if (room.length == 0) {
      wx.showToast({
        title: "房号不能为空！",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    if (!roomRule.test(room)) {
      wx.showToast({
        title: "房间号格式错误，请检查！",
        icon: "none",
        duration: 1000,
      });
      return
    }
    if (room.length < 4) {
      room = "0" + room;
    }
    let id = this.data.storgeData.chooseDormitory + room;
    this.setData({
      id
    })
    /* 数据格式正确，开始查询 */
    this.request()
  },
  request: function () {
    let id = this.data.id
    wx.showLoading({
        title: "查询中",
        mask: true,
      }),
      wx.request({
        url: "https://3548f2718x.goho.co/water",
        data: {
          id,
        },
        header: {
          "content-type": "application/json",
        },
        method: "GET",
        success: (result) => {
          wx.hideLoading();
          // 成功请求后再处理id并显示宿舍数据
          let room = id.slice(-4)
          if (result.data.state == "OK") {
            this.handleDate() //查询成功获取时间 
            if (result.data.data.balance < 30) {
              wx.showToast({
                title: '余额不足30元,请及时充值',
                duration: 2000,
                icon: 'none'
              })
            }
            this.saveUserData(room, result)
          } else {

            wx.showToast({
              title: "查询失败，该宿舍号不存在",
              icon: "none",
              duration: 1000,
            });
          }
          this.calcRatio()
          this.saveStorgeData()
        },
        fail: (err) => {
          console.log(err);
          wx.showToast({
            title: "请求失败，请检查网络",
            icon: "none",
            duration: 1000,
          });
        },
      });
  },
  handleDate: function () {
    let nowDate = util.formatTime(new Date())
    this.setData({
      ['userData.time']: nowDate,
    })
  },
  calcRatio: function () {
    let res = this.data.userData.subsidy
    let electricityRatio = ((res.electricity / electricitySubsidy) * 100).toFixed(2) + "%"
    let hotRatio = ((res.hotWater / hotSubsidy) * 100).toFixed(2) + "%"
    let coldRatio = ((res.coldWater / coldSubsidy) * 100).toFixed(2) + "%"
    this.setData({
      calcData: {
        electricityRatio,
        hotRatio,
        coldRatio
      }
    })
  },
  saveUserData: function (room, result) {
    this.setData({
      ['storgeData.dormitory']: this.data.storgeData.chooseDormitory,
      ['storgeData.room']: room,
      status: true,
      // 控制卡片显示
      ['userData.detail']: {
        balance: result.data.data.balance,
        // 如果余额不足则显示红色
        isInsufficient: result.data.data.balance < 30 ? true : false
      },
      ['userData.subsidy']: {
        electricity: result.data.subsidy.electricity ? result.data.subsidy.electricity.toFixed(1) : 0,
        hotWater: result.data.subsidy.hotWater ? result.data.subsidy.hotWater.toFixed(1) : 0,
        coldWater: result.data.subsidy.coldWater ? result.data.subsidy.coldWater.toFixed(1) : 0,
      }
    });
  },
  saveStorgeData: function () {
    //存入缓存
    wx.setStorage({
      data: this.data.storgeData,
      key: 'storgeData',
    })
  }
});