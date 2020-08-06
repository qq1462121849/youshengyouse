<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>实名认证</h1>
      <span :style="{top: $store.state.global.statusH + 'rem'}" @click="jumpTo('ysyshome')">跳过</span>
    </div>
    <div class="content" :style="{marginTop: $store.state.global.statusH+1 + 'rem'}">
      <div class="iconBox">
        <div class="line"></div>
        <div class="model">
          <span
            style="background:linear-gradient(270deg,rgba(234,190,123,1) 0%,rgba(197,148,69,1) 100%);"
          >
            <i class="icon1"></i>
          </span>
          <p style="color:#111">1.填写身份证</p>
        </div>
        <div class="model">
          <span>
            <i class="icon2"></i>
          </span>
          <p>2.实人认证</p>
        </div>
        <div class="model">
          <span>
            <i class="icon3"></i>
          </span>
          <p>3.认证成功</p>
        </div>
      </div>
      <div class="label">
        <p>真实姓名</p>
        <input type="text" placeholder="您的真实姓名" v-model.trim="name" />
      </div>
      <div class="label">
        <p>身份证号</p>
        <input type="text" placeholder="您的身份证号" v-model.trim="idNum" />
      </div>
      <div class="txtTip">
        <div class="title">用户须知</div>
        <p>添加收款账号，请务必填写真实姓名，银行卡号和开户行地址，确保信息准确以保证收款成功。</p>
      </div>
      <div class="btn" @click="nextStep">人脸识别</div>
    </div>
  </div>
</template>
<script>
import { storage, isAdult } from "@/utils";
export default {
  data() {
    return {
      name: "",
      idNum: ""
    };
  },

  created() {},
  methods: {
    nextStep() {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!/[\u4e00-\u9fa5]{2,10}/.test(this.name))
        return this.$vux.toast.text("请输入您的真实姓名");
      if (reg.test(this.idNum) === false) {
        return this.$vux.toast.text("请输入正确的身份证号!");
      }
      if (!isAdult(this.idNum)) return this.$vux.toast.text("您未满18岁不能进行实名");
       

      if (this.$route.query.intoType == "guide") {
        // this.jumpTo({
        //   name: "faceAuth",
        //   query: {
        //     name: this.name,
        //     idNum: this.idNum,
        //     intoType: "guide"
        //   }
        // });

        this.jumpTo(
          "/faceAuth?name=" +
            this.name +
            "&idNum=" +
            this.idNum +
            "&intoType=" +
            "guide"
        );
      } else {
        storage.set("IDname", this.name);
        storage.set("IDnum", this.idNum);
        this.jumpTo("/faceAuth?name=" + this.name + "&idNum=" + this.idNum);
        // this.jumpTo({
        //   name: "faceAuth",
        //   query: {
        //     name: this.name,
        //     idNum: this.idNum
        //   }
        // });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#authentication {
  background: #fff;
  min-height: 100%;
}
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
  span {
    font-size: 0.28rem;
    height: 0.88rem;
    line-height: 0.88rem;
    position: absolute;
    right: 0.3rem;
    top: 0;
  }
}
.content {
  overflow: hidden;
}
.iconBox {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin: 0.5rem 0;
  .model {
    width: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    span {
      width: 0.8rem;
      height: 0.8rem;
      background: #ddd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon1 {
        width: 0.43rem;
        height: 0.51rem;
        background: url("../../assets/img/hall/auth/1.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon2 {
        width: 0.36rem;
        height: 0.35rem;
        background: url("../../assets/img/hall/auth/2.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon3 {
        width: 0.41rem;
        height: 0.29rem;
        background: url("../../assets/img/hall/auth/3.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    p {
      font-size: 0.25rem;
      text-align: center;
      color: #8e8c8f;
    }
  }
  .line {
    position: absolute;
    width: 5rem;
    height: 2px;
    background: #ccc;
    top: 40%;
    z-index: 1;
  }
}
.label {
  padding: 0 0.4rem;
  background: #fff;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
  p {
    width: 1.2rem;
    font-size: 0.3rem;
    color: #333;
    height: 1rem;
    line-height: 1rem;
    float: left;
  }
  input {
    float: left;
    margin-left: 0.4rem;
    font-size: 0.28rem;
    line-height: 1rem;
    height: 1rem;
    border: none;
  }
}
.txtTip {
  padding: 0.5rem 0.3rem;
  .title {
    font-size: 0.26rem;
    margin-bottom: 0.2rem;
  }
  p {
    color: #666;
  }
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
  font-size: 0.34rem;
  color: #333;
  line-height: 0.88rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>
