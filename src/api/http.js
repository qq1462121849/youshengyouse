import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router/index'
import { showNativeToast } from '@/utils'
import qs from 'qs'
import * as utils from '../utils'



axios.defaults.timeout = 12000//请求超时时间
let baseApiUrl = window.location.href
let bizId = projectConfig.bizId
var codeVersion = projectConfig.codeVersion
if (baseApiUrl.indexOf('172.16') !== -1 || baseApiUrl.indexOf('192.168') !== -1 || baseApiUrl.indexOf('localhost') !== -1) {
  baseApiUrl = '/api/' + bizId
} else {
  //baseApiUrl = 'http://tradingfloor.nat.hnbangyao.com/api/' + bizId
  baseApiUrl = 'http://shop.quwan.info/api/' + bizId
  // baseApiUrl = 'http://47.114.162.15' + '/api/' + bizId
  //baseApiUrl = '//' + window.location.host + '/api/' + bizId

}
axios.defaults.baseURL = baseApiUrl

// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache'
}
// 序列化参数
axios.defaults.transformRequest = (data) => {
  data = qs.stringify(data)
  return data
}
let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken

// http request 拦截器1
axios.interceptors.request.use(
  config => {

    if (!window.config.pcWebDebug && location.origin.indexOf('172.16.1.11') > -1) config.cancelToken = new CancelToken(c => c())

    // 发起请求时，取消掉当前正在进行的相同请求（包括接口地址，post使用的data传参，get使用的params传参）
    let key = config.baseURL + config.url + '&' + JSON.stringify(config.data) + '&' + JSON.stringify(config.params);
    if (promiseArr[key]) {
      promiseArr[key]({ errorType: 'cancel', msg: '操作取消' + config.baseURL + config.url })
      delete promiseArr[key]
    }
    // 数组中保存本次请求的CancelToken
    promiseArr[key] = cancel
    // 在config中保存存到数组中的key，供接口响应处理时使用
    config.cancelTokenKey = key;
    const token = utils.storage.get('token')
    const codeVersion = projectConfig.codeVersion
    if (token) {
      config.headers.token = token
    }
    if (codeVersion) {
      config.headers.codeVersion = codeVersion
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    let key = response.config.cancelTokenKey
    promiseArr[key] && delete promiseArr[key]
    response = response.data
    if (response.code === 403) {
      dsBridge.call('toLogin')
      // store.commit('logout')
      // router.currentRoute.name !== 'login' && router.replace({
      //   path: 'login'
      // })
    } else if (response.code === 412) {
      Vue.$vux.toast.text('您还未绑定手机号，先去绑定吧！')
      setTimeout(function () {
        dsBridge.call("openWin", '/judgemobile')
      }, 2000)
    } else {
      return response
    }
  },
  error => {
    if (error.response) {
      console.log(error)
      switch (error.response.status) {
        case 403:
          // 403 清除token信息并跳转到登录页面
          store.commit('logout')
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.name !== 'login' && router.replace({
            path: 'login'
          })
          break
        default:
          error.message = `连接错误：${error.response.status}`
      }
    }
    return Promise.reject(error)
  }
)

export default {
  // get请求

  get(url, param = {}, loading) {
    return new Promise((resolve, reject) => {
      if (loading && codeVersion >= 310) {
        dsBridge.call('common', { code: 2, data: { type: 1 } })
      }
      if (loading) {
        Vue.$vux.loading.show()
      }
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (loading) {
          Vue.$vux.loading.hide()
        }
        if (loading && codeVersion >= 310) {
          dsBridge.call('common', { code: 2, data: { type: 0 } })
        }
        if (res.code === 0) {
          resolve(res)
        } else {
          showNativeToast(res.msg)
        }
      }).catch(error => {
        if (loading && codeVersion >= 310) {
          dsBridge.call('common', { code: 2, data: { type: 0 } })
        }
        if (Vue.$vux.loading) {
          Vue.$vux.loading.hide()
        }
        console.log(error)
        showNativeToast(error.message)
      })
    })
  },
  // post请求
  post(url, param = {}, loading, show) {

    return new Promise((resolve, reject) => {
      if (loading && codeVersion) {
        dsBridge.call('common', { code: 2, data: { type: 1 } })
      }
      if (loading) {
        Vue.$vux.loading.show()
      }
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (loading) {
          Vue.$vux.loading.hide()
        }
        if (loading && codeVersion >= 310) {

          dsBridge.call('common', { code: 2, data: { type: 0 } })
        }
        if (!res) {
          // Vue.$vux.loading.hide();
          return
        }
        if (res.code === 0) {
          //Vue.$vux.loading.hide();
          resolve(res)
        } else {

          if (res.code != 201 && url != '/amoy/user/confirm-real-name') {
            if (show && url == '/amoy_v2/task-system/task-status') {
              resolve(res)
            } else {
              showNativeToast(res.msg)
              resolve(res)
            }
          } else {
            if (show && url == '/amoy/user/confirm-real-name') {
              showNativeToast(res.msg)
              resolve(res)
            }
          }
        }
      }).catch(error => {
        if (loading && codeVersion >= 310) {
          dsBridge.call('common', { code: 2, data: { type: 0 } })
        }
        if (Vue.$vux.loading) {
          Vue.$vux.loading.hide()
        }
        if (error.message !== '操作取消') {
          Vue.$vux.loading.hide();
          resolve(error)
        }
      })
    })
  }
}
