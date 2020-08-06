<template>
  <div id="goodorder">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>我的订单</h1>
    </div>
    <div class="tabbav" :style="{top: statusH +0.88+ 'rem'}">
      <tab custom-bar-width="30px" active-color="#333" bar-active-color="#FF4A17">
        <tab-item :selected="tabindex==1" @on-item-click="tabindex=1">全部</tab-item>
        <tab-item :selected="tabindex==2" @on-item-click="tabindex=2">已结算</tab-item>
        <tab-item :selected="tabindex==3" @on-item-click="tabindex=3">已付款</tab-item>
        <tab-item :selected="tabindex==4" @on-item-click="tabindex=4">已失效</tab-item>
      </tab>
    </div>
    <div class="bg" style="height:0.2rem;background:#F2F2F2; position: relative;top:-0.1rem;"></div>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      :style="{top: statusH+1.9 + 'rem'}"
    >
      <div class="content">
        <div v-show="tabindex==1">
          <div class="orderList" v-for="(item, index) in dataList" :key="index">
            <div class="title">
              <p>订单编号：{{item.trade_id}}</p>
              <span>{{item.order_status}}</span>
            </div>
            <div class="orderinfo">
              <img class="orderimg" :src="item.picUrl" alt />
              <div class="inforight">
                <p class="infoname">{{item.title}}</p>
                <span class="zhuan">预估赚:￥{{item.price}}</span>
                <p class="payMoney">
                  付款金额:
                  <span>￥{{item.payment_price}}</span>
                </p>
              </div>
            </div>
            <div class="ordertime">
              <p>{{item.created_at}}下单</p>
            </div>
          </div>
        </div>
        <div v-show="tabindex==2">
          <div class="orderList" v-for="(item, index) in dataList" :key="index">
            <div class="title">
              <p>订单编号：{{item.trade_id}}</p>
              <span>{{item.order_status}}</span>
            </div>
            <div class="orderinfo">
              <img class="orderimg" :src="item.picUrl" alt />
              <div class="inforight">
                <p class="infoname">{{item.title}}</p>
                <span class="zhuan">预估赚:￥{{item.price}}</span>
                <p class="payMoney">
                  付款金额:
                  <span>￥{{item.payment_price}}</span>
                </p>
              </div>
            </div>
            <div class="ordertime">
              <p>{{item.created_at}}下单</p>
            </div>
          </div>
        </div>
        <div v-show="tabindex==3">
          <div class="orderList" v-for="(item, index) in dataList" :key="index">
            <div class="title">
              <p>订单编号：{{item.trade_id}}</p>
              <span>{{item.order_status}}</span>
            </div>
            <div class="orderinfo">
              <img class="orderimg" :src="item.picUrl" alt />
              <div class="inforight">
                <p class="infoname">{{item.title}}</p>
                <span class="zhuan">预估赚:￥{{item.price}}</span>
                <p class="payMoney">
                  付款金额:
                  <span>￥{{item.payment_price}}</span>
                </p>
              </div>
            </div>
            <div class="ordertime">
              <p>{{item.created_at}}下单</p>
            </div>
          </div>
        </div>
        <div v-show="tabindex==4">
          <div class="orderList" v-for="(item, index) in dataList" :key="index">
            <div class="title">
              <p>订单编号：{{item.trade_id}}</p>
              <span>{{item.order_status}}</span>
            </div>
            <div class="orderinfo">
              <img class="orderimg" :src="item.picUrl" alt />
              <div class="inforight">
                <p class="infoname">{{item.title}}</p>
                <span class="zhuan">预估赚:￥{{item.price}}</span>
                <p class="payMoney">
                  付款金额:
                  <span>￥{{item.payment_price}}</span>
                </p>
              </div>
            </div>
            <div class="ordertime">
              <p>{{item.created_at}}下单</p>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import { Tab, TabItem } from "vux";
export default {
  components: {
    Tab,
    TabItem,
    MescrollVue
  },
  data() {
    return {
      tabindex: 1,
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
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /* toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        } */
      },
      dataList: [] // 列表数据
    };
  },
  created() {
    this.tabindex = this.$route.query.index;
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    api.setStatusBarStyle({
      style: "dark"
    });
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      var order_status = "all";
      if (this.tabindex == 2) {
        order_status = 1;
      } else if (this.tabindex == 3) {
        order_status = 0;
      } else if (this.tabindex == 4) {
        order_status = 2;
      }
      // 联网请求
      this.$http
        .post(
          "/amoy/taobao/taobao-order-list",
          {
           /*  num: page.num, // 页码 */
            /* size: page.size, // 每页长度 */
            page:page.num,
            type: 1,
            order_type: 1,
            order_status: order_status
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
  },
  watch: {
    tabindex(e) {
      this.mescroll.triggerDownScroll();
    }
  }
};
</script>
<style lang="less" scoped>
.mescroll {
  position: fixed;
  bottom: 0;
  height: auto;
}
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
.tabbav {
  width: 100%;
  position: fixed;
  z-index: 100;
  border-top: 1px solid #efefef;
}
.content {
  border-top: 1px solid #efefef;
  overflow: hidden;
}
.orderList {
  width: 100%;
  height: 4rem;
  background: #fff;
  margin-bottom: 0.2rem;
  .title {
    height: 0.9rem;
    padding: 0 0.3rem;
    border-bottom: 1px solid #efefef;
    p {
      height: 0.9rem;
      line-height: 0.9rem;
      float: left;
      font-size: 0.28rem;
      color: #666;
    }
    span {
      float: right;
      font-size: 0.28rem;
      color: #ff4a17;
      height: 0.9rem;
      line-height: 0.9rem;
    }
  }
  .orderinfo {
    padding: 0.3rem;
    border-bottom: 1px solid #efefef;
    overflow: hidden;
    .orderimg {
      width: 1.5rem;
      height: 1.5rem;
      float: left;
    }
    .inforight {
      float: left;
      margin-left: 0.18rem;
      width: 5.2rem;
      height: 1.5rem;
      .infoname {
        width: 5.2rem;
        height: 0.7rem;
        font-size: 0.28rem;
        color: #333;
        line-height: 0.38rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .zhuan {
        padding: 0 0.1rem;
        height: 0.34rem;
        border-radius: 0.06rem;
        background: rgba(254, 227, 220, 1);
        color: #fc4b28;
        font-size: 0.22rem;
        float: left;
        text-align: center;
        line-height: 0.34rem;
        margin-top: 0.33rem;
      }
      .payMoney {
        float: right;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-top: 0.35rem;
        font-size: 0.3rem;
        color: #666;
        span {
          color: #fc4b28;
        }
      }
    }
  }
  .ordertime {
    height: 0.95rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    > p {
      width: 50%;
      height: 0.95rem;
      line-height: 0.95rem;
      text-align: center;
      font-size: 0.28rem;
      color: #fc4b28;
    }
  }
}
</style>