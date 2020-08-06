<template>
  <div id="feedback">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>商城收益</h1>
      <div class="topInfo">
        <div>
          <p>总贡献收益</p>
          <span>{{incomeDetail.shop_all_income}}</span>/TSC
        </div>
        <div>
          <p style="border:none">持有矿机数</p>
          <span>{{incomeDetail.machine_num}}</span>/TSC
        </div>
      </div>
    </div>
    <div class="content" :style="{marginTop: statusH+3 + 'rem'}">
      <div>
        <div class="title">
          <p>
            <i></i>
            <b>商城累计收益</b>
          </p>
          <span>
            说明
            <i class="iconfont icon-right"></i>
          </span>
        </div>
        <p>今日</p>
        <div class="label">
          <div>
            <p>付款笔数</p>
            <span>
              <b>{{incomeDetail.today_order_num}}</b>
            </span>
          </div>
          <div>
            <p>成交预估收入</p>
            <span>
              <b>{{incomeDetail.today_deal_inmoe}}</b>/TSC
            </span>
          </div>
          <div>
            <p>结算预估收入</p>
            <span>
              <b>{{incomeDetail.today_settlement_income}}</b>/TSC
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="title">
          <p>
            <i></i>
            <b>昨日预估收益</b>
          </p>
          <span>
            说明
            <i class="iconfont icon-right"></i>
          </span>
        </div>
        <div class="label">
          <div>
            <p>昨日付款预估收益</p>
            <span>
              <b>{{incomeDetail.yesterday_pay_income}}</b>/TSC
            </span>
          </div>
          <div>
            <p>昨日结算预估收益</p>
            <span>
              <b>{{incomeDetail.yesterday_settlement_income}}</b>/TSC
            </span>
          </div>
        </div>
      </div>
      <div class="botTip">
        <i></i>
        <p>结算订单明细规则说明</p>
      </div>
    </div>
  </div>
</template>
<script>
import Uploader from "vant/lib/uploader";
import "vant/lib/uploader/style";
export default {
  components: {
    Uploader
  },
  data() {
    return {
      statusH: 0,
      incomeDetail: []
    };
  },
  created() {
    this.getIncomeDetail();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    getIncomeDetail() {
      this.$http.post("/amoy/user/shop-income", true, true).then(res => {
        if (res.code == 0) {
          this.incomeDetail = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#feedback {
  height: 100%;
  overflow: hidden;
}
.headerBox {
  width: 100%;
  height: 1.5rem;
  position: fixed;
  top: 0;
  z-index: 10000;
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
  .topInfo {
    position: absolute;
    width: 6.9rem;
    height: 1.9rem;
    background: linear-gradient(
      270deg,
      rgba(234, 190, 123, 1) 0%,
      rgba(197, 148, 69, 1) 100%
    );
    bottom: -1.4rem;
    left: 0.3rem;
    border-radius: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      width: 3rem;
      padding-left: 0.3rem;
      p {
        font-size: 0.28rem;
        border-right: 1px solid #fff;
      }
      span {
        font-size: 0.5rem;
        font-family: "Franklin Gothic Medium";
      }
    }
  }
}
.content {
  height: 100%;
  > div {
    margin-bottom: 0.5rem;
    > p {
      padding-left: 0.45rem;
      font-size: 0.27rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-weight: 700;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.45rem;
      margin-bottom: 0.3rem;
      p {
        height: 0.5rem;
        line-height: 0.5rem;
        overflow: hidden;
        i {
          float: left;
          width: 3px;
          height: 0.3rem;
          background: rgba(198, 149, 71, 1);
          margin-top: 0.1rem;
        }
        b {
          float: left;
          height: 0.5rem;
          font-size: 0.3rem;
          line-height: 0.5rem;
          margin-left: 0.19rem;
        }
      }
      span {
        color: #7d7a7d;
        display: flex;
        height: 0.5rem;
        align-items: center;
        i {
          margin-left: 0.1rem;
        }
      }
    }
    .label {
      width: 7.2rem;
      height: 1.5rem;
      background: #fff;
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      > div {
        width: 3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        p {
          width: 100%;
          font-size: 0.28rem;
          text-align: center;
        }
        b {
          color: #d3a85e;
          font-size: 0.26rem;
        }
      }
    }
  }
  .botTip {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    i {
      width: 0.2rem;
      height: 0.2rem;
      background: url("../../assets/img/alert.png") no-repeat;
      background-size: 100% 100%;
    }
    p {
      padding-right: 0.4rem;
      padding-left: 0.1rem;
      font-weight: normal;
      color: #9a979b;
      font-size: 0.22rem;
    }
  }
}
</style>
