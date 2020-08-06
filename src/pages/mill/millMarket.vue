<template>
  <div id="millMarket">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>矿机超市</h1>
    </div>
    <div class="topContent" :style="{top: statusH+0.85 + 'rem'}">
      <div class="myInfo">
        <img :src="$store.state.user.userInfo.avatar" alt />
        <div>
          <p>DLT：{{millList.credit3}}</p>
          <p>我的矿机：{{millList.my_machine}}</p>
        </div>
      </div>
    </div>
    <div class="millList" :style="{marginTop: statusH+3 + 'rem'}">
      <div class="millInfo" v-for="(item, index) in millList.machine_list" :key="index">
        <div class="top">
          <img :src="item.img_url" alt />
          <div class="milldes">
            <p class="millname">
              {{item.title}}
              <span>({{item.exchange_coin}}DLT)</span>
            </p>
            <p class="times">购买次数：{{item.already_browse_times+'/'+item.browse_times}}</p>
          </div>
          <span class="buyBtn" @click="buyMill(item.id)">购买</span>
        </div>
        <div class="bot">
          <div>
            <p>
              积分:
              <span>{{item.increase_points_num}}</span>
            </p>
          </div>
          <div>
            <p>
              DLT:
              <span>{{item.total_produce_coin}}</span>
            </p>
          </div>
          <div>
            <p>
              耐久度:
              <span>{{item.use_nums+'天'}}</span>
            </p>
          </div>
          <div>
            <p>
              收益率:
              <span>{{item.earning_rate+'%'}}</span>
            </p>
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
      statusH: 0,
      millList: []
    };
  },
  created() {
    this.$http.post("/amoy/machine/mining-market", true, true).then(res => {
      if (res.code == 0) {
        this.millList = res.data;
      }
    });
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    api.setStatusBarStyle({
      style: "dark"
    });
  },
  methods: {
    buyMill(id) {
      this.$vux.loading.show({
        text: "请稍后"
      });
      this.$http
        .post("/amoy/machine/exchange-machine", { mid: id }, true, true)
        .then(res => {
          this.$vux.loading.hide();
          if (res.code == 0) {
            this.$vux.toast.text("兑换成功！");
            this.$router.go(-1);
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
  background: #fff;
  h1 {
    font-size: 0.34rem;
    color: #333;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #333;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.topContent {
  position: fixed;
  width: 100%;
  height: 2rem;
  background: linear-gradient(
    -45deg,
    rgba(255, 72, 23, 1) 0%,
    rgba(255, 122, 34, 1) 100%
  );
  overflow: hidden;
  .myInfo {
    padding: 0 0.47rem;
    height: 0.88rem;
    margin-top: 0.7rem;
    display: flex;
    img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
    }
    div {
      width: 5rem;
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.45rem;
      margin-left: 0.24rem;
    }
  }
}
.millList {
  .millInfo {
    width: 7rem;
    height: 2.9rem;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    overflow: hidden;
    .top {
      margin-top: 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
      .milldes {
        margin-top: 0.8rem;
        width: 3.5rem;
        height: 1rem;
        margin-left: 0.1rem;
        .millname {
          color: #333;
          font-size: 0.3rem;
          line-height: 0.3rem;
          font-weight: bolder;
          span {
            color: #ff4a17;
            font-size: 0.28rem;
            line-height: 0.3rem;
          }
        }
        .times {
          font-size: 0.24rem;
          color: #666;
          line-height: 0.24rem;
          margin-top: 0.3rem;
        }
      }
      .buyBtn {
        margin-top: 0.8rem;
        width: 1.2rem;
        height: 0.5rem;
        background: linear-gradient(
          -75deg,
          rgba(255, 72, 23, 1),
          rgba(255, 122, 34, 1)
        );
        border: 1px solid rgba(255, 74, 23, 1);
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.5rem;
        text-align: center;
      }
    }
    .bot {
      width: 7rem;
      height: 0.87rem;
      border-top: 1px solid #eee;
      margin: 0 auto;
      margin-top: 0.13rem;
      display: flex;
      justify-content: space-around;
      div {
        width: 1.8rem;
        height: 0.87rem;
        line-height: 0.87rem;
        text-align: center;
        p {
          font-size: 0.2rem;
          color: #333;
          span {
            color: #ff4a17;
          }
        }
      }
    }
  }
}
</style>