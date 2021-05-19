// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // let tag = event.tag?event.tag:0;
  let data = cloud.database().collection("netUrl").where({
    tag:event.tag
  }).get();
  return data;
}