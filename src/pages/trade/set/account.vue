<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>添加账户</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="label" @click="jumpTo('addAliA')">
        <p class="title">支付宝账户</p>
        <p class="content">
          <span>{{status.is_withdraw_to==1?'修改':'未设置'}}</span>
          <i class="iconfont icon-right"></i>
        </p>
      </div>
      <div class="label" @click="jumpTo('addCardA')">
        <p class="title">银行卡账户</p>
        <p class="content">
          <span>{{status.is_bind_card==1?'修改':'未设置'}}</span>
          <i class="iconfont icon-right"></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: []
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getStatus();
  },
  methods: {
    getStatus() {
      this.$http.post("/amoy/user/bind-status", true, true).then(res => {
        if (res.code == 0) {
          this.status = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#authentication {
  background: #fff;
  height: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 2rem;
    font-size: 0.3rem;
    color: #333;
    height: 1rem;
    line-height: 1rem;
    float: left;
  }
  .content {
    display: flex;
    align-items: center;
    color: #999;
  }
}
</style>
