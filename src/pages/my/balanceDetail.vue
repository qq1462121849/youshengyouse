<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>明细</h1>
    </div>
    <div class="tabsContent" :style="{top: statusH+0.88 + 'rem'}">
      <van-tabs
        background="none"
        title-active-color="#D8AD6C"
        title-inactive-color="#666666"
        color="#D8AD6C"
        line-height="4px"
        v-model="tabIndex"
        :ellipsis="false"
      >
        <van-tab
          v-for="(item, index) in ['矿机收益','团队矿机收益','团队手续费收益','全球手续费收益','购物返现收益']"
          :key="index"
          :title="item"
        ></van-tab>
      </van-tabs>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: statusH+1.68 + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <transition>
          <div v-if="flag">
            <div class="detailInfo" v-for="(item, index) in dataList" :key="index">
              <div class="time">{{item.created_at}}</div>
              <div class="price">{{item.price>0?'+'+item.price:item.price}}{{tabIndex==4?'tsc':'DLT'}}</div>
              <div class="type">{{item.types_title}}</div>
            </div>
          </div>
        </transition>
        <transition>
          <div v-if="!flag" style="color:#999;text-align:center;">正在加载...</div>
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
      flag: false,
      statusH: 0,
      tabIndex: 0,
      done: 0,
      millInfo: [],
      myMillNums: 0,
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
      dataList: [], // 列表数据
      tag: []
    };
  },
  created() {
    this.tabIndex = this.$route.query.index;
    this.tag = JSON.parse(sessionStorage.getItem("tag"));
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
  },
  watch: {
    tabIndex(e) {
      console.log(e)
      this.flag=false
      this.dataList = [];
      this.upCallback(this.mescrollUp.page, this.mescroll);
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      this.$http
        .post(
          "/amoy/user/all-income-list",
          {
            page: page.num, // 页码
            types: this.tag[this.tabIndex]
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            this.flag = true;
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
  background: linear-gradient(
    25deg,
    rgba(31, 28, 33, 1) 0%,
    rgba(50, 48, 53, 1) 100%
  );
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
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
  height: 0.9rem;
  z-index: 10;
  padding-top: 0.3rem;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  position: fixed;
  color: #666;
  width: 100%;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    p {
      width: 100%;
      text-align: center;
    }
    i {
      width: 0.5rem;
      height: 0.08rem;
    }
  }
  .activeTxt {
    color: #d8ad6c;
  }
  .activeIcon {
    width: 0.5rem;
    height: 0.08rem;
    background: url("../../assets/img/hall/team/selected.png") no-repeat;
    background-size: 100% 100%;
  }
}
.tabsContent/deep/.van-tabs {
  .van-hairline--top-bottom::after {
    border: none;
  }
}
.content {
  padding: 0 0.3rem;
  padding-top: 0.4rem;
  .detailInfo {
    width: 6.3rem;
    height: 0.8rem;
    background: rgba(64, 63, 67, 1);
    border-radius: 0.08rem;
    margin-bottom: 0.25rem;
    padding: 0.3rem;
    .time {
      color: #666666;
      font-size: 0.24rem;
      height: 0.25rem;
      line-height: 0.25rem;
    }
    .price {
      width: 100%;
      text-align: right;
      color: #d8ad6c;
      font-size: 0.3rem;
      height: 0.31rem;
      line-height: 0.31rem;
    }
    .type {
      color: #a7a8a7;
      font-size: 0.26rem;
      height: 0.27rem;
      line-height: 0.27rem;
    }
  }
}
.mescroll {
  position: fixed;
  bottom: 0;
  top: 20px;
  height: auto;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
</style>
