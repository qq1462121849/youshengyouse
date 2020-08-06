<template>
  <div id="proof">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>上传付款凭证</h1>
    </div>
    <div class="content" :style="{marginTop: statusH +0.88+ 'rem'}">
      <div class="topBg">
        <i class="typeIcon"></i>
        <p class="typeTxt">交易中</p>
      </div>
      <div class="oderInfo">
        <div class="orderTitle">订单信息</div>
        <div class="orderInfoList">
          <div>订单编号：{{orderInfo.trade_no}}</div>
          <div>用户ID：{{orderInfo.buy_uid}}</div>
          <div>卖家ID：{{orderInfo.sell_id}}</div>
          <div>
            单价：
            <span>{{'￥'+orderInfo.unit_price}}</span>
          </div>
          <div>
            实付金额：
            <span>{{'￥'+orderInfo.pay_price}}</span>
          </div>
          <div>支付方式：{{orderInfo.pay_type_title}}</div>
          <div>下单时间：{{orderInfo.created_at}}</div>
        </div>
        <div class="getPayInfo">
          <div class="orderTitle">收款信息</div>
          <div class="getPayInfo">
            <div class="label" v-if="orderInfo.pay_type=='bank_card'">
              <i class="typeIcon"></i>
              <p class="num">{{orderInfo.bank_card_config.bank_account}}</p>
              <p class="cardType">中国工商银行(郑州桐柏路支行)</p>
              <p class="cardname">收款人姓名：{{orderInfo.bank_card_config.real_name}}</p>
            </div>
            <div class="label" v-if="orderInfo.pay_type=='alipay'">
              <i class="typeIconZfb"></i>
              <p class="payName">账户名称：{{orderInfo.alipay_config.alipay_nickname}}</p>
              <p class="payAccount">账号：{{orderInfo.alipay_config.alipay_account}}</p>
            </div>
            <div class="label" v-if="orderInfo.pay_type=='wx_pay'">
              <i class="typeIconWx"></i>
              <p class="payName">账户名称：{{orderInfo.wx_config.wx_nickname}}</p>
              <p class="payAccount">账号：{{orderInfo.wx_config.wx_account}}</p>
            </div>
          </div>
        </div>
        <div class="payInfo">
          <div class="orderTitle">付款信息</div>
          <div class="payAuth">
            <p>付款凭证</p>
            <div class="imgcontent">
              <Uploader v-show="!haveImg" class="addImg" :after-read="afterRead"></Uploader>
              <img v-show="haveImg" class="Img" :src="img" alt />
              <i v-show="haveImg" @click="closeImg" class="closeIcon"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="payBtn" @click="affirmPay">确认付款</div>
    </div>
  </div>
</template>
<script>
import Uploader from "vant/lib/uploader";
import "vant/lib/uploader/style";
export default {
  components: {
    Uploader
  },
  data() {
    return {
      statusH: 0,
      img: "",
      haveImg: false,
      orderInfo: []
    };
  },
  created() {
    this.getOrderInfo();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  methods: {
    afterRead(file) {
      if (file) {
        this.img = file.content;
        this.haveImg = true;
      }
    },
    closeImg() {
      this.haveImg = false;
      this.img = "";
    },
    getOrderInfo() {
      this.$http
        .post("/amoy/trade/order-detail", {
          order_id: this.$route.query.id
        })
        .then(res => {
          if (res.code == 0) {
            console.log(res.data);
            this.orderInfo = res.data;
          }
        });
    },
    affirmPay() {
      if (!this.img) {
        return this.$vux.toast.text("请先上传付款凭证！");
      }
      this.$vux.loading.show({
        text: "请稍后~"
      });
      var info = {
        order_id: this.orderInfo.id,
        trade_img: this.img
      };
      this.$http.post("/amoy/trade/pay-confirm", info).then(res => {
        if (res.code == 0) {
          this.$vux.loading.hide();
          this.$vux.toast.text("付款成功！");
          this.$router.push("trading");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#proof {
  min-height: 100%;
  padding-bottom: 1rem;
}
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
.topBg {
  height: 1.24rem;
  width: 100%;
  background: url("../../assets/img/hall/order/bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .typeIcon {
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    background: url("../../assets/img/hall/order/dengdai.png") no-repeat;
    background-size: 100% 100%;
    top: 0.47rem;
    left: 0.4rem;
  }
  .typeTxt {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.3rem;
    color: #fff;
    position: absolute;
    left: 0.88rem;
    top: 0.48rem;
  }
}
.oderInfo {
  width: 6.9rem;
  height: 5.2rem;
  background: #fff;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  .orderInfoList {
    padding: 0 0.55rem;
    > div {
      height: 0.6rem;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.6rem;
      span {
        color: #ff4900;
      }
    }
  }
}
.orderTitle {
  height: 0.87rem;
  padding: 0 0.21rem;
  font-size: 0.3rem;
  line-height: 0.87rem;
  color: #333;
  border-bottom: 1px solid #efefef;
}
.getPayInfo {
  width: 6.9rem;
  padding-bottom: 0.2rem;
  background: #fff;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  overflow: hidden;
  .label {
    overflow: hidden;
    margin-top: 0.1rem;
    position: relative;
    .typeIcon {
      float: left;
      width: 0.38rem;
      height: 0.3rem;
      background: url("../../assets/img/hall/order/card.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.58rem;
    }
    .typeIconZfb {
      float: left;
      width: 0.38rem;
      height: 0.38rem;
      background: url("../../assets/img/hall/order/zfb.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.58rem;
    }
    .typeIconWx {
      float: left;
      width: 0.38rem;
      height: 0.38rem;
      background: url("../../assets/img/hall/auth/wxlogin.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.58rem;
    }
    .num {
      height: 0.3rem;
      line-height: 0.3rem;
      font-size: 0.28rem;
      color: #666;
      padding-left: 1.2rem;
    }
    .cardType {
      height: 0.28rem;
      line-height: 0.28rem;
      font-size: 0.28rem;
      margin-top: 0.15rem;
      color: #666;
      padding-left: 1.2rem;
    }
    .cardname {
      height: 0.28rem;
      line-height: 0.28rem;
      font-size: 0.28rem;
      color: #666;
      margin-top: 0.15rem;
      padding-left: 1.2rem;
    }
    .payName {
      height: 0.35rem;
      line-height: 0.35rem;
      padding-left: 1.2rem;
      font-size: 0.28rem;
    }
    .payAccount {
      font-size: 0.28rem;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-top: 0.2rem;
      padding-left: 1.2rem;
    }
  }
}
.payInfo {
  width: 6.9rem;
  background: #fff;
  border-radius: 0.2rem;
  margin-top: 0.2rem;
  overflow: hidden;
  .payAuth {
    margin-top: 0.33rem;
    padding: 0 0.57rem;
    height: 1.6rem;
    position: relative;
    p {
      float: left;
      font-size: 0.28rem;
      color: #666;
    }

    #file_head {
      border: none;
      color: rgba(255, 255, 255, 0);
      position: absolute;
      left: 2rem;
      top: 0.5rem;
    }
    .imgcontent {
      float: left;
      margin-left: 0.31rem;
      width: 2rem;
      height: 2rem;
      position: relative;
      .addImg {
        float: left;
        margin-left: 0.31rem;
      }
      .Img {
        width: 1.8rem;
        height: 1.8rem;
        float: left;
        margin-left: 0.31rem;
      }
      .closeIcon {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/img/hall/order/close.png") no-repeat;
        background-size: 100% 100%;
        right: 0.1rem;
        top: 0.1rem;
      }
    }
  }
}
.payBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  font-size: 0.34rem;
  background: linear-gradient(
    -75deg,
    rgba(255, 72, 23, 1),
    rgba(255, 122, 34, 1)
  );
}
</style>