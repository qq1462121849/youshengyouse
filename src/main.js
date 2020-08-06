import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import { XHeader, ToastPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin } from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'
import Vant from 'vant';
import { Notify } from 'vant';
import 'vant/lib/index.css';
import VueJsonp from 'vue-jsonp'
import md5 from 'md5'

Vue.use(Vant);
require('./api/mock.js')
Vue.use(Clipboard).use(Vuex).use(ToastPlugin, { position: 'bottom' }).use(ConfirmPlugin).use(DatetimePlugin).use(LoadingPlugin).use(VueScroller);
Vue.use(VueJsonp)
Vue.prototype.$notify = Notify
Vue.prototype.$md5 = md5
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
  loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
  preLoad: 2,
  error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
  adapter: 1
})
Vue.prototype.$logo = utils.storage.get('appLoginLogo') ? utils.storage.get('appLoginLogo') : ''


Vue.component('x-header', XHeader)


Vue.use(plugin, { router: router })
Vue.config.productionTip = false
// Vue.prototype.link = 'http://' + resUrl + '/api/' + config.bizId
Vue.prototype.$color = '#fc3357'
// 控制线下的内容是否开启
Vue.prototype.$isMallUnderShop = config.isMallUnderShop
// 支付宝支付模块
Vue.prototype.$aliPay = config.aliPay
Vue.prototype.$bizId = config.bizId
// 控制线上的内容是否开启
Vue.prototype.$isMallShop = config.isMallShop
let codeVersion = config.codeVersion
Vue.prototype.$imgConfig = {}
if (codeVersion >= 340) {
  var commonImgConfig = dsBridge.call('receiveParams', 'imgConfig')
  Vue.prototype.$imgConfig = commonImgConfig
}

window.vueObj = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



