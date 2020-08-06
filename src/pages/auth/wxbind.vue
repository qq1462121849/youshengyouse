<template>
  <div id="register1">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div v-if="show" style="marginTop:1rem">
      <div class="register_list input_list">
        <div class="label1">
          <input type="tel" placeholder="请输入手机号" v-model="mobile" />
        </div>
        <div class="label2">
          <input type="text" placeholder="请输入验证码" v-model="smsCode" />
          <span
            style="background:linear-gradient(-75deg,rgba(255,72,23,1),rgba(255,122,34,1));"
            @click="handSmsCode"
          >{{getCode}}</span>
        </div>
        <div class="label5" v-if="invite">
          <input type="text" placeholder="请输入邀请码" v-model="invite_code" />
          <!--  <span
            @click="clip"
            :style="{background: $store.state.global.theme.mainColor}"
            class="clip"
          >一键粘贴</span>-->
        </div>
        <!--         <p>
          <img :src="imgSrc" @click="onPitch">
          登录注册即表示同意
          <span @click="jumpTo('/about?title=用户使用协议&type=7')">《用户使用协议》</span>
        </p>-->
      </div>
      <button
        class="wxbindBtn"
        style="width:6.6rem;display:block;margin:0 auto;background:linear-gradient(-75deg,rgba(255,72,23,1),rgba(255,122,34,1));color:#fff;marginTop:1rem;"
        @click="login"
        :disabled="smsCode === ''"
      >登录</button>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
export default {
  name: "register",
  data() {
    return {
      imgSrc: "./static/img/auth/pitch_on.png",
      pitchOn: "./static/img/auth/pitch_on.png",
      unPitchOn: "./static/img/auth/un_pitch_on.png",
      imgSrcFlag: false,
      getCode: "获取验证码",
      timerFlag: false,
      mobile: "",
      smsCode: "",
      invite_code: "",
      password: "",
      re_password: "",
      show: true,
      code: "",
      invite: false
    };
  },
  inject: ["reload"],
  methods: {
    login() {
      let info = {
        mobile: this.mobile,
        sms_code: this.smsCode,
        invite_code: this.invite_code,
        access_token: this.$route.query.token,
        openid: this.$route.query.openid,
      };
      this.$http.post("/amoy/auth/we-login", info, true, true).then(res => {
        if (res.code === 0) {
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("setUserInfo", res.data);
          /* this.$store.commit("setCouponpassMoney", res.data.couponpass_money); */
          //this.reload();
          this.$router.push(this.$store.state.global.firstNav);
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    // 是否选中服务条款
    onPitch() {
      this.imgSrcFlag = !this.imgSrcFlag;
      if (this.imgSrcFlag === true) {
        this.imgSrc = this.unPitchOn;
      } else {
        this.imgSrc = this.pitchOn;
      }
    },
    // 点击获取验证码
    handSmsCode() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/amoy/auth/sms-verifycode",
            {
              mobile: this.mobile,
              type: "bind"
            },
            true,
            true
          )
          .then(res => {
            if (res.code === 0) {
              this.invite = res.data.isShowInvite;
              this.timerFlag = !this.timerFlag;
              this.$vux.toast.text(res.msg);
              this.countDown(60);
            } else {
              this.$vux.toast.text(res.msg);
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
          this.getCode = "获取验证码";
          this.timerFlag = false;
        } else if (count !== time) {
          this.getCode = "重新获取" + count;
          this.countDown(count);
        }
      }, 1000);
    },
    //获取地址
    getLocation() {
      if (window.api) {
        var map = api.require("bMap");
        var lon = 0;
        var lat = 0;
        var that = this;
        map.getLocation(
          {
            accuracy: "10m",
            autoStop: true,
            filter: 1
          },
          (ret, err) => {
            if (ret.status) {
              if (api.systemType === "ios") {
                map.initMapSDK(ret1 => {
                  if (ret1.status) {
                    this.getNameFromCoords(map, ret);
                  }
                });
              } else {
                this.getNameFromCoords(map, ret);
              }
            } else {
              alert(err.code);
            }
          }
        );
      } else {
        return false;
      }
    },
    getNameFromCoords(bMap, content) {
      bMap.getNameFromCoords(
        {
          lon: content.lon,
          lat: content.lat
        },
        (ret, err) => {
          if (ret.status) {
            this.province = ret.province;
            this.city = ret.city;
            this.district = ret.district;
            this.site = ret.province + "," + ret.city + "," + ret.district;
            this.$store.commit("setSite", this.site);
          } else {
            console.error(err);
          }
        }
      );
    }
  },
  mounted() {
    // 删除
    this.getLocation();
  }
};
</script>

<style scoped>
</style>
