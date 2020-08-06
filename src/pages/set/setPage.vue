<template>
  <div id="setting">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>{{title}}</h1>
    </div>
    <div class="content" :style="{marginTop: $store.state.global.statusH+1 + 'rem'}">
      <div class="innerContent" v-show="$route.query.type == 1||$route.query.type == 2">
        <div class="mobileTip">
           <p class="title">您当前绑定手机号</p>
           <p class="mobileNum">{{$store.getters.telmobile}}</p>
        </div>
        <div class="smCodeContent label">
          <input type="number" placeholder="请输入验证码" v-model="smsCode" />
          <span class="smsCode" @click="getCode">{{getcode}}</span>
        </div>
        <div class="label">
          <input type="password" placeholder="请输入密码（密码不少于6位，且要包含数字和字母）" v-model="password" />
        </div>
        <div class="label">
          <input type="password" placeholder="请再次输入密码" v-model="repassword" />
        </div>
        <div class="btn" @click="setBtn">确认修改</div>
      </div>
      <div class="innerContent" v-show="$route.query.type == 3">
        <div v-show="nextStep==false" class="mobileTip">
          <p class="title">您当前绑定手机号</p>
          <p class="mobileNum">{{$store.getters.telmobile}}</p>
          
        </div>
        <div v-show="nextStep==false" class="smCodeContent label">
          <input type="number" placeholder="请输入验证码" v-model="smsCode" />
          <span class="smsCode"   @click="getCode" >{{getcode}}</span>
        </div>
        <div v-show="nextStep==true" class="label">
          <input type="number" placeholder="请输入新手机号" v-model="newMobile" />
        </div>
        <div v-show="nextStep==true" class="label">
          <input type="number" placeholder="请输入验证码" v-model="newSmsCode" />
          <span class="smsCode" @click="getCode">{{getcode}}</span>
        </div>
        <div v-show="nextStep==false" class="btn" @click="nextstep" >更换手机号</div>
        <div v-show="nextStep==true" class="btn" @click="setBtn" >确认更换</div>
      </div>
      <div class="innerContent" v-show="$route.query.type == 4">
        <div class="label">
          <input type="number" placeholder="请输入手机号" disabled v-model="mobile" />
        </div>
        <div class="label">
          <input type="number" placeholder="请输入验证码" v-model="smsCode" />
          <span class="smsCode" @click="getCode">{{getcode}}</span>
        </div>
        <div class="btn" @click="setBtn">确认修改</div>
      </div>
      <div class="innerContent" v-show="$route.query.type == 5">
        <div class="label">
          <input type="text" placeholder="请输入您的微信号" v-model.trim="wxnum" />
        </div>
        <!-- <div class="label">
          <input type="number" placeholder="请输入手机号" disabled v-model="mobile" />
        </div>
        <div class="label">
          <input type="number" placeholder="请输入验证码" v-model="smsCode" />
          <span class="smsCode" @click="getCode">{{getcode}}</span>
        </div>-->
        <div class="btn" @click="setBtn">确认修改</div>
      </div>
    </div>
    <!-- <confirm v-model="show" @on-cancel="show=false" @on-confirm="confirm">
      <p>需要支付5DLT</p>
    </confirm> -->
    <!-- <confirm
      v-model="showZx"
      @on-cancel="cancelZ"
      @on-confirm="confirmZ"
      confirm-text="我再想想"
      cancel-text="确认注销"
    >
      <p>注销后该账号所有数据将清零</p>
    </confirm> -->
  </div>
</template>
<script>
import { Confirm } from "vux";
import { Dialog } from "vant";
import {showNativeToast} from '@/utils'
export default {
  components: {
    Confirm
  },
  data() {
    return {
      show: false, //修改手机号提示框
      showZx: false, //注销提示框
      
      title: "",
      smsCode: "",
      password: "",
      repassword: "",
      newMobile: "",
      newSmsCode: "",
      wxnum: "",
      getcode: "获取验证码",
      timerFlag: false,
      codeType: "",
      nextStep: false,
      timer: null
    };
  },
  created() {
   
    this.mobile = this.$store.state.user.userInfo.mobile;
    if (this.$route.query.type == 1) {
      /* 修改登录密码 */
      this.title = "修改登录密码";
      this.codeType = "reset";
    } else if (this.$route.query.type == 2) {
      /* 修改支付密码 */
      this.title = "修改支付密码";
      this.codeType = "pay_password";
    } else if (this.$route.query.type == 3) {
      /* 更换手机号 */
      this.title = "更换手机号";
    } else if (this.$route.query.type == 4) {
      /* 注销手机号 */
      this.title = "注销";
      this.codeType = "user_log_off";
    } else if (this.$route.query.type == 5) {
      /* 注销手机号 */
      this.title = "设置微信号";
      /* this.codeType = "pay_password"; */
    }
    
  },
  computed:{
    // telmobile(){
    //   return this.$store.state.user.userInfo.mobile.substr(0,3)+'****'+this.$store.state.user.userInfo.mobile.substr(7)
    // }
  },
  methods: {
    // 点击获取验证码
    getCode: function() {
      var mobile = this.mobile;
      if (this.$route.query.type == 3) {
        if (this.nextStep == false) {
          if (!/[0-9]{11}/.test(this.mobile)) {
            showNativeToast("请输入正确的手机号");
            return;
          }
          this.codeType = "check_old";
        } else {
          if (!/[0-9]{11}/.test(this.newMobile)) {
            showNativeToast("请输入正确的手机号");
            return;
          }
          this.codeType = "update";
          mobile = this.newMobile;
        }
      } else {
        if (!/[0-9]{11}/.test(this.mobile)) {
          showNativeToast("请输入正确的手机号");
          return;
        }
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/amoy/auth/sms-verifycode",
            { type: this.codeType, mobile: mobile },
            true
          )
          .then(res => {
            this.timerFlag = !this.timerFlag;
            showNativeToast(res.msg);
            this.countDown(60);
          });
      } else {
        return "";
      }
    },
    // 每秒执行
    countDown(time) {
      let count = time;
      this.timer = setTimeout(() => {
        count--;
        if (time <= 0) {
          this.getcode = "获取验证码";
          this.timerFlag = false;
        } else if (count !== time) {
          this.getcode = "重新获取" + count;
          this.countDown(count);
        }
      }, 1000);
    },
    nextstep() {
      if (!this.smsCode) {
        showNativeToast("请输入正确的验证码!");
        return;
      }
      clearInterval(this.timer);
      this.getcode = "获取验证码";
      this.timerFlag = false;
      this.nextStep = true;
    },
    cancelZ() {
      this.showZx = false;
      this.$http
        .post("/amoy/user/user-log-off", {
          mobile: this.mobile,
          smsCode: this.smsCode
        })
        .then(res => {
          if (res.code == 0) {
            showNativeToast("账号注销成功!");
            this.$store.commit("logout");
            if (config.pcWebDebug) return this.$router.push("login");
           dsBridge.call('toLogin')
          }
        });
    },
    confirmZ() {
      this.showZx = false;
    },
    confirm() {
      var info = {
        mobile: this.newMobile,
        smsCode: this.newSmsCode
      };
      this.$http.post("/amoy/user/update-mobile", info).then(res => {
        if (res.code == 0) {
          showNativeToast("手机号修改成功,请重新登录");
            // this.$store.commit("logout");
            // if (config.pcWebDebug) return this.$router.push("login");
            // dsBridge.call('toLogin')
        }
      });
    },
    setBtn() {
      if (this.$route.query.type == 1) {
        if (!this.smsCode) {
          showNativeToast("请输入正确的验证码!");
          return;
        }
        if (this.password == "") {
          showNativeToast("密码不能为空!");
          return;
        }
        if (this.password !== this.repassword) {
          showNativeToast("两次密码不一致");
          return;
        }
        var info = {
          mobile: this.mobile,
          sms_code: this.smsCode,
          password: this.password,
          re_password: this.repassword
        };
        this.$http.post("/amoy/auth/reset", info).then(res => {
          if (res.code == 0) {
            showNativeToast("重置密码成功！");
            this.$store.commit("logout");
            if (config.pcWebDebug) return this.$router.push("login");
            dsBridge.call('toLogin')
          }
        });
      }
      if (this.$route.query.type == 2) {
        if (!this.smsCode) {
          showNativeToast("请输入正确的验证码!");
          return;
        }
        if (this.password == "") {
          showNativeToast("密码不能为空!");
          return;
        }
        if (this.password !== this.repassword) {
          showNativeToast("两次密码不一致");
          return;
        }
        var info = {
          sms_code: this.smsCode,
          pay_pwd: this.password
        };
        this.$http.post("/amoy/user/set-pay-pwd", info).then(res => {
          if (res.code == 0) {
            showNativeToast("重置密码成功！");
            this.goBack();
          }
        });
      }
      if (this.$route.query.type == 3) {
        /* this.show = true; */
        Dialog.confirm({
          title: "温馨提示",
          message: "更换手机号需要支付"+this.$store.state.user.userInfo.change_mobile_tg+"TG",
          confirmButtonText: "确认支付",
          confirmButtonColor: "取消"
        })
          .then(() => {
            this.confirm();
          })
          .catch(() => {
            // on cancel
            this.show = false;
          });
        /* var info = {
          mobile: this.newMobile,
          smsCode: this.newSmsCode
        };
        this.$http.post("/amoy/user/update-mobile", info).then(res => {
          if (res.code == 0) {
            showNativeToast("重置密码成功！");
            this.goBack();
          }
        }); */
      }
      if (this.$route.query.type == 4) {
        if (!this.smsCode) {
          showNativeToast("请输入正确的验证码!");
          return;
        }
        this.showZx = true;
      }
      if (this.$route.query.type == 5) {
        if (!this.wxnum) {
          return showNativeToast("请输入微信号!");
        }
        this.$http
          .post(
            "/amoy/user/update-wx-num",
            {
              wx_number: this.wxnum
            },
            true,
            true
          )
          .then(res => {
            if (res.code == 0) {
              showNativeToast("设置成功!");
              setTimeout(() => {
               this.goBack()       
              }, 500);
            }
          });
      }
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
 background:linear-gradient(-90deg,rgba(35,32,39,1),rgba(55,53,64,1));
  h1 {
    font-size: 0.34rem;
    color: #fff;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #fff;
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
    width: 5rem;
    height: 0.88rem;
   color:#fff;
    border-radius: 0.08rem;
    
    font-size: 0.34rem;
    line-height: 0.88rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 1.1rem;
    background:rgba(214,167,94,1);

  }
}
.label {
  padding: 0 0.3rem;
  height: 1rem;
  position: relative;
  > input {
    border: none;
    width: 6.9rem;
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
.smsCode {
  position: absolute;
  right: 0.3rem;
  top: 0.25rem;
  width: 1.6rem;
  height: 0.5rem;
  border:1px solid rgba(214,167,94,1);
  color:rgba(214,167,94,1);
  font-size: 0.28rem;
  line-height: 0.5rem;
  text-align: center;
  border-radius: 0.06rem;
}
</style>
