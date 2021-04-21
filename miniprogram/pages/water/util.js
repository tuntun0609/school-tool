const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week=date.getDay()
  const  wstr = "星期" + "日一二三四五六".charAt(week)
  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')} ${wstr}`
}

const formatNumber = n => {
  n = n.toString()
  //个位数往前补0
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}
