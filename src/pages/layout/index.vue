<template>
  <view-box
    ref="viewBox"
    id="layout"
    :body-padding-top="$route.meta.isShowHead || $route.meta.isShowSearch ? '.88rem' : '0'"
    :body-padding-bottom="$route.meta.isShowTab ? h : '0'"
  >
    <x-header
      v-show="$route.meta.isShowHead"
      slot="header"
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    >
      <a
        v-show="!$route.meta.goBack"
        slot="left"
        @click="$route.meta.address ? jumpTo($route.meta.address) : goBack()"
        class="backBox"
      >
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.query.title ? $route.query.title : $route.meta.title}}
    </x-header>
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <div class="tabbarBox" id="tabbarBox" v-show="$route.meta.isShowTab">
      <template>
        <div class="tabbar" @click="jumpTo('/home')">
          <div class="tabbarIcon" v-if="$route.path == '/home'">
            <img src="../../assets/img/hall/tabbar/homeA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/home.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/home'?'color:#D4AB74':''">首页</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/mill')">
          <div class="tabbarIcon" v-if="$route.path == '/mill'">
            <img src="../../assets/img/hall/tabbar/kjA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/kj.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/mill'?'color:#D4AB74':''">矿机</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/kLine')">
          <div class="tabbarIcon" v-if="$route.path == '/kLine'">
            <img src="../../assets/img/hall/tabbar/jyA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/jy.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/kLine'?'color:#D4AB74':''">交易</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/team')">
          <div class="tabbarIcon" v-if="$route.path == '/team'">
            <img src="../../assets/img/hall/tabbar/teamA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/team.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/team'?'color:#D4AB74':''">团队</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/my')">
          <!-- <div class="redTip"></div> -->
          <div class="tabbarIcon" v-if="$route.path == '/my'">
            <img src="../../assets/img/hall/tabbar/myA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/my.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/my'?'color:#D4AB74':''">我的</p>
        </div>
      </template>
      <!-- <x-dialog
        v-model="showDialogStyle"
        :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
        :mask-z-index="3000"
      >
        <div class="txTip">
          <div class="closeIcon" @click="closeRed"></div>
          <div class="txtTip"></div>
          <div class="ling" @click="lingRp"></div>
          <div class="xianliang">-限量现金红包，金额加倍-</div>
        </div>
      </x-dialog>
      <div class="redPackTip" v-show="alertRedTip" @click="jumpTo('redPacket')"></div>-->
    </div>
    <div class="tabbarBox" id="tabbarBox" v-show="$route.meta.isShowTab2">
      <template>
        <div class="tabbar" @click="jumpTo('/newTrade')">
          <div class="tabbarIcon" v-if="$route.path == '/newTrade'">
            <img src="../trade/img/tradeA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../trade/img/trade.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/newTrade'?'color:#D4AB74':''">首页</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/my2')">
          <div class="tabbarIcon" v-if="$route.path == '/my2'">
            <img src="../../assets/img/hall/tabbar/myA.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="../../assets/img/hall/tabbar/my.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/my2'?'color:#D4AB74':''">我的</p>
        </div>
      </template>
    </div>
  </view-box>
</template>

<script>
import "../../assets/js/api";
import { ViewBox, Tabbar, TabbarItem, XHeader, XDialog } from "vux";
export default {
  name: "index",
  data() {
    return {
      alertRedTip: true,
      showDialogStyle: false,
      h: 49 + Number((window.api && api.safeArea.bottom) || 0) + "px",
      transitionName: "",
      pageName: ["home", "my"],
      bot: (window.api && api.safeArea.bottom) || 0
    };
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XHeader,
    XDialog
  },
  created() {
    /* this.$http.post("/amoy/user/user-info", true, true).then(res => {
      if (res.code == 0) {
        this.$store.commit("setUserInfo", res.data);
      }
    }); */
  },
  mounted() {
    /* sessionStorage.setItem("isShowCode", false);
    if (
      sessionStorage.getItem("close") != "false" &&
      this.$store.state.user.userInfo &&
      this.$store.state.user.userInfo.is_realname == 1 &&
      this.$store.state.user.userInfo.is_alert_coupon == 1
    ) {
      this.showDialogStyle = true;
    }
    if (
      this.$store.state.user.userInfo &&
      this.$store.state.user.userInfo.is_realname == 1 &&
      this.$store.state.user.userInfo.is_alert_coupon == 1
    ) {
      this.alertRedTip = true;
    } else {
      this.alertRedTip = false;
    } */
    if (window.api) {
      document.getElementById("tabbarBox") &&
        (document.getElementById("tabbarBox").style.paddingBottom =
          api.safeArea.bottom + "px");
      document.getElementById("tabbar1") &&
        (document.getElementById("tabbar1").style.paddingBottom =
          api.safeArea.bottom + "px");
    }
  },
  computed: {
    changeIsShowRed() {
      return this.$store.state.global.isShowRed;
    }
  },
  // 此段添加内容
  watch: {
    $route(to, from) {
      if (from.meta.routerZindex > to.meta.routerZindex) {
        this.transitionName = "slide-right";
      } else if (from.meta.routerZindex < to.meta.routerZindex) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-none";
      }
    }
    /* changeIsShowRed(val) {
      if (
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.is_realname == 1
      ) {
        if (val == true) {
          this.alertRedTip = true;
        } else {
          this.alertRedTip = false;
        }
      }
    } */
  },
  methods: {
    rout(path) {
      this.$router.push(path);
    }
    /* closeRed() {
      sessionStorage.setItem("close", false);
      this.showDialogStyle = false;
    },
    lingRp() {
      this.$router.push("redPacket");
    } */
  }
};
</script>

<style scoped lang="less">
#tabbar {
  height: 49px;
}
#tabbar1 {
  height: 49px;
}
.router-fade-enter-active,
.router-fade-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
.weui-tabbar {
  background: #fff;
}
.weui-tabbar:before {
  border-top: 1px solid #e0dee6;
}
.redPackTip {
  width: 1.8rem;
  height: 1.5rem;
  position: fixed;
  right: 0;
  bottom: 3rem;
  background: url("../../assets/img/hall/red.png") no-repeat;
  background-size: 100% 100%;
}
#layout/deep/.weui-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
.txTip {
  width: 4.82rem;
  height: 8rem;
  background: url("../../assets/img/hall/hongbao/10.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .txtTip {
    width: 3.4rem;
    height: 1rem;
    background: url("../../assets/img/hall/hongbao/txttip.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.65rem;
    top: 3rem;
  }
  .ling {
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    background: url("../../assets/img/hall/hongbao/ling.png") no-repeat;
    background-size: 100% 100%;
    top: 5rem;
    left: 1.5rem;
  }
  .xianliang {
    position: absolute;
    bottom: 1rem;
    width: 100%;
    text-align: center;
    color: #f9e696;
    font-size: 0.24rem;
    height: 0.24rem;
    line-height: 0.24rem;
  }
  .closeIcon {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../assets/img/hall/K/close.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    top: 0;
  }
}
</style>
<style lang="less">
#layout {
  .weui-tabbar__item {
    padding-top: 7px;
  }
  .vux-header {
    .vux-header-left {
      left: 0;
      top: 0;
      .backBox {
        display: block;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0 0.3rem;
      }
    }
  }
  .tabbarBox {
    z-index: 2000;
    // box-shadow: 0 4px 8px #525252;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    padding-top: 5px;
    box-sizing: content-box;
    width: 100%;
    display: flex;
    background: #fff;
    .tabbar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .tabbarIcon {
        width: 30px;
        height: 30px;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 17px;
          height: 17px;
          display: inline-block;
        }
      }
      .tabbarName {
        font-size: 11px;
        color: #5c5b5c;
        line-height: 1.4;
        text-align: center;
      }
    }
    .upTab {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tabbarIcon {
        background: #fff;
        margin-top: -0.5rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }
  }
}
.redTip {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f00;
  right: 0.5rem;
  top: 0.1rem;
}
</style>
