import { formatDate } from './data'
import {showNativeToast} from '@/utils'
import * as utils from '../utils'
export default {
  install(Vue, options) {
    Vue.prototype.jumpLink = function (link) {
      if (typeof link === 'string') {
        link = JSON.parse(link)
      }
      console.log(link)
      if (link) {
        if (link.type == 0) {
          // type:0 vue内打开指定路由
        }
      }
    }
    // Vue.prototype.jumpTo = function (path) {
    //   if (config.pcWebDebug) { // 当开启了pc调试
    //     options.router.push(path)
    //   } else { // 当未开启pc调试
    //     dsBridge.call('openWin', path)
    //   }
    // }

    Vue.prototype.jumpTo = function (target) {
      if (config.pcWebDebug)  return  options.router.push(target)
      if (target.path) {
        var query = target.query
        target = target.path + '?'
        for (let i in query) {
          target += (i + '=' + query[i] + '&')
        }
        target.substring(0, target.length - 1)
      }


      // dsBridge.call('openWin', target)
      // dsBridge.call('open',{url:`${location.origin}/#/${target}`,type:'web'})

      // target.indexOf('/')>-1?dsBridge.call('open',{url:`${location.origin}/#${target}`,type:'web'}):dsBridge.call('open',{url:`${location.origin}/#/${target}`,type:'web'})
      target.indexOf('/')>-1?dsBridge.call('open',{url:`${location.origin}/dist1/#${target}`,type:'web'}):dsBridge.call('open',{url:`${location.origin}/dist1/#/${target}`,type:'web'})

    }

    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      if (!config.pcWebDebug) {
        dsBridge.call('closeWin')
      } else {
        window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
      }
    }
    // vue方法
    Vue.prototype.vueGoBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({ type: 'cancel', text: '功能即将开放，敬请期待' })
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
    Vue.prototype.formatDate2 = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'MM-dd hh:mm')
    }
    Vue.prototype.formatDate3 = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'MM月dd日')
    }
    Vue.prototype.jumpTos = function (item) {
      switch (item.types) {
        case 'mallHomeDetail':
          if (item.goodsId !== '0' && item.goodsId) {
            options.router.push({ 'name': item.types, 'query': { 'title': item.goodsId } })
          }
          break
        case 'mallSeller':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({ 'name': item.types, 'query': { 'spid': item.shopsId } })
          }
          break
        default:
          options.router.push(item.types)
      }
    },
      Vue.prototype.copyTextShare = function (value) {
        var that = this;
        if (config.pcWebDebug)
        return new Promise(function (resolve, reject) {
          // 复制链接
          const input = document.createElement("input");
          input.setAttribute("readonly", "readonly");
          input.setAttribute("value", value);
          document.body.appendChild(input);
          input.select();
          input.setSelectionRange(0, 9999);
          if (document.execCommand("copy")) {
            document.execCommand("copy");
            showNativeToast("复制成功！")
          }
          document.body.removeChild(input);
          resolve()

        })
        dsBridge.call('clipBoard',{value})
      }
  }
}
