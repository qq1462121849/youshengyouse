<template>
  <div id="register">
    <div class="headerBox"  :style="{paddingTop:$store.state.global.statusH+'rem'}" >
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>注册</h1>
    </div>
    <div class="content" :style="{paddingTop:1.5+$store.state.global.statusH+'rem'}" >
      <div class="label">
        <input type="number" placeholder="请输入手机号码" v-model="mobile" />
      </div>
      <div class="label1 label">
        <input type="number" placeholder="请输入验证码" v-model="smsCode" />
        <span @click="toGetCode">{{getcode}}</span>
      </div>
      <div class="label">
        <input :type="type1" placeholder="请设置密码" v-model="pwd" />
       
      </div>
      <div class="label">
        <input :type="type2" placeholder="请确认密码" v-model="rePwd" />
        
      </div>
      <div class="label2">
        <label > <span>邀请码</span> <input type="text" placeholder="请输入邀请码" v-model="inviteCode" /> </label>
        

      </div>
      <div class="label" style="justify-content: center;">
       
        <van-checkbox  icon-size="0.32rem" v-model="imgSrcFlag"  checked-color="#666"  ></van-checkbox>
        <span  @click="jumpTo('protocolTxt')" style="color:rgba(102,102,102,1);padding-left:5px">已阅读服务条款</span>
      </div>
      <div class="btn" @click="register">注册</div>
    </div>
    <van-popup v-model="show" :closeable="true">
      <div class="codeBox">
        <div class="imgBox">
          <i></i>
          <p>请输入图片验证码</p>
        </div>
        <div class="codes">
          <input type="text" v-model="identifyCodes" placeholder="请输入验证码" />
          <div @click="refreshCode">
            <identify class="txCode" :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <div class="btn" @click="getCode">确定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import identify from "../../components/identify";
export default {
  components: {
    identify
  },
  data() {
    return {
      statusH: 0,
      show: false,
      getcode: "获取验证码",
      imgSrcFlag: true,
      timerFlag: false,
      identifyCode: "4568",
      mobile: "",
      pwd: "",
      rePwd: "",
      smsCode: "",
      inviteCode: "",
      identifyCodes: "",
      show1: true,
      show2: true,
      type1: "password",
      type2: "password"
    };
  },
  mounted() {
    console.log(this.getmd5(1000));
    this.inviteCode = this.getQueryString("code")
      ? this.getQueryString("code")
      : "";
     // this.refreshCode();
  },
  methods: {
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    toGetCode() {
      
      if (this.timerFlag == false) {
        if (!/[0-9]{11}/.test(this.mobile)) {
         return   this.$vux.toast.text("请输入正确的手机号");
          
        } else {
          this.countDown(60);
          this.$http
            .post(
              //"/amoy/auth/get-number",
             "/amoy/auth/sms-verifycode",
              {
                mobile: this.mobile,
                type:'register'
              },
              true,
              
            )
            .then(res => {
              if (res.code == 0) {
               // this.identifyCode = res.data + "";
               // this.show = true;
               
              }
            });
        }
      }
    },
    refreshCode() {
      this.$http
        .post(
          //"/amoy/auth/get-number",
          "/amoy/auth/sms-verifycode",
          {
            mobile: this.mobile
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.identifyCode = res.data + "";
          }
        });
    },
    register() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (!this.smsCode)   return this.$vux.toast.text("请输入验证码");
      if (!this.imgSrcFlag) {
        this.$vux.toast.text("请先勾选用户使用协议");
        return;
      }
      var info = {
        mobile: this.mobile,
        type: "register",
        sms_code: this.smsCode,
        invite_code: this.inviteCode,
        password: this.pwd,
        re_password: this.rePwd
      };
      this.$http.post("/amoy/auth/register", info, true).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg);
          this.$router.push("/login");
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    // 点击获取验证码
    getCode() {
      /* if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      } */
      if (this.identifyCodes !== this.identifyCode) {
        this.$vux.toast.text("图形验证码错误");
        return;
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/amoy/auth/sms-verifycode",
            {
              type: "register",
              mobile: this.mobile,
              code: this.getmd5(this.identifyCode)
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
      this.timerFlag = true
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
    },
  
    getmd5(code) {
      var a;
      var md5 = this.$md5(code + "DLT001");
      return md5;
    }
  }
};
</script>
<style lang="less" scoped>
#register {
  * {
    box-sizing: border-box;
  }
  min-height: 100%;
  background:linear-gradient(25deg,rgba(31,28,33,1) 0%,rgba(50,48,53,1) 100%);
  overflow: hidden;
  /deep/.van-popup {
    border-radius: 0.2rem;
    background: #fff;
    .imgBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      i {
        width: 1.07rem;
        height: 1.07rem;
        background: url("../../assets/img/auth/code.png") no-repeat;
        background-size: 100% 100%;
      }
      p {
        width: 100%;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.3rem;
      }
    }
  }
  /deep/.van-checkbox__icon .van-icon{
    border:0.04rem solid rgba(102,102,102,1);
  }
  /deep/.van-icon-success{
    transform: scale(0.76);
  }
}
.headerBox {
  width: 100%;
  height: 0.58rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  
  padding-bottom: 0.4rem;
  h1 {
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  span {
    position: absolute;
    right: 0.3rem;
    top: 0;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #bebdc4;
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
  width: 5rem;
  margin: auto;
  //margin-top: 1.5rem;
  input {
    border: none;
    background: none;
    color: #000;
    height: 0.88rem;
    font-size: 0.28rem;
    line-height: 0.28rem;
  }
  .label {
    position: relative;
   
    height: 0.88rem;
    margin-bottom: 0.36rem;
    display: flex;
    align-items: center;
    font-size: 0.26rem;

    > input {
      color: #fff;
      padding-left: 0.3rem;
      width: 5rem;
      height: 0.88rem;
      font-size: 0.28rem;
      color: #fff;
      line-height: 0.88rem;
      border: none;
      border-radius: 0.08rem;
      background:rgba(64,63,67,1);

    }
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/img/auth/select.png") no-repeat;
      background-size: 100% 100%;
    }
    .icond {
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/img/auth/selectd.png") no-repeat;
      background-size: 100% 100%;
    }
    p {
      width: 1.5rem;
      font-size: 0.28rem;
      color: #000;
      margin-left: 0.3rem;
    }
    .eyesIcon {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../assets/img/auth/close.png") no-repeat;
      background-size: 100% 100%;
      right: 0.5rem;
    }
    .eyesOpenIcon {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../assets/img/auth/open.png") no-repeat;
      background-size: 100% 100%;
      right: 0.5rem;
    }
  }
 .label1 {
    height: 0.88rem;
   width: 5rem;
    padding-left: 0;
    border-radius: 0.08rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 0.36rem;
    background:rgba(64,63,67,1);
    > input {
      width:3.28rem;

    }
    
    span {
      width: 1.5rem;
      height: 0.4rem;
      border: 1px solid #fff;
      border-radius: 0.2rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #fff;
    }
    p {
      width: 1.5rem;
      font-size: 0.28rem;
      margin-left: 0.3rem;
    }
  }
  .label2 {
    height: 0.88rem;
    padding-left: 0.3rem;
    margin: 0 auto;
    margin-top: 0.36rem;
    display: flex;
    align-items: center;
     background:rgba(64,63,67,1);
    border-radius: 0.08rem;
     input {
      width: 3.6rem;
      color: #d8ad6c;
      &::placeholder{
        text-align: right;
      }
    }
    span {
      color: #d8ad6c;
      font-size: 0.28rem;
      width: 1.2rem;
      height: 0.88rem;
      line-height: 0.88rem;
    }
    p {
      width: 1.5rem;
      margin-left: 0.3rem;
      font-size: 0.28rem;
    }
  }
  .btn {
    width: 5rem;
    height: 0.72rem;
   
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.88rem;
   color:rgba(60,60,61,1);
    font-size: 0.28rem;
    margin: 0 auto;
    margin-bottom: 0.38rem;
    font-weight: 700;
   height:0.88rem;
  background:linear-gradient(-30deg,rgba(227,185,125,1) 0%,rgba(240,214,160,1) 100%);

  }
}
.codeBox {
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  .codes {
    width: 4rem;
    height: 0.6rem;
    padding: 0.14rem;
    border: 1px solid #ccc;
    border-radius: 0.08rem;
    display: flex;
    justify-content: space-between;
    > input {
      width: 2rem;
      height: 0.6rem;
      background: none;
      border: none;
      color: #000;
      font-size: 0.28rem;
    }
  }
  .btn {
    width: 4rem;
    height: 0.72rem;
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
    border-radius: 0.08rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.72rem;
    text-align: center;
    margin-top: 0.32rem;
  }
}
</style>

