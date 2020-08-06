import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/pages/layout/'], resolve),
      redirect: '/ysyshome',
      children: [
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
          meta: { title: '登录', fullScreen: 1, routerZindex: 1, }
        },
        {
          path: '/addcount',//账户扩容
          name: 'addcount',
          component: resolve => require(['@/pages/auth/addcount'], resolve),
          meta: { title: '账户扩容', routerZindex: 1 }
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/pages/auth/register'], resolve),
          meta: { title: '注册', fullScreen: 1, routerZindex: 1 }
        },
        {
          path: '/protocolTxt',
          name: 'protocolTxt',
          component: resolve => require(['@/pages/auth/protocolTxt'], resolve),
          meta: { title: '用户协议', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/forget',
          name: 'forget',
          component: resolve => require(['@/pages/auth/forget'], resolve),
          meta: { title: '忘记密码', fullScreen: 1, routerZindex: 1 }
        },
        {
          path: '/wxbind',
          name: 'wxbind',
          component: resolve => require(['@/pages/auth/wxbind'], resolve),
          meta: { title: '绑定微信', routerZindex: 1 }
        },
        {
          path: '/changePwd',
          name: 'changePwd',
          component: resolve => require(['@/pages/auth/changePwd'], resolve),
          meta: { title: '重置密码', routerZindex: 1 }
        },
        // {
        //   path: '/home',
        //   name: 'home',
        //   component: resolve => require(['@/pages/home/index'], resolve),
        //   meta: { title: '首页', keepAlive: true, isShowHead: false, isShowTab: true, routerZindex: 2, }
        // },
        {
          path: '/ysyshome',
          name: 'home',
          component: resolve => require(['@/pages/home/newindex'], resolve),
          meta: { title: '首页', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 2, }
        },
        {
          path: '/mill',
          name: 'mill',
          component: resolve => require(['@/pages/home/mill'], resolve),
          meta: { title: '矿机', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/trading',
          name: 'trading',
          component: resolve => require(['@/pages/home/trading'], resolve),
          meta: { title: '交易', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/bussion',
          name: 'bussion',
          component: resolve => require(['@/pages/home/bussion'], resolve),
          meta: { title: '交易', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/kLine',
          name: 'kLine',
          component: resolve => require(['@/pages/mill/kLine'], resolve),
          meta: { title: 'K线图', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/kLineT',
          name: 'kLineT',
          component: resolve => require(['@/pages/mill/kLineT'], resolve),
          meta: { title: 'K线图', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/team',
          name: 'team',
          component: resolve => require(['@/pages/team/index'], resolve),
          meta: { title: '我的团队', keepAlive: true, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 2 }
        },
        {
          path: '/ranking',
          name: 'ranking',
          component: resolve => require(['@/pages/team/ranking'], resolve),
          meta: { title: '排行榜', keepAlive: true, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 2 }
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/team/search'], resolve),
          meta: { title: '团队搜索', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 2 }
        },

        {
          path: '/teamList',
          name: 'teamList',
          component: resolve => require(['@/pages/team/teamList'], resolve),
          meta: { title: '直推详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 5 }
        },
        {
          path: '/teamDetail',
          name: 'teamDetail',
          component: resolve => require(['@/pages/team/teamDetail'], resolve),
          meta: { title: '数据详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 5 }
        },
        {
          path: '/my',
          name: 'my',
          component: resolve => require(['@/pages/my/index'], resolve),
          meta: { title: '我的', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/myback',
          name: 'myback',
          component: resolve => require(['@/pages/my/indexback'], resolve),
          meta: { title: '我的', keepAlive: true, isShowHead: false, isShowTab: true, fullScreen: 1, routerZindex: 2 }
        },
        {
          path: '/message',
          name: 'message',
          component: resolve => require(['@/pages/my/message'], resolve),
          meta: { title: '消息', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/msgInfo',
          name: 'msgInfo',
          component: resolve => require(['@/pages/my/msgInfo'], resolve),
          meta: { title: '消息', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/share',
          name: 'share',
          component: resolve => require(['@/pages/my/shareCenter'], resolve),
          meta: { title: '分享', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 5 }
        },
        {
          path: '/shareImg',
          name: 'shareImg',
          component: resolve => require(['@/pages/my/share'], resolve),
          meta: { title: '分享', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 6 }
        },
        {
          path: '/redPacket',
          name: 'redPacket',
          component: resolve => require(['@/pages/home/redPacket'], resolve),
          meta: { title: '红包', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/millMarket',
          name: 'millMarket',
          component: resolve => require(['@/pages/mill/millMarket'], resolve),
          meta: { title: '矿机超市', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/millMarketNew',
          name: 'millMarketNew',
          component: resolve => require(['@/pages/mill/millMarketNew'], resolve),
          meta: { title: '矿机超市', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/setting',
          name: 'setting',
          component: resolve => require(['@/pages/set/index'], resolve),
          meta: { title: '设置中心', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 3 }
        },
        {
          path: '/addAccount',
          name: 'addAccount',
          component: resolve => require(['@/pages/set/addAccount'], resolve),
          meta: { title: '添加收款账户', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 3 }
        },
        {
          path: '/addCard',
          name: 'addCard',
          component: resolve => require(['@/pages/set/addCard'], resolve),
          meta: { title: '添加银行卡', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 3 }
        },
        {
          path: '/addAli',
          name: 'addAli',
          component: resolve => require(['@/pages/set/addAli'], resolve),
          meta: { title: '添加支付宝', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 3 }
        },
        {
          path: '/setInfo',
          name: 'setInfo',
          component: resolve => require(['@/pages/set/setPage'], resolve),
          meta: { title: '设置中心', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/pay',
          name: 'pay',
          component: resolve => require(['@/pages/my/pay'], resolve),
          meta: { title: '交易', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/pages/order/index'], resolve),
          meta: { title: '我的订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/goodorder',
          name: 'goodorder',
          component: resolve => require(['@/pages/order/goodorder'], resolve),
          meta: { title: '我的订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/mallIncome',
          name: 'mallIncome',
          component: resolve => require(['@/pages/order/mallIncome'], resolve),
          meta: { title: '商城收益', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/auth',
          name: 'auth',
          component: resolve => require(['@/pages/auth/authentication'], resolve),
          meta: { title: '实名认证', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/faceAuth',
          name: 'faceAuth',
          component: resolve => require(['@/pages/auth/faceAuth'], resolve),
          meta: { title: '人脸验证', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/cityPartner',
          name: 'cityPartner',
          component: resolve => require(['@/pages/team/cityPartner'], resolve),
          meta: { title: '城市合伙人', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/memberLevel',
          name: 'memberLevel',
          component: resolve => require(['@/pages/my/memberLevel'], resolve),
          meta: { title: '会员等级', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/myLevel',
          name: 'myLevel',
          component: resolve => require(['@/pages/my/myLevel'], resolve),
          meta: { title: '达人身份', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/handlingFee',
          name: 'handlingFee',
          component: resolve => require(['@/pages/my/handlingFeeLevel'], resolve),
          meta: { title: '手续费等级', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 4 }
        },
        {
          path: '/payProof',
          name: 'payProof',
          component: resolve => require(['@/pages/order/payProof'], resolve),
          meta: { title: '支付凭证', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/orderInfo',
          name: 'orderInfo',
          component: resolve => require(['@/pages/order/orderInfo'], resolve),
          meta: { title: '订单详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/rightsRecord',
          name: 'rightsRecord',
          component: resolve => require(['@/pages/giftBag/rightsRecord'], resolve),
          meta: { title: '我的记录', isShowHead: true, routerZindex: 9 }
        },
        {
          path: '/guide',
          name: 'guide',
          component: resolve => require(['@/pages/set/guide'], resolve),
          meta: { title: '新手指导', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/guideDetail',
          name: 'guideDetail',
          component: resolve => require(['@/pages/set/guideDetail'], resolve),
          meta: { title: '新手指导', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: resolve => require(['@/pages/set/feedback'], resolve),
          meta: { title: '问题反馈', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/contact',
          name: 'contact',
          component: resolve => require(['@/pages/set/contact'], resolve),
          meta: { title: '联系客服', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/goods/search'], resolve),
          meta: { title: '搜索', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/searchList',
          name: 'searchList',
          component: resolve => require(['@/pages/goods/searchList'], resolve),
          meta: { title: '搜索结果', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/sortList',
          name: 'sortList',
          component: resolve => require(['@/pages/goods/sortList'], resolve),
          meta: { title: '分类', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/detail',
          name: 'detail',
          component: resolve => require(['@/pages/goods/detail'], resolve),
          meta: { title: '详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/balance',
          name: 'balance',
          component: resolve => require(['@/pages/my/balanceInfo'], resolve),
          meta: { title: '余额', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/tbauth',
          name: 'tbauth',
          component: resolve => require(['@/pages/goods/tbauth'], resolve),
          meta: { title: '淘宝授权', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/serviceCharge',
          name: 'serviceCharge',
          component: resolve => require(['@/pages/my/serviceCharge'], resolve),
          meta: { title: '全球手续费分红公示', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/enjoyexpert',
          name: 'enjoyexpert',
          component: resolve => require(['@/pages/my/enjoyexpert'], resolve),
          meta: { title: '达人早享', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/millDetail',
          name: 'millDetail',
          component: resolve => require(['@/pages/mill/millDetail'], resolve),
          meta: { title: '矿机详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/earningInfo',
          name: 'earningInfo',
          component: resolve => require(['@/pages/my/earningInfo'], resolve),
          meta: { title: '我的收益', keepAlive: false, isShowHead: false, isShowTab: false, fullScreen: 1, routerZindex: 5 }
        },
        {
          path: '/integral',
          name: 'integral',
          component: resolve => require(['@/pages/order/integral'], resolve),
          meta: { title: '积分详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/recharge',
          name: 'recharge',
          component: resolve => require(['@/pages/order/recharge'], resolve),
          meta: { title: '充值', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 5 }
        },
        {
          path: '/integralDetail',
          name: 'integralDetail',
          component: resolve => require(['@/pages/order/integralDetail'], resolve),
          meta: { title: '积分明细', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/incomeDetail',
          name: 'incomeDetail',
          component: resolve => require(['@/pages/order/incomeDetail'], resolve),
          meta: { title: '收益详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/dealInfo',
          name: 'dealInfo',
          component: resolve => require(['@/pages/my/dealInfo'], resolve),
          meta: { title: '交易明细', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/balanceDetail',
          name: 'balanceDetail',
          component: resolve => require(['@/pages/my/balanceDetail'], resolve),
          meta: { title: '明细', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/guide1',
          name: 'guide1',
          component: resolve => require(['@/pages/guides/guide1'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide2',
          name: 'guide2',
          component: resolve => require(['@/pages/guides/guide2'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide3',
          name: 'guide3',
          component: resolve => require(['@/pages/guides/guide3'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide4',
          name: 'guide4',
          component: resolve => require(['@/pages/guides/guide4'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide5',
          name: 'guide5',
          component: resolve => require(['@/pages/guides/guide5'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide6',
          name: 'guide6',
          component: resolve => require(['@/pages/guides/guide6'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide7',
          name: 'guide7',
          component: resolve => require(['@/pages/guides/guide7'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide8',
          name: 'guide8',
          component: resolve => require(['@/pages/guides/guide8'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }
        ,
        {
          path: '/guide9',
          name: 'guide9',
          component: resolve => require(['@/pages/guides/guide9'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/guide10',
          name: 'guide10',
          component: resolve => require(['@/pages/guides/guide10'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/guide11',
          name: 'guide11',
          component: resolve => require(['@/pages/guides/guide11'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/guide12',
          name: 'guide12',
          component: resolve => require(['@/pages/guides/guide12'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/guide13',
          name: 'guide13',
          component: resolve => require(['@/pages/guides/guide13'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/guide14',
          name: 'guide14',
          component: resolve => require(['@/pages/guides/guide14'], resolve),
          meta: { title: '指南', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/tips',
          name: 'tips',
          component: resolve => require(['@/pages/set/tips'], resolve),
          meta: { title: '提示', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        }, {
          path: '/middle',
          name: 'middle',
          component: resolve => require(['@/pages/set/middle'], resolve),
          meta: { title: '中间页', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/millCard',
          name: 'millCard',
          component: resolve => require(['@/pages/home/millCard'], resolve),
          meta: { title: '矿卡', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/compound',
          name: 'compound',
          component: resolve => require(['@/pages/home/compound'], resolve),
          meta: { title: '合成', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2, }
        },
        {
          path: '/fenHongNotice',
          name: 'fenHongNotice',
          component: resolve => require(['@/pages/home/fenHongNotice'], resolve),
          meta: { title: '全球手续费分红公示', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 2, }
        },
        {
          path: '/teamDetailsNew',
          name: 'teamDetailsNew',
          component: resolve => require(['@/pages/team/teamDetailsNew'], resolve),
          meta: { title: '团队详情', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/feedbackNew',
          name: 'feedbackNew',
          component: resolve => require(['@/pages/set/feedbackNew'], resolve),
          meta: { title: '申诉', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/beginnerGuider',
          name: 'beginnerGuider',
          component: resolve => require(['@/pages/my/beginnerGuider'], resolve),
          meta: { title: '新手指南', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/help',
          name: 'help',
          component: resolve => require(['@/pages/my/help'], resolve),
          meta: { title: '帮助中心', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/helpCenter',
          name: 'helpCenter',
          component: resolve => require(['@/pages/my/helpCenter'], resolve),
          meta: { title: '帮助中心', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/personSpeak',
          name: 'personSpeak',
          component: resolve => require(['@/pages/home/personSpeak'], resolve),
          meta: { title: '达人说', isShowHead: true, keepAlive: true, routerZindex: 2 }
        },
        {
          path: '/personArticle',
          name: 'personArticle',
          component: resolve => require(['@/pages/home/personArticle'], resolve),
          meta: { title: '达人文章', isShowHead: true, keepAlive: true, routerZindex: 3 }
        },
        {
          path: '/dayingList',
          name: 'dayingList',
          component: resolve => require(['@/pages/home/dayingList'], resolve),
          meta: { title: '晒单', keepAlive: true, isShowSearch: true, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/dayingDetail',
          name: 'dayingDetail',
          component: resolve => require(['@/pages/home/dayingDetail'], resolve),
          meta: { title: '详情', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/daying',
          name: 'daying',
          component: resolve => require(['@/pages/home/daying'], resolve),
          meta: { title: '晒单', keepAlive: false, isShowHead: true, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/comment',
          name: 'comment',
          component: resolve => require(['@/pages/home/comment'], resolve),
          meta: { title: '发表评论', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/dayingShop',
          name: 'dayingShop',
          component: resolve => require(['@/pages/home/dayingShop'], resolve),
          meta: { title: '选择晒单商品', keepAlive: true, isShowHead: false, isShowTab: false, routerZindex: 4 }
        },
        {
          path: '/applyForCard',
          name: 'applyForCard',
          component: resolve => require(['@/pages/trade/applyForCard'], resolve),
          meta: { title: '特权卡', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/newTrade',
          name: 'newTrade',
          component: resolve => require(['@/pages/trade/index'], resolve),
          meta: { title: '交易', keepAlive: false, isShowHead: false, isShowTab2: true, routerZindex: 4 }
        },
        {
          path: '/newMy',
          name: 'newMy',
          component: resolve => require(['@/pages/trade/newMy'], resolve),
          meta: { title: '我的', keepAlive: false, isShowHead: false, isShowTab2: true, routerZindex: 4 }
        },
        {
          path: '/buyTG',
          name: 'buyTG',
          component: resolve => require(['@/pages/trade/buyTG'], resolve),
          meta: { title: '购买TG', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/sell',
          name: 'sell',
          component: resolve => require(['@/pages/trade/sell'], resolve),
          meta: { title: '出售', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/my2',
          name: 'my2',
          component: resolve => require(['@/pages/trade/my'], resolve),
          meta: { title: '个人中心', keepAlive: false, isShowHead: false, isShowTab2: true, routerZindex: 4 }
        },
        {
          path: '/newOrder',
          name: 'newOrder',
          component: resolve => require(['@/pages/trade/order'], resolve),
          meta: { title: '我的订单', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/newPayProof',
          name: 'newPayProof',
          component: resolve => require(['@/pages/trade/payProof'], resolve),
          meta: { title: '提交支付凭证', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        }
        ,
        {
          path: '/setAccount',
          name: 'setAccount',
          component: resolve => require(['@/pages/trade/set/account'], resolve),
          meta: { title: '设置收款账户', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/addAliA',
          name: 'addAli',
          component: resolve => require(['@/pages/trade/set/addAli'], resolve),
          meta: { title: '设置收款账户', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/addCardA',
          name: 'addCardA',
          component: resolve => require(['@/pages/trade/set/addCard'], resolve),
          meta: { title: '设置收款账户', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/setPwd',
          name: 'setPwd',
          component: resolve => require(['@/pages/trade/set/tradePwd'], resolve),
          meta: { title: '设置交易密码', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/USDTList',
          name: 'USDTList',
          component: resolve => require(['@/pages/trade/USDTList'], resolve),
          meta: { title: 'USDT余额', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/newOrderInfo',
          name: 'newOrderInfo',
          component: resolve => require(['@/pages/trade/orderInfo'], resolve),
          meta: { title: '支付凭证', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/newServe',
          name: 'newServe',
          component: resolve => require(['@/pages/trade/set/serve'], resolve),
          meta: { title: '联系客服', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/globalFee',
          name: 'globalFee',
          component: resolve => require(['@/pages/trade/global'], resolve),
          meta: { title: '全球手续费分红', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        },
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component: resolve => require(['@/pages/trade/orderDetail'], resolve),
          meta: { title: '全球手续费分红', keepAlive: false, isShowHead: false, isShowTab2: false, routerZindex: 4 }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    /* console.log('savedPosition',savedPosition) */
    return { x: 0, y: 0 }
    //return savedPosition;
  }
})

const whiteList = ['personSpeak', 'dayingList', 'daying', 'comment', 'login', 'about', 'changePwd', 'register', 'forget', 'mobileLogin', 'guide', 'wxbind', 'protocolTxt', 'middle']
router.beforeEach(function (to, from, next) {
  var firstPage = ['/ysyshome']
  var currentRoute = to.path
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false
  } else {
    window.canRightSlipBack = true
  }
  // 登录拦截
  store.commit('hide')
  /*   if (!config.isMallShop && currentRoute.indexOf('/mall/home') != -1) {
      // 当前往线上商城首页并无权进入时
      alert('此安装包暂无权限进入商城')
      return
    }
    if (!config.isMallUnderShop && currentRoute.indexOf('/mall/underShop') != -1) {
      // 当前往线下商城首页并无权进入时
      alert('此安装包暂无权限进入线下商城')
      return
    } */
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    dsBridge.call('toLogin')
  } else {
    next()
  }
})

export default router
