<template>
  <div id="myBody">
    <div class="myTopBOX" id="myTopBOX" :style="{height: 2.8 + statusH + 'rem'}">
      <div class="headerBox" ref="header" :style="{paddingTop: statusH + 'rem'}">
        <i @click="goBack" class="iconfont icon-back"></i>
        <span>个人中心</span>
        <img @click="jumpTo('setting')" class="setPic" src="./../../assets/my/set.png" alt />
      </div>
      <div class="headMessBox" :style="{paddingTop: statusH + 'rem'}">
        <div class="messLeft" @click="afterRead">
          <img v-if="avatar" :src="userInfo.avatar || avatar" alt />
          <img v-else src="./../../assets/my/zszjtd.png" alt />
        </div>
        <div class="messCenter">
          <div class="messCenterT1">
            <span>{{userInfo.nickname||$store.state.user.userInfo.nickname}}</span>
            <img v-if="userInfo.mem_level_img" :src="userInfo.mem_level_img" alt />
          </div>
          <div class="messCenterT2">
            <span>ID:</span>
            <!-- <span v-if="!eyeShow">{{userInfo.invite_code}}</span>
            <span v-if="eyeShow">*******</span>-->
            <span v-if="!eyeShow">{{userInfo.uid}}</span>
            <span v-if="eyeShow">*******</span>
          </div>
        </div>
        <div class="messRight">
          <img @click="copyCode(userInfo.uid)" src="./../../assets/my/copy.png" alt />
          <img v-if="eyeShow" @click="eyeShow = !eyeShow" src="./../../assets/my/eyeoff.png" alt />
          <img v-if="!eyeShow" @click="eyeShow = !eyeShow" src="./../../assets/my/eyeopen.png" alt />
        </div>
      </div>
    </div>
    <div class="messCoreBox">
      <div class="messCard">
        <div class="messCardBox1">
          <div class="cardtit1">TG余额</div>
          <div class="cardtit2">{{userInfo.tg}}</div>
          <div class="cardtit3">￥{{userInfo.tg_to_cash}}</div>
          <div class="cardtit4">
            <van-button round class="card1but" @click="jumpTo('/newTrade')">去交易</van-button>
          </div>
        </div>
        <div class="messCardBox2">
          <div class="cardtit1">GST余额</div>
          <div class="cardtit2">{{userInfo.gst}}</div>
          <div class="cardtit4">
            <van-button @click="toWithdraw('/withdraw')" round class="card1but">去提现</van-button>
          </div>
        </div>
        <div class="messCardBox3">
          <div class="cardtit1">现金余额</div>
          <div class="cardtit2">{{userInfo.cash}}</div>
          <div class="cardtit4">
            <van-button round class="card1but" @click="toWithdraw('/withdraw_money')">去提现</van-button>
            <!-- <van-button round class="card1but">去拓容</van-button> -->
          </div>
        </div>
      </div>
      <!-- 分红龙 -->
      <div class="participationNum" @click="jumpTo('/compound')">
        <div>持有分红龙数量</div>
        <div class="pationNumBox">
          <span class="pationNum1">{{userInfo.drag || '0'}}个</span>
          <span class="pationNum2">详情</span>
          <img src="./../../assets/my/myleft.png" alt />
        </div>
      </div>
      <!-- 收益 -->
      <div class="earningsBox" @click="jumpTo('/earningInfo')">
        <div class="earningsCore">
          <div class="earningsCore1">
            <span>今日总收益</span>
            <img src="./../../assets/my/myleft.png" alt />
          </div>
          <div class="earningsCore2">
            <!-- <div>{{userInfo.today_incomes}}</div>
            <div>￥{{userInfo.today_incomes_cash}}</div> -->
            <span>今日收益明细</span>
          </div>
        </div>
        <!-- <div style="width: 100%;height: 1px;background: #E1E1E1; "></div>
        <div class="earningsCore">
          <div class="earningsCore1">
            <span>昨日总收益</span>
            <img src="./../../assets/my/myleft.png" alt="">
          </div>
          <div class="earningsCore2">
            <div>{{userInfo.yesterday_incomes}}</div>
            <div>≈￥{{userInfo.yesterday_incomes_cash}}</div>
          </div>
        </div>-->
      </div>
      <!-- 我的矿机数 -->
      <div class="oilFieldBox" @click="jumpTo('/millCard')">
        <div class="FieldBoxCore">
          <div class="FieldTitle">
            <img src="./../../assets/my/oilFiel1.png" alt />
            <span>
              我的矿机数：
              <span>{{userInfo.my_machine}}</span>
            </span>
          </div>
          <div class="earningsCore1">
            <span>详情</span>
            <img src="./../../assets/my/left2.png" alt />
          </div>
        </div>
        <div class="FieldBoxCore">
          <div class="FieldTitle">
            <img src="./../../assets/my/oilFiel2.png" alt />
            <span>
              今日矿机收益：
              <span>{{userInfo.machine_incomes}}</span>
            </span>
          </div>
        </div>
      </div>
      <!-- 做任务 -->
      <!-- <div class="gotaskBox">
        <div class="gotaskTop">
          <div>
            <div class="gotaskTopSpan1">浏览{{userInfo.video_num}}个视频</div>
            <div class="gotaskTopSpan2">（{{userInfo.video_percent}}%）</div>
          </div>
          <van-button round class="gotaskbut" @click="gotaskbut(userInfo.is_realname)">做任务</van-button>
        </div>
        <van-progress :percentage="videoPercent" color='#D8AD6C' :show-pivot="false" stroke-width=".12rem" />
      </div>-->
      <div class="myGroupBox" @click="jumpTo('/team')">
        <div class="vipBox">
          <div class="vipBoxLeft">
            <img src="./../../assets/my/mygroup.png" alt />
            <span>我的团队总人数：{{userInfo.team_nums}}</span>
          </div>
          <div class="earningsCore1">
            <span>详情</span>
            <img src="./../../assets/my/mygroupleft.png" alt />
          </div>
        </div>
        <div class="myGrroupBottom">
          <div>
            <div>今日团队收益</div>
            <div>{{userInfo.team_today_incomes}}TG</div>
          </div>
          <div>
            <div>昨日团队收益</div>
            <div>{{userInfo.team_yesterday_incomes}}TG</div>
          </div>
        </div>
      </div>
      <!-- 会员等级详情 -->
      <div class="vipBox">
        <div class="vipBoxLeft">
          <img src="./../../assets/my/vip.png" alt />
          <span>会员等级详情</span>
        </div>
        <div class="earningsCore1" @click="toMyLevel(userInfo.is_realname)">
          <span>查看概况</span>
          <img src="./../../assets/my/myleft.png" alt />
        </div>
      </div>
      <!--  -->
      <div class="coreCoreBox">
        <div class="CoreBoxdeji" @click="jumpTo('/team')">
          <div class="groupBox">
            <img src="./../../assets/my/icon1.png" alt />
            <span>{{userInfo.team_nums}}</span>
          </div>
          <div>团队</div>
        </div>
        <div class="CoreBoxdeji" @click="toAuth(userInfo.is_realname)">
          <div class="groupBox">
            <img src="./../../assets/my/icon2.png" alt />
          </div>
          <div>实名认证</div>
        </div>
        <div class="CoreBoxdeji" @click="$vux.toast.text('该功能暂未开通~')">
          <div class="groupBox">
            <img src="./../../assets/my/icon3.png" alt />
          </div>
          <div>城市合伙人</div>
        </div>
        <div class="CoreBoxdeji" @click="jumpTo('/handlingFee')">
          <div class="groupBox">
            <img src="./../../assets/my/icon4.png" alt />
          </div>
          <div>手续费等级</div>
        </div>
      </div>
      <!--  -->
      <div class="gradeBox">
        <div class="gradeBoxTop">
          <div class="gradeBoxTopLeft">
            <span class="BoxTopLeftSpan1">当前等级</span>
            <img
              v-if="userInfo.mem_level_img"
              class="BoxTopLeftPic"
              :src="userInfo.mem_level_img"
              alt
            />
            <span class="BoxTopLeftSpan2">{{userInfo.mem_level_title}}</span>
          </div>
          <div class="earningsCore1" @click="toMyLevel(userInfo.is_realname)">
            <span>详情</span>
            <img src="./../../assets/my/left2.png" alt />
          </div>
        </div>

        <van-swipe
          :show-indicators="false"
          :loop="false"
          @change="changeIndex"
          :width="80"
          :initial-swipe="nowLevel-1"
        >
          <div id="line"></div>
          <van-swipe-item v-for="(item, index) in userInfo.mem_levels" :key="index">
            <div class="processBox">
              <div v-if="index<=nowLevel-1">
                <img :src="item.small_img" alt style="height: .44rem; width: .44rem" />
              </div>
              <div v-if="index>nowLevel-1">
                <img src="./../../assets/my/djoff.png" alt style="height: .44rem; width: .44rem" />
              </div>
              <div class="botTxt">
                <p :style="{'color': index>nowLevel-1 ? '#F2E2C4' : ''}">{{item.title}}</p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>

        <!-- <div class="gradeBoxBottom">
          <div class="BoxBottom1">
            <div>团队矿机提成</div>
            <div>20%</div>
          </div>
          <div class="BoxBottom1">
            <div>团队手续费提成</div>
            <div>20%</div>
          </div>
          <div class="BoxBottom1">
            <div>全球手续费提成</div>
            <div>20%</div>
          </div>
        </div>-->
      </div>
      <!--swipe  -->
      <!-- <van-swipe>
        <van-swipe-item v-for="(item,index) in 4" :key="index">
          <div class="lianbgBox" @click="onChange(index)">
            <img src="./../../assets/my/lianbg.png" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>-->
      <!-- <div class="lianbgBox" @click="onChange()"> -->
      <div class="lianbgBox" @click="jumpTo('/globalFee')">
        <img src="./../../assets/my/lianbg.png" alt />
        <p class="title">有声有色全球分红公示</p>
      </div>
      <!--  -->
      <div class="iconBoxAll">
        <!-- <div class="iconBox" @click="$vux.toast.text('该功能暂未开通~')">
          <img src="./../../assets/my/ic1.png" alt />
          <span>我的订单</span>
        </div> -->
        <div class="iconBox" @click="showTeachers">
          <img src="./../../assets/my/ic2.png" alt />
          <span>我的导师</span>
        </div>
        <div class="iconBox" @click="jumpTo('/guide')">
          <img src="./../../assets/my/ic3.png" alt />
          <span>新手指南</span>
        </div>
        <div class="iconBox" @click="jumpTo('/feedbackNew')">
          <img src="./../../assets/my/ic4.png" alt />
          <span>问题反馈</span>
        </div>
        <div class="iconBox" @click="jumpTo('/ranking')">
          <img src="./../../assets/my/ic5.png" alt />
          <span>排行榜</span>
        </div>
      </div>
      <!--  -->
    </div>
    <!-- 弹出层 -->
    <div id="winShow" v-show="showTeacher">
      <div class="win_core">
        <div class="win_core_top">
          <img @click="showTeacher = !showTeacher" src="./../../assets/my/off.png" alt />
        </div>
        <div class="win_core_cen">
          <div class="core_cen_top">
            <img v-if="userInfo.referrer_wx_avatar" :src="userInfo.referrer_wx_avatar" alt />
            <img v-else src="./../../assets/my/zszjtd.png" alt />
            <div>
              <span>{{userInfo.referrer}}</span>
              <img src="./../../assets/my/xxing.png" alt />
            </div>
          </div>
          <div class="core_cen_bottom">
            <span>手机号：{{userInfo.referrer_mobile}}</span>
            <img src="./../../assets/my/pho.png" alt />
          </div>
          <div class="core_cen_bottom">
            <span>微信号：{{userInfo.referrer_wx_number}}</span>
            <img
              @click="copyCode(userInfo.referrer_wx_number)"
              src="./../../assets/my/copy2.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="click"></actionsheet>
  </div>
</template>
<script>
import { Actionsheet, XProgress } from "vux";
import * as utils from "../../utils";
export default {
  components: { Actionsheet, XProgress },
  data() {
    return {
      statusH: "",
      eyeShow: false,
      active: 1,
      showTeacher: false,

      menus: {
        menu1: "从相册选择一张",
        menu2: "拍照"
      },
      show: false,
      // level: this.$store.state.user.userInfo.member_level * 1,
      showTip: false,
      userInfo: [],
      hideCode: false,
      teamInfo: [],
      nowLevel: "",
      teacher: "",
      avatar: this.$store.state.user.userInfo.avatar,
      fileList: [],
      tabIndex: 0,
      showWxNum: false,
      videoPercent: 0,
      taskInfo: ""
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
    // this.getTeamInfo()
    // this.getMyTeacher()
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // "页面被挂起"
      } else {
        this.getUserInfo();
        this.getTaskInfo();
      }
    });
  },
  methods: {
    changeIndex(index) {
      console.log(index);
    },
    getUserInfo() {
      this.$http.post("/amoy/user/user-detail", true, true).then(res => {
        if (res.code == 0) {
          this.$store.commit("setUserInfo", res.data);
          this.$store.commit("setGuidePrice", res.data.guide_price);
          this.userInfo = res.data;
          this.nowLevel = res.data.mem_level;
          this.videoPercent = Number(res.data.video_percent);
        }
      });
    },
    toWithdraw(target) {
      dsBridge.call("openWin", target);
    },
    afterRead() {
      this.show = true;
    },
    click(key) {
      console.log(key);
      if (key === "menu1") {
        this.galleryImg();
      } else if (key === "menu2") {
        this.captureImage();
      }
    },
    galleryImg() {
      dsBridge.call("getPicture", ret => {
        if (ret) {
          this.$http
            .post("/amoy/user/update-nick", { avatar: ret }, true, true)
            .then(res => {
              if (res.code == 0) {
                this.$vux.toast.text("更换成功！");
                this.getUserInfo();
              }
            });
        }
      });
    },
    captureImage() {
      dsBridge.call("getCamera", ret => {
        if (ret) {
          this.$http
            .post("/amoy/user/update-nick", { avatar: ret }, true, true)
            .then(res => {
              if (res.code == 0) {
                this.$vux.toast.text("更换成功！");
                this.getUserInfo();
              }
            });
        }
      });
    },
    copyCode(val) {
      dsBridge.call("clipBoard", { value: val });
    },
    showTeachers() {
      if (!this.userInfo.referrer) {
        return this.$vux.toast.text("暂无导师！");
      }
      this.showTeacher = true;
    },
    onChange(index) {
      console.log(index);
      this.jumpTo("/fenHongNotice");
    },
    // 去我的等级页面
    toMyLevel(status) {
      if (status == 0) {
        this.$vux.toast.text("请先实名认证");
      } else {
        this.jumpTo("/myLevel");
      }
    },
    toAuth(status) {
      if (status == 1) {
        this.$vux.toast.text("您已实名！");
      } else {
        this.jumpTo("/auth");
      }
    },
    getTaskInfo() {
      this.$http
        .post("/amoy_v2/task-system/task-status", {}, true, true)
        .then(res => {
          if (res.code === 0) {
            this.taskInfo = res.data;
          }
        });
    },
    // 做任务
    gotaskbut(status) {
      if (status == 0) {
        this.$vux.toast.text("请先实名认证");
      } else {
        if (this.taskInfo.task_id) {
          this.seeVideo();
        } else {
          this.getTaskInfo();
          this.seeVideo();
        }
      }
    },
    seeVideo() {
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
      dsBridge.call("loadAds", ret => {
        if (ret == 1) {
          this.$vux.loading.hide();
          dsBridge.call("showVideoAds", ret => {
            if (ret == 1) {
              this.$http
                .post(
                  "/amoy_v2/task-system/cat-adv",
                  { task_id: this.taskInfo.task_id },
                  true,
                  true
                )
                .then(res => {
                  if (res.code === 0) {
                    this.getUserInfo();
                    this.getTaskInfo();
                    utils.storage.set("videoTimer", nowTimer, 1);
                  }
                });
            } else if (ret == 3) {
              this.$vux.toast.text("播放失败");
            }
          });
        } else {
          setTimeout(() => {
            this.$vux.loading.hide();
          }, 2000);
        }
      });
    }
  },
  activated() {
    this.getUserInfo();
    this.getTaskInfo();
  }
};
</script>
<style lang="less" >
#myBody {
  .van-swipe__indicator {
    height: 4px;
    background-color: #dddddd;
  }
  .van-swipe__indicator.van-swipe__indicator--active {
    // background-color: rgba(35,32,39,1);
    width: 10px;
    border-radius: 3px;
  }
}
</style>
<style lang="less" scoped>
.new-progress {
  position: relative;
  padding: 0.4rem;
  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    left: 0.4rem;
    right: 0.3rem;
    top: 0.2rem;
    > div {
      text-align: center;
      text-align: right;
      width: 33.33%;
      img {
        width: 0.44rem;
      }
      p {
        margin-right: -0.12rem;
        font-size: 0.2rem;
        color: #f2e2c4;
      }
      .reach {
        color: #3c3c3d;
      }
    }
  }
}

#myBody {
  background: #fff;
  .myTopBOX {
    width: 100%;
    height: 2.8rem;
    background: linear-gradient(
      -90deg,
      rgba(35, 32, 39, 1) 0%,
      rgba(55, 53, 64, 1) 100%
    );
    overflow: hidden;
    .headerBox {
      width: 100%;
      height: 0.88rem;
      position: fixed;
      top: 0;
      z-index: 10000;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(
        -90deg,
        rgba(35, 32, 39, 1) 0%,
        rgba(55, 53, 64, 1) 100%
      );
      > .iconfont {
        margin-left: 0.3rem;
        font-size: 0.36rem;
      }
      > span {
        font-size: 0.36rem;
        font-weight: 500;
      }
      > .setPic {
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.3rem;
      }
    }
    .headMessBox {
      padding: 0 0.3rem;
      margin-top: 1.3rem;
      display: flex;
      justify-content: space-between;
      .messLeft {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(74, 74, 83);
        > img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
        }
      }
      .messCenter {
        width: 4.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > div {
          display: flex;
          align-items: center;
        }
        .messCenterT1 {
          margin-bottom: 0.1rem;
          > span {
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            max-width: 3.5rem;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          > img {
            width: 0.32rem;
            height: 0.32rem;
            margin-left: 0.1rem;
          }
        }
        .messCenterT2 {
          > span:nth-child(1) {
            font-size: 0.28rem;
            font-weight: bold;
            color: #d8ad6c;
          }
          > span:nth-child(2) {
            font-size: 0.28rem;
            font-weight: bold;
            color: #d8ad6c;
            margin-left: 0.1rem;
          }
        }
      }
      .messRight {
        width: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        > img:nth-child(1) {
          width: 0.22rem;
          height: auto;
          margin-bottom: 0.2rem;
        }
        > img:nth-child(2) {
          width: 0.28rem;
          height: auto;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  .messCoreBox {
    padding: 0 0.26rem;
    .messCard {
      margin: 0.4rem 0;
      display: flex;
      justify-content: space-between;
      overflow-x: scroll;
      > div {
        width: 2.7rem;
        height: 2.22rem;
        padding: 0 0.25rem;
        flex-shrink: 0;
        margin-right: 0.15rem;
      }
      .messCardBox1 {
        background: url(./../../assets/my/card1.png) 0 0 no-repeat;
        background-size: 100% 100%;
        padding: 0 0.26rem;
        .cardtit1 {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(192, 145, 78, 1);
          margin: 0.1rem 0;
        }
        .cardtit2 {
          font-size: 0.36rem;
          font-weight: 800;
          color: rgba(60, 60, 61, 1);
        }
        .cardtit3 {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(60, 60, 61, 1);
          margin-bottom: 0.1rem;
        }
        .cardtit4 {
          display: flex;
          justify-content: space-between;
          .card1but {
            width: 1.2rem;
            height: 0.4rem;
            border: none;
            background: linear-gradient(
              -30deg,
              rgba(67, 69, 78, 1) 0%,
              rgba(121, 119, 126, 1) 100%
            );
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(254, 201, 116, 1);
            padding: 0;
          }
        }
      }
      .messCardBox2 {
        background: url(./../../assets/my/card2.png) 0 0 no-repeat;
        background-size: 100% 100%;
        .cardtit1 {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(168, 168, 168, 1);
          margin: 0.1rem 0;
        }
        .cardtit2 {
          font-size: 0.36rem;
          font-weight: 800;
          color: rgba(216, 173, 108, 1);
          margin-bottom: 0.48rem;
        }
        .cardtit3 {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(216, 173, 108, 1);
          margin-bottom: 0.1rem;
        }
        .cardtit4 {
          display: flex;
          justify-content: space-between;
          .card1but {
            width: 1.2rem;
            height: 0.4rem;
            border: 1px solid rgba(168, 168, 168, 1);
            background: none;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(168, 168, 168, 1);
            padding: 0;
          }
        }
      }
      .messCardBox3 {
        background: url(./../../assets/my/card3.png) 0 0 no-repeat;
        background-size: 100% 100%;
        .cardtit1 {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(236, 236, 236, 1);
          margin: 0.1rem 0;
        }
        .cardtit2 {
          font-size: 0.36rem;
          font-weight: 800;
          color: rgba(216, 173, 108, 1);
          margin-bottom: 0.48rem;
        }
        .cardtit4 {
          display: flex;
          justify-content: space-between;
          .card1but {
            width: 1.2rem;
            height: 0.4rem;
            border: 1px solid rgba(236, 236, 236, 1);
            background: none;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(236, 236, 236, 1);
            padding: 0;
          }
        }
      }
    }
    .participationNum {
      height: 1rem;
      background: linear-gradient(
        -45deg,
        rgba(226, 186, 127, 1),
        rgba(240, 214, 160, 1)
      );
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      > div:nth-child(1) {
        font-size: 0.3rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .pationNumBox {
        display: flex;
        align-items: center;
        .pationNum1 {
          font-size: 0.3rem;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-right: 0.24rem;
        }
        .pationNum2 {
          font-size: 0.24rem;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
          margin-right: 0.1rem;
        }
        > img {
          width: 0.12rem;
          height: auto;
        }
      }
    }
    .earningsBox {
      .earningsCore {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.2rem;
        .earningsCore1 {
          display: flex;
          align-items: center;
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-right: 0.25rem;
          }
          > img {
            width: 0.12rem;
            height: auto;
          }
        }
        .earningsCore2 {
          > div:nth-child(1) {
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(216, 173, 108, 1);
          }
          > div:nth-child(2) {
            font-size: 0.24rem;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
    .oilFieldBox {
      height: 1.36rem;
      background: linear-gradient(
        -30deg,
        rgba(226, 186, 127, 1) 0%,
        rgba(240, 214, 160, 1) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .FieldBoxCore {
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        .FieldTitle {
          display: flex;
          align-items: center;
          > img {
            width: 0.28rem;
            height: auto;
            margin-right: 0.2rem;
          }
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(60, 60, 61, 1);
            > span {
              font-size: 0.3rem;
              font-weight: bold;
              color: rgba(60, 60, 61, 1);
            }
          }
        }
        .earningsCore1 {
          display: flex;
          align-items: center;
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(165, 123, 61, 1);
            margin-right: 0.25rem;
          }
          > img {
            width: 0.1rem;
            height: auto;
          }
        }
      }
    }
    .gotaskBox {
      height: 1.55rem;
      background: rgba(247, 244, 248, 1);
      border: 0 0 0.08rem 0.08rem;
      padding: 0 0.3rem;
      .gotaskTop {
        display: flex;
        justify-content: space-between;
        // margin-top: .4rem;
        // margin-bottom: .47rem;
        padding: 0.3rem 0 0.4rem;
        > div {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .gotaskTopSpan1 {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(216, 173, 108, 1);
          margin-right: 0.2rem;
          max-width: 3.5rem;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gotaskTopSpan2 {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
        .gotaskbut {
          width: 1.2rem;
          height: 0.4rem;
          background: linear-gradient(
            -30deg,
            rgba(227, 185, 125, 1) 0%,
            rgba(240, 214, 160, 1) 100%
          );
          border: none;
          font-size: 0.24rem;
          font-weight: bold;
          color: rgba(60, 60, 61, 1);
          padding: 0;
        }
      }
    }
    .myGroupBox {
      height: 1.87rem;
      background: linear-gradient(
        -90deg,
        rgba(35, 32, 39, 1) 0%,
        rgba(55, 53, 64, 1) 100%
      );
      margin-top: 0.3rem;
      border-radius: 0.08rem;
      .vipBox {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        .vipBoxLeft {
          display: flex;
          align-items: center;
          > img {
            width: 0.28rem;
            height: auto;
          }
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-left: 0.14rem;
          }
        }
        .earningsCore1 {
          display: flex;
          align-items: center;
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-right: 0.25rem;
          }
          > img {
            width: 0.12rem;
            height: auto;
          }
        }
      }
      .myGrroupBottom {
        display: flex;
        > div {
          width: 50%;
          box-sizing: border-box;
          border-right: 1px #ccc dashed;
          > div {
            margin-left: 0.3rem;
          }
          > div:nth-child(1) {
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(167, 168, 167, 1);
            margin-bottom: 0.05rem;
          }
          > div:nth-child(2) {
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(216, 173, 108, 1);
          }
        }
        > div:last-child {
          border-right: none;
        }
      }
    }
    .vipBox {
      height: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vipBoxLeft {
        display: flex;
        align-items: center;
        > img {
          width: 0.28rem;
          height: auto;
        }
        > span {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-left: 0.14rem;
        }
      }
      .earningsCore1 {
        display: flex;
        align-items: center;
        > span {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-right: 0.25rem;
        }
        > img {
          width: 0.12rem;
          height: auto;
        }
      }
    }
    .coreCoreBox {
      height: 1.7rem;
      display: flex;
      justify-content: space-between;
      .CoreBoxdeji {
        text-align: center;
        // margin-right: 1.2rem;
        width: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .groupBox {
          width: 0.88rem;
          height: 1rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 0.88rem;
            height: 0.88rem;
          }
          > span {
            height: 0.28rem;
            background: linear-gradient(
              -30deg,
              rgba(227, 185, 125, 1) 0%,
              rgba(240, 214, 160, 1) 100%
            );
            border-radius: 0.14rem;
            padding: 0 0.1rem 0.05rem;
            font-size: 0.22rem;
            font-weight: bold;
            color: rgba(60, 60, 61, 1);
            position: relative;
            top: -11px;
          }
        }
      }
    }
    .gradeBox {
      background: url(./../../assets/my/bg.png) 0 0 no-repeat;
      background-size: 100% 100%;
      height: 2.2rem;
      .gradeBoxTop {
        height: 0.8rem;
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        .gradeBoxTopLeft {
          display: flex;
          align-items: center;
          .BoxTopLeftSpan1 {
            font-size: 0.24rem;
            font-weight: bold;
            color: rgba(192, 145, 78, 1);
            margin-right: 0.4rem;
          }
          .BoxTopLeftPic {
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.2rem;
          }
          .BoxTopLeftSpan2 {
            font-size: 0.22rem;
            font-weight: bold;
            color: rgba(60, 60, 61, 1);
          }
        }
        .earningsCore1 {
          display: flex;
          align-items: center;
          > span {
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(165, 123, 61, 1);
            margin-right: 0.25rem;
          }
          > img {
            width: 0.1rem;
            height: auto;
          }
        }
      }
      // van-swipe
      #line {
        width: 100%;
        height: 0.06rem;
        background: #f2e2c4;
        position: absolute;
        top: 0.2rem;
      }
      .processBox {
        border-radius: 0.1rem;
        width: 100%;
        height: 1rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        .clockIcon {
          width: 0.44rem;
          height: 0.44rem;
          background: url("./../../assets/my/djoff.png") no-repeat;
          background-size: 100% 100%;
        }
        .levelbg1 {
          width: 0.44rem;
          height: 0.44rem;
          background: url("./../../assets/my/dengji1.png") no-repeat;
          background-size: 100% 100%;
        }
        // .levelbg1 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("./../../assets/my/dengji1.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg2 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/2.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg3 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/3.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg4 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/4.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg5 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/5.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg6 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/6.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg7 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/7.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .levelbg8 {
        //   width: 0.44rem;
        //   height: 0.44rem;
        //   background: url("../../assets/img/8.png") no-repeat;
        //   background-size: 100% 100%;
        // }
        // .clockIcon {
        //   width: 0.6rem;
        //   height: 0.6rem;
        //   background: url("../../assets/img/clock.png") no-repeat center center;
        //   background-size: 40% 40%;
        //   background-color: #f4e4ca;
        //   border-radius: 50%;
        //   margin-bottom: 0.4rem;
        // }
        .botTxt {
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.2rem;
          font-weight: 500;
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
      .gradeBoxBottom {
        display: flex;
        margin-top: 0.1rem;
        .BoxBottom1 {
          width: 33.33%;
          text-align: center;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(173, 136, 78, 1);
          box-sizing: border-box;
          border-right: 0.01rem #000000 dashed;
        }
        .BoxBottom1:last-child {
          border: none;
        }
      }
    }
    .lianbgBox {
      margin: 0.3rem 0;
      position: relative;
      > img {
        width: 100%;
        height: 1.33rem;
      }
      .title {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        top: 0.5rem;
        font-size: 0.32rem;
        color: #fff;
        font-weight: bold;
      }
    }
    .iconBoxAll {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      // margin-bottom: .8rem;
      .iconBox {
        width: 25%;
        height: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 0.2rem;
        > img {
          width: 0.44rem;
          height: 0.44rem;
        }
        > span {
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(168, 168, 168, 1);
        }
      }
    }
    //
  }
  #winShow {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .win_core {
      position: relative;
      top: 4rem;
      background: #fff;
      z-index: 999;
      margin-left: 1.45rem;
      width: 4.6rem;
      height: 4.9rem;
      border-radius: 0.08rem;
    }
    .win_core_top {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: right;
      font-size: 0.36rem;
      font-weight: bold;
      margin-right: 0.3rem;
      > img {
        width: 0.36rem;
        height: 0.36rem;
      }
    }
    .win_core_cen {
      padding: 0 0.2rem;
      .core_cen_top {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 0.5rem;
        > img {
          width: 1.5rem;
          height: 1.5rem;
        }
        > div {
          display: flex;
          align-items: center;
          margin-top: 0.2rem;
          > span {
            font-size: 0.28rem;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            max-width: 3rem;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 0.1rem;
          }
          > img {
            width: 0.38rem;
            height: auto;
          }
        }
      }
      .core_cen_bottom {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.15rem;
        padding: 0 0.2rem;
        > span {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }
        > img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
}
</style>
