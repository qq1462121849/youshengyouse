<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>绑定银行卡</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="label">
        <p>收款账户</p>
        <input type="text" placeholder="请输入收款账户" v-model="account" />
      </div>
      <div class="label">
        <p>收款人姓名</p>
        <input type="text" placeholder="请输入收款人姓名" v-model="name" />
      </div>
      <div class="label">
        <p>银行</p>
        <input type="text" placeholder="请输入银行" v-model="bank" />
      </div>
      <div class="label">
        <p>开户行</p>
        <input type="text" placeholder="请输入开户行" v-model="bankname" />
      </div>
      <div class="btn" @click="save">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      backInfo: "",
      account: "",
      name: "",
      bank: "",
      bankname: ""
    };
  },
  created() {
    this.getDefault();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    save() {
      this.$http
        .post(
          "/amoy/user/bind-bank-info",
          {
            bank_open_name: this.bankname,
            bank_name: this.bank,
            bank_account_name: this.name,
            bank_account: this.account
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("添加成功！");
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          }
        });
    },
    getDefault() {
      this.$http.get("/amoy/user/bind-bank-info").then(res => {
        if (res.code == 0) {
          this.account = res.data.bank_account;
          this.name = res.data.bank_account_name;
          this.bank = res.data.bank_name;
          this.bankname = res.data.bank_open_name;
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
    width: 1.7rem;
    font-size: 0.3rem;
    color: #333;
    height: 1rem;
    line-height: 1rem;
    float: left;
  }
  input {
    width: 4.5rem;
    float: left;
    margin-left: 0.2rem;
    font-size: 0.28rem;
    line-height: 1rem;
    height: 1rem;
    border: none;
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
