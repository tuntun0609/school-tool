// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let commentList = await cloud.database().collection("comment").where({
    itemId: event.itemId
  }).get();
  // console.log(commentList.data);
  commentList = commentList.data;
  try {
    commentList.forEach(async (item,index) => {
      await cloud.database().collection('comment')
      .doc(item._id)
      .remove();
    });
    return {
      state:'OK'
    }
  } catch (error) {
    return {
      state:'ERROR',
      error:error
    }
  }
  
}