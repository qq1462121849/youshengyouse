 <template>
  <div id="login">
    <div class="logoBox"></div>
    <div class="content">
      <div class="label">
        <input type="number" placeholder="请输入手机号" v-model="mobile" />
      </div>
      <div class="label">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
      </div>
      <div class="labelTxt">
        <span @click="jumpTo('forget')">忘记密码？</span>
      </div>
      <div class="btn" @click="login">登录</div>
      <!-- <div class="labelTxt  register">
        
        <span style="color:#CDAB74" @click="jumpTo('register')">注册 </span>
      </div>-->
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../api/index";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (!this.password) {
        this.$vux.toast.text("请输入密码");
        return;
      }
      this.$http
        .post(
          "/amoy/auth/login",
          {
            mobile: this.mobile,
            password: this.password,
            registration_id: this.$store.state.global.registrationId
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUserInfo", res.data);
            this.$router.push(this.$store.state.global.firstNav);
            this.$router.push({
              path: this.$store.state.global.firstNav
            });
            //this.$router.push(this.$store.state.global.firstNav);
            // this.$http.post("/amoy/index/tips-status", true, true).then(res => {
            //   if (res.code == 0) {
            //     let r = res.data;
            //     if (
            //       r.is_real_name &&
            //       r.is_get_live_machine &&
            //       r.is_look_goods
            //     ) {
            //     } else {
            //       this.$router.push("guide1");
            //     }
            //   }
            // });
          }
        });
    }
  },
  created() {
    if(process.env.NODE_ENV != 'production'){
      this.mobile='13011027663',//市
      this.password='123123'
      ///this.mobile='13371632596'
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  * {
    box-sizing: border-box;
  }
  min-height: 100%;
  background: linear-gradient(
    25deg,
    rgba(31, 28, 33, 1) 0%,
    rgba(50, 48, 53, 1) 100%
  );
  overflow: hidden;
}
.logoBox {
  width: 100%;
  height: 2.19rem;
  margin-top: 2rem;
  background: url("../../assets/img/auth/logo.png") no-repeat;
  background-size: 2.19rem 100%;
  background-position: center top;
}
.content {
  margin-top: 0.8rem;
  .label {
    width: 5rem;
    height: 0.88rem;
    margin: 0 auto;
    margin-bottom: 0.36rem;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 0.26rem;

    background: rgba(64, 63, 67, 1);
    border-radius: 4px;
    span {
      color: #fff;
      font-size: 0.28rem;
      margin: 0 0.35rem;
    }
    .userIcon {
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../assets/img/auth/user.png") no-repeat;
      background-size: 100% 100%;
    }
    .clockIcon {
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../assets/img/auth/clock.png") no-repeat;
      background-size: 100% 100%;
    }
    > input {
      width: 3rem;
      height: 0.88rem;
      font-size: 0.28rem;
      color: #fff;
      line-height: 0.88rem;
      padding-left: 0.33rem;
      background: none;
      border: none;
      border-radius: 0.08rem;
    }
  }
  .labelTxt {
    display: flex;
    justify-content: center;

    color: #666;
  }
  .btn {
    width: 5rem;
    font-weight: 700;
    height: 0.8rem;
    background: rgba(231, 192, 135, 1);
    letter-spacing: 0.1em;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    margin: 0 auto;
    margin-top: 0.76rem;
    border-radius: 0.05rem;
    color: rgba(60, 60, 61, 1);
  }
  .register {
    padding-top: 0.26rem;
    font-size: 0.32rem;
    font-weight: 700;
    color: rgba(216, 173, 108, 1);
  }
}
</style>
