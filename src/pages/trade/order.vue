<template>
  <div id="order">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i class="iconfont icon-back" :style="{top: statusH +0.5+ 'rem'}" @click="goBack()"></i>
      <div>
        <span @click="tabIndex=1" :class="tabIndex==1?'active':''">TG</span>
        <span @click="tabIndex=2" :class="tabIndex==2?'active':''">GST</span>
      </div>
    </div>
    <div class="tabBox" :style="{top: statusH +1.5+ 'rem'}">
      <van-tabs v-model="active" color="#333">
        <van-tab title="挂单中"></van-tab>
        <van-tab title="交易中"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="已失效"></van-tab>
      </van-tabs>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{top: statusH + 2.5+'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="orderInfo" v-for="(item, index) in dataList" :key="index" @click="toDeatil(item.trade_no)">
        <div class="title">
          <p>订单号：{{item.trade_no}}</p>
          <i class="clip" @click="copyTextShare(item.trade_no)"></i>
        </div>
        <div class="botInfo">
          <div class="orderIcon"></div>
          <div class="mid">
            <p class="mobile" v-if="active==0">{{item.my_mobile}}</p>
            <p class="mobile" v-else>{{item.op_mobile}}</p>
            <p class="price">
              单价：
              
              <span v-if="item.trade_type == 1">{{item.unit_price}}{{tabIndex==2?'TG':'CNY'}}</span>
              <span v-if="item.trade_type == 2">{{item.unit_price}}{{tabIndex==2?'TG':'CNY'}}</span>
              数量：
              <span>{{item.coin_num}}</span>
            </p>
          </div>
          <div class="btn" v-if="active==0" @click="soldOut(item.trade_no,index)">下架</div>
          <div
            class="btn"
            v-if="active==1&&item.show_type==1"
            @click="jumpTo('newOrderInfo?id='+item.trade_no)"
          >查看支付凭证</div>
          <div
            class="btn"
            v-if="active==1&&item.show_type==2"
            @click="jumpTo('newPayProof?id='+item.trade_no)"
          >提交支付凭证</div>
          <div class="complate" v-if="active==2"></div>
          <div class="end" v-if="active==3"></div>
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
      tabIndex: this.$route.query.into == 2 ? 2 : 1,
      statusH: 0,
      active: this.$route.query.type - 1 || 0,
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
    if (window.api) {
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
      api.setStatusBarStyle({
        style: "dark"
      });
    }
  },
  watch: {
    active(e) {
      this.mescroll.triggerDownScroll();
    },
    tabIndex(e) {
      this.mescroll.triggerDownScroll();
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      let url = "";
      if (this.tabIndex == 1) {
        url = "/amoy/trade/my-tg-order-list";
      } else {
        
        url = "/amoy/trade/my-order-list";
      }
      this.$http
        .post(url, { type: this.active + 1, page: page.num }, true, true)
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
    soldOut(id, index) {
      let url =
        this.tabIndex == 1
          ? "/amoy/trade/off-tg-order"
          : "/amoy/trade/off-order";
      this.$http.post(url, { order_id: id }, true, true).then(res => {
        if (res.code == 0) {
          this.$vux.toast.text("撤单成功！");
          this.dataList.splice(index, 1);
        }
      });
    },
    //详情
    toDeatil(id){
      
      if(this.active == 2 || this.active == 3 ){
        this.$router.push({
          path:'/orderDetail',
          query:{
            id:id,
            type:this.tabIndex//
          }
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 1.5rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  color: #fff;
  > div {
    width: 4.6rem;
    height: 0.72rem;
    border: 1px solid #aaa;
    border-radius: 0.1rem;
    margin: 0.4rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 2.3rem;
      height: 100%;
      line-height: 0.72rem;
      text-align: center;
      font-size: 0.3rem;
      color: #acacac;
    }
    span:first-of-type {
      border-right: 1px solid #aaa;
    }
    .active {
      background: linear-gradient(#e3b97d, #f0d6a0);
      color: #3c3c3d;
    }
  }

  .iconfont {
    position: absolute;
    left: 0.3rem;
    font-size: 0.3rem;
  }
}

.tabBox {
  width: 100%;
  position: fixed;
}
.mescroll {
  position: fixed;
  bottom: 0;
  height: auto;
}
.orderInfo {
  width: 6.4rem;
  padding: 0.25rem;
  height: 1.7rem;
  background: #fff;
  border-radius: 0.1rem;
  box-shadow: 1px 1px 10px 0px rgba(210, 210, 210, 0.36);
  margin: 0.2rem auto;
  .title {
    height: 0.6rem;
    border-bottom: 1px solid #eee;
    font-size: 0.28rem;
    color: #666;
    display: flex;
    align-items: center;
    .clip {
      width: 0.26rem;
      height: 0.26rem;
      background: url("./img/clip.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.2rem;
    }
  }
  .botInfo {
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .orderIcon {
      width: 0.86rem;
      height: 0.86rem;
      background: url("./img/t.png") no-repeat;
      background-size: 100% 100%;
    }
    .mid {
      width: 3.6rem;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      .mobile {
        font-size: 0.3rem;
        font-weight: 700;
      }
      .price {
        font-size: 0.26rem;
        color: #666;
        span {
          color: #d6a75e;
          margin-right: 0.2rem;
        }
      }
    }
    .btn {
      padding: 0 0.1rem;
      height: 0.44rem;
      line-height: 0.44rem;
      color: #d6a75e;
      text-align: center;
      font-size: 0.24rem;
      border: 1px solid #d6a75e;
      border-radius: 0.1rem;
    }
    .complate {
      width: 0.9rem;
      height: 0.78rem;
      background: url("./img/pa.png") no-repeat;
      background-size: 100% 100%;
    }
    .end {
      width: 0.9rem;
      height: 0.78rem;
      background: url("./img/end.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>