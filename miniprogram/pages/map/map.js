const db = wx.cloud.database();
const QQMapWX = require('./qqmap-wx-jssdk');
const qqmapsdk = new QQMapWX({
  key: 'IFKBZ-GQEC3-JF23E-345ZA-NKOGK-PRFQ6' //更换key
});
const imgPath = 'cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/banner/location.png'//替换你的云存储路径
Page({
  data: {
    searchText: '', //搜索框文本
    modalHidden: true, //控制带图片的模态窗
    waiting: false, //控制动画
    activeItem: 'walking', //导航方式，默认步行
    navigating: false, //导航状态
    showList: false, //列表展示
    list: [], //存放分类查询的结果
    map: {
      markers: [{
        title: '暨南大学教学楼',
        id: 0,
        latitude: 23.017606,
        longitude: 113.415266,
        iconPath: imgPath,
        width: 40,
        height: 40,
        pic: 'cloud://test-4gbjp6opfa0ad4c1.7465-test-4gbjp6opfa0ad4c1-1304984739/banner/school.jpg'
      }],
      scaleNum: 15, //放大系数
      location: {
        /* 地图中心默认暨大南校中心 */
        latitude: '23.017606',
        longitude: '113.415266'
      },
      moveTo: {
        /* 移动位置 */
        latitude: '',
        longitude: '',
        name: '',
        image: '',
      },
      height: '70vh', //导航时变为100vh
    }

  },
  onLoad() {
    /* 请求定位获取位置 */
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          ['map.location']: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
      }
    })
  },
  siteInput(e) {
    //获取输入框的值
    this.setData({
      searchText: e.detail.value
    })
  },
  closeWindow() {
    this.setData({
      ['map.markers']: '', //清空
      showList: false //关闭列表
    })
  },
  filterViewMove() {
    /* 防止底层滚动 */
    return
  },
  getLocation: function () {
    var mapCtx = wx.createMapContext('myMap');
    mapCtx.moveToLocation(); //移动到自己的中心
  },
  getSite(e) {
    wx.showLoading({
      title: '查询中',
    })
    var type = e.currentTarget.dataset.type
    /* 调用云函数 */
    wx.cloud.callFunction({
      name: "getSite",
      data: {
        type
      },
      success: res => {
        let arr = res.result.data
        this.setData({
          list: arr,
          showList: true
        })
        for (let i = 0; i < arr.length; i++) {
          this.setData({
            ['map.markers[' + i + ']']: {
              title: arr[i].name,
              id: arr[i].id,
              latitude: arr[i].latitude,
              longitude: arr[i].longitude,
              iconPath: imgPath,
              width: 40,
              height: 40,
              pic: arr[i].pic,
            }
          })
        }
        wx.hideLoading()
      },
      fail(res) {
        console.log("云函数获取数据失败！", res)
      }
    })
  },
  getChoice(e) {
    /* 获取用户导航的选择 */
    var way = e.currentTarget.dataset.way;
    this.setData({
      activeItem: way
    })
    wx.showLoading({
      title: '查询中',
    })
    this.getRoad(this.data.map.moveTo.latitude, this.data.map.moveTo.longitude)
    wx.hideLoading()
  },
  cancelNavigating() {
    /* 用于执行动画 */
    this.setData({
      polyline: '', //清空路线
      waiting: true
    })
    setTimeout(() => this.setData({
      navigating: false,
      waiting: false,
      activeItem: 'walking', //设置默认路线为步行
    }), 500)
  },
  getRoad(lat, lon) {
    /* 调用地图api */
    var _this = this
    qqmapsdk.direction({
      mode: this.data.activeItem, //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      from: {
        latitude: this.data.map.location.latitude,
        longitude: this.data.map.location.longitude
      },
      to: {
        latitude: lat,
        longitude: lon
      },
      success: function (res) {
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#1B9CFC',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      }
    });
  },
  goByWalk(e) {
    /* “到这去”按钮绑定事件 */
    let site = this.data.list.find(site => site.id === e.currentTarget.dataset.index)
    this.setMoveTo(site)
  },
  setMoveTo(site) {
    /* 设置移动位置参数 */
    this.setData({
      ['map.height']: '100vh',
      ['map.scaleNum']: 17,
      ['map.moveTo']: {
        latitude: site.latitude,
        longitude: site.longitude,
      },
      navigating: true,
    })
    this.getRoad(site.latitude, site.longitude) //确定导航
  },
  modalCancel() {
    /* 模态框取消 */
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm() {
    /* 模态框确定 */
    let marker = this.data.map.markers.find(obj => obj.title == this.data.map.moveTo.name)
    this.setData({
      modalHidden: true
    })
    this.setMoveTo(marker)
  },
  markertap(e) {
    /* 拉起模态框 */
    let id = e.detail.markerId
    let marker = this.data.map.markers.find(obj => obj.id == id)
    console.log(marker);
    this.setData({
      /* 点击markers只赋值name和image */
      ['map.moveTo']: {
        name: marker.title,
        image: marker.pic //后续替换成site.img
      },
      modalHidden: false
    })
  },
  search() {
    /* 搜索函数 */
    let query = this.data.searchText
    query = query.replace(/^\s*|\s*$/g, "") //去除两头的空格
    if (query == '') {
      wx.showToast({
        icon: 'error',
        title: '请输入地址',
      })
      return
    }
    wx.showLoading({
      title: '查询中',
    })
    db.collection("site").where({ //collectionName 表示欲模糊查询数据所在collection的名
      name: { //columnName表示欲模糊查询数据所在列的名
        $regex: '.*' + query + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
        $options: 'i' //条件不区分大小写
      }
    }).get().then(res => {
      wx.hideLoading()
      this.setData({
        list: res.data,
        showList: true
      })
      let arr = this.data.list
      for (let i = 0; i < arr.length; i++) {
        this.setData({
          ['map.markers[' + i + ']']: {
            title: arr[i].name,
            id: arr[i].id,
            latitude: arr[i].latitude,
            longitude: arr[i].longitude,
            iconPath: imgPath,
            width: 40,
            height: 40
          }
        })
      }
    })

  }
})