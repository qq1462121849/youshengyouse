<template>
  <div id="setting">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>设置</h1>
    </div>
    <div class="setTypeContent" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <!-- <div class="label">
        <p>登录密码</p>
        <div @click="jumpTo({path:'setInfo',query:{type:1}})">
          <span>修改</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>-->
      <!-- <div class="label">
        <p>支付密码</p>
        <div @click="jumpTo({path:'setInfo',query:{type:2}})">
          <span>{{$store.state.user.userInfo.is_set_pay_password==0?'未设置':'去修改'}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>-->
      <div class="label" @click="jumpTo({path:'setInfo',query:{type:5}})">
        <p>设置微信号</p>
        <div >
          <span>{{$store.state.user.userInfo.wx_number||'未设置'}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label"  @click="jumpTo({path:'setInfo',query:{type:3}})">
        <p>更换手机号</p>
        <div>
          <span>{{$store.state.user.userInfo.change_mobile_tg}}Tg</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label"  @click="jumpToAuth()">
        <p>实名认证</p>
        <div v-if="$store.state.user.userInfo.is_realname == 0">
          <span>未实名</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div v-if="$store.state.user.userInfo.is_realname == 1">
          <span>已实名</span>
        </div>
      </div>
      <!-- <div class="label" @click="jumpTo({path:'addAccount'})">
        <p>收款账户</p>
        <div v-if="userInfo.is_set_bankcard==0" >
          <span>未设置</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div v-else >
          <span>去修改</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div> -->
      <div class="label" v-if="isApi">
        <p>版本更新</p>
        <div>
          <span class="version">V{{version}}</span>
          <!-- <i class="iconfont icon-right"></i> -->
        </div>
      </div>
      <!-- <div class="label">
        <p>注销</p>
        <div @click="jumpTo({path:'setInfo',query:{type:4}})">
          <i class="iconfont icon-right"></i>
        </div>
      </div>-->
      <!-- <div class="label" v-if="isApi">
        <p>清除缓存</p>
        <div @click="refreshCache">
          <span>{{size}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>-->
      <div class="label" @click="clip($store.state.user.userInfo.official_email)">
        <p>官方邮箱</p>
        <div>
          <span class="version">{{$store.state.user.userInfo.official_email}}</span>

          <i class="iconfont icon-right"></i>
        </div>
      </div>
     <div class="box" v-if="href.indexOf('172.16.1')>-1&&bool">

        <button  @click="jumpTo({path:'earningInfo'})"></button>
        <button @click="shiming">实名认证</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'myLevel'})">1111111</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo('/home')">首页</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'team'})">1111111</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'ranking'})">1111111</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'earningInfo'})">我的收益</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'search'})">1111111</button>
        <button  style="margin-top:0.2rem;" @click="jumpTo({path:'myback'})">myback</button>
        <button  style="margin-top:0.2rem;" @click="share">share</button>
        <button  style="margin-top:0.2rem;" @click="sharea">分享</button>
     </div>

      <!-- <div class="btnBox" @click="outlogin">退出登录</div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
console.dir(Vue)
export default {
  data() {
    return {

      version: "1.0.0",
      userInfo: "",
      size: 0,
      isApi: false,
      href:location.origin,
      bool:!config.pcWebDebug
    };
  },
  created () {


    // this.$http.post("/amoy/user/user-info", true, true).then(res => {
    //   if (res.code == 0) {
    //     this.$store.commit("setUserInfo", res.data);
    //     this.userInfo = res.data;
    //   }
    // });
    this.version = window.api ? api.appVersion : "1.1.1";

    if (window.api) {
      this.isApi = true;
      api.getCacheSize((ret, err) => {
        this.size = parseInt(ret.size / 1024 / 1024) + "MB";
      });
    }
  },
  methods: {
    jumpToAuth () {
      if (this.$store.state.user.userInfo.is_realname == 0) {
        this.jumpTo('/auth')
      } else if (this.$store.state.user.userInfo.is_realname == 1){
        this.$vux.toast.text("您已实名！")
      }
    },
    shiming(){
      dsBridge.call('open',{url:'https://openapi.alipay.com/gateway.do?alipay_sdk=alipay-sdk-php-easyalipay-20190926&app_id=2021001165620817&biz_content=%7B%22certify_id%22%3A%22a8908c2c469e55cad6e38b18ee820cf8%22%7D&charset=UTF-8&format=json&method=alipay.user.certify.open.certify&sign=P5Fm6v6%2BX7RMcOxV%2FwCVCwJbh36DFqVtciA041rsjU6OKMDFCBZx0HfyBHhxG202ieSk8%2BWjRu0DQq7dukNQoWeza1%2FQ5nt4qjhz9MqWvH8NI5RO1wGMGdnOHSSByiV8Ih68QX6gS67WXRRZviEyqM2QFfcA%2B3a2l7ejaf8VBxNZhtTWYk1rb94Yn3%2FKsVXCTzwWKCMo5cbeFXs5qNuv1%2FQpANMAcTdVIsdAsaD7HWsP9YsJbQfCeWEBsnZMjbOusl2JWx4h9sOaAiCv%2FOni7TC2XLac2g5FI%2BV6909Hy0IobdfVJEy5XTrPpfhirJkiU9xA%2FIt1YIxdByLO5gkXuQ%3D%3D&sign_type=RSA2&timestamp=2020-06-15+17%3A38%3A57&version=1.0',type:'web'})
    },
    sharea(){

      dsBridge.call('inviteShareUrl',{
        thumb:'https://tpc.googlesyndication.com/simgad/13718280691848092500?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qlXdzGLTwaV8utWDQQ6fdiHFHCAXQ',
        type:1,
        title:'6.18等你来抢购',
        description:'快来抢购啊',
        contentUrl:'www.baidu.com'
        })
    },
    share(){
      dsBridge.call('inviteShare',{url:'https://tpc.googlesyndication.com/simgad/13718280691848092500?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qlXdzGLTwaV8utWDQQ6fdiHFHCAXQ',type:1})
    },
    outlogin() {
      //dsBridge.call("open", {url:location.origin+'/#/team',type:'web'});
      dsBridge.call("open", {url:location.origin+'/#/team',type:'web'});
      // this.$store.commit("logout");
      // if (config.pcWebDebug) return this.$router.push("login");
      //  dsBridge.call('toLogin')
    },
    clip(code) {
      this.copyTextShare(code);
    }
    // refreshCache() {
    //   api.clearCache(() => {
    //     this.$vux.toast.text("清除成功！");
    //     api.getCacheSize((ret, err) => {
    //       this.size = parseInt(ret.size / 1024 / 1024) + "MB";
    //     });
    //   });
    // }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(40, 39, 47, 1);
  color: #fff;
  h1 {
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.setTypeContent {
  margin-top: 1rem;
}
.label {
  padding: 0 0.4rem;
  background: #fff;
  height: 1rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  justify-content: space-between;
  p {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    color: #333;
  }
  > div {
    span {
      float: left;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: #999;
    }
    i {
      font-size: 0.3rem;
      color: #999;
      float: right;
      height: 1rem;
      line-height: 1rem;
      margin-left: 0.05rem;
    }
    .version {
      color: #333;
    }
  }
}
.label:nth-last-of-type(2n) {
  margin-bottom: 0.15rem;
}
.btnBox {
  width: 6.5rem;
  height: 0.88rem;
  background: linear-gradient(
    -30deg,
    rgba(227, 185, 125, 1) 0%,
    rgba(240, 214, 160, 1) 100%
  );
  color: #333;
  font-size: 0.34rem;
  line-height: 0.88rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 0.08rem;
}
</style>
