<template>
  <div id="detail">
    <div class="daojishi" v-show="isShowTime">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        size="50px"
        fill="#eee"
        color="#FF4817"
        :stroke-width="100"
        :speed="100"
        :text="text"
      />
    </div>
    <div class="goodsImg">
      <swiper :options="swiperOption2" class="swiper2" ref="swiperBox2">
        <swiper-slide v-for="(item, index) in goodsInfo.small_images" :key="index">
          <img :src="item" />
        </swiper-slide>
      </swiper>
      <i @click="goBack()" class="backIcon"></i>
      <i class="shareIcon" @click="shareImg"></i>
    </div>
    <div class="goodsdsc">
      <p class="title">{{goodsInfo.title}}</p>
      <p class="buyNums">{{goodsInfo.volume}}人已购买</p>
      <div class="priceBox">
        <p class="nowPrice">￥{{goodsInfo.coupon_price}}</p>
        <p class="oldPrice">￥{{goodsInfo.zk_final_price}}</p>
        <span>预估收益:￥{{goodsInfo.commission_money}}</span>
      </div>
      <div class="quan">
        <div class="qleft" style="color:#3c3c3d;">
          <p>
            <span>{{goodsInfo.coupon_money}}</span>元优惠券
          </p>
          <p>使用期限：{{goodsInfo.coupon_start_at}}-{{goodsInfo.coupon_end_at}}</p>
        </div>
        <div class="qright" @click="goTb"></div>
      </div>
    </div>
    <div class="comment">
      <div class="ctitle">
        <span></span>
        <p>评论(36)</p>
        <div @click="lookMore">
          查看评论
          <i></i>
        </div>
      </div>
      <!--  <div class="commentUser">
        <img class="avatar" src="../../assets/img/hall/logo.png" alt />
        <div>
          <p class="nickname">匿名用户</p>
          <div class="stars">
            <i class="starIcon"></i>
            <i class="starIcon"></i>
            <i class="starIcon"></i>
            <i class="starIcon"></i>
            <i class></i>
          </div>
        </div>
      </div>
      <div class="commentTxt">服务很好，店铺品质应该没问题服务很好，店铺品质应该 没问题，好评！</div>
      <div class="commentImg">
        <img
          v-for="(item, index) in [0,2,1,3,6]"
          :key="index"
          src="../../assets/img/hall/logo.png"
          alt
        />
      </div>
      <div class="commentTitle">精品羊角包一组</div>-->
    </div>
    <div class="goodsDetailImg">
      <div class="ctitle">
        <span></span>
        <p style="margin-bottom:0.2rem;">商品详情</p>
      </div>
      <div v-for="(item, index) in goodImgDetail" :key="index">
        <img :src="item" alt />
      </div>
    </div>
    <div class="btnBox">
      <div class="leftBtn" @click="shareImg">分享赚￥{{goodsInfo.commission_money}}</div>
      <div class="rightBtn" @click="goTb">领券赚￥{{goodsInfo.coupon_money}}</div>
    </div>
    <x-dialog
      v-model="showDialogStyle"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true"
    >
      <div class="txTip">
        <div class="title">
          图片保存成功
          <i class="closeIcon" @click="showDialogStyle=false"></i>
        </div>
        <img :src="shareImgUrl" alt />
        <div class="btn" @click="toShare">去微信发送给好友</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { clearInterval } from "timers";
export default {
  components: {
    swiper,
    swiperSlide,
    XDialog
  },
  data() {
    return {
      showDialogStyle: false,
      isShowTime: true, //是否显示倒计时
      statusH: 0,
      timer: null,
      timer1: null,
      swiperOption2: {
        loop: true,
        slidesPerView: "1",
        centeredSlides: true,
        loopAdditionalSlides: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      currentRate: 0,
      rate: 0,
      goodsInfo: [], //商品信息
      goodImgDetail: [], //商品详情大图
      shareImgUrl: "", //分享图片详情
      isShowTime: true
    };
  },
  computed: {
    text() {
      return (this.currentRate.toFixed(0) / 20).toFixed(0) + "s";
    }
  },
  created() {
    this.getGoodsInfo();
    this.getGoodsImgUrl();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    if (this.timer1) {
      window.clearInterval(this.timer1);
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    //获取商品详情信息
    getGoodsInfo() {
      this.$http
        .post(
          "/amoy/taobao/goods-item",
          {
            item_id: this.$route.query.id
          },
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.goodsInfo = res.data;
            this.shareImgUrl = this.goodsShare();
            if (res.data.is_finish == 0 && res.data.is_read == 0) {
              this.timer = setTimeout(() => {
                this.$http
                  .post(
                    "/amoy/task/do-task",
                    {
                      item_id: this.$route.query.id
                    },
                    true,
                    true
                  )
                  .then(res => {
                    if (res.code == 0) {
                      this.$vux.toast.text("浏览成功！");
                      setTimeout(() => {
                        if (this.$route.query.intoType == "guide") {
                          this.$router.push("guide6");
                        }
                      }, 500);
                    } else {
                      setTimeout(() => {
                        if (this.$route.query.intoType == "guide") {
                          this.$router.push("guide6");
                        }
                      }, 500);
                    }
                  });
                window.clearInterval(this.timer1);
                this.isShowTime = false;
              }, 5001);
              this.timer1 = setInterval(() => {
                this.currentRate += 1;
              }, 50);
            } else {
              this.isShowTime = false;
            }
          }
        });
    },
    //获取商品详情图片数据
    getGoodsImgUrl() {
      this.$http
        .post(
          "/amoy/taobao/goods-detail-url",
          {
            item_id: this.$route.query.id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            axios.get(res.data.goodsUrl).then(res => {
              let info_img = [];
              if (res.data) {
                for (var i = 0; i < res.data.wdescContent.pages.length; i++) {
                  if (
                    res.data.wdescContent.pages[i].indexOf("img") != -1 &&
                    res.data.wdescContent.pages[i].indexOf("gif") == -1
                  ) {
                    info_img.push(
                      "http:" +
                        res.data.wdescContent.pages[i]
                          .match(/>(\S*)</)[1]
                          .match(/(\/\/)(\S*)/)[0]
                    );
                  }
                }
                this.goodImgDetail = info_img;
              }
            });
          }
        });
    },
    //去淘宝认证
    goTb() {
      if (this.goodsInfo.oauth_url) {
        if (window.api) {
          this.$router.push({
            name: "tbauth",
            query: {
              url: this.goodsInfo.oauth_url
            }
          });
        } else {
          window.location.href = this.goodsInfo.oauth_url;
        }
      } else {
        if (window.api) {
          this.$router.push({
            name: "tbauth",
            query: {
              url: this.goodsInfo.coupon_url
            }
          });
        } else {
          window.location.href = this.goodsInfo.coupon_url;
        }
      }
    },
    //查看更多
    lookMore() {
      if (window.api) {
        this.$router.push({
          name: "tbauth",
          query: {
            url:
              "https://h5.m.taobao.com/app/rate/www/rate-list/index.html?auctionNumId=" +
              this.$route.query.id
          }
        });
      } else {
        window.location.href =
          "https://h5.m.taobao.com/app/rate/www/rate-list/index.html?auctionNumId=" +
          this.$route.query.id;
      }
    },
    goodsShare() {
      return (
        this.link +
        "/amoy/user/create-share?item_id=" +
        this.$route.query.id +
        "&uid=" +
        this.$store.state.user.userInfo.uid +
        "&title=" +
        this.goodsInfo.title +
        "&thumb=" +
        this.goodsInfo.thumb +
        "&coupon_money=" +
        this.goodsInfo.coupon_money +
        "&coupon_price=" +
        this.goodsInfo.coupon_price +
        "&origin_price=" +
        this.goodsInfo.origin_price
      );
    },
    shareImg() {
      if (window.api) {
        this.$vux.loading.show({
          text: "图片保存中..."
        });
        var that = this;
        api.saveMediaToAlbum(
          {
            path: that.shareImgUrl
          },
          function(ret, err) {
            that.$vux.loading.hide();
            if (ret && ret.status) {
              that.showDialogStyle = true;
            } else {
              that.$vux.toast.text("图片保存失败！");
            }
          }
        );
      } else {
        this.saveClick();
      }
    },
    //保存图片到本地
    saveClick() {
      window.location.href =
        this.link +
        "/amoy/user/create-share?item_id=" +
        this.$route.query.id +
        "&uid=" +
        this.$store.state.user.userInfo.uid +
        "&title=" +
        this.goodsInfo.title +
        "&thumb=" +
        this.goodsInfo.thumb +
        "&coupon_money=" +
        this.goodsInfo.coupon_money +
        "&coupon_price=" +
        this.goodsInfo.coupon_price +
        "&origin_price=" +
        this.goodsInfo.origin_price;
    },
    toShare() {
      this.showDialogStyle = false;
      let that = this;
      api.openApp(
        {
          androidPkg: "com.tencent.mm",
          mimeType: "text/html",
          uri: "wechat://"
        },
        function(ret, err) {
          that.$vux.toast.text("分享成功！");
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
#detail {
  padding-bottom: 1.2rem;
}
.goodsImg {
  width: 100%;
  height: 6.2rem;
  position: relative;
  img {
    width: 100%;
    height: 6.2rem;
  }
  > i {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top: 0.6rem;
  }
  .backIcon {
    background: url("../../assets/img/hall/goods/back.png") no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    left: 0.2rem;
  }
  .shareIcon {
    background: url("../../assets/img/hall/goods/share.png") no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    right: 0.2rem;
  }
}
.goodsdsc {
  background: #fff;
  padding: 0 0.25rem;
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  .title {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.32rem;
    color: #010101;
    line-height: 0.4rem;
  }
  .buyNums {
    font-size: 0.24rem;
    color: #666;
    line-height: 0.24rem;
    height: 0.24rem;
    margin-top: 0.33rem;
  }
  .priceBox {
    margin-top: 0.39rem;
    overflow: hidden;
    p {
      float: left;
    }
    .nowPrice {
      font-size: 0.36rem;
      color: #fc511f;
      line-height: 0.36rem;
      height: 0.36rem;
    }
    .oldPrice {
      margin-left: 0.2rem;
      font-size: 0.28rem;
      color: #666;
      height: 0.28rem;
      text-decoration: line-through;
    }
    span {
      float: right;
      padding: 0 0.2rem;
      height: 0.48rem;
      border: 1px solid #ff4a17;
      border-radius: 0.1rem;
      text-align: center;
      line-height: 0.48rem;
      color: #ff4a17;
      font-size: 0.24rem;
    }
  }
  .quan {
    margin: 0 auto;
    margin-top: 0.33rem;
    width: 6.7rem;
    height: 1.58rem;
    background: url("../../assets/img/hall/goods/bg.png") no-repeat;
    background-size: 100% 100%;
    .qleft {
      color: #fff;
      width: 4.7rem;
      height: 1.58rem;
      float: left;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      p {
        width: 100%;
        text-align: center;
        font-size: 0.22rem;
        height: 0.22rem;
        line-height: 0.22rem;
      }
      p:first-of-type {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.3rem;
        span {
          font-size: 0.5rem;
        }
      }
    }
    .qright {
      width: 2rem;
      height: 1.58rem;
      float: left;
      font-size: 0.3rem;
      line-height: 1.58rem;
      text-align: center;
      color: #fff;
    }
  }
}
.ctitle {
  height: 0.3rem;
  line-height: 0.3rem;
  margin-top: 0.1rem;
  position: relative;
  > span {
    float: left;
    width: 0.06rem;
    height: 0.28rem;
    background: rgba(252, 81, 31, 1);
    border-radius: 0.04rem;
  }
  p {
    float: left;
    font-size: 0.3rem;
    color: #1a1a1a;
    margin-left: 0.13rem;
  }
  > div {
    width: 1.3rem;
    height: 0.25rem;
    line-height: 0.25rem;
    color: #666666;
    font-size: 0.24rem;
    position: absolute;
    right: 0;
    i {
      float: right;
      width: 0.24rem;
      height: 0.24rem;
      background: url("../../assets/img/hall/goods/right.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.comment {
  padding: 0.3rem 0.2rem;
  background: #fff;
  margin-top: 0.2rem;
  overflow: hidden;

  .commentUser {
    margin-top: 0.4rem;
    .avatar {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      float: left;
    }
    > div {
      float: left;
      margin-left: 0.15rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      color: #000;
      p {
        float: left;
      }
      .stars {
        margin-left: 0.1rem;
        width: 1.3rem;
        height: 0.6rem;
        display: flex;
        align-items: center;
        float: left;
        justify-content: space-around;
        i {
          width: 0.22rem;
          height: 0.22rem;
          background: url("../../assets/img/hall/goods/star_.png") no-repeat;
          background-size: 100% 100%;
        }
        .starIcon {
          background: url("../../assets/img/hall/goods/star.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .commentTxt {
    margin-top: 0.4rem;
    float: left;
    font-size: 0.28rem;
    color: #000;
    line-height: 0.38rem;
  }
  .commentImg {
    margin-top: 0.3rem;
    float: left;
    width: 100%;
    height: 1.66rem;
    overflow: hidden;
    img {
      width: 1.66rem;
      height: 1.66rem;
      float: left;
      margin-right: 0.1rem;
    }
  }
  .commentTitle {
    float: left;
    margin-top: 0.3rem;
    font-size: 0.24rem;
    color: #666;
    height: 0.24rem;
    line-height: 0.24rem;
  }
}
.goodsDetailImg {
  padding: 0.3rem 0.2rem;
  background: #fff;
  margin-top: 0.2rem;
}
.btnBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  background: #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    width: 2.1rem;
    height: 0.7rem;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 0.7rem;
  }
  .leftBtn {
    background: linear-gradient(
      90deg,
      rgba(121, 119, 125, 1) 0%,
      rgba(67, 69, 68, 1) 100%
    );
    color: #d8ad6c;
  }
  .rightBtn {
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
    color: #3c3c3d;
  }
  /* .homeBtn {
    width: 1.9rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    i {
      width: 0.36rem;
      height: 0.36rem;
      background: url("../../assets/img/hall/goods/shouye.png") no-repeat;
      background-size: 100% 100%;
    }
    span {
      width: 100%;
      font-size: 0.22rem;
      color: #666;
      height: 0.22rem;
      line-height: 0.22rem;
      text-align: center;
      margin-top: 0.1rem;
    }
  }
  .shareBtn {
    width: 2.8rem;
    height: 100%;
    text-align: center;
    line-height: 1rem;
    background: linear-gradient(
      270deg,
      rgba(255, 151, 2, 1),
      rgba(255, 203, 0, 1)
    );
    font-size: 0.32rem;
    color: #fff;
  }
  .quanBtn {
    width: 2.8rem;
    height: 100%;
    text-align: center;
    line-height: 1rem;
    background: rgba(252, 81, 31, 1);
    font-size: 0.32rem;
    color: #fff;
  } */
}
.daojishi {
  width: 1rem;
  height: 1rem;
  position: fixed;
  z-index: 10;
  bottom: 3.8rem;
  right: 0.3rem;
}
.daojishi/deep/.van-circle {
  text-align: center;
  line-height: 50px;
  font-size: 0.3rem;
}
.txTip {
  width: 5rem;
  background: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
  padding-bottom: 0.3rem;
  .title {
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    position: relative;
    .closeIcon {
      position: absolute;
      top: 0.25rem;
      right: 0.2rem;
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/img/close.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  > img {
    width: 4.2rem;
    height: 4rem;
    object-fit: cover;
    line-height: 0.5rem;
    font-size: 0.28rem;
    text-align: left;
    padding: 0.2rem;
    margin: 0 auto;
    border-radius: 0.1rem;
  }
  .btn {
    background: rgba(231, 192, 135, 1);
    box-shadow: 4px 4px 1px 0px rgba(200, 200, 200, 0.18);
    color: #fff;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    width: 4rem;
    margin: 0 auto;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
  }
}
</style>