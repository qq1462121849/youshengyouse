<template>
  <div id="myBody">
    <!-- <div class="myIconBox">
      <div class="myIcon myIcon1" :style="{'opacity' : info.is_show == 1 ? info.video_percent*0.01 : 0}" :class="{'list-leave-active' : lingqu}">
        <img src="./../../assets/my/homeIcon1.png" alt="">
        <div>可领取</div>
      </div>
      <div class="myIcon myIcon2" :style="{'opacity' : info.is_show == 1 ? info.video_percent*0.01 : 0}" :class="{'list-leave-active' : lingqu}">
        <img src="./../../assets/my/homeIcon1.png" alt="">
        <div>可领取</div>
      </div>
    </div>-->
    <div class="myCoreBox">
      <div class="coreTopTab">
        <div @click="toAuth(info.is_realname)">
          <span>实名认证</span>
        </div>
        <div @click="jumpTo('/millCard')">
          <span>矿卡任务</span>
        </div>
        <div @click="jumpTo('/my')">
          <span>个人中心</span>
        </div>

        <!-- <div @click="jumpTo('/millCard')"><span>矿卡</span></div>
        <div v-if="showBtn" @click="showBtnLing()"><span>任务</span></div>
        <div v-else @click="doTask()"><span>任务</span></div>
        <div @click="jumpTo('/my')"><span>个人中心</span></div>-->
      </div>
      <div class="coreTopTab2">
        <div @click="jumpTo('/team')">
          <span>我的团队</span>
        </div>
        <div @click="jumpTo('/compound')">
          <span>合成分红</span>
        </div>

        <!-- <div @click="$vux.toast.text('该功能暂未开通~')">
          <span>交易大厅</span>
        </div>
        <div @click="jumpTo('/compound')">
          <span>分红合成</span>
        </div>-->
      </div>

      <!-- <div class="coreTopTab3">
        <div class="coreTopBTN" @click="$vux.toast.text('该功能暂未开通~')">全球分红公示</div>
      </div>-->
      <div class="coreTopTab3" v-if="showBtn">
        <!-- 无实名认证时显示 -->
        <div class="coreTopBTN" @click="showBtnLing">开始任务</div>
      </div>
      <div class="coreTopTab3" v-else>
        <div
          class="coreTopBTN"
          v-if="info.valid_times < info.views_income_times && info.task_status == 0"
          @click="doTask"
        >{{info.views == 0 ? '开始任务' : '继续任务' + '(' + info.valid_times + '/' + info.views_income_times +')'}}</div>
        <!-- <div v-if="info.valid_times > info.views_income_times && !lingqu">
          <van-count-down :time="limmitTime" @finish="finish()" />
        </div>-->
        <div
          class="coreTopBTN"
          v-if="info.valid_times*1 == info.views_income_times*1 && info.task_status == 0"
          @click="lingquBtn"
        >领取奖励</div>
        <div class="coreTopBTN" v-if="info.task_status == 1">已领取今日收益</div>
      </div>

      <div class="coreTitle">点击开始任务，完成任务后点击领取奖励到余额</div>
    </div>
  </div>
</template>
<script>
import * as utils from "../../utils";
export default {
  data() {
    return {
      statusH: "",
      info: { is_realname: "" },
      lingqu: false,
      limmitTime: "",
      allNum: 20,
      nowNum: 2,
      jinbi: false,
      showBtn: false,
      test: false
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
  mounted() {
    this.getInfo();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // "页面被挂起"
        // alert("挂起");
      } else {
        // alert("呼出");
        this.getInfo();
      }
    });
  },
  methods: {
    testBtn() {
      this.lingqu = true;
    },
    toAuth(status) {
      if (status == 1) {
        this.$vux.toast.text("您已实名！");
      } else {
        this.jumpTo("/auth");
      }
    },
    startTask() {
      this.$http
        .post(
          "/amoy_v2/task-system/cat-adv",
          { task_id: this.info.task_id },
          true,
          true
        )
        .then(res => {
          if (res.code === 0) {
            this.getInfo();
          }
        });
    },
    finish() {
      this.lingqu = true;
    },
    getInfo() {
      this.$http
        .post("/amoy_v2/task-system/task-status", {}, true, false)
        .then(res => {
          if (res.code === 0) {
            this.lingqu = false;
            this.showBtn = false;
            this.info = res.data;
            // var now = new Date().getTime();
            // this.limmitTime = this.info.end_at * 1000 - now;
          } else if (res.code === 1) {
            this.showBtn = true;
            this.info.is_realname = 0;
          }
        });
    },
    showBtnLing() {
      // 没有实名
      if (this.showBtn) {
        this.getInfo();
      } else {
        this.doTask();
      }
    },
    doTask() {
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
      /* this.$http
        .post(
          "/amoy_v2/task-system/cat-adv",
          { task_id: this.info.task_id },
          true,
          true
        )
        .then(res => {
          this.$vux.loading.hide();
          if (res.code === 0) {
            this.getInfo();
            utils.storage.set("videoTimer", nowTimer, 1);
          }
        }); */
      dsBridge.call("loadAds", ret => {
        this.$vux.loading.hide();
        if (ret == 1) {
          this.$http
            .post(
              "/amoy_v2/task-system/cat-adv",
              { task_id: this.info.task_id },
              true,
              true
            )
            .then(res => {
              if (res.code === 0) {
                this.getInfo();
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
    // 点击领取
    lingquBtn() {
      this.$http
        .post(
          "/amoy_v2/task-system/complete",
          { task_id: this.info.task_id },
          true,
          true
        )
        .then(res => {
          if (res.code === 0) {
            this.jinbi = true;
            this.getInfo();
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#myBody {
  width: 100%;
  height: 100vh;
  background: url(./../../assets/my/homebg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  .myIconBox {
    .myIcon {
      // width: 0.88rem;
      // height: 1rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 0.22rem;
      font-weight: bold;
      color: rgba(59, 174, 236, 1);
      opacity: 0;
      > img {
        width: 0.88rem;
        height: 0.88rem;
      }
    }
    .list-leave-active {
      transition: all 1s;
      opacity: 0;
      // transform: translateY(80px);
    }
    .myIcon1 {
      position: fixed;
      top: 1.7rem;
      left: 0.8rem;
      animation: bounce 3s infinite;
      -webkit-animation: bounce 3s infinite;
    }
    .myIcon2 {
      position: fixed;
      top: 1.2rem;
      right: 0.63rem;
      animation: bounce 3s infinite;
      -webkit-animation: bounce 3s infinite;
      animation-delay: 1s;
    }

    @keyframes bounce {
      from,
      20%,
      53%,
      to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      40%,
      43% {
        -webkit-animation-timing-function: cubic-bezier(
          0.755,
          0.05,
          0.855,
          0.06
        );
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -0.3rem, 0) scaleY(1.1);
        transform: translate3d(0, -0.3rem, 0) scaleY(1.1);
      }

      70% {
        -webkit-animation-timing-function: cubic-bezier(
          0.755,
          0.05,
          0.855,
          0.06
        );
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -0.15rem, 0) scaleY(1.05);
        transform: translate3d(0, -0.15rem, 0) scaleY(1.05);
      }

      80% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
        transform: translate3d(0, 0, 0) scaleY(0.95);
      }

      90% {
        -webkit-transform: translate3d(0, -0.04rem, 0) scaleY(1.02);
        transform: translate3d(0, -0.04rem, 0) scaleY(1.02);
      }
    }
    @-webkit-keyframes bounce {
      from,
      20%,
      53%,
      to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      40%,
      43% {
        -webkit-animation-timing-function: cubic-bezier(
          0.755,
          0.05,
          0.855,
          0.06
        );
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -0.3rem, 0) scaleY(1.1);
        transform: translate3d(0, -0.3rem, 0) scaleY(1.1);
      }

      70% {
        -webkit-animation-timing-function: cubic-bezier(
          0.755,
          0.05,
          0.855,
          0.06
        );
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -0.15rem, 0) scaleY(1.05);
        transform: translate3d(0, -0.15rem, 0) scaleY(1.05);
      }

      80% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
        transform: translate3d(0, 0, 0) scaleY(0.95);
      }

      90% {
        -webkit-transform: translate3d(0, -0.04rem, 0) scaleY(1.02);
        transform: translate3d(0, -0.04rem, 0) scaleY(1.02);
      }
    }
  }
  .myCoreBox {
    width: 100%;
    position: fixed;
    bottom: 1.8rem;
    .coreTopTab {
      display: flex;
      justify-content: space-between;
      padding: 0 0.4rem;
      > div {
        width: 2.2rem;
        height: 0.7rem;
        background: url(./../../assets/my/homeTab.png) 0 0 no-repeat;
        background-size: 100% 100%;
        line-height: 0.7rem;
        > span {
          font-size: 0.34rem;
          font-weight: 500;
          margin-left: 0.46rem;
          color: #ffa800;
        }
      }
    }
    .coreTopTab2 {
      display: flex;
      justify-content: space-between;
      padding: 0 0.6rem;
      margin: 0.6rem 0;
      > div {
        width: 2.43rem;
        height: 0.7rem;
        background: url(./../../assets/my/homeTab2.png) 0 0 no-repeat;
        background-size: 2.43rem 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        > span {
          font-size: 0.28rem;
          font-weight: bold;
          color: #6ee7ea;
        }
      }
    }
    .coreTopTab3 {
      display: flex;
      justify-content: center;
      .coreTopBTN {
        color: #6ee7ea;
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.78rem;
      }
      > div {
        width: 6.76rem;
        height: 0.75rem;
        background: url(./../../assets/my/homeTab3.png) 0 0 no-repeat;
        background-size: 6.76rem 0.75rem;
        text-align: center;
        .van-count-down {
          color: #6ee7ea;
          font-size: 0.28rem;
          font-weight: bold;
          line-height: 0.75rem;
        }
      }
    }
    .coreTitle {
      text-align: center;
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.3rem;
      color: rgba(110, 231, 234, 1);
    }
  }
}
</style>
