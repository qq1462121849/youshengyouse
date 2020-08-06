<template>
  <div id="shared">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack2()" class="iconfont icon-back"></i>
    </div>
    <div class="imgContent" :style="{paddingTop: statusH+0.88 + 'rem'}">
      <div class="title">邀请好友</div>
      <div class="title">一起赚TG</div>
      <div class="bgBox">
        <div class="myCode">我的邀请码</div>
        <div class="codeNum">{{invite_code}}</div>
        <div class="copyCode" @click="clip">复制邀请码</div>
        <div class="madePoster" @click="jumpTo('shareImg')">生成我的专属海报</div>
        <div class="line"></div>
        <div class="successInvited">成功邀请{{$store.state.user.userInfo.direct_num}}人</div>
        <!-- <img src="../../assets/img/logo.png" class="codeImg" alt /> -->
        <div class="codeImg" id="qrcode" ref="qrcode"></div>
        <div class="textTag">我的邀请二维码</div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import QRCode from "qrcodejs2";
import {storage} from '@/utils'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      invite_code: "",
      statusH: 0,
      imgs: [],
      swiperOption2: {
        loop: true,
        slidesPerView: "1",
        centeredSlides: true,
        loopAdditionalSlides: 1,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      qrcode: this.$store.state.user.userInfo.qrcode_url
    };
  },
  created() {
    this.$vux.loading.show({
      text: "加载中"
    });
    this.invite_code = this.$store.state.user.userInfo.invite_code;
    this.uid = storage.get("userInfo").uid;
    this.token = storage.get("token");
    this.$http.post("/amoy/user/invite").then(res => {
      if (res.code == 0) {
        for (let i = 0; i < res.data.img.length; i++) {
          this.tpl = res.data.img[i];
          this.imgs.push(
            this.link +
              "/amoy/user/invite?tpl=" +
              this.tpl +
              "&uid=" +
              this.uid +
              "&invite_code=" +
              this.invite_code
          );
        }
        this.$store.commit("setInvitedImg", this.imgs[0]);
        this.$vux.loading.hide();
      }
    });
    this.payOrder();
    
  },
  methods: {
    clip() {
      this.copyTextShare(this.invite_code);
      
    },
    saveClick() {
      this.$http.post("/amoy/redbag/update-share-num", true, true).then(res => {
        if (res.code == 0) {
          //that.$vux.toast.text("分享成功！");
        }
      });
      window.location.href =
        this.link +
        "/amoy/user/invite?tpl=/uploads/image/99966/0/2019/10/9badf41e751a2102dc0a7a63377dbd4f.jpg" +
        "&uid=" +
        this.$store.state.user.userInfo.uid +
        "&invite_code=" +
        this.$store.state.user.userInfo.invite_code;
    },
    payOrder() {
      this.innerVisible = true;
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        this.crateQrcode();
      });
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 100,
        height: 100, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      // console.log(this.qrcode)
    },
    goBack2() {
      this.$router.go(-2);
    }
  },
  activated() {
    this.invite_code = this.$store.state.user.userInfo.invite_code;
  }
};
</script>
<style lang="less" scoped>
#shared {
  width: 100%;
  min-height: 100%;
  background: rgba(12, 10, 36, 1);
}
.imgContent {
  overflow: hidden;
  > .title {
    color: #fff;
    font-size: 0.75rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.3rem;
  }
  .bgBox {
    width: 6.35rem;
    height: 8.9rem;
    background: url("../../assets/img/hall/share/bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 0.6rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    position: relative;
    .myCode {
      width: 100%;
      color: #7919c4;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 0.4rem;
    }
    .codeNum {
      width: 100%;
      font-size: 0.6rem;
      color: #7919c4;
      text-align: center;
      margin-top: 0.26rem;
    }
    .copyCode {
      width: 100%;
      color: #7919c4;
      text-decoration: underline;
      font-size: 0.3rem;
      text-align: center;
    }
    .madePoster {
      width: 3.35rem;
      height: 0.84rem;
      background: rgba(119, 22, 198, 1);
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.84rem;
      text-align: center;
      border-radius: 0.1rem;
      margin-top: 0.6rem;
    }
    .line {
      position: absolute;
      width: 5.35rem;
      border: 1px dashed #999;
      z-index: 10;
      top: 5.42rem;
    }
    .successInvited {
      width: 100%;
      color: #111;
      font-size: 0.24rem;
      text-align: center;
      margin-top: 1.7rem;
      font-weight: 700;
    }
    .textTag {
      text-align: center;
      width: 100%;
      font-size: 0.24rem;
      font-weight: 700;
      margin-top: 0.2rem;
    }
  }
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(40, 39, 47, 1);
  color: #fff;
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
</style>
