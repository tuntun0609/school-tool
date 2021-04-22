// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.isAll) {
    const wxContext = cloud.getWXContext();
    return data = cloud.database().collection("comment").where({
      itemId: event.id
    }).orderBy("time", "desc").get();
  } else {
    const wxContext = cloud.getWXContext();
    let msg1 = await cloud.database().collection("comment").where({
      itemId: event.id,
      isHidden: true,
      userId: wxContext.OPENID
    }).orderBy("time", "desc").get();
    let msg2 = await cloud.database().collection("comment").where({
      itemId: event.id,
      isHidden: false
    }).orderBy("time", "desc").get();
    // for (let i in msg2) {
    //   msg1.push(msg2[i]);
    // }
    return [msg1,msg2];
  }
}