<template>
  <div id="forget">
    <div class="header">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">重置密码</div>
    </div>
    <div class="flexBox">
      <div class="loginChoiceBox">
        <div class="labelBox">
          <div class="label2 label">
            <i class="icon sms"></i>
            <input type="text" placeholder="请输入账号" v-model="account" />
          </div>
          <div class="label1 label">
            <i class="icon phone"></i>
            <input :type="inputType" placeholder="请设置密码" v-model="password" />
            <i v-if="isopenEye" @click="closeEye" class="closeIcon"></i>
            <i v-else @click="openEye" class="eyeIcon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="nextBtn" @click="resetPwd">确定</div>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      getcode: "获取验证码",
      timerFlag: false,
      account: "", //账号
      mobile: "", //手机号
      smsCode: "", //验证码
      password: "", //密码
      re_password: "", //重复密码
      inputType: "password",
      isopenEye: false
    };
  },
  created() {
    this.mobile = this.$route.query.mobile;
    this.smsCode = this.$route.query.sms_code;
  },
  mounted: function() {
    // 删除
  },
  methods: {
    openEye() {
      this.inputType = "text";
      this.isopenEye = true;
    },
    closeEye() {
      this.inputType = "password";
      this.isopenEye = false;
    },
    //重置密码
    resetPwd() {
      var info = {
        account: this.account,
        mobile: this.mobile,
        sms_code: this.smsCode,
        password: this.password,
        re_password: this.password
      };
      this.$http.post("/amoy/auth/reset", info).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$vux.toast.text("重置密码成功！");
          this.$store.commit("logout");
          if (config.pcWebDebug) return this.$router.push("login");
          dsBridge.call('toLogin')
        }
      });
    }, // 点击获取验证码
    getCode: function() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/amoy/auth/sms-verifycode",
            {
              type: "reset",
              mobile: this.mobile
            },
            true
          )
          .then(res => {
            this.timerFlag = !this.timerFlag;
            this.$vux.toast.text(res.msg);
            this.countDown(60);
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
#forget {
  min-height: 100%;
}

.header {
  height: 1.28rem;
  background: linear-gradient(
    90deg,
    rgba(54, 128, 240, 1) 0%,
    rgba(54, 92, 240, 1) 100%
  );
  position: relative;
  overflow: hidden;
  .backBox {
    position: absolute;
    left: 0.3rem;
    top: 0.6rem;
    width: 0.18rem;
    height: 0.3rem;
    color: #fff;
    font-size: 0.3rem;
  }
  .title {
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    margin-top: 0.68rem;
    color: #fff;
    font-size: 0.34rem;
  }
}
.flexBox {
  height: 2.8rem;
  background: #fff;
  margin-top: 0.2rem;
  padding: 0 0.4rem;
}
.nextBtn {
  width: 4.5rem;
  height: 0.76rem;
  color: #fff;
  text-align: center;
  line-height: 0.76rem;
  border-radius: 0.5rem;
  background: rgba(54, 92, 240, 1);
  margin: 0 auto;
  margin-top: 1.2rem;
  font-size: 0.3rem;
}
.label {
  padding: 0 0.1rem;
  height: 0.54rem;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  padding-top: 0.5rem;
  position: relative;
  i {
    float: left;
    width: 0.45rem;
    height: 0.45rem;
  }
  .phone {
    background: url("../../assets/img/qb/auth/pwd.png") no-repeat;
    background-size: 100% 100%;
  }
  .sms {
    background: url("../../assets/img/qb/auth/sms.png") no-repeat;
    background-size: 100% 100%;
  }
  input {
    padding-left: 0.25rem;
    border: none;
    float: left;
    height: 0.45rem;
    line-height: 0.45rem;
  }
  .getCode {
    float: right;
    color: #0f5dff;
    font-size: 0.24rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .eyeIcon {
    position: absolute;
    width: 0.4rem;
    height: 0.2rem;
    background: url("../../assets/img/qb/auth/yanjing@2x.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    z-index: 10;
  }
  .closeIcon {
    position: absolute;
    width: 0.4rem;
    height: 0.2rem;
    background: url("../../assets/img/qb/auth/eye.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    z-index: 10;
  }
}
</style>
