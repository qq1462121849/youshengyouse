<template>
  <div id="appHome" ref="appHome">
    <div class="topBg"></div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="topBox">
        <div class="searchBox">
          <div class="search">
            <i class="iconfont1"></i>
            <p @click="jumpTo('search')">搜索商品或品牌</p>
          </div>
          <i class="iconfont2" @click="jumpTo('message')"></i>
        </div>
        <div class="tabBar" ref="tabbar" :class="headerFixed?'isFixed':''">
          <van-tabs
            color="#D8AD6C"
            title-active-color="#D8AD6C"
            v-model="tabIndex"
            @click="chooseType"
            :swipeable="true"
            background="none"
            title-inactive-color="#fff "
            line-height="3px"
            line-width="35px"
          >
            <van-tab v-for="(item, index) in listInfo.good_cate" :key="index" :title="item.title"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="listContent" ref="listContent" id="listContent">
        <div class="swiper">
          <van-swipe :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="(item, index) in listInfo.ad_list" :key="index">
              <img v-lazy="item.img" alt="轮播图" @click="jump(item.url)" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="yongjin">
          <div
            v-for="(item, index) in listInfo.goods_type"
            :key="index"
            @click="jumpTo({
            name:'sortList',
            query:{
              typeIndex:item.id,
              tabIndex:tabIndex,
              title:item.title
            }
          })"
          >
            <i :class="'icon'+(index+1)"></i>
            <p>{{item.title}}</p>
          </div>
        </div>
        <div ref="contentList" class="contentList" :class="headerFixed?'contentListS':''">
          <div v-for="(item, index) in listInfo.good_cate" :key="index" v-show="tabIndex==index">
            <div
              class="goodsinfo"
              v-for="(item, index) in goodsDataList"
              :key="index"
              @click="jumpTo({path:'detail',query:{id:item.origin_id}})"
            >
              <!-- <span class="isRead" v-if="item.is_read">已浏览过...</span> -->
              <img class="goodImg" :src="item.thumb" alt />
              <div class="goodSdsc">
                <i class="tbIcon"></i>
                <div class="goodsTitle">{{item.title}}</div>
                <!-- <p class="oldPrice">￥{{item.origin_price}}</p>
                <p class="nowPrice">￥{{item.coupon_price}}</p>-->
                <div class="price">
                  券后
                  <span>￥{{item.coupon_price}}</span>
                  <b>{{item.origin_price}}</b>
                  <i>赚{{item.commission_money}}</i>
                </div>
                <div class="quan">领券立减{{item.coupon_money}}元</div>
                <div class="zhaun">月销{{item.volume}}件</div>
              </div>
              <div class="share" @click="shareFeiend(item)"></div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <x-dialog
      v-model="showTip"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="3000"
    >
      <div class="txTip">
        <i class="icon"></i>
        <div class="title">任务进度</div>
        <div
          class="progress"
        >{{$store.state.user.userInfo.already_task_num+'/'+$store.state.user.userInfo.task_num}}</div>
        <div class="txtTip">
          每日天完成五个浏览商品任务，
          <br />获得收益
        </div>
        <div class="btn" @click="closeTip">去做任务</div>
      </div>
    </x-dialog>
    <x-dialog
      v-model="$store.state.global.isShowRed"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="3000"
    >
      <div class="txTip txTip2">
        <i class="icon icon2"></i>
        <div class="title">交易</div>
        <div class="txtTip">您的DLT已经可以交易了</div>
        <div class="btn" @click="toTrad">去交易</div>
        <div class="btnGrad" @click="keepUp">保持增值</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Tab, TabItem, XDialog } from "vux";
import "swiper/dist/css/swiper.css";
var refreshFlag = false;
export default {
  components: {
    swiper,
    swiperSlide,
    Tab,
    TabItem,
    XDialog,
    MescrollVue
  },
  data () {
    return {
      showTip: false,
      showTipToTrad: false,
      scrollTop: 0,
      showDialogStyle: false,
      alertRedTip: false,
      scroll: 100,
      tabIndex: 1,
      getBarWidth: "50px",
      headerFixed: false,
      swiperOption2: {
        loop: true,
        slidesPerView: "1",
        centeredSlides: true,
        loopAdditionalSlides: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      mescrollDown: {},
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        // noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /* empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        } */
        onScroll: this.onScroll
      },
      dataList: [], // 列表数据
      listInfo: [],
      goodsDataList: [], //商品数据
      nextPage: 1,
      typeIndex: 1
    };
  },
  created() {
    this.tabIndex = sessionStorage.getItem("tabIndex") * 1;
    this.getStatus();
    /* this.getListInfo(); */
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name != "detail") {
        vm.mescroll.scrollTo(0, 0);
        return;
      }
      vm.mescroll.scrollTo(sessionStorage.getItem("scrollTop") * 1, 0);
    });
  },
  beforeRouteLeave(to, from, next) {
    //记录离开时的位置
    /* this.$store.commit("setisBack", true); */
    sessionStorage.setItem("scrollTop", this.scrollTop);
    next();
  },
  watch: {
    typeIndex(e) {
      this.mescroll.triggerDownScroll();
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    jump(url) {
      if (url) {
        window.location.href = url;
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      this.getListInfo();
      /*  alert('调取接口') */
      this.$http
        .post(
          "/amoy/home/goods-list",
          {
            page: this.nextPage, // 页码
            cid: this.tabIndex,
            type: this.typeIndex,
            sort: 0
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            this.nextPage = response.data.min_id;
            // 请求的列表数据
            let arr = response.data.goodsList;
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              /* let y = sessionStorage.getItem("scrollTop");
              this.mescroll.scrollTo(y * 1, 0); */
              this.goodsDataList = [];
            }
            // 把请求到的数据添加到列表
            if (response.data.goodsList.length) {
              this.goodsDataList = this.goodsDataList.concat(arr);
            }
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              /* console.log(this.$store.state.global.isBack);
              if (this.$store.state.global.isBack) {
                this.mescroll.scrollTo(
                  sessionStorage.getItem("scrollTop") * 1,
                  0
                );
              } */
              /* this.$store.commit("setisBack", false); */
              mescroll.endSuccess(this.goodsDataList.length);
            });
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    onScroll(mescroll, y, isUp) {
      console.log(y);
      this.scrollTop = y;
      if (y > 250) {
        this.headerFixed = true;
      } else {
        this.headerFixed = false;
      }
    },
    getListInfo() {
      this.$http.post("/amoy/index/index", true).then(res => {
        if (res.code == 0) {
          this.listInfo = res.data;
        }
      });
    },
    chooseType(e) {
      this.nextPage = 1;
      sessionStorage.setItem("tabIndex", e);
      this.tabIndex = e;
      /*  sessionStorage.setItem("scrollTop", 0); */
      this.mescroll.triggerDownScroll();
      this.mescroll.scrollTo(0, 100);
    },
    getStatus() {
      this.$http.post("/amoy/index/tips-status").then(res => {
        if (res.code == 0) {
          let r = res.data;
          if (r.is_finish_task == 0) {
            if (
              this.$store.state.user.userInfo.already_task_num <
              this.$store.state.user.userInfo.task_num
            ) {
              this.$store.commit("setAlertRed", true);
              this.showTip = this.$store.state.global.alertRed;
            }
          }
        }
      });
    },
    closeTip() {
      this.$store.commit("setAlertRed", false);
      this.showTip = this.$store.state.global.alertRed;
    },
    getUserInfo() {
      this.$http.post("/amoy/user/user-info").then(res => {
        if (res.code == 0) {
          this.$store.commit("setUserInfo", res.data);
        }
      });
    },
    toTrad() {
      this.$store.commit("setisShowRed", false);
      this.$router.push("guide9");
      sessionStorage.setItem("isClose", true);
    },
    keepUp() {
      this.$store.commit("setisShowRed", false);
      sessionStorage.setItem("isClose", true);
    }
  },
  activated() {
    console.log(!this.$store.state.global.isShowRed);
    let isClose = sessionStorage.getItem("isClose") || false;
    this.$http.post("/amoy/index/tips-status").then(res => {
      if (res.code == 0) {
        let r = res.data;
        if (
          r.is_get_fb == 1 &&
          !this.$store.state.global.isShowRed &&
          !isClose
        ) {
          this.$store.commit("setisShowRed", true);
          //this.$store.state.global.isShowRed
        } else {
          this.$store.commit("setisShowRed", false);
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
#appHome {
  height: 100%;
  overflow-y: scroll;
}
.isFixed {
  position: fixed;
  top: 1.1rem;
  z-index: 1000;
}
.appHome {
  position: relative;
}
.topBg {
  height: 3.2rem;
  width: 100%;
  position: fixed;
  top: 0;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  background-size: 100% 100%;
}
.topBox {
  width: 100%;
  height: 1.28rem;
  background: rgba(40, 39, 47, 1);
  position: fixed;
  top: 0;
  z-index: 1;
  .searchBox {
    position: relative;
    top: 0;
    z-index: 1000;
    padding: 0 0.37rem;
    height: 0.6rem;
    padding-top: 0.54rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconfont2 {
      width: 0.35rem;
      height: 0.3rem;
      background: url("../../assets/img/hall/home/msg.png") no-repeat;
      background-size: 100% 100%;
    }
    .search {
      width: 5.94rem;
      height: 0.6rem;
      background: rgba(177, 177, 177, 0.03);
      border-radius: 0.08rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont1 {
        width: 0.26rem;
        height: 0.26rem;
        background: url("../../assets/img/hall/home/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
      p {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.24rem;
        line-height: 0.6rem;
        color: #999;
      }
    }
  }
  .tabBar {
    width: 100%;
    height: 0.9rem;
    padding-top: 0.1rem;
    background: rgba(40, 39, 47, 1);
    margin-top: 0.1rem;
  }
  .tabBar/deep/.van-tabs {
    .van-hairline--top-bottom::after {
      border: none;
    }
    .van-tabs__line {
      bottom: 20px;
    }
  }
}
.listContent {
  position: relative;
  top: 1.4rem;
  overflow: hidden;
  z-index: 0;
  width: 100%;
  background: #fff;
  .swiper {
    width: 7rem;
    height: 2.8rem;
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    /deep/.van-swipe {
      height: 2.8rem;
      border-radius: 0.1rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
    }
  }
  .yongjin {
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.22rem;
    > div {
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
      .icon1 {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/img/hall/home/tb1.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon2 {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/img/hall/home/tb2.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon3 {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/img/hall/home/tb3.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon4 {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/img/hall/home/tb4.png") no-repeat;
        background-size: 100% 100%;
      }
      .icon5 {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../assets/img/hall/home/tb5.png") no-repeat;
        background-size: 100% 100%;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        color: #000;
        margin-top: 0.1rem;
      }
    }
  }
  .contentList {
    padding: 0 0.3rem;
    padding-bottom: 0.2rem;
    overflow: hidden;
    .goodsinfo {
      width: 6.9rem;
      height: 1.87rem;
      background: #fff;
      margin-top: 0.2rem;
      position: relative;
      border-radius: 0.08rem;
      overflow: hidden;
      box-shadow: 2px 2px 10px 2px rgba(100, 100, 100, 0.2);
      /* .isRead {
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
        padding: 0 0.05rem;
        height: 0.32rem;
        color: #fff;
        font-size: 0.2rem;
        line-height: 0.32rem;
        text-align: center;
        background: #ff7a22;
      } */
      .goodImg {
        float: left;
        width: 1.86rem;
        height: 1.86rem;
        border-radius: 0.15rem;
      }
      .goodSdsc {
        width: 4.7rem;
        height: 1.8rem;
        padding-top: 0.2rem;
        float: left;
        margin-left: 0.2rem;
        position: relative;
        .tbIcon {
          float: left;
          width: 0.28rem;
          height: 0.28rem;
          background: url("../../assets/img/hall/home/tb.png") no-repeat;
          background-size: 100% 100%;
        }
        .goodsTitle {
          color: #000;
          margin-left: 0.3rem;
          font-size: 0.28rem;
          height: 0.29rem;
          line-height: 0.33rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          max-width: 3.3rem;
        }
        .price {
          margin-top: 0.4rem;
          height: 0.4rem;
          font-size: 0.22rem;
          color: #a8a8a8;
          line-height: 0.4rem;
          display: flex;
          justify-content: flex-start;
          span {
            font-size: 0.34rem;
            color: #d8ad6c;
            margin-left: 0.05rem;
            font-weight: 700;
          }
          b {
            font-weight: normal;
            text-decoration: line-through;
            margin-left: 0.1rem;
          }
          i {
            font-style: normal;
            padding: 0 0.1rem;
            height: 0.3rem;
            border-radius: 0.04rem;
            text-align: center;
            line-height: 0.3rem;
            font-size: 0.2rem;
            color: #d7ab76;
            margin-left: 0.4rem;
            background: rgba(223, 177, 106, 0.3);
          }
        }
        .quan {
          width: 1.8rem;
          height: 0.32rem;
          border-radius: 0.06rem;
          margin-top: 0.1rem;
          background: url("../../assets/img/hall/home/quan.png") no-repeat;
          background-size: 100% 100%;
          color: #fff;
          font-size: 0.2rem;
          line-height: 0.32rem;
          text-align: center;
        }
        .zhaun {
          position: absolute;
          height: 0.23rem;
          line-height: 0.23rem;
          font-size: 0.22rem;
          color: #666666;
          right: 0;
          bottom: 0.33rem;
          text-align: center;
        }
      }
      .share {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: 0.3rem;
        top: 0.2rem;
        background: url("../../assets/img/hall/home/share1.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
  }
  /* .contentListS {
    padding-top: 1.2rem;
  } */
}
#appHome/deep/.mescroll .mescroll-downwarp {
  position: relative;
  top: 2.5rem;
}
.txTip {
  width: 6.8rem;
  height: 6.8rem;
  background: #fff;
  border-radius: 0.15rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    width: 1.07rem;
    height: 1.07rem;
    background: url("../../assets/img/guide/wait.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.7rem;
  }
  .icon2 {
    margin-top: 0.3rem;
    background: url("../../assets/img/guide/trad.png") no-repeat;
    background-size: 100% 100%;
  }
  .title {
    font-size: 0.3rem;
    height: 0.34rem;
    line-height: 0.34rem;
    font-weight: 700;
  }
  .progress {
    color: #e0be95;
    font-size: 0.28rem;
  }
  .txtTip {
    color: #9b9b9b;
    font-size: 0.28rem;
    margin-top: 0.5rem;
  }
  .btn {
    width: 4.74rem;
    height: 0.81rem;
    background: rgba(231, 192, 135, 1);
    line-height: 0.81rem;
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
    border-radius: 0.1rem;
    margin-top: 1.2rem;
  }
}
.txTip2 {
  height: 5.9rem;
  .btnGrad {
    color: #999;
    margin-top: 0.2rem;
    font-size: 0.28rem;
  }
}
</style>
