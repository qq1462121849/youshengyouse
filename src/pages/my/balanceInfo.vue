<template>
  <div id="balance">
    <!-- <x-header
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;background: white;"
    >
      <a slot="left" @click="goBack()" class="backBox" style="height: 100%;">
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.query.title ? $route.query.title : $route.meta.title}}
    </x-header>-->
    <mescroll-vue
      ref="mescroll"
      :style="{top: statusH +0.88+ 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <div v-if="type!=4">
          <div class="listData" v-for="(item, index) in dataList" :key="index">
            <div class="left">
              <div class="type">{{item.types_title}}</div>
              <div class="time">{{item.created_at}}</div>
            </div>
            <div class="right">{{item.price>0?'+'+item.price:item.price}}</div>
          </div>
        </div>

        <div v-if="type==4">
          <div class="listData" v-for="(item, index) in dataList" :key="index">
            <div class="left">
              <div class="type">{{item.type==1?'买单':"卖单"}}</div>
              <div class="time">{{item.created_at}}</div>
            </div>
            <div class="right">
              <div>数量：{{item.deal_num}}</div>
              <div>单价：{{item.deal_price}}</div>
            </div>
          </div>
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
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /*  toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        } */
      },
      dataList: [], // 列表数据
      type: 0
    };
  },
  created() {
    this.type = this.$route.query.id;
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    if (window.api) {
      api.setStatusBarStyle({
        style: "dark"
      });
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      var url = "";
      if (this.type == 1) {
        url = "/amoy/user/tao-coin-rebate";
      } else if (this.type == 2) {
        url = "/amoy/user/team-income";
      } else if (this.type == 3) {
        url = "/amoy/user/byte-coin-rebate";
      } else if (this.type == 4) {
        url = "/amoy/trade/my-trade-order";
      }
      // 联网请求
      this.$http
        .post(
          url,
          {
            page: page.num // 页码
          },
          true,
          true
        )
        .then(response => {
          // 请求的列表数据
          let arr = response.data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
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
  height: 100%;
  background: #fff;
}
.content {
  overflow: hidden;
  padding-bottom: 1.5rem;
}
.listData {
  width: 6.92rem;
  height: 1.4rem;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left {
    width: 3rem;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    .type {
      width: 100%;
      font-size: 0.3rem;
      color: #333;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-bottom: 0.25rem;
    }
    .time {
      width: 100%;
      font-size: 0.24rem;
      height: 0.24rem;
      line-height: 0.24rem;
      color: #999;
    }
  }
  .right {
    font-size: 0.3rem;
    color: #ff4a17;
    height: 1.4rem;
    line-height: 1.4rem;
    width: 4rem;
    text-align: right;
    position: relative;
    > div {
      position: absolute;
      right: 0;
    }
    > div:first-of-type {
      right: 0;
      top: -0.25rem;
    }
    > div:last-of-type {
      right: 0;
      bottom: -0.25rem;
    }
  }
}
</style>