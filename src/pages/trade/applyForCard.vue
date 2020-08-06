<template>
  <div id="applyForCard">
    <div class="header">
      <div class="left">
        <div class="back" @click="onBack"></div>
        <div class="close" @click="close"></div>
      </div>
      <div class="center text-overflow_1-xzh">特权卡申请办理</div>
      <div class="right" @click="refresh"></div>
    </div>
    <div class="content">
      <div class="banner">
        <img
          v-if="cardInfo.privilege_card_img"
          class="banner_img"
          :src="cardInfo.privilege_card_img"
        />
      </div>
      <div class="user_info">
        <div class="info_top">
          <div
            :class="{active:cardType == 1}"
            @click="change(1)"
            v-if="cardInfo.card_type == 1 || cardInfo.card_type == 3"
          >
            <span>电子卡</span>
            <span class="jiaobiao">付费秒开通</span>
          </div>
          <div
            :class="{active:cardType == 2}"
            @click="change(2)"
            v-if="cardInfo.card_type == 2 || cardInfo.card_type == 3"
          >
            <span>实体卡</span>
            <span class="jiaobiao">邮寄</span>
          </div>
        </div>
        <div class="info_bottom">
          <h3>* 填写注册信息</h3>
          <div class="info_bottom_from">
            <div class="form_group">
              <span>姓名</span>
              <input
                type="text"
                @blur="onBlur"
                placeholder="请输入您的姓名"
                v-model="userName"
                ref="input"
                @focus="focus"
                @blur.prevent="changeBlur()"
              />
            </div>
            <div class="form_group">
              <span>手机号码</span>
              <input
                type="tel"
                @blur="onBlur"
                placeholder="请输入您的手机号码"
                v-model="mobile"
                @focus="focus"
                @blur.prevent="changeBlur()"
              />
            </div>
            <!-- 实体卡 -->
            <div v-if="cardType == 2">
              <div class="form_group">
                <span>号码确认</span>
                <input type="tel" @blur="onBlur" placeholder="请确认您的手机号码" v-model="mobile1" />
              </div>
              <div class="form_group">
                <span>收货地址</span>
                <!-- <input type="text" placeholder="请选择/省/市/区"> -->
                <x-address
                  class="address_box"
                  placeholder="请选择/省/市/区"
                  value-text-align="left"
                  @on-hide="logHide"
                  @on-show="logShow"
                  title
                  v-model="value"
                  :list="addressData"
                  @on-shadow-change="onShadowChange"
                  :show.sync="showAddress"
                ></x-address>
              </div>
              <div class="form_group">
                <span>详细地址</span>
                <input type="text" @blur="onBlur" placeholder="请输入您的详细地址" v-model="address" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- 电子卡 -->
      <div class="left" v-if="cardType == 1">
        <p>
          <span>总金额：</span>
          <span class="price">{{cardInfo.card_real_price}}元</span>
          <del>（原价￥{{cardInfo.card_sell_price}}）</del>
        </p>
        <span>本期剩余名额{{cardInfo.remain_rate}}%</span>
      </div>
      <!-- 实体卡 -->
      <div class="left" v-if="cardType == 2">
        <p>
          <span>总金额：</span>
          <span class="price">{{cardInfo.real_card_real_price}}元</span>
          <del>（原价￥{{cardInfo.real_card_sell_price}}）</del>
        </p>
        <span>本期剩余名额{{cardInfo.remain_rate}}%</span>
      </div>

      <div class="right" @click="apply">申请办理</div>
    </div>
    <!-- 支付弹窗 -->
    <div class="zhifu" v-if="payShow">
      <div class="payment">
        <h3>
          <span>选择支付方式</span>
          <span class="iconfont icon-close" @click="closePay"></span>
        </h3>
        <div class="pay" @click="changePay(2)">
          <div class="pay_left">
            <img src="../../assets/img/zfubao.png" />
            <span>支付宝支付</span>
          </div>
          <div class="pay_right">
            <img src="../../assets/img/roundFilled.png" v-if="payType == 2" />
            <span v-if="payType == 1"></span>
          </div>
        </div>
        <div class="pay" @click="changePay(1)">
          <div class="pay_left">
            <img src="../../assets/img/wx.png" />
            <span>微信支付</span>
          </div>
          <div class="pay_right">
            <img src="../../assets/img/roundFilled.png" v-if="payType == 1" />
            <span v-if="payType == 2"></span>
          </div>
        </div>
        <div class="bottom_btn" @click="payMoney">
          <span>确认支付</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import './my.less'
import { XHeader, XAddress, ChinaAddressV4Data } from "vux";
// import * as apiHttp from '../../api/index'
import address from "../../plugin/address";
export default {
  name: "applyForCard",
  components: {
    XHeader,
    XAddress,
    ChinaAddressV4Data
  },
  data() {
    return {
      value: [],
      addressAll: [],
      addressData: address,
      address: "",
      showAddress: false,
      userName: "",
      mobile: "",
      mobile1: "",
      cardType: 1, //1电子卡 2实体卡
      payShow: false,
      payType: 2,
      order_id: "",
      cardInfo: {},
      scrollTop: 0
    };
  },
  created() {
    this.getMoneyInfo();
  },
  mounted: function() {
    var clientHeight = document.body.clientHeight;
    var _focusElem = null; //输入框焦点
    //利用捕获事件监听输入框等focus动作
    document.body.addEventListener(
      "focus",
      function(e) {
        _focusElem = e.target || e.srcElement;
        // console.log(_focusElem)
      },
      true
    );
    //因为存在软键盘显示而屏幕大小还没被改变，所以以窗体（屏幕显示）大小改变为准
    window.addEventListener("resize", function() {
      if (_focusElem && document.body.clientHeight < clientHeight) {
        //焦点元素滚动到可视范围的底部(false为底部，true为顶部)
        _focusElem.scrollIntoView(true);
      }
    });
  },
  methods: {
    changeBlur() {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 200);
      }
    },
    focus() {
      // this.scrollTop = document.scrollingElement.scrollTop;
    },
    // ios 输入框弹起页面上移，收起来页面不下滑。
    onBlur() {
      // document.scrollingElement.scrollTo(0, this.scrollTop);
      // window.scrollTo(0, 0)
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 200);
      }
    },
    // 返回
    onBack: function(ret, err) {
      dsBridge.call("closeWin");
    },
    // 刷新
    refresh: function() {
      location.reload();
    },
    // 关闭，回到首页
    close: function() {
      dsBridge.call("goHome");
    },
    onShadowChange(ids, names) {
      console.log(names);
      this.addressAll = names;
      this.value = names;
    },
    apply() {
      var that = this;
      let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      // 电子卡直接支付
      if (this.cardType == 1) {
        if (!this.mobile) {
          this.$vux.toast.text("手机号不能为空");
          return;
        }
        if (!reg.test(this.mobile)) {
          this.$vux.toast.text("手机号格式不对");
          return;
        }
        if (!this.userName) {
          this.$vux.toast.text("姓名不能为空");
          return;
        }
        this.$http
          .post(
            "/amoy_v2/user-privilege-card/apply-open-card",
            {
              name: that.userName,
              phone: that.mobile,
              type: this.cardType
            },
            true,
            false
          )
          .then(response => {
            if (response.code === 0) {
              this.order_id = response.data.order_id;
              this.payShow = true;
            }
          });
      } else {
        if (!this.userName) {
          this.$vux.toast.text("姓名不能为空");
          return;
        }
        if (!this.mobile) {
          this.$vux.toast.text("手机号不能为空");
          return;
        }
        if (!reg.test(this.mobile)) {
          this.$vux.toast.text("手机号格式不对");
          return;
        }
        if (this.mobile !== this.mobile1) {
          this.$vux.toast.text("手机号输入有误");
          return;
        }
        if (this.value.length === 0) {
          this.$vux.toast.text("请选择地址");
          return;
        }
        if (this.address.length === 0) {
          this.$vux.toast.text("请输入详细地址");
          return;
        }
        this.$http
          .post(
            "/amoy_v2/user-privilege-card/apply-open-card",
            {
              name: that.userName,
              phone: that.mobile,
              // province:that.addressAll[0],
              // city:that.addressAll[1],
              // district:that.addressAll[2],
              address:
                that.addressAll[0] + that.addressAll[1] + that.addressAll[2],
              address1: that.address,
              type: this.cardType
            },
            true,
            false
          )
          .then(response => {
            if (response.code === 0) {
              this.order_id = response.data.order_id;
              // 跳转支付页面
              dsBridge.call("open", {
                url:
                  window.location.origin +
                  "/uqWeb/html/privilege_card/card_payment.html?id=" +
                  this.order_id,
                type: "web"
              });
            }
          });
      }
    },
    logHide(str) {
      console.log("on-hide", str);
    },
    logShow(str) {
      console.log("on-show");
    },
    // 切换
    change(i) {
      this.cardType = i;
    },
    changePay(i) {
      this.payType = i;
    },
    payMoney() {
      this.$http
        .post(
          "/amoy_v2/user-privilege-card/paymoney",
          {
            orderId: this.order_id,
            customer_paymoney: this.cardInfo.card_real_price, // 支付金额(电子卡实际价格)
            pay_type: this.payType // 支付方式1微信2支付宝
          },
          true,
          false
        )
        .then(response => {
          if (response.code === 0) {
            // 得到支付信息去支付
            if (this.payType == 2) {
              dsBridge.call(
                "alipayPay",
                { orderInfo: response.data.payOrder },
                ret => {
                  if (ret == 0) {
                    //    支付成功
                    this.payShow = false;
                    dsBridge.call("open", {
                      url:
                        window.location.origin +
                        "/uqWeb/html/privilege_card/aggregatePage.html",
                      type: "web"
                    });
                  } else if (ret == -1) {
                    //    支付失败
                    dsBridge.call("toast", { msg: "支付失败" });
                    this.payShow = false;

                    // 测试支付，（上线需注释）
                    // this.$http.post('/amoy_v2/privilege-card-order/test-pay-callback', {
                    // trade_code:response.data.trade_code,
                    // }, true, false).then(response => {
                    //   if (response.code == 0) {
                    //     dsBridge.call("open", {url: window.location.origin+'/uqWeb/html/privilege_card/aggregatePage.html',type: 'web'})
                    //   }
                    // })
                  }
                }
              );
            } else if (this.payType == 1) {
              var info = {
                apiKey: response.data.payOrder.appid,
                orderId: response.data.payOrder.prepayid,
                mchId: response.data.payOrder.partnerid,
                nonceStr: response.data.payOrder.noncestr,
                timeStamp: response.data.payOrder.timestamp,
                sign: response.data.payOrder.sign
              };
              dsBridge.call("wxPay", info, ret => {
                if (ret == 0) {
                  //    支付成功
                  this.payShow = false;
                  dsBridge.call("open", {
                    url:
                      window.location.origin +
                      "/uqWeb/html/privilege_card/aggregatePage.html",
                    type: "web"
                  });
                } else if (ret == -1) {
                  //    支付失败
                  dsBridge.call("toast", { msg: "支付失败" });
                  this.payShow = false;

                  // 测试支付，（上线需注释）
                  // this.$http.post('/amoy_v2/privilege-card-order/test-pay-callback', {
                  // trade_code:response.data.trade_code,
                  // }, true, false).then(response => {
                  //   if (response.code == 0) {
                  //     dsBridge.call("open", {url: window.location.origin+'/uqWeb/html/privilege_card/aggregatePage.html',type: 'web'})
                  //   }
                  // })
                }
              });
            }
          }
        });
    },
    //获取付费信息
    getMoneyInfo() {
      this.$http
        .post("/amoy_v2/user-privilege-card/biz-card-info", {}, true, false)
        .then(response => {
          if (response.code === 0) {
            this.cardInfo = response.data.cardInfo;
            if (this.cardInfo.card_type == 1 || this.cardInfo.card_type == 3) {
              this.cardType = 1;
            } else {
              this.cardType = 2;
            }
          }
        });
    },
    closePay() {
      this.payShow = false;
    }
  }
};
</script>

<style scoped lang="less">
#applyForCard {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  position: relative;
  width: 100%;
  height: 0.88rem;
  color: rgba(47, 47, 47, 1);
  line-height: 0.88rem;
  font-size: 0.34rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-bottom: 0.01rem solid #eeeeee;
}

.header .left {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0.3rem;
  height: 0.88rem;
}
.header .left .back {
  height: 0.3rem;
  width: 0.3rem;
  background: url(../../assets/img/back1.png) no-repeat;
  background-size: 100% 100%;
}
.header .left .close {
  margin-left: 0.33rem;
  height: 0.3rem;
  width: 0.3rem;
  background: url(../../assets/img/close1.png) no-repeat;
  background-size: 100% 100%;
}
.header .right {
  width: 0.3rem;
  height: 0.3rem;
  background: url(../../assets/img/icon-refresh.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0.3rem;
  top: 0.29rem;
}
.header .center {
  width: 3.5rem;
  text-align: center;
}
.content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  // margin-bottom: 1rem;
  flex: 1;
  background: #fff;
  .banner {
    width: 100%;
    height: 4.7rem;
    background: linear-gradient(
      -90deg,
      rgba(252, 55, 40, 1) 0%,
      rgba(255, 99, 73, 1) 100%
    );
    position: relative;
    .banner_img {
      height: 100%;
      width: 100%;
      border: 0;
    }
  }
  .user_info {
    padding: 0.3rem 0;
    // margin: -0.43rem 0.3rem 0;
    background: rgba(255, 255, 255, 1);
    // border-radius:.1rem;
    z-index: 10;
    position: relative;
    .info_top {
      height: 1.42rem;
      // border-bottom: 1px solid #e3e3e3;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div {
        width: 1.8rem;
        height: 0.7rem;
        background: rgba(247, 247, 247, 1);
        border-radius: 0.1rem;
        font-size: 0.34rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .jiaobiao {
          position: absolute;
          right: -0.4rem;
          top: -0.3rem;
          background: linear-gradient(
            -90deg,
            rgba(255, 14, 57, 1) 0%,
            rgba(255, 148, 73, 1) 100%
          );
          border-radius: 0.25rem 0.25rem 0.25rem 0px;
          padding: 0.05rem 0.2rem;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
      .active {
        background: #f7e8bd;
        color: #906f18;
      }
    }
    .info_bottom {
      h3 {
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        background: #f7f7f7;
        padding-left: 0.3rem;
      }
      .info_bottom_from {
        padding: 0 0.3rem;
      }
      .form_group {
        // margin-bottom: 0.2rem;
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(227, 227, 227, 1);
        span {
          flex: 1;
          padding-right: 0.24rem;
          text-align: start;
          font-size: 0.28rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        input {
          width: 5.4rem;
          height: 0.8rem;
          // border:1px solid rgba(227,227,227,1);
          line-height: 0.8rem;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          // border-radius:0.06rem;
          // padding-left: 0.2rem;
          border: none;
        }
        .address_box {
          width: 5.4rem;
          height: 0.8rem;
          // border:1px solid rgba(227,227,227,1);
          line-height: 0.8rem;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          // border-radius:0.06rem;
          // padding-left: 0.2rem;
          border: none;
        }
      }
    }
  }
}

.footer {
  height: 1.2rem;
  background: #fff;
  width: 100%;
  display: flex;
  position: relative;
  .left {
    flex: 1;
    align-items: center;
    justify-content: space-around;
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    padding: 0.25rem 0 0 0.3rem;
    p {
      font-size: 0.28rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      .price {
        color: #d92121;
      }
      del {
        font-size: 0.22rem;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
    > span {
      font-size: 0.24rem;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
  .right {
    width: 2rem;
    background: linear-gradient(
      -90deg,
      rgba(217, 33, 33, 1) 0%,
      rgba(248, 123, 100, 1) 100%
    );
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}

.zhifu {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  .payment {
    padding: 0.3rem 0.3rem;
    background: #f7f7f7;
    h3 {
      font-size: 0.28rem;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
      icon-close {
        color: 111;
        font-size: 0.5rem;
      }
    }
    .pay {
      width: 6.3rem;
      height: 1rem;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border-radius: 0.1rem;
      margin-top: 0.2rem;
      .pay_left {
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        sapn {
          font-size: 0.34rem;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }
      }
      .pay_right {
        img {
          width: 0.42rem;
          height: 0.42rem;
        }
        span {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border: 0.03rem solid rgba(227, 227, 227, 1);
          // background:linear-gradient(0deg,rgba(255,134,6,1) 0%,rgba(255,255,255,1) 100%);
          border-radius: 50%;
        }
      }
    }
    .bottom_btn {
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 0.3rem;
      span {
        display: block;
        width: 80%;
        height: 0.8rem;
        background: linear-gradient(
          90deg,
          rgba(248, 123, 100, 1) 0%,
          rgba(246, 61, 54, 1) 100%
        );
        border-radius: 0.1rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.address_box::before {
  border-top: none !important;
}
</style>
