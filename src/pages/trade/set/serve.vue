<template>
  <div id="serve">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>联系客服</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+0.88 + 'rem'}">
      <div class="topBg"></div>
      <div class="labelBox">
        <i class="icon wx"></i>
        <div class="mid">
          <p>{{config.kf_wx}}</p>
          <span>专属到导师微信</span>
        </div>
        <span @click="copyTextShare(config.kf_wx)">去咨询</span>
      </div>
      <div class="labelBox">
        <i class="icon qq"></i>
        <div class="mid">
          <p>{{config.kf_qq}}</p>
          <span>平台客服QQ</span>
        </div>
        <span @click="copyTextShare(config.kf_qq)">去咨询</span>
      </div>
      <div class="labelBox">
        <i class="icon wx"></i>
        <div class="mid">
          <p>{{config.kf_mobile }}</p>
          <span>专属到导师微信</span>
        </div>
        <span @click="copyTextShare(config.kf_mobile)">去咨询</span>
      </div>
      <div class="labelBox">
        <i class="icon qq"></i>
        <div class="mid">
          <p>{{config.kf_phone}}</p>
          <span>平台客服QQ</span>
        </div>
        <span @click="copyTextShare(config.kf_phone)">去咨询</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { statusH: 0, config: [] };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getConfig();
  },
  methods: {
    getConfig() {
      this.$http.post("/amoy/trade/user-detail", true, true).then(res => {
        if (res.code == 0) {
          this.config = res.data;
        }
      });
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
  color: #fff;
  background: #32303a;

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
  .topBg {
    width: 100%;
    height: 3rem;
    background: url("../img/serve/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .labelBox {
    width: 6.9rem;
    height: 1.4rem;
    background: #fff;
    border-radius: 0.1rem;
    box-shadow: 1px 2px 20px 2px rgba(187, 187, 187, 0.2);
    margin: 0.2rem auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .wx {
      background: url("../img/serve/wx.png") no-repeat;
      background-size: 100% 100%;
    }
    .qq {
      background: url("../img/serve/qq.png") no-repeat;
      background-size: 100% 100%;
    }
    .dh {
      background: url("../img/serve/dh.png") no-repeat;
      background-size: 100% 100%;
    }
    .sj {
      background: url("../img/serve/sj.png") no-repeat;
      background-size: 100% 100%;
    }
    .mid {
      width: 4rem;
      height: 0.8rem;
      p {
        font-size: 0.32rem;
        font-weight: 700;
        color: #333;
      }
      span {
        color: #666;
        font-size: 0.24rem;
      }
    }
    > span {
      width: 1.2rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      background: #d6a75e;
      color: #fff;
      line-height: 0.5rem;
      text-align: center;
    }
  }
}
</style>