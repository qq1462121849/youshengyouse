<template>
  <div id="msg">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>积分详情</h1>
      <span @click="jumpTo('integralDetail')" :style="{top: statusH + 'rem'}">查看明细 ></span>
      <div class="incomeType">
        <div class="title">我的积分</div>
        <p>
          <b>{{$store.state.user.userInfo.credit1}}</b>
        </p>
      </div>
    </div>
    <div class="content" :style="{paddingTop: statusH+1.8 + 'rem'}">
      <p class="txtTag">获得途径</p>
      <div class="msgInfo">
        <div class="title">兑换矿机</div>
        <p class="rules">积分=矿机价值*10%</p>
        <p class="num">已购买 {{$store.state.user.userInfo.my_machine_count}}台</p>
        <span @click="jumpTo('mill')">去兑换</span>
      </div>
      <div class="msgInfo">
        <div class="title">复投矿机</div>
        <p class="rules">积分=矿机价值*10%</p>
        <p class="num">复投次数 {{$store.state.user.userInfo.my_machine_count}}台</p>
        <span @click="jumpTo('mill')">去复投</span>
      </div>
      <div class="msgInfo">
        <div class="title">直推用户奖励</div>
        <p class="rules" style="line-height:0.35rem">每个直推实名认证用户领取矿机，奖励一定积分</p>
        <span @click="jumpTo('share')">去邀请</span>
      </div>
      <div class="msgInfo">
        <div class="title">团队用户奖励</div>
        <p class="rules" style="line-height:0.35rem">每个直推实名认证用户领取矿机，奖励一定积分</p>
        <span @click="jumpTo('team')">去团队</span>
      </div>
      <div class="msgInfo">
        <div class="title">升级星级达人</div>
        <p class="rules">获取更多积分升级星级达人</p>
        <span @click="jumpTo('enjoyexpert')">去升级</span>
      </div>
    </div>
  </div>
</template>
<script>
import {statush} from '@/utils'
export default {
  data() {
    return {
      statusH: 0,
      dataList: []
    };
  },
  created() {
    this.upCallback();
    this.statusH= statush()
  },
  methods: {
    upCallback(page, mescroll) {
      this.$http
        .post(
          "/amoy/user/income-list",
          {
            type: "point",
            credit_type: "credit1",
            page: 1
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            this.dataList = response.data;
          }else{
           
           console.log(111111)
          }
        })
     
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 1.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  background: rgba(40, 39, 47, 1);
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
  > span {
    position: absolute;
    height: 0.88rem;
    top: 0;
    right: 0.3rem;
    line-height: 0.88rem;
    color: #c6c6c8;
    font-size: 0.26rem;
  }
  .incomeType {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      font-size: 0.28rem;
    }
    p {
      font-size: 0.23rem;
      b {
        font-size: 0.33rem;
      }
    }
  }
}
.content {
  .txtTag {
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.6rem;
    font-size: 0.3rem;
    color: #030001;
    font-weight: 700;
  }
  .msgInfo {
    width: 6.2rem;
    height: 1.2rem;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0 auto;
    padding: 0.35rem 0.5rem;
    position: relative;
    margin-bottom: 0.3rem;
    .title {
      font-size: 0.28rem;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .rules {
      width: 4.5rem;
      margin-top: 0.3rem;
      height: 0.25rem;
      font-size: 0.24rem;
      line-height: 0.24rem;
    }
    .num {
      margin-top: 0.2rem;
      height: 0.25rem;
      font-size: 0.24rem;
      line-height: 0.24rem;
    }
    > span {
      width: 1.3rem;
      height: 0.4rem;
      position: absolute;
      right: 0.48rem;
      top: 0.76rem;
      background: linear-gradient(
        270deg,
        rgba(234, 190, 123, 1) 0%,
        rgba(197, 148, 69, 1) 100%
      );
      color: #fff;
      text-align: center;
      line-height: 0.4rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
