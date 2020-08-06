<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>矿机详情</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+0.88 + 'rem'}">
      <div class="millInfo">
        <div class="millTitle">
          <p>{{millInfo.title}}</p>
          <span
            v-if="millInfo.exchange_coin>0"
          >{{(millInfo.total_produce_coin - millInfo.exchange_coin)/millInfo.exchange_coin*100}}%</span>
        </div>
        <div class="millTxtLabel1">预计净收益回报比=（预计每日发放收益*合约期限）*期限日币价/兑换日币价*100%</div>
        <div class="millTxtLabel2">假设未来一年DLT日平均价格为300人民币，预计收益回报比可达到237%</div>
      </div>
      <div class="millListInfo">
        <div class="hline"></div>
        <div>
          <p>一年tcb均价</p>
          <p>预计回报比</p>
        </div>
        <div class="line"></div>
        <div>
          <p>当前币价</p>
          <p>20.20%</p>
        </div>
        <div class="line"></div>
        <div>
          <p>200人民币</p>
          <p>120.20%</p>
        </div>
        <div class="line"></div>
        <div>
          <p>300人民币</p>
          <p>237.00%</p>
        </div>
      </div>
      <div class="buyMillTxt">
        <p>合约期限</p>
        <span>{{millInfo.use_nums}}（每日生效1次）</span>
      </div>
      <div class="buyMillTxt">
        <p>预计每日收益</p>
        <span>
          <b>{{(millInfo.total_produce_coin/30*roundValue).toFixed(2)}}tcb</b>≈￥{{(millInfo.total_produce_coin/30*roundValue*$store.state.global.guidePrice).toFixed(2)}}
        </span>
      </div>
      <div class="buyMillTxt">
        <p>预计每月收益</p>
        <span>
          <b>{{(millInfo.total_produce_coin*roundValue).toFixed(2)}}tcb</b>≈￥{{(millInfo.total_produce_coin*roundValue*$store.state.global.guidePrice).toFixed(2)}}
        </span>
      </div>
    </div>
    <div class="botContent">
      <x-number v-model="roundValue" button-style="round" :min="0" :max="maxNum"></x-number>
      <p>每人可同时拥有{{millInfo.buy_nums}}台,已有{{millInfo.alreaday_exchange_num}}台</p>
      <span v-show="roundValue>0" @click="toCharge($route.query.id)">{{millInfo.exchange_coin*roundValue}}tcb兑换</span>
    </div>
  </div>
</template>
<script>
import { XNumber } from "vux";
export default {
  components: {
    XNumber
  },
  data() {
    return {
      statusH: 0,
      roundValue: 1,
      millInfo: "",
      maxNum:10,
    };
  },
  created() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
    this.getMillDetail(this.$route.query.id);
  },
  methods: {
    getMillDetail(id) {
      this.$http
        .post(
          "/amoy/machine/machine-detail",
          {
            mid: id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.millInfo = res.data;
            this.roundValue = res.data.buy_nums - res.data.alreaday_exchange_num;
            this.maxNum=res.data.buy_nums - res.data.alreaday_exchange_num>0?res.data.buy_nums - res.data.alreaday_exchange_num:0;
          }
        });
    },
    toCharge(id) {
      this.$http
        .post(
          "/amoy/machine/exchange-machine",
          {
            mid: id,
            num: this.roundValue
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("兑换成功!");
            this.goBack()
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(
    25deg,
    rgba(31, 28, 33, 1) 0%,
    rgba(50, 48, 53, 1) 100%
  );
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
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
  padding: 0 0.3rem;
  overflow: hidden;
  .millInfo {
    margin-top: 0.46rem;
    .millTitle {
      height: 0.35rem;
      font-size: 0.32rem;
      line-height: 0.35rem;
      color: #fff;
      display: flex;
      justify-content: space-between;
      span {
        color: #d8ad6c;
      }
    }
    .millTxtLabel1 {
      color: #666666;
      line-height: 0.32rem;
      font-size: 0.24rem;
      margin-top: 0.4rem;
    }
    .millTxtLabel2 {
      color: #d8ad6c;
      font-size: 0.24rem;
      line-height: 0.32rem;
      margin-top: 0.15rem;
    }
  }
  .millListInfo {
    width: 6.6rem;
    height: 1.1rem;
    padding: 0.45rem 0.15rem;
    background: #403f43;
    border-radius: 0.08rem;
    margin-top: 0.35rem;
    display: flex;
    justify-content: space-around;
    position: relative;
    > div {
      width: 1.5rem;
      height: 100%;
      color: #a7a8a7;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: space-between;
    }
    .line {
      width: 2px;
      height: 1.2rem;
      background: linear-gradient(
        0deg,
        rgba(102, 102, 102, 0) 0%,
        rgba(102, 102, 102, 0.99) 49%,
        rgba(102, 102, 102, 0) 100%
      );
    }
    .hline {
      position: absolute;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(102, 102, 102, 0) 0%,
        rgba(102, 102, 102, 0.99) 49%,
        rgba(102, 102, 102, 0) 100%
      );
      top: 1rem;
    }
  }
  .buyMillTxt {
    font-size: 0.26rem;
    height: 0.3rem;
    line-height: 0.3rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    p {
      color: #a7a8a7;
    }
    span {
      color: #fff;
      b {
        color: #d8ad6c;
        font-weight: normal;
      }
    }
  }
}
.botContent {
  width: 100%;
  height: 1.45rem;
  padding-top: 0.35rem;
  background: linear-gradient(
    90deg,
    rgba(34, 33, 41, 1) 0%,
    rgba(25, 24, 30, 1) 100%
  );
  position: fixed;
  bottom: 0;
  p {
    position: absolute;
    bottom: 0.34rem;
    left: 1rem;
    color: #666;
    font-size: 0.24rem;
    height: 0.25rem;
    line-height: 0.25rem;
  }
  span {
    position: absolute;
    right: 0.3rem;
    top: 0.54rem;
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
    color: #3c3c3d;
    height: 0.72rem;
    width: 2rem;
    text-align: center;
    line-height: 0.72rem;
    border-radius: 0.06rem;
  }
}
.botContent/deep/.weui-cell {
  float: left;
  margin-left: 0.6rem;
  .vux-number-input {
    background: none;
    color: #d8ad6c;
  }
}
</style>
