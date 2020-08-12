<template>
  <div id="proof">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>查看订单</h1>
    </div>
    <div class="content" :style="{marginTop: statusH +0.88+ 'rem'}">
      <div class="accountBox">
       
         <div class="copytitle">
          <p style="font-weight:700;color:#333;">支付宝账户：{{config.alipay}}</p>
         <i class="clip" @click="copyTextShare(config.alipay)"></i>
        </div>
        <div class="copytitle">
          <p style="font-weight:700;color:#333;">姓名：{{config.realname}}</p>
         <i class="clip" @click="copyTextShare(config.realname)"></i>
        </div>
      </div>
     
      <div class="accountBox" style="margin-top:0.3rem">
        <div class="copytitle">
          <p>收款账户：{{config.bank_account}}</p>
          <i class="clip" @click="copyTextShare(config.bank_account)"></i>
        </div>
        <p>收款人姓名：{{config.bank_account_name}}</p>
        <p>银行：{{config.bank_name}}</p>
        <p>开户行：{{config.bank_open_name}}</p>
      </div>
      <div class="orderInfo">
        <div class="title">订单信息</div>
        <div class="num">
         {{type==1?'TG':'GST'}}数量：
          <span>{{config.coin_num}}</span>
        </div>
        <div class="num">
          支付金额：
          <span>￥{{config.total_price}}</span>
        </div>
        <div class="num">
          订单号：
          <span>{{config.trade_no}}</span>
          <i class="clip" @click="copyTextShare(config.trade_no)"></i>
        </div>
        <div class="num">
          出售者电话:
          <span>{{config.sell_mobile}}</span>
          <i class="clip" @click="copyTextShare(config.sell_mobile)"></i>
        </div>
        <div class="num">
          求购者电话:
          <span>{{config.buy_mobile}}</span>
          <i class="clip" @click="copyTextShare(config.buy_mobile)"></i>
        </div>
      </div>
      <div class="orderInfo">
        <div class="title">支付凭证</div>
        <div class="imgBox" v-if="config.img_url ">
          <img v-for="(item, index) in config.img_url.split(',')" :key="index" :src="item" alt />
        </div>
      </div>
      <!-- <div class="btn" @click="confirm">确认收款</div> -->
    </div>
    <van-popup v-model="showBig">
      <div id="authReward1">
        <img :src="config.qrcode" alt="支付宝收款码" />
      </div>
    </van-popup>

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '8rem' }"
      close-icon="cross"
      closeable
    >
      <div class="title">请输入交易密码</div>
      <div class="pwdBox">
        <van-password-input :value="pwd" :focused="showKeyboard" @focus="showKeyboard = true" />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      h: 24,
      m: 59,
      s: 59,
      img: [],
      fileList: [],
      config: [],
      timer: null,
      showBig: false,
      pwd: "",
      showKeyboard: false,
      show: false,
      type:this.$route.query.type
    };
  },
  created() {
    
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getConfig();
  },
  methods: {
    getConfig() {
      let url=this.$route.query.type==1?'/amoy/trade/tg-order-detail':'/amoy/trade/sell-order-detail'
      this.$http.post( url,
          {
            order_id: this.$route.query.id
          },
          true,
          
        )
        .then(res => {
          if (res.code == 0) {
            this.config = res.data;
            let time = res.data.period_time;
            this.timer = setInterval(() => {
              time--;
              if (time > 0) {
                console.log(time);
                this.h = this.diffTime(time).h;
                this.m = this.diffTime(time).m;
                this.s = this.diffTime(time).s;
              } else {
                clearInterval(this.timer);
              }
            }, 1000);
          }
        });
    },
    diffTime(d1) {
      let h = parseInt((d1 / 60 / 60) % 24);
      let m = parseInt((d1 / 60) % 60);
      let s = parseInt(d1 % 60);
      return {
        h: h >= 10 ? h : "0" + h,
        m: m >= 10 ? m : "0" + m,
        s: s >= 10 ? s : "0" + s
      };
    },
    confirm() {
      this.showKeyboard = true;
      this.show = true;
    },
    onInput(key) {
      this.pwd = (this.pwd + key).slice(0, 6);
      if (this.pwd.length == 6) {
        this.showKeyboard = true;
        this.show = false;
        this.$http
          .post(
            "/amoy/trade/confirm-sell-order?order_id=" + this.$route.query.id,
            {
              pay_password: this.pwd
            },
            true,
            true
          )
          .then(res => {
            if (res.code == 0) {
              this.$vux.toast.text("确认成功！");
              setTimeout(() => {
                this.$router.go(-1);
              }, 500);
            }
          });
      }
    },
    onDelete() {
      this.pwd = this.pwd.slice(0, this.pwd.length - 1);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#proof {
  min-height: 100%;
  padding-bottom: 1.2rem;
   .copytitle {
    height: 0.6rem;
    
    font-size: 0.28rem;
    color: #333;
    display: flex;
    align-items: center;
    .clip {
      width: 0.26rem;
      height: 0.26rem;
      background: url("./img/clip.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.2rem;
    }
  }
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  background: #32303a;

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
  padding: 0 0.3rem;
  .topBox {
    .time {
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .point_s {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #666;
      }
      .point_m {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #666;
        margin: 0 0.1rem;
      }
      .point_b {
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        background: #666;
      }
      .thunderIcon {
        width: 0.2rem;
        height: 0.25rem;
        //background: url("../../assets/img/l.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
      .endTime {
        margin: 0 0.2rem;
        font-size: 0.25rem;
        font-weight: 700;
        span {
          background: #333;
          border-radius: 0.1rem;
          color: #fff;
          padding: 0.05rem;
        }
      }
    }
  }
  .accountBox {
    background: #fff;
    margin: 0 auto;
    border-radius: 0.1rem;
    padding: 0.3rem;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .zfb {
      width: 2rem;
      height: 3rem;
      border: 1px solid #ccc;
      border-radius: 0.1rem;
      display: block;
      margin: 0.2rem auto;
    }
    .usdtBox {
      display: flex;
      align-items: center;
      background: #f7f7f7;
      border-radius: 0.1rem;
      padding: 0.3rem;
      .copyIcon {
        width: 0.3rem;
        height: 0.4rem;
        //background: url("../../assets/img/copy.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
    }
    p {
      font-size: 0.3rem;
    }
  }
  .orderInfo {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.25rem;
    border-radius: 0.1rem;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .num {
      color: #666666;
      font-size: 0.28rem;
      height: 0.5rem;
      line-height: 0.5rem;
      span {
        color: #d6a75e;
      }
      .clip {
        width: 0.26rem;
        height: 0.26rem;
        display: inline-block;
        background: url("./img/clip.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
    }
  }
  .imgBox {
    > img {
      display: block;
      width: 90%;
      margin: 0.2rem auto;
    }
  }
}
.btn {
  width: 5rem;
  height: 0.88rem;
  background: #d6a75e;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.88rem;
  margin: 0 auto;
  margin-top: 0.5rem;
}
#authReward1 {
  width: 5rem;
}
.van-popup {
  .title {
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.3rem;
    font-size: 0.3rem;
  }
  .pwdBox {
    .van-password-input {
      margin: 0;
      width: 100%;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li {
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        border: 1px solid #aaa;
        -webkit-flex: none;
        border-radius: 0.1rem;
        margin: 0 0.1rem;
      }
      .van-hairline--surround::after {
        border-width: 0;
      }
    }
  }
}
</style>