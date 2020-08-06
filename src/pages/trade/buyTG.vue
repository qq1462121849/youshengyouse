<template>
  <div id="exchange">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>{{$route.query.type==1?'购买TG':'购买GST'}}</h1>
    </div>
    <div class="dealBox" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="price">{{config.min+'-'+config.max}}</div>
      <div class="title">单价{{$route.query.type==1?'CNY':'TG'}}</div>
      <div class="steper">
        <van-stepper v-model="price" :min="config.min" :max="config.max" step="0.01" />
      </div>
      <div class="number">
        <span>数量</span>
        <input type="number" v-model="num" placeholder="请输入交易数量" />
      </div>
      <div class="tip">{{config.num_limit}}</div>
      <div class="count">
        <span>总价</span>
        <p>{{(price*num).toFixed(2)}}</p>
      </div>
    </div>
    <div class="tips">{{config.message}}</div>
    <div class="tips">温馨提示：您发布的订单7天内无购买则自动下架</div>
    <div class="btn" @click="submit">确认发布</div>

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
      num: "",
      config: [],
      price: 0,
      pwd: "",
      showKeyboard: false,
      show: false
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getConfig();
  },
  methods: {
    submit() {
      if (!this.num) {
        return this.$vux.toast.text("请输入数量！");
      }
      if (this.price > this.config.max) {
        return this.$vux.toast.text("交易单价超出！");
      }
      this.show = true;
      this.showKeyboard = true;
    },
    getConfig() {
      let url = "";
      console.log(this.$route.query.type)
      if (this.$route.query.type ==1) {
        url =
          "/amoy/trade/create-seek-tg-order?trade_type=" + this.$route.query.type;
      } else {
        url =
          "/amoy/trade/create-seek-coin-order?trade_type=" + this.$route.query.type;
      }
      this.$http.get(url).then(res => {
        if (res.code == 0) {
          this.config = res.data;
          this.price=this.config.max
        }
      });
    },
    onInput(key) {
      let url='';
      this.pwd = (this.pwd + key).slice(0, 6);
      if (this.pwd.length == 6) {
        this.showKeyboard = true;
        this.show = false;
       if (this.$route.query.type ==1) {
        url =
          "/amoy/trade/create-seek-tg-order?trade_type=" + this.$route.query.type;
      } else {
        url =
          "/amoy/trade/create-seek-coin-order?trade_type=" + this.$route.query.type;
      }
        this.$http.post(
            url,
            {
              trade_type: this.$route.query.type ,
              coin_num: this.num,
              unit_price: this.price,
              pay_password: this.pwd
            },
            true,
            true
          )
          .then(res => {
            if (res.code == 0) {
              this.$vux.toast.text(
                this.$route.query.type < 4 ? "挂单成功！" : "出售成功！"
              );
              setTimeout(() => {
                if (this.$route.query.type == 3) {
                  this.$router.push("newOrder?type=2&into=2");
                } else {
                  this.goBack();
                }
              }, 500);
            }
          });
      }
    },
    onDelete() {
      this.pwd = this.pwd.slice(0, this.pwd.length - 1);
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
  color: #fff;
  background: rgba(40, 39, 47, 1);
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
.dealBox {
  background: #fff;
  .title {
    font-size: 0.26rem;
    text-align: center;
    color: #666666;
  }
  .steper {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    margin-bottom: 0.15rem;
    /deep/.van-stepper {
      width: 6.9rem;
      .van-stepper__minus {
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        background: none;
        border: 1px solid #aaa;
        margin: 0 0.3rem;
      }
      .van-stepper__input {
        width: 4.3rem;
        height: 0.68rem;
        background: none;
        border: 1px solid #ccc;
        border-radius: 0.1rem;
        margin-left: 0.2rem;
      }
      .van-stepper__plus {
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        background: none;
        border: 1px solid #aaa;
        margin-left: 0.3rem;
      }
    }
  }
  .price {
    text-align: center;
    font-size: 0.6rem;
    color: #333;
  }
  .number {
    width: 6.9rem;
    display: flex;
    align-items: center;
    height: 1rem;
    margin: 0 auto;
    span {
      font-size: 0.3rem;
      color: #333;
      margin: 0 0.3rem;
    }
    input {
      padding-left: 0.3rem;
      width: 4rem;
      height: 0.68rem;
      border: 1px solid #ccc;
      border-radius: 0.05rem;
      font-size: 0.26rem;
    }
  }
  .tip {
    padding-left: 1.5rem;
    color: #aaa;
  }
  .desc {
    width: 6.9rem;
    margin: 0 auto;
    p {
      margin-left: 1.3rem;
      font-size: 0.26rem;
      color: #666;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
  .count {
    width: 6.9rem;
    display: flex;
    align-items: center;
    height: 1rem;
    margin: 0 auto;
    span {
      font-size: 0.3rem;
      margin: 0 0.3rem;
    }
    p {
      color: #d6a75e;
      padding-left: 0.3rem;
      width: 4rem;
      height: 0.68rem;
      line-height: 0.68rem;
      border: 1px solid #ccc;
      border-radius: 0.05rem;
      font-size: 0.26rem;
    }
  }
}
.tips {
  padding: 0 0.5rem;
  font-size: 0.26rem;
  color: #666;
  height: 0.7rem;
  line-height: 0.7rem;
}
.balance {
  padding: 0 0.55rem;
  padding-bottom: 0.3rem;
}
.btn {
  width: 5rem;
  height: 0.88rem;
  background: linear-gradient(-75deg, #d6a75e, #d6a75e);
  color: #fff;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.34rem;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 1rem;
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