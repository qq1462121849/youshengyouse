<template>
  <div id="myBody">
    <div class="myTopBOX" id="myTopBOX" :style="{height: 4.5 + statusH + 'rem'}">
      <div class="headerBox2" ref="header" :style="{height: 0.88 + statusH + 'rem'}">
        <div class="TitBoxBg" :style="{paddingTop: statusH + 'rem'}">
          <span>矿卡</span>
        </div>
        <div class="TitBoxBg1" :style="{paddingTop: statusH + 'rem'}">
          <i @click="goBack" class="iconfont icon-back"></i>
          <span class="setPic" @click="jumpTo('/millMarketNew')">矿卡超市</span>
        </div>
      </div>
      <div class="millPicBOX" :style="{marginTop: 1.4 + statusH + 'rem'}">
        <img src="./../../assets/my/zszjtd.png" alt />
        <span class="Picspan1">{{info.mobile}}</span>
        <span class="Picspan2">威望：{{info.prestige}}</span>
      </div>
      <div class="millTgBox">
        <div>
          <div>我的TG</div>
          <div>{{info.tg}}</div>
        </div>
        <div>
          <div>剩余奖励</div>
          <div>{{info.remain_rewards}}</div>
        </div>
        <div>
          <div>累计TG</div>
          <div>{{info.total_tg}}</div>
        </div>
      </div>
    </div>
    <mescroll-vue
      ref="mescroll"
      class="mescroll"
      :style="{top: 4.5 + statusH + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div>
        <div class="tabBox">
          <div :class="[tabIndex==1?'active':'','myMillTitle']" @click="tabIndex=1">我的矿卡</div>
          <div :class="[tabIndex==2?'active':'','myMillTitle']" @click="tabIndex=2">过期矿卡</div>
        </div>
        <div id="empty">
          <div class="myMillListBox" v-if="tabIndex==1">
            <div class="myMillList" v-for="(item, index) in dataList" :key="index">
              <img v-if="item.img_url" :src="item.img_url" alt />
              <img v-else src="./../../assets/my/mill.png" alt />
              <div>
                <div>
                  <div class="title">{{item.title}}</div>
                  <div
                    v-if="item.status == 1"
                    class="lingqu"
                    @click="seeVideo(item.id)"
                  >开启{{item.video_surplus_num}}/{{item.video_all_num}}</div>
                  <div v-else class="lingqu">收益中</div>
                  <!-- <div v-if="item.status == 2" class="lingqu"><van-count-down :time="item.countdown * 1000" @finish="finish(index)"/></div> -->
                  <!-- <div v-if="item.status == 3" class="lingqu" @click="getCard(item.id)">领取</div> -->
                </div>
                <div>
                  <span>耐久度：{{item.expire_num}}/{{item.all_times}}</span>
                  <span>产出：{{item.outputed}}TG</span>
                </div>
              </div>
            </div>
          </div>
          <div class="myMillListBox" v-if="tabIndex==2">
            <div class="myMillList" v-for="(item, index) in dataList" :key="index">
              <img v-if="item.img_url" :src="item.img_url" alt />
              <img v-else src="./../../assets/my/mill.png" alt />
              <div>
                <div>
                  <div class="title">{{item.title}}</div>
                  <div
                    v-if="item.status == 1"
                    class="lingqu"
                    @click="seeVideo(item.id)"
                  >开启{{item.video_surplus_num}}/{{item.video_all_num}}</div>
                  <div v-else class="lingqu">已过期</div>
                </div>
                <!-- <div>
                  <span>耐久度：{{item.expire_num}}/{{item.all_times}}</span>
                  <span>产出：{{item.outputed}}TG</span>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as utils from "../../utils";
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      statusH: "",
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.downCallback
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 8
        },
        // noMoreSize: 5,
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        empty: {
          warpId: "empty",
          icon: "./static/none.png",
          tip: "暂无相关数据~"
        }
      },
      dataList: [],
      info: "",
      tabIndex: 1
    };
  },
  created() {
    let safeArea = dsBridge.call("receiveParams", "safeAreaTop1");
    let size = document.documentElement.clientWidth / 7.5;
    if (safeArea == "123") {
      this.statusH = 0;
    } else {
      this.statusH = safeArea / size;
    }
  },
  watch: {
    tabIndex() {
      this.mescroll.triggerDownScroll();
    }
  },
  mounted() {},
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    finish(index) {
      this.dataList[index].status = 1;
      // return this.dataList1
    },
    downCallback() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    // 看视频
    seeVideo(id) {
      let videoTimer = utils.storage.get("videoTimer", 1) || 0;
      let nowTimer = new Date().getTime();
      let diffTimer = 60000;
      let diffTi = Math.floor(
        (parseInt(videoTimer) + diffTimer - nowTimer) / 1000
      );
      if (videoTimer && diffTi > 0) {
        this.$vux.toast.text("看广告过于频繁，请您 " + diffTi + " S后再试");
        return;
      }

      this.$vux.loading.show();
      /*  this.$http
        .post("/amoy/machine/view-video", { mid: id }, true, true)
        .then(res => {
          this.$vux.loading.hide();
          if (res.code == 0) {
            this.downCallback();
            utils.storage.set("videoTimer", nowTimer, 1);
          }
        }); */

      dsBridge.call("loadAds", ret => {
        this.$vux.loading.hide();
        if (ret == 1) {
          this.$http
            .post("/amoy/machine/view-video", { mid: id }, true, true)
            .then(res => {
              if (res.code == 0) {
                this.downCallback();
                utils.storage.set("videoTimer", nowTimer, 1);
              }
            });
        } else if (ret == 2) {
          this.$vux.toast.text("加载失败");
        } else if (ret == 3) {
          this.$vux.toast.text("播放失败");
        }
      });
      setTimeout(() => {
        this.$vux.loading.hide();
      }, 10000);
    },
    getCard(id) {
      this.$vux.loading.show();
      this.$http
        .post("/amoy/machine/get-rewards", { mid: id }, true, true)
        .then(res => {
          this.$vux.loading.hide();
          if (res.code == 0) {
            this.$vux.toast.text("领取成功！");
            this.downCallback();
          }
        });
    },
    upCallback(page, mescroll) {
      this.$http
        .post(
          "/amoy/machine/my-mining-machines",
          { page: page.num, type: this.tabIndex },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            this.info = response.data;
            let arr = response.data.machine_list;
            if (page.num === 1) this.dataList = [];
            this.dataList = this.dataList.concat(arr);
            console.log("mescroll", mescroll.endSuccess);
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);
            });
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    }
  }
};
</script> 
<style lang="less" scoped>
#myBody {
  background: #ffffff;
  .mescroll {
    position: fixed;
    top: 4.5rem;
    bottom: 0;
    height: auto;
  }
  .tabBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .myMillTitle {
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.88rem;
      padding-left: 0.3rem;
      border-bottom: 1px solid #eee;
    }
    .active {
      color: #d6a75e;
    }
  }
  .myTopBOX {
    height: 4.5rem;
    background: url(./../../assets/my/millbg.png) 0 0 no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .headerBox2 {
      width: 100%;
      height: 0.88rem;
      position: fixed;
      top: 0;
      z-index: 999;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(
        -90deg,
        rgba(35, 32, 39, 1) 0%,
        rgba(55, 53, 64, 1) 100%
      );
      .TitBoxBg {
        width: 100%;
        text-align: center;
        line-height: 0.88rem;
        position: fixed;
        top: 0;
        z-index: 1000;
        font-size: 0.36rem;
      }
      .TitBoxBg1 {
        height: 0.88rem;
        position: fixed;
        top: 0;
        z-index: 1011;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          margin-left: 0.3rem;
          width: 0.2rem;
          color: #fff;
          font-size: 0.35rem;
        }
        .setPic {
          font-size: 0.3rem;
          font-weight: 400;
          margin-right: 0.3rem;
        }
      }
    }
    .millPicBOX {
      display: flex;
      align-items: center;
      margin-top: 1.4rem;
      > img {
        width: 0.88rem;
        height: 0.88rem;
        margin-left: 0.45rem;
      }
      .Picspan1 {
        font-size: 0.3rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin: 0 0.16rem 0 0.26rem;
      }
      .Picspan2 {
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(237, 205, 150, 1);
        padding: 0 0.2rem;
        border: 1px solid rgba(237, 205, 150, 1);
        border-radius: 0.18rem;
      }
    }
    .millTgBox {
      margin-top: 0.7rem;
      display: flex;
      > div {
        width: 33.33%;
        text-align: center;
        > div:nth-child(1) {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        > div:nth-child(2) {
          font-size: 0.5rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .myMillListBox {
    padding: 0 0.3rem;
    margin-bottom: 1rem;
    background: #fff;
    .myMillList {
      height: 1.6rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      > img {
        width: 1rem;
        height: 1rem;
      }
      > div {
        margin-left: 0.55rem;
        width: 5rem;
        > div:nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.1rem;
          .title {
            font-size: 0.32rem;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
          .lingqu {
            height: 0.5rem;
            font-size: 0.26rem;
            line-height: 0.5rem;
            width: 1.5rem;
            text-align: center;
            color: #d6a75e;
            border: 1px #d6a75e solid;
            border-radius: 0.25rem;
            .van-count-down {
              height: 0.5rem;
              font-size: 0.26rem;
              line-height: 0.5rem;
              color: #d6a75e;
            }
          }
        }
        > div:nth-child(2) {
          font-size: 0.28rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          > span {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
