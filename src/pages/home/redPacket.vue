<template>
  <div id="redPacket">
    <i @click="goBack()" class="iconfont icon-back"></i>
    <span class="rules" @click="showRules=true">规则</span>
    <div class="lingqu"></div>
    <div class="txtTip">拆现金红包 打款秒到账</div>
    <div class="redpacket">
      <div class="redTxttip">
        <p>恭喜获得现金</p>
        <span>{{redData.coupon_info?redData.coupon_info.min_money:100}}元</span>
        <p style="font-size:0.22rem;margin-top:0.15rem;">累计红包{{redData.already_coupon}}元</p>
      </div>
      <div class="time" v-show="!isGetRedpack">
        <span>{{hour}}</span>
        <b>:</b>
        <span>{{min}}</span>
        <b>:</b>
        <span>{{sec}}</span>
        后现金将失效
      </div>
      <div class="time" v-show="isGetRedpack">领取成功!</div>
      <!-- <div
        v-if="redData.coupon_info.id&&redData.coupon_info.id==1"
        class="sharebtn"
        v-show="!isShare"
        @click="toShare"
      >分享1位好友 即可拆开</div>-->
      <div
        class="sharebtn"
        v-if="redData.coupon_info&&redData.coupon_info.id==1"
        @click="getRedPack"
      >拆红包</div>
      <div
        v-if="redData.coupon_info&&redData.coupon_info.id==2"
        class="sharebtn"
        @click="toShare"
      >分享{{redData.coupon_info.share_num}}位好友 即可拆开</div>
      <div
        v-if="redData.coupon_info&&redData.coupon_info.id==3"
        class="sharebtn"
        @click="toShare"
      >邀请{{redData.coupon_info.invite_num}}位好友 即可拆开</div>
      <div
        v-if="redData.coupon_info&&redData.coupon_info.id==4"
        class="sharebtn"
        @click="toShare"
      >邀请{{redData.coupon_info.invite_num}}位好友 即可拆开</div>
      <div
        v-if="redData.coupon_info&&redData.coupon_info.id==5"
        class="sharebtn"
        @click="toShare"
      >邀请{{redData.coupon_info.invite_num}}位好友 即可拆开</div>
      <div class="sharebtn" v-show="isShare" @click="getRedPack">拆红包</div>
    </div>
    <div class="money"></div>
    <x-dialog
      v-model="showRules"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="3000"
    >
      <div class="txTip" v-html="rulesTxt"></div>
      <i class="closeIcon" @click="showRules=false"></i>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
import { clearInterval } from "timers";
export default {
  components: {
    XDialog
  },
  data() {
    return {
      isGetRedpack: false, //是否拆开红包
      redData: [], //红包信息
      showRules: false, //是否显示规则
      rulesTxt: "",
      timer: null,
      hour: "00",
      min: "00",
      sec: "00",
      isShare: false, //未分享微信
      resType: 1
    };
  },
  created() {
    /* this.isShare = sessionStorage.getItem("isShare") || false; */
    this.$http.post("/amoy/redbag/now-coupon-info").then(res => {
      if (res.code == 0) {
        this.redData = res.data;
        this.resType = res.data.coupon_info.id;
        this.getShareNum();
        this.formatTime(res.data.present_timestamp, res.data.finish_timestamp);
      }
    });

    this.$http.post("/amoy/redbag/coupon-rule").then(res => {
      if (res.code == 0) {
        this.rulesTxt = res.data;
      }
    });
    this.$http.post("/amoy/user/invite").then(res => {
      if (res.code == 0) {
        this.tpl = res.data.img[0];
        this.imgs =
          this.link +
          "/amoy/user/invite?tpl=" +
          this.tpl +
          "&uid=" +
          this.$store.state.user.userInfo.uid +
          "&invite_code=" +
          this.$store.state.user.userInfo.invite_code;
        this.$store.commit("setInvitedImg", this.imgs);
      }
    });
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    getShareNum() {
      this.$http.post("/amoy/redbag/get-direct-num", true, true).then(res => {
        if (res.code == 0) {
          if (this.resType == 2 && res.data.share_num == 3) {
            this.isShare = true;
            this.$store.commit("setisShowRed", true);
          } else if (this.resType == 3 && res.data.direct_num == 1) {
            this.isShare = true;
            this.$store.commit("setisShowRed", true);
          } else if (this.resType == 4 && res.data.direct_num == 2) {
            this.isShare = true;
            this.$store.commit("setisShowRed", true);
          } else if (this.resType == 5 && res.data.direct_num == 3) {
            this.isShare = true;
            this.$store.commit("setisShowRed", true);
          } else {
            this.isShare = false;
            this.$store.commit("setisShowRed", false);
          }
        }
      });
    },
    getRedPack() {
      this.$http.post("/amoy/redbag/grab-coupon").then(res => {
        if (res.code == 0) {
          this.getUserInfo();
          /* this.$store.state.global.isShowRed = false; */
          this.$store.commit("setisShowRed", false);
          this.$vux.toast.text("领取成功！");
          window.clearInterval(this.timer);
          this.isGetRedpack = true;
        }
      });
    },
    getUserInfo() {
      this.$http.post("/amoy/user/user-info").then(res => {
        if (res.code == 0) {
          this.$store.commit("setUserInfo", res.data);
          this.userInfo = res.data;
        }
      });
    },
    formatTime(time1, time2) {
      var time = time2 - time1;
      this.timer = setInterval(() => {
        time--;
        if (time > 0) {
          this.hour = this.formatNum(Math.floor(time / 3600));
          this.min = this.formatNum(Math.floor(time / 60) % 60);
          this.sec = this.formatNum(Math.floor(time % 60));
        } else {
          window.clearInterval(this.timer);
          return;
        }
      }, 1000);
    },
    formatNum(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    toShare() {
      if (window.api) {
        var that = this;
        var wx = api.require("wx");
        that.$vux.loading.show({
          text: "加载中"
        });
        let format = "share" + new Date().getTime() + ".jpg";
        var way = "session";
        api.download(
          {
            url: that.$store.state.global.invitedImg,
            savePath: "fs://" + format,
            encode: false,
            report: false,
            cache: false,
            allowResume: true
          },
          function(ret, err) {
            that.$vux.loading.hide();
            let wx = api.require("wx");
            wx.shareImage(
              {
                scene: way,
                contentUrl: "fs://" + format
              },
              function(ret, err) {
                if (err.code == 0) {
                  that.isShare = true;
                  /* sessionStorage.setItem("isShare", true); */
                  that.$http
                    .post("/amoy/redbag/update-share-num", true, true)
                    .then(res => {
                      if (res.code == 0) {
                        that.$vux.toast.text("分享成功！");
                      }
                    });
                }
              }
            );
          }
        );
      } else {
        console.log("分享到微信");
        this.saveClick();
      }
    },
    //保存图片到本地
    saveClick() {
      this.isShare = true;
      /* sessionStorage.setItem("isShare", true); */
      this.$http.post("/amoy/redbag/update-share-num", true, true).then(res => {
        if (res.code == 0) {
          //that.$vux.toast.text("分享成功！");
        }
      });
      window.location.href =
        this.link +
        "/amoy/user/invite?tpl=/uploads/image/99966/0/2019/10/9badf41e751a2102dc0a7a63377dbd4f.jpg" +
        "&uid=" +
        this.$store.state.user.userInfo.uid +
        "&invite_code=" +
        this.$store.state.user.userInfo.invite_code;
    }
  }
};
</script>
<style lang="less" scoped>
#redPacket {
  position: relative;
  width: 100%;
  min-height: 100%;
  background: url("../../assets/img/hall/hongbao/bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.txtTip {
  width: 5.22rem;
  height: 0.54rem;
  border-radius: 0.26rem;
  text-align: center;
  line-height: 0.54rem;
  margin: 0 auto;
  color: #c72101;
  font-size: 0.34rem;
  margin-top: 0.52rem;
}
.iconfont {
  position: fixed;
  font-size: 0.4rem;
  color: #fff;
  left: 0.4rem;
  margin-top: 0.6rem;
}
.lingqu {
  display: block;
  margin: 0 auto;
  width: 6.1rem;
  height: 0.84rem;
  background: url("../../assets/img/hall/hongbao/share.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.4rem;
}
.redpacket {
  width: 5.8rem;
  height: 7.4rem;
  background: url("../../assets/img/hall/hongbao/red.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 0.2rem;
  position: relative;
  overflow: hidden;
  .redTxttip {
    width: 100%;
    height: 1.5rem;
    margin-top: 0.8rem;
    text-align: center;
    p {
      font-size: 0.36rem;
      color: #c52a2a;
      line-height: 0.36rem;
      height: 0.36rem;
    }
    span {
      display: block;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.6rem;
      color: #df0505;
      font-weight: 800;
      margin-top: 0.25rem;
    }
  }
  .sharebtn {
    width: 5rem;
    height: 0.9rem;
    background: url("../../assets/img/hall/hongbao/juxing.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.36rem;
    line-height: 0.9rem;
    text-align: center;
    color: #da3434;
    position: absolute;
    bottom: 1rem;
    left: 0.4rem;
  }
  .time {
    position: absolute;
    width: 5rem;
    height: 0.5rem;
    bottom: 2.5rem;
    text-align: center;
    color: #fef9e5;
    line-height: 0.5rem;
    span {
      display: inline-block;
      height: 0.5rem;
      width: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.3rem;
      color: #df0505;
      background: rgba(254, 249, 228, 1);
      box-shadow: 0px 2px 4px 0px rgba(232, NaN, 0, 0.35);
      border-radius: 0.1rem;
    }
    b {
      color: #c52a2a;
    }
  }
}
.money {
  width: 5.7rem;
  height: 2rem;
  background: url("../../assets/img/hall/hongbao/money.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: -0.8rem;
  position: relative;
  z-index: 10;
}
.activeDsc {
  width: 7rem;
  height: 5rem;
  background: #fff3f0;
  border-radius: 0.2rem;
  margin: 0.4rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    padding: 0 0.27rem;
    width: 6.16rem;
    height: 4.68rem;
    border: 1px solid #c52a2a;
    border-radius: 0.1rem;
    .txtTitle {
      height: 0.3rem;
      font-size: 0.3rem;
      line-height: 0.3rem;
      color: #333;
      margin-top: 0.37rem;
    }
    .txtContent {
      font-size: 0.24rem;
      color: #333;
      margin-top: 0.25rem;
      line-height: 0.4rem;
    }
  }
}
.rules {
  position: fixed;
  top: 0.65rem;
  right: 0.3rem;
  width: 1.1rem;
  height: 0.56rem;
  font-size: 0.3rem;
  color: #c72101;
  line-height: 0.56rem;
  background: rgba(255, 249, 221, 1);
  border-radius: 0.28rem;
  text-align: center;
}
.txTip {
  width: 5rem;
  padding: 0.3rem 0.3rem;
  background: #fff;
  border-radius: 0.2rem;
  margin: 0 auto;
  text-align: left;
}
.closeIcon {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background: url("../../assets/img/hall/K/close.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 0.8rem;
  position: absolute;
  top: 0;
  right: 1rem;
}
</style>