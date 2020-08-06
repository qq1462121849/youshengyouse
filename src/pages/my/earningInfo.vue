<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>我的收益</h1>
      <!-- <span :style="{top: $store.state.global.statusH + 'rem'}" @click="jumpTo('integral')">积分详情 ></span> -->
    </div>
    <div class="usermoney" :style="{top: $store.state.global.statusH+0.88 + 'rem'}">
      <div class="bg"></div>
      <div class="moneybox">
        <div class="DLTcredit">
          <span>TG余额：</span>
          <span>{{data.tg}}</span>
        </div>
        <div class="earnInfoBox">
          <div>
            <div class="title">累计收益</div>
            <p>
              <b>{{(data.total_team_incomes*1).toFixed(2)}}</b>/TG
            </p>
          </div>
          <div>
            <div class="title">昨日收益</div>
            <p>
              <b>{{(data.yesterday_team_incomes*1).toFixed(2)}}</b>/TG
            </p>
          </div>
        </div>
      </div>
      <!-- <p class="earnmark" @click="jumpTo('dealInfo')">
        交易记录
        <i class="iconfont icon-right"></i>

      </p>-->
    </div>
    <div class="content" :style="{paddingTop: $store.state.global.statusH+6 + 'rem'}">
      <div class="title">今日收益明细</div>
      <div class="label" @click="jumpTo('incomeDetail?type=1')">
        <img src="../../assets/img/hall/order/1.png" alt />
        <div>
          <p>
            <span>矿机产出</span>
            <i>{{data.machine_tg}} TG</i>
          </p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('incomeDetail?type=2')">
        <img src="../../assets/img/hall/order/2.png" alt />
        <div>
          <p>
            <span>威望产出</span>
            <i>{{data.prestige}}</i>
          </p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <!-- <div class="label" @click="jumpTo('incomeDetail?type=3')">
        <img src="../../assets/img/hall/order/3.png" alt />
        <div>
          <p>
            <span>团队手续费分红</span>
            <i>{{data.charge_rebate}} TG</i>
          </p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>-->
      <div class="label" @click="jumpTo('incomeDetail?type=3')">
        <img src="../../assets/img/hall/order/4.png" alt />
        <div>
          <p>
            <span>全球手续费分红</span>
            <i>{{data.poundage}} TG</i>
          </p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('incomeDetail?type=4')">
        <img src="../../assets/img/hall/order/5.png" alt />
        <div>
          <p>
            <span>GST产出</span>
            <i>{{data.gst}} GST</i>
          </p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
    <!-- <van-button  @click="jumpTo('shareImg')" type="default" class="invited">邀请好友提升收益</van-button> -->
    <van-button @click="invited" type="default" class="invited">邀请好友提升收益</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roundValue: 1,
      data: []
    };
  },
  created() {
    this.upCallback();
  },
  methods: {
    invited() {
      dsBridge.call("openWin", "/invite");
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback() {
      this.$http
        .post("/amoy/poundage/my-incomes", true, true)
        .then(response => {
          if (response.code === 0) {
            this.data = response.data;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  min-height: 100%;
  background: #fff;
  padding-bottom: 1rem;
  .invited {
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    height: 0.98rem;
    line-height: 0.98rem;
    text-align: center;
    background: rgba(214, 167, 94, 1);
  }
}
.mescroll {
  position: fixed;
  bottom: 0;
  top: 20px;
  height: auto;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #28272f;
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
    position: absolute;
    top: 0;
    right: 0.3rem;
    color: #bbbac2;
    font-size: 0.26rem;
    height: 0.88rem;
    line-height: 0.88rem;
  }
}
.usermoney {
  width: 100%;
  position: fixed;
  height: 5rem;
  z-index: 100;
  .bg {
    background: #28272f;
    width: 100%;
    height: 3.5rem;
    position: absolute;
    top: 0;
    border-radius: 0 0 22% 22%;
  }
  .moneybox {
    position: relative;
    width: 6.1rem;
    padding: 0 0.4rem;
    height: 3.6rem;
    background: linear-gradient(
      270deg,
      rgba(234, 190, 123, 1) 0%,
      rgba(197, 148, 69, 1) 100%
    );
    border-radius: 0.1rem;
    margin: 0 auto;
    margin-top: 0.8rem;
    color: #fff;
    .DLTcredit {
      // display: flex;
      height: 1.2rem;
      line-height: 1.2rem;
      // justify-content: space-between;
      // align-items: center;
      font-size: 0.28rem;
      border-bottom: 1px solid rgba(250, 250, 250, 0.8);
    }
    .earnInfoBox {
      height: 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        width: 50%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        .title {
          width: 100%;
          font-size: 0.28rem;
        }
        p {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 0.24rem;
          b {
            font-size: 0.6rem;
          }
        }
      }
    }
  }
  .earnmark {
    color: #787679;
    font-size: 0.28rem;
    width: 100%;
    text-align: center;
    padding-top: 0.5rem;
    background: #fffeff;
    position: relative;
    .redTip {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #f00;
      left: 55%;
      top: 0.6rem;
    }
  }
}
.content {
  padding: 0 0.3rem;
  .title {
    color: #111;
    font-size: 0.3rem;
    margin-left: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 0.2rem;
    > img {
      width: 0.68rem;
      height: 0.68rem;
    }
    > div {
      width: 5.5rem;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ececec;
      > p {
        span {
          display: block;
          font-size: 0.3rem;
          color: #111;
        }
        i {
          font-style: normal;
          color: #757275;
          font-size: 0.2rem;
        }
      }
      .iconfont {
        color: #9b9a9d;
      }
    }
  }
}
</style>
