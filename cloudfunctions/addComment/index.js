// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let userId = wxContext.OPENID
  let itemId = event.itemId;
  let time = event.time;
  let isHidden = event.isHidden;
  let msg = event.msg;
  return cloud.database().collection('comment').add({
    data: {
      userId:userId,
      itemId:itemId,
      time:time,
      isHidden:isHidden,
      msg:msg
    }
  })
}