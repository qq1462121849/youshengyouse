<template>
  <div id="order">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>我的订单</h1>
    </div>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      :style="{marginTop: statusH+0.9 + 'rem'}"
    >
      <div class="content">
        <div class="orderList" v-for="(item, index) in dataList" :key="index">
          <div class="orderTop">
            <p>订单编号:{{item.trade_no}}</p>
            <span>{{item.status==0?'待付款':item.status==1?'待收货':'已完成'}}</span>
          </div>
          <div
            class="orderInfo"
            @click="jumpTo({name:'orderInfo',query:{
          id:item.id
        }})"
          >
            <div class="infotop">
              <img class="avatar" :src="item.user_info.avatar" alt />
              <p class="nickname">{{item.user_info.nickname}}</p>
              <p class="typeInfo" style="color:#4988BD">购买</p>
            </div>
            <div class="infobot">
              <p>单价：{{item.unit_price+'元'}}</p>
              <p>数量：{{item.coin_num+'代币'}}</p>
              <p class="sum">
                合计
                <span>￥{{item.pay_price}}</span>
              </p>
            </div>
          </div>
          <div class="func">
            <div
              class="get"
              style="border-color:#FF4A17;color:#FF4A17;"
              @click="getGoods(item.id)"
            >确认收货</div>
            <div
              class="apply"
              @click="jumpTo({name:'orderInfo',query:{
              title:'订单申诉',
              id:item.id,
              appeal:1,
            }})"
            >申诉</div>
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
        // noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /* empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        } */
      },
      dataList: [] // 列表数据
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    api.setStatusBarStyle({
      style: "dark"
    });
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
          "/amoy/trade/trade-list",
          {
            page: page.num // 页码
            /* size: page.size // 每页长度 */
          },
          false,
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
    },
    appeal() {},
    getGoods(id) {
      this.$http
        .post(
          "/amoy/trade/confirm-trade",
          {
            order_id: id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("确认收货成功!");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #fff;
  h1 {
    font-size: 0.34rem;
    color: #333;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #333;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.mescroll {
  position: fixed;
  top: 0px;
  bottom: 0;
  height: auto;
}
.orderList {
  padding: 0 0.3rem;
  padding-bottom: 0.27rem;
  height: 4rem;
  background: #fff;
  margin-top: 0.2rem;
  .orderTop {
    height: 0.94rem;
    border-bottom: 1px solid #efefef;
    p {
      font-size: 0.3rem;
      color: #333;
      float: left;
      height: 0.94rem;
      line-height: 0.94rem;
    }
    span {
      float: right;
      line-height: 0.46rem;
      text-align: center;
      margin-top: 0.3rem;
      width: 1.1rem;
      height: 0.46rem;
      background: rgba(252, 81, 31, 0.07);
      color: #fc511f;
      font-size: 0.24rem;
      border-radius: 0.24rem;
    }
  }
  .orderInfo {
    overflow: hidden;
    border-bottom: 1px solid #efefef;
    padding-bottom: 0.3rem;
    .infotop {
      padding: 0 0.2rem;
      height: 0.6rem;
      margin-top: 0.29rem;
      .avatar {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        float: left;
      }
      .nickname {
        max-width: 4.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
        font-size: 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #333;
        margin-left: 0.26rem;
      }
      .typeInfo {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        float: right;
      }
    }
    .infobot {
      padding: 0 0.2rem;
      display: flex;
      justify-content: start;
      margin-top: 0.4rem;
      p {
        width: 2.2rem;
        font-size: 0.26rem;
        color: #333;
      }
      .sum {
        width: 2rem;
        text-align: center;
        font-size: 0.28rem;
        color: #000;
        span {
          font-size: 0.28rem;
          color: #fc511f;
        }
      }
    }
  }
  .func {
    height: 0.6rem;
    > div {
      float: right;
      width: 1.58rem;
      height: 0.52rem;
      text-align: center;
      line-height: 0.52rem;
      font-size: 0.24rem;
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 0.26rem;
      margin-left: 0.22rem;
      margin-top: 0.4rem;
      color: #333;
    }
  }
}
</style>