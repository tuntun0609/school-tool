// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let skipNum = event.skipNum?event.skipNum:0;
  let data = cloud.database().collection("item").where({
    _id:event.id
  }).limit(20).skip(skipNum).orderBy("time","desc").get();
  return data;
}