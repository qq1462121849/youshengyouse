<template>
  <div id="tradePwd">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>设置支付密码</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="innerContent">
        <div class="mobileTip">
          <p class="title">您当前绑定手机号</p>
          <p class="mobileNum">{{mobile}}</p>
        </div>
        <div class="smCodeContent label">
          <input type="number" placeholder="请输入验证码" v-model="smsCode" />
          <span class="smsCode" @click="getCode">{{getcode}}</span>
        </div>
        <div class="label">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="label">
          <input type="password" placeholder="请再次输入密码" v-model="repassword" />
        </div>
        <div class="btn" @click="setBtn">确认修改</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      mobile: this.$store.state.user.userInfo.mobile,
      smsCode: "",
      password: "",
      repassword: "",
      getcode: "获取验证码",
      timerFlag: false
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    setBtn() {
      this.$http
        .post(
          "/amoy/user/set-pay-pwd",
          {
            pay_pwd: this.password,
            sms_code: this.smsCode
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("修改成功！");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        });
    },
    // 点击获取验证码
    getCode() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/amoy/auth/sms-verifycode",
            {
              type: "pay_password",
              mobile: this.mobile
            },
            true
          )
          .then(res => {
            if (res.code == 0) {
              this.show = false;
              this.timerFlag = !this.timerFlag;
              this.$vux.toast.text(res.msg);
              this.countDown(60);
            }
          });
      } else {
        return "";
      }
    },
    // 每秒执行
    countDown(time) {
      let count = time;
      setTimeout(() => {
        count--;
        if (time <= 0) {
          this.getcode = "获取验证码";
          this.timerFlag = false;
        } else if (count !== time) {
          this.getcode = "重新获取" + count;
          this.countDown(count);
        }
      }, 1000);
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
.innerContent {
  > div {
    border-bottom: 1px solid #efefef;
    background: #fff;
  }
  .btn {
    width: 6.5rem;
    height: 0.88rem;
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
    border-radius: 0.08rem;
    color: #333;
    font-size: 0.34rem;
    line-height: 0.88rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 1.1rem;
  }
}
.label {
  padding: 0 0.3rem;
  height: 1rem;
  position: relative;
  > input {
    border: none;
    width: 5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
    margin-top: 0.25rem;
    background: none;
  }
}
.mobileTip {
  height: 1.1rem;
  padding: 0.4rem 0.3rem;
  background: #fff;
  .title {
    font-size: 0.3rem;
    color: #666;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: left;
  }
  .mobileNum {
    height: 0.34rem;
    font-size: 0.34rem;
    line-height: 0.34rem;
    color: #333;
    text-align: center;
    margin-top: 0.54rem;
  }
}
</style>