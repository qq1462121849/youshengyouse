<template>
  <div id="searchList">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>{{$route.query.title}}</h1>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{top: statusH +0.88+ 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="contentList">
        <div
          class="goodsinfo"
          v-for="(item, index) in goodDataList"
          :key="index"
          @click="jumpTo({path:'detail',query:{id:item.origin_id}})"
        >
          <span class="isRead" v-if="item.is_read">已浏览过...</span>
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
            <div class="zhaun">月销{{item.commission_money}}件</div>
          </div>
          <div class="share" @click="shareFeiend(item)"></div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
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
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /*  toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        } */
        onScroll: this.onScroll
      },
      dataList: [], // 列表数据
      goodDataList: [],
      nextPage: 1
    };
  },
  components: {
    MescrollVue
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "home") {
        vm.nextPage = 1;
        /* vm.dataList = []; */
        vm.mescroll.triggerDownScroll();
        vm.mescroll.scrollTo(0, 0);
        return;
      }
      vm.mescroll.scrollTo(sessionStorage.getItem("scrollTopSort") * 1, 0);
    });
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("scrollTopSort", this.scrollTop);
    next();
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      this.$http
        .post(
          "/amoy/home/goods-list",
          {
            page: this.nextPage, // 页码
            cid: this.$route.query.tabIndex,
            type: this.$route.query.typeIndex,
            sort: 0
          },
          true,
          true
        )
        .then(response => {
          // 请求的列表数据
          let arr = response.data.goodsList;
          this.nextPage = response.data.min_id;
          this.dataList = response.data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.goodDataList = [];
          // 把请求到的数据添加到列表
          if (response.data.goodsList.length) {
            this.goodDataList = this.goodDataList.concat(arr);
          }
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    onScroll(mescroll, y, isUp) {
      this.scrollTop = y;
    }
  }
  /* activated() {
    this.mescroll.triggerDownScroll();
  }, */
};
</script>
<style lang="less" scoped>
#searchList {
  min-height: 100%;
  overflow: hidden;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
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
.mescroll {
  position: fixed;
  height: 100%;
}
.contentList {
  padding: 0 0.25rem;
  overflow: hidden;
  .goodsinfo {
    width: 6.9rem;
    height: 1.87rem;
    background: #403f43;
    margin-top: 0.2rem;
    position: relative;
    border-radius: 0.08rem;
    overflow: hidden;
    .goodImg {
      float: left;
      width: 1.86rem;
      height: 1.86rem;
      border-radius: 0.08rem;
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
        color: #fff;
        margin-left: 0.3rem;
        font-size: 0.28rem;
        height: 0.3rem;
        line-height: 0.3rem;
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
          font-size: 0.3rem;
          color: #d8ad6c;
          margin-left: 0.05rem;
        }
        b {
          font-weight: normal;
          text-decoration: line-through;
          margin-left: 0.1rem;
        }
        i {
          font-style: normal;
          padding: 0 0.05rem;
          height: 0.3rem;
          border: 2px solid rgba(216, 173, 108, 1);
          border-radius: 0.04rem;
          text-align: center;
          line-height: 0.3rem;
          font-size: 0.2rem;
          color: #d8ad6c;
          margin-left: 0.4rem;
        }
      }
      .quan {
        width: 1.8rem;
        height: 0.32rem;
        border-radius: 0.06rem;
        margin-top: 0.1rem;
        background: url("../../assets/img/hall/home/quan.png") no-repeat;
        background-size: 100% 100%;
        color: #3c3c3c;
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
</style>