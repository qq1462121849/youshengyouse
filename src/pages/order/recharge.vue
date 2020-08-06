<template>
  <div id="feedback">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1 v-if="tabIndex == '2'">提现</h1>
      <!-- <h1 v-else>充值</h1>
      <div class="topInfo">
        <div @click="tabIndex=1">
          <p :class="tabIndex==1?'active':''">我要充值</p>
          <i v-if="tabIndex==1"></i>
        </div>
        <div @click="tabIndex=2">
          <p :class="tabIndex==2?'active':''">我要提现</p>
          <i v-if="tabIndex==2"></i>
        </div>
      </div> -->
    </div>
    <div class="content" :style="{paddingTop: statusH + 1 + 'rem'}">
      <transition>
        <div class="tabIndex" v-show="tabIndex==1">
          <div class="topBox">
            <div>
              <h6>充值金额</h6>
              <p>
                RMB
                <i></i>TSC
              </p>
            </div>
            <div>
              <div class="moneyBox">
                ￥
                <input type="number" v-model="money" placeholder="请填写充值金额" />
              </div>
              <div class="tipTxt">DLT实时价格={{$store.state.user.userInfo.guide_price}}TSC</div>
            </div>
            <div class="tip">*充值为100元的整数倍</div>
          </div>
          <div class="botBox">
            <div class="title">付款方式</div>
            <!-- <div class="label" @click="payType=1">
              <i :class="payType==1?'selected':'select'"></i>
              <i class="typeIcon wx"></i>
              <div class="txtTag">
                <p>微信</p>
                <span>微信钱包</span>
              </div>
            </div>-->
            <div class="label" @click="payType=2">
              <i :class="payType==2?'selected':'select'"></i>
              <i class="typeIcon zfb"></i>
              <div class="txtTag">
                <p>支付宝</p>
                <span>快捷支付</span>
              </div>
            </div>
            <!-- <div class="label" @click="payType=3">
              <i :class="payType==3?'selected':'select'"></i>
              <i class="typeIcon bank"></i>
              <div class="txtTag">
                <p>银行卡</p>
                <span>快捷支付</span>
              </div>
            </div>-->
            <div class="label label1">
              <i class="typeIcon dai"></i>
              <div class="txtTag">
                <div class="topTxt">
                  <p>{{title.username}}</p>
                  <span>快捷支付</span>
                  <van-icon name="arrow-up" v-if="showUp" @click="showUp=false" />
                  <van-icon name="arrow-down" v-else @click="showUp=true" />
                </div>
                <van-radio-group v-model="radio" v-if="showUp">
                  <van-radio
                    :name="index"
                    checked-color="#07c160"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="changeSys(item)"
                  >{{item.username}}</van-radio>
                </van-radio-group>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition>
        <div class="tabIndex" v-show="tabIndex==2">
          <div class="topBox">
            <div>
              <h6>提现数量</h6>
              <p>
                GTS
                <i></i>RMB
              </p>
            </div>
            <div>
              <div class="moneyBox">
                GTS
                <input type="number" v-model="withDraw" placeholder="请填写提现数量" />
              </div>
              <!-- <div class="tipTxt">DLT30日涨幅{{$store.state.user.userInfo.point_rate}}%</div> -->
            </div>
            <div class="tip">*提现为1元的整数倍，超出100元只能使用银行卡提现。</div>
          </div>
          <div class="botBox">
            <div class="title">
              <span>收款方式</span>
              <p class="toSetAccount" @click="jumpTo('addAccount')">去设置收款账户 ></p>
            </div>

            <div class="label" @click="payType=1">
              <i :class="payType==1?'selected':'select'"></i>
              <i class="typeIcon wx"></i>
              <div class="txtTag">
                <p>微信</p>
                <span>微信钱包</span>
              </div>
            </div>
            <div v-if="status.is_withdraw_to==1" class="label" @click="payType=2">
              <i :class="payType==2?'selected':'select'"></i>
              <i class="typeIcon zfb"></i>
              <div class="txtTag">
                <p>支付宝</p>
                <span>快捷支付</span>
              </div>
            </div>
            <div v-else class="label" @click="$vux.toast.text('暂未设置该收款账户!')">
              <i class="select"></i>
              <i class="typeIcon zfb"></i>
              <div class="txtTag">
                <p>支付宝</p>
                <span>快捷支付</span>
              </div>
            </div>
            <div v-if="status.is_bind_card==1" class="label" @click="payType=3">
              <i :class="payType==3?'selected':'select'"></i>
              <i class="typeIcon bank"></i>
              <div class="txtTag">
                <p>银行卡</p>
                <span>快捷支付</span>
              </div>
            </div>
            <div v-else class="label" @click="$vux.toast.text('暂未设置该收款账户!')">
              <i class="select"></i>
              <i class="typeIcon bank"></i>
              <div class="txtTag">
                <p>银行卡</p>
                <span>快捷支付</span>
              </div>
            </div>
            <!-- <div class="label label1">
              <i class="typeIcon dai"></i>
              <div class="txtTag">
                <div class="topTxt">
                  <p>{{title.username}}</p>
                  <span>快捷支付</span>
                  <van-icon name="arrow-up" v-if="showUp" @click="showUp=false" />
                  <van-icon name="arrow-down" v-else @click="showUp=true" />
                </div>
                <van-radio-group v-model="radio" v-if="showUp">
                  <van-radio
                    :name="index"
                    checked-color="#07c160"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="changeSys(item)"
                  >{{item.username}}</van-radio>
                </van-radio-group>
              </div>
            </div> -->
          </div>
        </div>
      </transition>
      <div class="btn" v-if="tabIndex==1" @click="toPay()">支付</div>
      <div
        class="btn"
        v-if="tabIndex==2"
        @click="toWithDraw()"
        style="background:#28272F;color:#E7BE7A;"
      >提现</div>
      <div class="tip" v-if="tabIndex==2">*提现72小时内到账</div>
    </div>
    <div class="history" @click="jumpTo('dealInfo?active=2')">交易记录 ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      tabIndex: this.$route.query.type || 1,
      money: "", //充值金额
      withDraw: "", //提现金额
      payType: 2,
      showUp: false,
      radio: 0,
      title: { username: "系统将自动为您匹配运营商" },
      status: "",
      list: [],
    };
  },
  created() {
    this.getStatus();
    this.getList();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  watch: {
    withDraw(e) {
      if (e * 1 >= 100) {
        this.status.is_withdraw_to = 0;
        this.payType = 3;
      } else {
        this.status.is_withdraw_to = 1;
      }
    }
  },
  methods: {
    changeSys(e) {
      console.log(e);
      this.title = e;
      setTimeout(() => {
        this.showUp = false;
      }, 200);
    },
    toPay() {
      if (this.money < 1) {
        return this.$vux.toast.text("支付金额需大于1元!");
      }
      if (this.money % 100 != 0) {
        return this.$vux.toast.text("充值金额为100的整数倍!");
      }
      if (this.payType == 1 || this.payType == 3) {
        return this.$vux.toast.text("该功能暂未开通");
      } else {
        let payType =
          this.payType == 1 ? "wxpay" : this.payType == 2 ? "alipay" : "";
        let operatorId = this.title.id;
        /* this.$router.push(
          "tbauth?url=" +
            this.link +
            "/amoy/trade/test-smart-pay" +
            "?payPrice=" +
            this.money +
            "&uid=" +
            this.$store.state.user.userInfo.uid +
            "&pay_type=" +
            payType +
            "&operator_id=" +
            operatorId
        ); */
        /* this.$router.push({
          name: "tbauth",
          query: {
            urlPay: this.link + "/amoy/trade/test-smart-pay",
            payPrice: this.money,
            uid: this.$store.state.user.userInfo.uid,
            pay_type: payType,
            operator_id: operatorId
          }
        }); */
        this.$http
          .post("/amoy/trade/san-fang-pay", {
            payPrice: this.money,
            operator_id: operatorId,
            pay_type: payType
          })
          .then(res => {
            if (res.code == 0) {
              window.location.href = res.data.payUrl;
              /* this.$router.push({
                name: "tbauth",
                query: {
                  url: res.data.payUrl
                }
              }); */
            }
          });
      }
    },
    getStatus() {
      this.$http.post("/amoy/user/bind-status", true, true).then(res => {
        if (res.code == 0) {
          this.status = res.data;
        }
      });
    },
    getList() {
      this.$http.post("/amoy/trade/operator-list", true, true).then(res => {
        if (res.code == 0) {
          this.list = res.data;
          this.title = {
            username: res.data[0].username,
            id: res.data[0].id
          };
        }
      });
    },
    toWithDraw() {
      if (this.withDraw < 1) {
        return this.$vux.toast.text("提现金额不能小于1!");
      }
      if (this.withDraw % 1 != 0) {
        return this.$vux.toast.text("提现金额为1的整数倍!");
      }
      let payType =
        this.payType == 1
          ? "wxpay"
          : this.payType == 2
          ? "alipay"
          : "bank_card";
      this.$http
        .post(
          "/amoy/trade/trade-sell-coin",
          {
            coin_num: this.withDraw,
            operator_id: this.title.id,
            withdraw_type: payType
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("提现成功,将在72小时之内到账！");
            setTimeout(() => {
              this.$router.push("dealInfo?active=2");
            }, 1000);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  // height: 2rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(40, 39, 47, 1);
  color: #fff;
  h1 {
    height: 0.88rem;
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
  .topInfo {
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      display: flex;
      width: 3rem;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      font-size: 0.29rem;
      color: #c0bfc6;
      > p {
        width: 100%;
        text-align: center;
      }
      .active {
        color: #fff;
        font-size: 0.35rem;
      }
      > i {
        width: 0.45rem;
        height: 0.06rem;
        background: #fff;
        border-radius: 0.05rem;
        margin-top: 0.1rem;
      }
    }
  }
}
.content {
  > .tabIndex {
    > div {
      padding: 0 0.35rem 0;
      background: #fff;
    }
    .botBox{
      padding-bottom: .35rem;
    }
    .tip {
      text-align: center;
      color: #f22;
      height: 1rem;
      line-height: 1rem;
    }
  }
  .topBox {
    height: 3.1rem;
    padding: 0 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 1rem;
      align-items: center;
      h6 {
        font-size: 0.31rem;
      }
      p {
        font-size: 0.21rem;
        color: #cea167;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          width: 0.28rem;
          height: 0.19rem;
          background: url("../../assets/img/hall/order/right.png") no-repeat;
          background-size: 100% 100%;
          margin: 0 0.05rem;
        }
      }
      .moneyBox {
        width: 3.5rem;
        font-size: 0.3rem;
      }
      .tipTxt {
        font-size: 0.19rem;
      }
      input {
        width: 2.5rem;
        background: none;
        border: none;
      }
    }
  }
  .botBox {
    margin-top: 0.2rem;
    .title {
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.31rem;
      font-weight: 700;
      border-bottom: 1px solid #ececec;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .toSetAccount {
      text-align: right;
      color: #999;
      font-size: 0.28rem;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    .label {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
      .select {
        width: 0.53rem;
        height: 0.53rem;
        background: url("../../assets/img/hall/order/sec.png") no-repeat;
        background-size: 100% 100%;
      }
      .selected {
        width: 0.53rem;
        height: 0.53rem;
        background: url("../../assets/img/hall/order/sected.png") no-repeat;
        background-size: 100% 100%;
      }
      .txtTag {
        margin-left: 0.2rem;
        .topTxt {
          width: 5.5rem;
          height: 0.8rem;
          position: relative;
          p {
            font-size: 0.29rem;
            height: 0.3rem;
            height: 0.3rem;
            color: #111;
          }
          span {
            color: #c8c5c8;
            font-size: 0.2rem;
            line-height: 0.5rem;
          }
          .van-icon {
            position: absolute;
            right: 0.3rem;
            top: 0.1rem;
            font-size: 0.3rem;
            color: #aaa;
          }
        }
        /deep/.van-radio-group {
          .van-radio {
            margin-top: 0.2rem;
          }
        }
      }
      .typeIcon {
        margin-left: 0.3rem;
        width: 0.73rem;
        height: 0.73rem;
      }
      .wx {
        background: url("../../assets/img/hall/order/wx.png") no-repeat;
        background-size: 100% 100%;
      }
      .zfb {
        background: url("../../assets/img/hall/order/zfb2.png") no-repeat;
        background-size: 100% 100%;
      }
      .bank {
        background: url("../../assets/img/hall/order/bank.png") no-repeat;
        background-size: 100% 100%;
      }
      .dai {
        background: url("../../assets/img/hall/order/dai.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .label1 {
      display: flex;
      align-items: flex-start;
    }
  }
  .btn {
    width: 6.86rem;
    height: 0.97rem;
    border-radius: 0.1rem;
    background: #d6a75e;
    font-size: 0.34rem;
    color: #fff;
    text-align: center;
    line-height: 0.97rem;
    margin: 0 auto;
    margin-top: 0.7rem;
    margin-bottom: 0.5rem;
  }
  .tip {
    text-align: center;
    color: #f33;
  }
}
.history {
  text-align: center;
  font-size: 0.28rem;
  color: #abb;
  margin-top: 1rem;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
</style>
