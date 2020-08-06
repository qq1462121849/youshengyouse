<template>
  <div id="serviceCharge">
    <div class="topContent">
      <div class="numInfo">
        <div>
          <p>昨日全球手续费</p>
          <span>{{charge.yesterday_all_bonus}}TB</span>
        </div>
        <div>
          <p>今日全球手续费</p>
          <span>{{charge.today_all_bonus}}TB</span>
        </div>
      </div>
      <div class="textTip">每天凌晨00：05开始发放前一日手续费分红 因数据时时变动，今日预计分红只做参考，具体金额以实际到账为准</div>
    </div>
    <div class="listContent">
      <div class="listInfo" v-for="(item, index) in charge.list" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="info">
          <div class="left">
            <p>昨日每人分红</p>
            <span>{{item.yesterday_bonus}}TB</span>
          </div>
          <div class="right">
            <p>今日预计分红</p>
            <span>{{item.today_bonus}}TB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      charge: []
    };
  },
  created() {
    this.getCharge();
  },
  methods: {
    getCharge() {
      this.$http.post("/amoy/user/global-charge-list", true, true).then(res => {
        if (res.code == 0) {
          this.charge = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#serviceCharge {
  padding: 0 0.3rem;
}
.numInfo {
  height: 1.7rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 0.4rem;
  > div {
    width: 3.06rem;
    height: 1.68rem;
    background: linear-gradient(
      90deg,
      rgba(63, 130, 255, 1),
      rgba(6, 111, 253, 1)
    );
    box-shadow: 0px 8px 16px 0px rgba(25, 115, 253, 0.26);
    border-radius: 0.2rem;
    color: #fff;
    padding-left: 0.24rem;
    p {
      margin-top: 0.35rem;
      height: 0.25rem;
      font-size: 0.24rem;
      line-height: 0.25rem;
    }
    span {
      float: left;
      font-size: 0.3rem;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-top: 0.4rem;
    }
  }
  > div:last-of-type {
    background: linear-gradient(
      90deg,
      rgba(252, 81, 31, 1),
      rgba(252, 136, 43, 1)
    );
    box-shadow: 0px 8px 16px 0px rgba(252, 92, 33, 0.26);
  }
}
.textTip {
  font-size: 0.22rem;
  color: #999;
  line-height: 0.36rem;
  margin-top: 0.4rem;
}
.listContent {
  margin-top: 0.3rem;
  .listInfo {
    height: 1.54rem;
    border-radius: 0.1rem;
    background: #fff;
    box-shadow: 0px 2px 40px 0px rgba(153, 153, 153, 0.1);
    padding: 0.38rem 0.3rem;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.32rem;
      color: #323232;
      height: 0.35rem;
      line-height: 0.35rem;
      font-weight: 700;
    }
    .info {
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-between;
      > div {
        width: 48%;
        p {
          font-size: 0.26rem;
          color: 323232;
        }
        span {
          display: block;
          margin-top: 0.3rem;
          font-size: 0.3rem;
          color: #333;
          height: 0.3rem;
          line-height: 0.3rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>