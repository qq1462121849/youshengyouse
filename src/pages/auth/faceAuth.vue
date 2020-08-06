<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>实人认证</h1>
    </div>
    <div class="content" :style="{marginTop: $store.state.global.statusH+1 + 'rem'}">
      <div class="iconBox">
        <div class="line"></div>
        <div class="model">
          <span
            style="background:linear-gradient(270deg,rgba(234,190,123,1) 0%,rgba(197,148,69,1) 100%);"
          >
            <i class="icon1"></i>
          </span>
          <p style="color:#111">1.填写身份证</p>
        </div>
        <div class="model">
          <span
            style="background:linear-gradient(270deg,rgba(234,190,123,1) 0%,rgba(197,148,69,1) 100%);"
          >
            <i class="icon2"></i>
          </span>
          <p style="color:#111">2.实人认证</p>
        </div>
        <div class="model">
          <span
            :style="{background:authSuc?'linear-gradient(270deg,rgba(234,190,123,1) 0%,rgba(197,148,69,1) 100%)':'#ddd'}"
          >
            <i class="icon3"></i>
          </span>
          <p :style="{color:authSuc?'#111':'#8e8c8f'}">3.认证成功</p>
        </div>
      </div>
      <p class="name">
        请
        <span>{{name}}</span> 本人亲自完成
      </p>
      <p class="tip">请将脸部置于提示框内，并按提示完成验证</p>
      <img class="auth" src="../../assets//img/hall/auth/yuan.png" alt />
      <div class="btn" @click="toAuth">开始验证</div>
      <div class="result" @click="checkRes">查询认证结果></div>
      <!-- <button  @click="count++">{{count}}</button> -->
    </div>
    <van-dialog v-model="showPop" title="实名提示" show-cancel-button confirmButtonText="去支付" :before-close="beforeClose">
      <div class="auth-pay">
        <h3 class="title">实名认证需先支付{{userInfo.need_pay_money}}元</h3>
        <ul>
          <li v-for="(item, index) in authInfo.payType" :key="index" @click="selectPay(index)" v-if="item.status == 1">
            <p class="pay-type">
              <img v-if="index == 'wechat' " src="../../assets/img/hall/order/wx.png" width="20px">
              <img v-if="index == 'alipay'" src="../../assets/img/hall/order/zfb2.png" width="20px">
              <span >{{item.title}}</span>
            </p>
            <img class="select" v-if="payType != index" src="../../assets/img/hall/order/sec.png" alt="">
            <img class="select" v-if="payType == index" src="../../assets/img/hall/order/sected.png" alt="">
          </li>
        </ul>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import {storage} from '@/utils'
export default {
  data () {
    return {
      name: "***",
      authSuc: false,
      count:'399',
      showPop: false,
      authInfo: '',
      userInfo: '',
      payType: ''
    };
  },
  beforeRouteEnter(to, from, next) {

    next(vm => {
      console.log(from.name);
      if (from.name == "tbauth") {
        /* vm.$vux.toast.text("请点击下方按钮，查询实名结果！"); */
        vm.checkRes();
      }
    });
  },

  created () {
    if (this.$route.query.type && this.$route.query.type == "auth") {
      this.name = storage.get("IDname");
      this.idNum = storage.get("IDnum");
      this.$vux.toast.text("请点击下方按钮查询结果！");
    } else {
      this.name = this.$route.query.name;
      this.idNum = this.$route.query.idNum;
    }
    if (this.$store.state.user.userInfo.is_realname) {
      this.authSuc = true;
      this.$vux.toast.text("您已完成实名认证！");
    }
    // this.$http.post("/amoy/payment/wx-pay",{}, true, true).then((res) => {
    //   this.authInfo = res.data
    //   this.userInfo = res.data.userInfo
    // })
  },
  methods: {
    toAuth () {
      if (this.$store.state.user.userInfo.is_realname) {
        this.$vux.toast.text("您已完成实名认证！")
        return;
      }
      this.$http.post("/amoy/payment/wx-pay",{}, true, true).then((res) => {
        this.authInfo = res.data
        this.userInfo = res.data.userInfo
        if (this.userInfo.is_pay_realname == 1) {
          this.$http.post("/amoy/user/real-name-url",{real_name: this.name, card_no: this.idNum}, true, true).then(res => {
            if (res.code == 0) {
              let url = res.data///调用原生方法,将urL发给原生,通过原生完成实名认证
              // this.$vux.toast.text(url);
              dsBridge.call('open',{url,type:'web'})
            }
          })
        } else {
          this.showPop = true
        }
      })
    },
    // 选择支付方式
    selectPay (type) {
      this.payType = type
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.payType) {
          this.$vux.toast.text("请选择支付方式！")
          done(false)
        }
        this.$http.post("/amoy/payment/wx-pay",{payType: this.payType}, true, true).then(result => {
          if (result.code != 0) return
          let info = {
            apiKey: result.data.payOrder.appid,
            orderId: result.data.payOrder.prepayid,
            mchId: result.data.payOrder.partnerid,
            nonceStr: result.data.payOrder.noncestr,
            timeStamp: result.data.payOrder.timestamp,
            sign: result.data.payOrder.sign
          }
          if (this.payType === 'wechat') {
            dsBridge.call("wxPay", info, (ret) =>{
              if (ret == 0) { // 支付成功
                dsBridge.call('toast', {msg: '支付成功,点击开始验证进行实名'})
              } else if (ret == -1) {  // 支付失败
                return  dsBridge.call('toast', {msg: '支付失败'})
              }
            })
          } else if (this.payType === 'alipay') {
            dsBridge.call("alipayPay", {orderInfo: result.data.payOrder}, (ret) => {
              if (ret == 0) {
                //    支付成功
                dsBridge.call('toast', {msg: '支付成功,点击开始验证进行实名'})
              } else if (ret == -1) {
                //    支付失败
                dsBridge.call('toast', {msg: '支付失败'})
              }
            })
          }
        })
        done()
      } else if (action === 'cancel') {
        done()
      }
    },
    checkRes () {
      if (this.$store.state.user.userInfo.is_realname) {
       return this.$vux.toast.text("您已完成实名认证！");
      }
      this.$http.post("/amoy/user/confirm-real-name",{}, true,true).then(res => {
        if (res.code == 0) {
          this.$vux.toast.show({
            type: "seccess",
            text: "认证成功！",
            position: "middle"
          });
          if (this.$route.query.intoType == "guide") {
            this.$http.post("/amoy/index/tips-status", {},true).then(res => {
              if (res.code == 0) {
                let r = res.data;
                if (r.is_get_live_machine == 0) {
                  this.jumpTo("guide2");
                } else {
                  if (r.is_look_goods == 0) {
                    this.jumpTo("guide4");
                  } else {
                    if (r.is_get_fb == 0) {
                      this.jumpTo("guide6");
                    }
                  }
                }
              }
            });
          } else {
            setTimeout(() => {
              this.$router.go(-2);
            }, 1000);
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.auth-pay{
  .title{
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    padding: 10px 0;
  }
  li{
    padding: 0 .3rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pay-type{
      display: inline-flex;
      align-items: center;
      img{
        width: 30px;
        margin-right: 10px;
      }
    }
    .select{
      width: 20px;
    }
  }
}
#authentication {
  height: 100%;
  overflow: hidden;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10;
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
.content {
  min-height: 100%;
  background: #fff;
  overflow: hidden;
  .name {
    text-align: center;
    font-size: 0.3rem;
    color: #666;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.82rem;
    span {
      color: #ff4a17;
    }
  }
  .tip {
    text-align: center;
    font-size: 0.3rem;
    color: #666;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.2rem;
  }
  .auth {
    width: 4rem;
    height: 3.6rem;
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .btn {
    position: fixed;
    bottom: 1.5rem;
    left: 0.5rem;
    width: 6.5rem;
    height: 0.88rem;
    color: #333;
    font-size: 0.34rem;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.08rem;
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
  }
  .result {
    width: 100%;
    height: 0.3rem;
    color: #ff501e;
    font-size: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    position: fixed;
    bottom: 0.7rem;
    text-decoration: underline;
  }
  .result:active {
    color: #ec7959;
  }
}
.iconBox {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin: 0.5rem 0;
  .model {
    width: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    span {
      width: 0.8rem;
      height: 0.8rem;
      background: #ddd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon1 {
        width: 0.43rem;
        height: 0.51rem;
        background: url("../../assets/img/hall/auth/1.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon2 {
        width: 0.36rem;
        height: 0.35rem;
        background: url("../../assets/img/hall/auth/2.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon3 {
        width: 0.41rem;
        height: 0.29rem;
        background: url("../../assets/img/hall/auth/3.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    p {
      font-size: 0.25rem;
      text-align: center;
      color: #8e8c8f;
    }
  }
  .line {
    position: absolute;
    width: 5rem;
    height: 2px;
    background: #ccc;
    top: 40%;
    z-index: 1;
  }
}
</style>
