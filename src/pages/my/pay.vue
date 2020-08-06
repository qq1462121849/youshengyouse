<template>
  <div id="pay">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>支付</h1>
    </div>
    <div class="payMoney" :style="{marginTop: statusH +0.88+ 'rem'}">
      <p>{{'￥'+sum}}</p>
      <span>实付金额</span>
    </div>
    <div class="payType">
      <div class="title">选择支付方式</div>
      <div class="label" @click="payType=1">
        <i class="payIcon wx"></i>
        <p>微信支付</p>
        <i :class="payType==1?'selected':'select'"></i>
      </div>
      <div class="label" @click="payType=2">
        <i class="payIcon zfb"></i>
        <p>支付宝支付</p>
        <i :class="payType==2?'selected':'select'"></i>
      </div>
      <div class="label" @click="payType=3">
        <i class="payIcon yh"></i>
        <p>银行卡支付</p>
        <i :class="payType==3?'selected':'select'"></i>
      </div>
    </div>
    <div class="buyBtn" @click="payOrder">确认</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      payType: 1,
      sum: 0
    };
  },
  created() {
    this.sum = this.$route.query.sum;
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    api.setStatusBarStyle({
      style: "dark"
    });
  },
  methods: {
    payOrder() {
      this.$vux.loading.show({
        text: "正在创建订单~"
      });
      var info = {
        sell_id: this.$route.query.id,
        pay_price: this.$route.query.sum,
        coin_num: this.$route.query.num,
        pay_type:
          this.payType == 1
            ? "wx_pay"
            : this.payType == 2
            ? "alipay"
            : "bank_card"
      };
      this.$http.post("/amoy/trade/create-buy-order", info).then(res => {
        if (res.code == 0) {
          if (res.data.order_id) {
            this.$vux.loading.hide();
            this.$router.push({
              name: "payProof",
              query: {
                id: res.data.order_id
              }
            });
          }
        }
      });
    }
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
  background: #fff;
  h1 {
    font-size: 0.34rem;
    color: #333;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #333;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.payMoney {
  width: 100%;
  height: 2.08rem;
  background: #fff;
  border-top: 1px solid #efefef;
  p {
    font-size: 0.44rem;
    color: #ff4a17;
    text-align: center;
    height: 0.44rem;
    line-height: 0.44rem;
    margin-top: 0.72rem;
  }
  span {
    display: block;
    margin-top: 0.32rem;
    font-size: 0.3rem;
    color: #333;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
  }
}
.payType {
  padding: 0.38rem 0.3rem 0.14rem;
  background: #fff;
  margin-top: 0.2rem;
  .title {
    font-size: 0.28rem;
    color: #666;
    margin-bottom: 0.3rem;
  }
  .label {
    height: 1rem;
    border-top: 1px solid #efefef;
    .payIcon {
      float: left;
      width: 0.52rem;
      height: 0.52rem;
      margin-top: 0.24rem;
    }
    p {
      float: left;
      font-size: 0.3rem;
      color: #000;
      height: 1rem;
      line-height: 1rem;
      margin-left: 0.2rem;
    }
    .select {
      float: right;
      width: 0.35rem;
      height: 0.35rem;
      margin-top: 0.34rem;
      background: url("../../assets/img/hall/my/ns.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.1rem;
    }
    .selected {
      float: right;
      width: 0.35rem;
      height: 0.35rem;
      margin-top: 0.34rem;
      background: url("../../assets/img/hall/my/s.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.1rem;
    }
    .wx {
      background: url("../../assets/img/hall/my/wx.png") no-repeat;
      background-size: 100% 100%;
    }
    .zfb {
      background: url("../../assets/img/hall/my/ali.png") no-repeat;
      background-size: 100% 100%;
    }
    .yh {
      background: url("../../assets/img/hall/my/yh.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.buyBtn {
  width: 6.5rem;
  height: 0.88rem;
  margin: 0 auto;
  margin-top: 3rem;
  background: linear-gradient(
    -75deg,
    rgba(255, 72, 23, 1),
    rgba(255, 122, 34, 1)
  );
  color: #fff;
  font-size: 0.34rem;
  text-align: center;
  line-height: 0.88rem;
  border-radius: 0.08rem;
}
</style>