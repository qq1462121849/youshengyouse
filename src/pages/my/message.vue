<template>
  <div id="msg">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>消息</h1>
      <span @click="already" :style="{top: statusH + 'rem'}">一键已读</span>
    </div>
    <div class="content" :style="{paddingTop: statusH+0.88 + 'rem'}">
      <div class="label" @click="jumpTo('msgInfo?type=1')">
        <i class="icon1"></i>
        <div>
          <p>矿机消息</p>
          <span v-if="msgNums.machine_nums*1>0">{{msgNums.machine_nums}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('msgInfo?type=2')">
        <i class="icon2"></i>
        <div>
          <p>团队消息</p>
          <span v-if="msgNums.team_nums*1>0">{{msgNums.team_nums}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('msgInfo?type=3')">
        <i class="icon3"></i>
        <div>
          <p>交易消息</p>
          <span v-if="msgNums.trade_nums*1>0">{{msgNums.trade_nums}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('msgInfo?type=4')">
        <i class="icon4"></i>
        <div>
          <p>订单消息</p>
          <span v-if="msgNums.tb_nums*1>0">{{msgNums.tb_nums}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="label" @click="jumpTo('msgInfo?type=5')">
        <i class="icon5"></i>
        <div>
          <p>系统消息</p>
          <span v-if="msgNums.system_nums*1>0">{{msgNums.system_nums}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      statusH: 0,
      msgNums: []
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getMsgNums();
  },
  methods: {
    upCallback() {
      this.$http
        .post("/amoy/user/change-read-status", {
          type: "all",
          ids: []
        })
        .then(response => {
          if (response.code === 0) {
            this.$vux.toast.text("已完成");
          }
        });
    },
    getMsgNums() {
      this.$http.post("/amoy/user/message-count", true, true).then(res => {
        if (res.code == 0) {
          this.msgNums = res.data;
        }
      });
    },
    already() {
      this.upCallback();
      this.getMsgNums();
    }
  }
};
</script>
<style lang="less" scoped>
#msg {
  min-height: 100%;
  background: #fff;
}
.mescroll {
  position: fixed;
  top: 50px;
  bottom: 0;
  height: auto;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
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
  span {
    position: absolute;
    right: 0.3rem;
    top: 0;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #bebdc4;
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
  padding: 0 0.4rem;
  .label {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    > i {
      width: 0.55rem;
      height: 0.55rem;
    }
    .icon1 {
      background: url("../../assets/img/hall/my/msg/1.png") no-repeat;
      background-size: 100% 100%;
    }
    .icon2 {
      background: url("../../assets/img/hall/my/msg/2.png") no-repeat;
      background-size: 100% 100%;
    }
    .icon3 {
      background: url("../../assets/img/hall/my/msg/3.png") no-repeat;
      background-size: 100% 100%;
    }
    .icon4 {
      background: url("../../assets/img/hall/my/msg/4.png") no-repeat;
      background-size: 100% 100%;
    }
    .icon5 {
      background: url("../../assets/img/hall/my/msg/5.png") no-repeat;
      background-size: 100% 100%;
    }
    > div {
      width: 6rem;
      height: 1rem;
      padding-left: 0.2rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      p {
        font-size: 0.3rem;
        color: #111;
      }
      i {
        font-size: 0.25rem;
      }
      > span {
        padding: 0 0.1rem;
        background: #f11;
        color: #fff;
        font-size: 0.26rem;
        border-radius: 0.1rem;
        position: absolute;
        right: 0.3rem;
      }
    }
  }
}
</style>
