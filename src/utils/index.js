import Vue from 'vue'
export const storage = {
  set: function (key, data) {
    if (dsBridge.hasNativeMethod('setPrefs')) {
      // 当在app中时
      try {
        dsBridge.call('setPrefs', {key: key, value: JSON.stringify(data)})
      } catch (err) {
        dsBridge.call('setPrefs', {key: key, value: data})
      }
    } else {
      // 当不在app中时
      try {
        window.localStorage.setItem(key, window.JSON.stringify(data))
      } catch (err) {
        window.localStorage.setItem(key, data)
      }
    }
  },
  get: function (key) {
    if (dsBridge.hasNativeMethod('setPrefs')) {
      // 当在app中时
      if (key == 'token') { // 原生中获取token是用receiveParams接口
        return dsBridge.call('receiveParams', 'token')
      }
      try {
        // alert(dsBridge.call('getPrefs', {sync: true, key: key}))
        return JSON.parse(dsBridge.call('getPrefs', {sync: true, key: key}))
      } catch (err) {
        return dsBridge.call('getPrefs', {sync: true, key: key})
      }
    } else {
      // 当不在app中时
      try {
        return window.JSON.parse(window.localStorage.getItem(key))
      } catch (err) {
        return window.localStorage.getItem(key)
      }
    }
  },
  remove: function (key) {
    if (dsBridge.hasNativeMethod('setPrefs')) {
      dsBridge.call('removePrefs', {key: key})
    } else {
      window.localStorage.removeItem(key)
    }
  }
}
export function copyText (text) {
  return new Promise(function (resolve, reject) {
    // 复制链接
    var input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
    resolve()
  })
}
export function useInShare (imgArr, targetApp) {
  return new Promise(function (resolve, reject) {
    var inShare = api.require('inShare')
    inShare.shareImgsTo({
      imgPaths: imgArr.join(','),
      sendPattern: 'ONLY',
      app: targetApp
    })
  })
}
export  function showNativeToast(msg){
  if (dsBridge.hasNativeMethod('setPrefs')) {
    dsBridge.call("toast", {msg: msg});
  } else {
    Vue.$vux.toast.text(msg)
  }
}
export function statush(){
  let safeArea = dsBridge.call('receiveParams', 'safeAreaTop')
  let size = (document.documentElement.clientWidth / 7.5)
  return  (safeArea / size)|| 0
}
export function contactService(number){
  dsBridge.call('contactService', {number})
}
export function saveBottom(){
  let bot=dsBridge.call("receiveParams", 'safeAreaBottom1')||0
   return  bot=='123'?0:bot
}

export function isAdult(cardId) {// cardId 字符串类型
  let str = cardId.substr(6, 4)//1993
  let strb = cardId.substr(10, 4) - 0//1009
  let date = new Date()
  let year = date.getFullYear() - 0;
  let m = String(date.getMonth() + 1)
  let d = String(date.getDate())
  let dd = d.padStart(2, 0)
  let num = m + dd - 0;//1009
  
  if(year-str>18)return true
  if(year - str == 18 && num > strb)return true
   return false
  
}
