<template>
  <div id="myLevel">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>达人详情</h1>
    </div>
    <div class="topInfoContent" :style="{marginTop: statusH+0.88 + 'rem'}">
      <div class="levelInfo">
        <div>
          <p>总贡献收益</p>
          <span>
            <b>{{teamInfo.all_income}}</b>/DLT
          </span>
        </div>
        <div>
          <p>持有矿机数</p>
          <span>
            <b>{{teamInfo.machine_num}}</b>/台
          </span>
        </div>
      </div>
    </div>
    <div class="levelInfoContent">
      <div class="progressTxt" @click="jumpTo('memberLevel')">
        <div class="proTxtLeft">
          <p>当前等级</p>
          <span>{{level||1}}星达人</span>
        </div>
      </div>
      <van-swipe
        :show-indicators="false"
        :loop="false"
        @change="changeIndex"
        :width="116"
        :initial-swipe="initialNum"
      >
        <div id="line"></div>
        <van-swipe-item
          v-for="(item, index) in teamInfo.member_level_list"
          :key="index"
          @click="clickIndex(index)"
        >
          <div v-if="$route.query.index" class="processBox">
            <i :class="'levelbg'+(index*1)"></i>
            <div
              v-if="index>level"
              class="clockIcon"
              :style="tabIndex==index?'backgroundSize:50% 50%;width:0.8rem;height:0.8rem':''"
            ></div>
            <div class="botTxt">
              <p>{{item}}达人</p>
            </div>
          </div>
          <div v-else class="processBox">
            <i :class="'levelbg'+(index*1)"></i>
            <div
              v-if="index>level"
              class="clockIcon"
              :style="tabIndex==index?'backgroundSize:50% 50%;width:0.8rem;height:0.8rem':''"
            ></div>
            <div class="botTxt">
              <p>{{item}}达人</p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="upLevel">
        <div class="title">升级条件</div>
        <div class="upBox">
          <div>
            <p>直邀人数</p>
            <span>
              <b>{{teamInfo.direct_num*1}}/{{next_member_level.direct_num}}</b>
              <i v-if="teamInfo.direct_num*1<next_member_level.direct_num*1" class="err"></i>
              <i v-else class="current"></i>
            </span>
          </div>
          <div>
            <p>团队总有效人数</p>
            <span>
              <b>{{teamInfo.effective_num}}/{{next_member_level.team_num}}</b>
              <i v-if="teamInfo.effective_num*1<next_member_level.team_num*1" class="err"></i>
              <i v-else class="current"></i>
            </span>
          </div>
          <div @click="jumpTo('integral')">
            <p style="border:none">团队总积分</p>
            <span>
              <b>{{teamInfo.team_all_points}}/{{next_member_level.team_points_num}}</b>
              <i v-if="teamInfo.team_all_points*1<next_member_level.team_points_num*1" class="err"></i>
              <i v-else class="current"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="reward">
      <div class="title">星级奖励</div>
      <div class="nowLevelBox">
        <div class="label">
          <div></div>
          <div>当前奖励</div>
          <div>升级后奖励</div>
        </div>
        <div class="label">
          <div>团队收益</div>
          <div class="num">{{nowMember_level.team_commission_rate}}%</div>
          <div>
            <p>{{member_level.team_commission_rate}}%</p>
            <i></i>
          </div>
        </div>
        <div class="label">
          <div>团队手续费收益</div>
          <div class="num">{{nowMember_level.trade_commission_rate}}%</div>
          <div>
            <p>{{member_level.trade_commission_rate}}%</p>
            <i></i>
          </div>
        </div>
        <div class="label">
          <div>全球分红</div>
          <div class="num">{{nowMember_level.global_rate}}%</div>
          <div>
            <p>{{member_level.global_rate}}%</p>
            <i></i>
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
      level: this.$store.state.user.userInfo.member_level * 1,
      levels: [],
      teamInfo: [],
      member_level: [],
      next_member_level: [],
      tabIndex: 0,
      initialNum: 0,
      nowMember_level: []
    };
  },
  created() {
    this.getTeamInfo();
    if (this.$route.query.index) {
      this.tabIndex = this.$route.query.index;
      this.initialNum = this.$route.query.index - 1;
      this.getLevelInfo(this.$route.query.index);
    } else {
      this.initialNum = this.level - 1;
      this.getLevelInfo(this.level + 1);
    }
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    api.setStatusBarStyle({
      style: "light"
    });
  },
  methods: {
    changeIndex(e) {
      this.tabIndex = e * 1 + 1;
      this.getLevelInfo(e * 1 + 1);
    },
    clickIndex(e) {
      this.tabIndex = e;
      this.getLevelInfo(e * 1);
    },
    getTeamInfo() {
      this.$http
        .post(
          "/amoy/user/master-detail",
          /* {
            pUid: 1
          }, */
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.teamInfo = res.data;
            this.nowMember_level = res.data.member_level_info;
            this.next_member_level = res.data.next_member_level_info;
          }
        });
    },
    getLevelInfo(e) {
      this.$http
        .post(
          "/amoy/user/single-master-info",
          {
            mid: e
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            /* this.teamInfo = res.data; */
            this.member_level = res.data.member_level_info;
            this.next_member_level = res.data.member_level_info;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.van-swipe {
  position: relative;
}
#line {
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  top: 1rem;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(41, 37, 40, 1) 0%,
    rgba(75, 71, 78, 1) 100%
  );
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
.topInfoContent {
  position: relative;
  height: 1rem;
  background: linear-gradient(
    90deg,
    rgba(41, 37, 40, 1) 0%,
    rgba(75, 71, 78, 1) 100%
  );
}
.levelInfo {
  position: absolute;
  width: 6.9rem;
  height: 1.9rem;
  background: linear-gradient(
    270deg,
    rgba(234, 190, 123, 1) 0%,
    rgba(197, 148, 69, 1) 100%
  );
  border-radius: 0.1rem;
  bottom: -1.28rem;
  left: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #fff;
  > div {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 0.28rem;
    p {
      width: 100%;
      text-align: center;
      border-right: 1px solid #fff;
    }
    span {
      b {
        font-size: 0.5rem;
      }
    }
  }
}
.levelInfoContent {
  padding: 0 0.32rem;
  padding-top: 1.54rem;
  padding-bottom: 0.3rem;
  background: #fff;
  .progressTxt {
    margin-top: 0.17rem;
    height: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .proTxtLeft {
      width: 4rem;
      height: 0.5rem;
      float: left;
      display: flex;
      align-items: center;
      p {
        height: 0.5rem;
        line-height: 0.5rem;
        float: left;
        color: #d8ad6c;
        margin-left: 0.15rem;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.3rem;
        font-weight: 700;
      }
    }
    .proTxtRight {
      float: right;
      color: #29262a;
      font-size: 0.24rem;
      line-height: 0.5rem;
      height: 0.5rem;
    }
  }
  .avtiveProcess {
    border: 1px solid #d7a560;
  }
  .processBox {
    border-radius: 0.1rem;
    width: 100%;
    height: 1.8rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .clockIcon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../../assets/img/clock.png") no-repeat center center;
      background-size: 40% 40%;
      background-color: #f4e4ca;
      border-radius: 50%;
      margin-bottom: 0.4rem;
    }
    .botTxt {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.25rem;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      margin-top: 0.1rem;
      p {
        text-align: center;
      }
    }
  }
  .upLevel {
    margin-top: 0.2rem;
    .title {
      color: #d6a566;
      font-size: 0.26rem;
    }
    .upBox {
      margin-top: 0.1rem;
      width: 100%;
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      > div {
        width: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      p {
        width: 100%;
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
        border-right: 1px solid #ccc;
      }
      span {
        display: block;
        margin-left: 0.2rem;
        height: 0.3rem;
        overflow: hidden;
        b {
          font-weight: normal;
          float: left;
        }
        .err {
          float: left;
          width: 0.16rem;
          height: 0.16rem;
          background: url("../../assets/img/err.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 0.1rem;
          margin-left: 0.1rem;
        }
        .current {
          float: left;
          width: 0.16rem;
          height: 0.16rem;
          background: url("../../assets/img/cur.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 0.1rem;
          margin-left: 0.1rem;
        }
      }
    }
  }
}
.reward {
  background: #fff;
  margin-top: 0.2rem;
  padding-bottom: 0.3rem;
  .title {
    padding-left: 0.5rem;
    padding-top: 0.4rem;
    font-size: 0.3rem;
    color: #d5a861;
  }
  .nowLevelBox {
    width: 7.3rem;
    height: 2.9rem;
    background: rgba(214, 167, 94, 1);
    margin-left: 0.1rem;
    border-radius: 0.1rem;
    margin-top: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > div {
        color: #fff;
        width: 33%;
        text-align: center;
        font-size: 0.26rem;
        position: relative;
        p {
          font-weight: 700;
        }
        i {
          position: absolute;
          width: 0.35rem;
          height: 0.35rem;
          background: url("../../assets/img/hall/team/up.png") no-repeat;
          background-size: 100% 100%;
          top: 0;
          margin-left: 0.5rem;
        }
      }
      .num {
        font-weight: 700;
      }
    }
  }
}
.levelbg1 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/1.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg2 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/2.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg3 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/3.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg4 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/4.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg5 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/5.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg6 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/6.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg7 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/7.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg8 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/8.png") no-repeat;
  background-size: 100% 100%;
}
</style>
