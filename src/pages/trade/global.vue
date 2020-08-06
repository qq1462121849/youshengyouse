<template>
  <div id="serve">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>全球手续费分红公示</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+0.88 + 'rem'}">
      <div class="feeInfo">
        <div class="left">
          <p>昨日全球手续费</p>
          <span>{{config.poundage_yesterday}}TG</span>
        </div>
        <div class="right">
          <p>今日全球手续费</p>
          <span>{{config.poundage_today}}TG</span>
        </div>
      </div>
      <div class="txtTip">
        <p>每日凌晨00：05开始发放前一日手续费分红</p>
        <p>因数据时时变动，今日预计分红只做参考，具体金额以实际到账为准</p>
      </div>
      <div class="list" v-for="(item, index) in config.memList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="info">
          <div>
            <p>昨日每人分红</p>
            <span>{{item.yesterday_per_num}}TG</span>
          </div>
          <div>
            <p>今日预计分红</p>
            <span>{{item.estimate_num}}TG</span>
          </div>
        </div>
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
      this.$http.post("/amoy/poundage/poundage-bonus").then(res => {
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
  padding: 0 0.3rem;
  overflow: hidden;
  .feeInfo {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    > div {
      width: 2.4rem;
      height: 1.8rem;
      background: #d6a75e;
      border-radius: 0.2rem;
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      padding: 0 0.3rem;
      font-size: 0.3rem;
      > p {
        width: 100%;
      }
      span {
        width: 100%;
      }
    }
  }
  .txtTip {
    font-size: 0.24rem;
    color: #999;
  }
  .list {
    width: 6.5rem;
    height: 1.8rem;
    padding: 0.2rem;
    background: #fff;
    border-radius: 0.15rem;
    margin: 0.2rem auto;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .info {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.26rem;
      p {
        height: 0.6rem;
        line-height: 0.6rem;
      }
      span {
        font-weight: 700;
      }
    }
  }
}
</style>