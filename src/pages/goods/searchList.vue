<template>
  <div id="searchList">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>搜索结果</h1>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{top: statusH +0.88+ 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="contentList">
        <div class="goodsinfo" v-for="(item, index) in dataList" :key="index">
          <span class="isRead" v-if="item.is_read">已浏览过...</span>
          <img
            @click.stop="jumpTo({path:'detail',query:{id:item.origin_id}})"
            class="goodImg"
            :src="item.thumb"
            alt
          />
          <div @click.stop="jumpTo({path:'detail',query:{id:item.origin_id}})" class="goodSdsc">
            <div class="goodsTitle">{{item.title}}</div>
            <p class="oldPrice">￥{{item.origin_price}}</p>
            <p class="nowPrice">￥{{item.coupon_price}}</p>
            <div class="quan">
              <span>领券</span>
              <i>立减{{item.coupon_money}}元</i>
            </div>
            <div class="zhaun">分享赚：￥{{item.commission_money}}</div>
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
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /*  toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        } */
      },
      dataList: [] // 列表数据
    };
  },
  components: {
    MescrollVue
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      this.$http
        .post(
          "/amoy/taobao/search",
          {
            keyword: this.$route.query.text,
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
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #fff;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  border-bottom: 1px solid #eee;
  h1 {
    font-size: 0.34rem;
    color: #fff;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #fff;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.mescroll {
  position: fixed;
  height: 100%;
  background: #fff;
}
.contentList {
  padding: 0 0.25rem;
  overflow: hidden;
  .goodsinfo {
    width: 6.6rem;
    height: 2.1rem;
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.2rem;
    position: relative;
    border-bottom: 1px solid #efefef;
    .isRead {
      position: absolute;
      left: 0.2rem;
      top: 0.2rem;
      padding: 0 0.05rem;
      height: 0.32rem;
      color: #fff;
      font-size: 0.2rem;
      line-height: 0.32rem;
      text-align: center;
      background: #ff7a22;
    }
    .goodImg {
      float: left;
      width: 2.2rem;
      height: 2rem;
    }
    .goodSdsc {
      width: 4.2rem;
      height: 2rem;
      float: left;
      margin-left: 0.2rem;
      position: relative;
      .goodsTitle {
        font-size: 0.28rem;
        color: #333;
        line-height: 0.3rem;
        max-height: 0.6rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .oldPrice {
        color: #999;
        font-size: 0.24rem;
        text-decoration: line-through;
        height: 0.24rem;
        line-height: 0.24rem;
        margin-top: 0.24rem;
      }
      .nowPrice {
        height: 0.24rem;
        line-height: 0.24rem;
        color: #ff4a17;
        font-size: 0.24rem;
        margin-top: 0.08rem;
      }
      .quan {
        width: 1.8rem;
        height: 0.32rem;
        border: 1px solid rgba(255, 74, 23, 1);
        border-radius: 0.06rem;
        margin-top: 0.2rem;
        span {
          float: left;
          width: 0.6rem;
          height: 100%;
          background: linear-gradient(
            -75deg,
            rgba(255, 72, 23, 1),
            rgba(255, 122, 34, 1)
          );
          font-size: 0.2rem;
          color: #fff;
          line-height: 0.32rem;
          text-align: center;
        }
        i {
          float: left;
          text-align: center;
          width: 1.2rem;
          font-size: 0.2rem;
          color: #ff4a17;
          line-height: 0.32rem;
          font-style: normal;
        }
      }

      .zhaun {
        position: absolute;
        width: 1.7rem;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.2rem;
        color: #ff4a1f;
        right: 0.1rem;
        top: 1.8rem;
        text-align: center;
      }
    }
    .share {
      width: 0.58rem;
      height: 0.58rem;
      position: absolute;
      right: 0.5rem;
      border-radius: 50%;
      border: 1px solid rgba(153, 153, 153, 1);
      top: 1.2rem;
      background: url("../../assets/img/hall/home/share.png") no-repeat;
      background-size: 0.26rem 0.26rem;
      background-position: center center;
    }
  }
}
</style>