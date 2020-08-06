<template>
  <div id="millMarket">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>矿卡超市</h1>
    </div>
    <div class="topContent" :style="{top: statusH+0.85 + 'rem'}">
      <div class="myInfo">
        <img :src="$store.state.user.userInfo.avatar" alt />
        <div>
          <p>TG：{{info.tg}}</p>
          <p>我的矿卡：{{info.my_machine_nums}}</p>
        </div>
      </div>
    </div>
    <div class="millList" :style="{marginTop: statusH+3 + 'rem'}">
      <div class="millInfo" v-for="(item, index) in millList" :key="index">
        <div class="top">

          <div class="milldes">
            <img v-if="item.img_url" :src="item.img_url" alt />
            <img v-else src="./../../assets/my/mill.png" alt />
            <div>
              <p class="millname">
                {{item.title}}
                <span>({{item.exchange_coin}}TG)</span>
              </p>
              <p class="times">购买次数：{{item.has+'/'+item.purchase_limit}}</p>
            </div>

          </div>
          <span class="buyBtn" v-if="item.id != 9" @click="buyMill(item.id)">购买</span>
        </div>
        <div class="bot">
          <div>
            <p>有效期:<span>+{{item.effect_day}}天</span></p>
          </div>
          <div>
            <p>TG:<span>+{{item.release_coin}}</span></p>
          </div>
          <div>
            <p>耐久度:<span>{{item.use_nums+'次'}}</span></p>
          </div>
          <div>
            <p>收益率:<span>{{item.earning_rate}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      statusH: 0,
      millList: [],
      info: ''
    }
  },
  created () {
    // let size = document.documentElement.clientWidth / 7.5;
    // this.statusH = api.safeArea.top / size;
    // api.setStatusBarStyle({
    //   style: "dark"
    // });
  },
  methods: {
    getInfo () {
      this.$http.post("/amoy/machine/mining-market", true, true).then(res => {
        if (res.code == 0) {
          this.info = res.data
          this.millList = res.data.machine_list
        }
      })
    },
    buyMill (id) {
      const _this = this
      this.$vux.confirm.show({
        title: '操作提示',
        content: '确定购买吗？',
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          _this.$http.post("/amoy/machine/buy-machine", { mid: id }, true, true).then(res => {
            // this.$vux.loading.hide();
            if (res.code == 0) {
              _this.$vux.toast.text("购买成功！");
              _this.getInfo()
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
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
  background:linear-gradient(-90deg,rgba(35,32,39,1) 0%,rgba(55,53,64,1) 100%);
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
    height: 2.7rem;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    overflow: hidden;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .2rem;
      img {
        width: 1.1rem;
        height: 1.1rem;
        margin-right: 0.2rem;
      }
      .milldes {
        margin-top: 0.3rem;
        width: 3.5rem;
        height: 1rem;
        display: flex;
        align-items: center;
        flex: 1;
        .millname {
          color: #333;
          font-size: 0.3rem;
          line-height: 0.3rem;
          font-weight: bolder;
          span {
            color: rgba(227,185,125,1);
            font-size: 0.28rem;
            line-height: 0.3rem;
            font-weight: normal;
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
        margin-top: 0.5rem;
        width: 1.2rem;
        height: 0.5rem;
        background:linear-gradient(60deg,rgba(227,185,125,1),rgba(240,214,160,1));
        // border: 1px solid rgba(255, 74, 23, 1);
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
      margin-top: 0.2rem;
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
            color: #B97C1F;

          }
        }
      }
    }
  }
}
</style>
