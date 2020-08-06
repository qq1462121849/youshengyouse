<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <!-- <h1>交易明细</h1> -->
    </div>
    <div class="tabsContent" :style="{top: statusH+0.88 + 'rem'}">
      <div @click="active=1">
        <p :class="active==1?'activeTxt':''">DLT交易</p>
        <i :class="active==1?'activeIcon':''"></i>
      </div>
      <div @click="active=2">
        <p :class="active==2?'activeTxt':''">TSC交易</p>
        <i :class="active==2?'activeIcon':''"></i>
      </div>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: statusH+1.38 + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <transition>
          <div v-if="active==1">
            <div class="detailInfo" v-for="(item, index) in dataList" :key="index">
              <div class="top">
                <div class="title">{{item.types_title}}</div>
                <div class="time">{{item.created_at}}</div>
              </div>
              <div class="mid">
                <p>{{item.remark}}</p>
                <!-- <p>
                  DLT余额
                  <b>+10</b>DLT
                </p>-->
              </div>
              <div class="bot">
                <p>
                  DLT余额
                  <b>{{item.price>0?'+':''}}{{(item.price*1).toFixed(2)}}</b>DLT
                </p>
              </div>
              <!-- <div class="bot">
                <p>
                  支付
                  <b>-10</b>TSC
                </p>
              </div>-->
            </div>
          </div>
        </transition>
        <transition>
          <div v-if="active==2">
            <div class="detailInfo" v-for="(item, index) in dataList" :key="index">
              <div class="top">
                <div class="title">{{item.types_title}}</div>
                <div class="time">{{item.created_at}}</div>
              </div>
              <div class="mid">
                <p>{{item.remark}}</p>
              </div>
              <div class="bot">
                <p>
                  支付
                  <b>{{item.price>0?'+':''}}{{(item.price*1).toFixed(2)}}</b>TSC
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      statusH: 0,
      active: 1,
      done: 0,
      millInfo: [],
      myMillNums: 0,
      mescroll: null,
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
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>'
      },
      dataList: [] // 列表数据
    };
  },
  created() {
    this.active = this.$route.query.active || 1;
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
  },
  watch: {
    active() {
      this.dataList = [];
      this.mescroll.triggerDownScroll();
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      var url = "";
      if (this.active == 1) {
        url = "/amoy/user/tao-coin-rebate";
      } else {
        url = "/amoy/user/byte-coin-rebate";
      }
      this.$http
        .post(
          url,
          {
            page: page.num // 页码
            /* size: page.size // 每页长度 */
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            // 请求的列表数据
            let arr = response.data;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(this.dataList.length);
            });
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  overflow: hidden;
  min-height: 100%;
  background: #f7f4f8;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(40, 39, 47, 1);
  color: #fff;
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
.tabsContent {
  height: 1rem;
  width: 100%;
  z-index: 10;
  background: rgba(40, 39, 47, 1);
  position: fixed;
  display: flex;
  justify-content: space-around;
  color: #fff;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    p {
      width: 100%;
      font-size: 0.34rem;
      text-align: center;
    }
    i {
      width: 0.8rem;
      height: 0.08rem;
    }
  }
  .activeTxt {
    color: #fff;
    font-weight: 700;
  }
  .activeIcon {
    width: 0.8rem;
    height: 0.08rem;
    background: #fff;
    border-radius: 0.1rem;
  }
}
.mescroll {
  position: fixed;
  bottom: 0;
  top: 20px;
  height: auto;
}
.content {
  padding: 0 0.15rem;
  padding-top: 0.4rem;
  .detailInfo {
    width: 6.4rem;
    height: 2.5rem;
    background: #fff;
    margin-bottom: 0.25rem;
    padding: 0.4rem;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #111;
        font-size: 0.3rem;
        font-weight: 700;
      }
      .time {
        font-size: 0.2rem;
        color: #666;
      }
    }
    .mid {
      height: 0.8rem;
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efefef;
      p {
        width: 100%;
        color: #5b585c;
        font-size: 0.25rem;
        font-weight: 700;
        b {
          color: #d4a75e;
          font-size: 0.58rem;
          margin: 0 0.1rem;
        }
      }
    }
    .bot {
      overflow: hidden;
      line-height: 0.88rem;
      p {
        float: right;
        color: #5b585c;
        font-size: 0.25rem;
        b {
          color: #111;
          margin: 0 0.05rem;
        }
      }
    }
    .bot {
      p {
        width: 100%;
        color: #5b585c;
        font-size: 0.25rem;
        text-align: right;
        b {
          color: #d4a75e;
          font-size: 0.58rem;
          margin: 0 0.1rem;
        }
      }
    }
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}
</style>
