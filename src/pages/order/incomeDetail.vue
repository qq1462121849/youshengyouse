<template>
  <div id="msg_income">
    <div class="headerBox headerBox1" :style="{paddingTop: 0 + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>{{title}}</h1>
      <div class="incomeType1">
        <div class="fl_wrap">
          {{title}}
        </div>
        <div class="fl_wrap">
          <b>{{data.sum_all||0}}</b>
          /{{data.type_name}}
        </div>
      </div>
      <!-- <div class="incomeType">
        <div class="title">{{title}}</div>
        <p>
          <b>{{data.sum_all||0}}</b>
          /{{data.type_name}}
        </p>
      </div> -->
    </div>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content" id="empty">
        <div class="msgInfo" v-for="(item, index) in dataList" :key="index">
          <p class="title">{{item.created_at}}</p>
          <p class="time">
            <b>{{item.sum}}/{{item.type}}</b>
          </p>
          <div class="txtInfo">{{item.title}}</div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import {statush} from '@/utils'
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue
  },
  data () {
    return {
      title:
        this.$route.query.type == 1
          ? "矿机产出"
          : this.$route.query.type == 2
          ? "威望"
          : this.$route.query.type == 3
          ? "全球手续费分红"
          : this.$route.query.type == 4
          ? "购物返佣"
          : "",
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
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        empty: {
          warpId:	"empty",
          icon: "./static/none.png",
          tip: "暂无相关数据~"
        }
      },
      dataList: [], // 列表数据
      data: []
    };
  },
  created () {
    this.statusH= statush()

  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      this.$http
        .post(
          "/amoy/poundage/income-list",
          {
            type: this.$route.query.type,
            page: page.num // 页码
            /* size: page.size // 每页长度 */
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            this.data = response.data;
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
#msg_income{
  position: relative;
  .mescroll {
    position: fixed;
    top: 1.88rem !important;
    bottom: 0;
    // margin-top: 2rem;
    height: auto;
  }
} 
.headerBox {
  width: 100%;
  height: 1.88rem;
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
  .incomeType {
    // position: absolute;
    // bottom: 0;
    // margin-top: 0.88rem;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      font-size: 0.28rem;
    }
    p {
      font-size: 0.23rem;
      b {
        font-size: 0.33rem;
      }
    }
  }
  .incomeType1{
    width: 100% !important;
    height: 1rem !important;
    overflow: hidden;
    .fl_wrap{
      float: left;
      width: 50%;
      height: 100%;
      b {
        font-size: 0.33rem;
      }
    }
    .fl_wrap:first-child{
      font-size: 0.28rem;
      line-height: 1rem;
      text-align: center;
    }
    .fl_wrap:last-child{
      font-size: 0.23rem;
      line-height: 1rem;
      text-align: center;
    }
  }
}
.headerBox1{
  overflow: hidden; 
  height: 1.88rem !important;
  >div{
    margin-top: 0 !important;
    border: none  !important;
  }
}
.content {
  overflow: hidden;
  /*  margin-top: 1.05rem; */
  .msgInfo {
    padding: 0.2rem 0.52rem;
    width: 6.15rem;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 0.18rem;
    border-radius: 0.2rem;
    overflow: hidden;
    position: relative;
    .title {
      font-size: 0.2rem;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #827f82;
    }
    .time {
      position: absolute;
      font-size: 0.24rem;
      right: 0.7rem;
      color: #d6a558;
      b {
        font-size: 0.38rem;
      }
    }
    .txtInfo {
      margin-top: 0.3rem;
      color: #111;
      font-size: 0.28rem;
    }
  }
}
</style>
