<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>添加银行卡</h1>
    </div>
    <div class="content" :style="{marginTop: $store.state.global.statusH+1 + 'rem'}">
      <div class="label">
        <p>姓名</p>
        <input type="text" placeholder="请填写真实姓名" v-model.trim="name" />
      </div>
      <div class="label">
        <p>银行卡号</p>
        <input type="number" placeholder="请输入银行卡号" v-model.trim="bankCard" />
      </div>
      <div class="label">
        <p>开户银行</p>
        <input type="text" placeholder="请输入开户银行 例:中国银行广州青龙支行" v-model.trim="bankArea" />
      </div>
      <div class="txtTip">
        <div class="title">用户须知</div>
        <p>添加收款账号，请务必填写真实姓名，银行卡号和开户行地址，确保信息准确以保证收款成功。</p>
      </div>
      <div class="btn" @click="save">保存</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
      name: "",
      bankCard: "",
      bankArea: ""
    };
  },
  created() {
  
  },
  methods: {
    save() {
     if (!/[\u4e00-\u9fa5]{2,10}/.test(this.name)) return this.$vux.toast.text("请输入您的真实姓名");
      if (!this.bankCard)  return this.$vux.toast.text("请输入银行卡号");
      if (!this.bankArea)  return this.$vux.toast.text("请输入开户银行");
      
      this.$http
        .post(
          "/amoy/user/add-bank-card",
          {
            real_name: this.name,
            card_num: this.bankCard,
            bank_name: this.bankArea
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("添加成功！");
            setTimeout(() => {
              this.goBack();
            }, 500);
          }else if(res.code==1){
            console.log(1111)
          }
        });
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
}
.content {
  overflow: hidden;
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
    width: 5.2rem;
    float: left;
    margin-left: 0.2rem;
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
