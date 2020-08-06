<template>
  <div id="msg">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>TG余额</h1>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: $store.state.global.statusH + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <div class="msgInfo" v-for="(item, index) in dataList" :key="index">
          <p class="title">{{item.remark}}</p>
          <p class="time">{{item.price>0?'+'+item.price:item.price}}</p>
          <div class="txtInfo">{{item.created_at}}</div>
        </div>
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
  
    // let size = document.documentElement.clientWidth / 7.5;
    // this.statusH = api.safeArea.top / size;
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      this.$http
        .post(
          "/amoy/trade/balance-tg",
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
  /*  margin-top: 1.05rem; */
  .msgInfo {
    padding: 0.4rem 0.26rem;
    width: 6.58rem;
    height: 0.8rem;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 0.18rem;
    border-radius: 0.2rem;
    overflow: hidden;
    position: relative;
    .title {
      width: 100%;
      font-size: 0.25rem;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #000;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time {
      width: 2rem;
      font-size: 0.32rem;
      color: #999;
      line-height: 0.3rem;
      height: 0.3rem;
      text-align: right;
      color: #d6a75e;
      position: absolute;
      right: 0.2rem;
      top: 0.7rem;
    }
    .txtInfo {
      float: left;
      margin-top: 0.28rem;
      color: #666;
      font-size: 0.28rem;
      line-height: 0.44rem;
    }
  }
}
</style>
