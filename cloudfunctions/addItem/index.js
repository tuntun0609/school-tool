// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let dbName = event.dbName;
  let addData = event.addData;
  try{
    await cloud.database().collection(`${dbName}`).add({
      data:addData
    })
    return {
      state:200,
      msg:'添加成功'
    }
  }catch(err){
    return {
      state:201,
      msg:'添加失败',
      data: err
    }
  }
}