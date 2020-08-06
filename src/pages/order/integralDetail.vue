<template>
  <div id="msg">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>积分明细</h1>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: statusH + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <div class="msgInfo" v-for="(item, index) in dataList" :key="index">
          <p class="title">{{item.created_at}}</p>
          <p class="time">{{item.price*1>0?'+':''}}{{(item.price*1).toFixed(2)}}</p>
          <div class="txtInfo">{{item.types_title}}</div>
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
      title:
        this.$route.query.type == 1
          ? "矿机消息"
          : this.$route.query.type == 2
          ? "团队消息"
          : this.$route.query.type == 3
          ? "交易消息"
          : this.$route.query.type == 4
          ? "订单消息"
          : "系统消息",
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
          "/amoy/user/income-list",
          {
            type: "point",
            credit_type: "credit1",
            page: page.num
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            // 请求的列表数据
            let arr = response.data.list;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(this.dataList.length);
            });
          }else{
              mescroll.endErr();
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
    padding: 0.45rem 0.5rem;
    width: 6.2rem;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 0.18rem;
    border-radius: 0.2rem;
    overflow: hidden;
    position: relative;
    .title {
      width: 4.58rem;
      font-size: 0.22rem;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #817e81;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time {
      font-size: 0.38rem;
      color: #d1a862;
      position: absolute;
      right: 1.5rem;
      top: 0.77rem;
    }
    .txtInfo {
      margin-top: 0.28rem;
      color: #111;
      font-size: 0.28rem;
      line-height: 0.44rem;
      font-weight: 700;
    }
  }
}
</style>
