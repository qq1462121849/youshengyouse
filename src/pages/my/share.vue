<template>
  <div id="shared">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
    </div>
    <div class="imgContent" :style="{top: statusH+0.88 + 'rem'}">
      <div class="shareBox" @click="showShare=true">
        <i class="shareIcon" ></i>
        <span >分享链接至</span>
        <i class="closeIcon" @click.stop="goBack"></i>
      </div>
      <div class="swiper">
            <img class="inviteImg" :src="image" />
      </div>
    </div>
    <div class="saveBox" @click="saveImg">
      <i class="saveIcon"></i>
      <p>保存到本地</p>
    </div>
    <div class="botBox" v-if="showShare">
      <p class="shareTxt">
        分享到
        <i @click="showShare=false" class="closeIcon"></i>
      </p>
      <div class="bot">
        <div @click="toShare(1)">
          <i class="wxicon"></i>
          <p>微信</p>
        </div>
        <div @click="toShare(2)">
          <i class="pyqicon"></i>
          <p>朋友圈</p>
        </div>
      </div>
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
        <img :src="image" alt />
        <div class="btn" @click="toShareWx">分享</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {storage} from '@/utils'
export default {
  components: {
    swiper,
    swiperSlide,
    XDialog
  },
  data() {
    return {
      showDialogStyle: false,
      showShare: false,
      invite_code: "",
      statusH: 0,
      imgs: [],
      index: 0,
      image: "https://img.yzcdn.cn/vant/cat.jpeg"
    };
  },
  created() {
    this.$vux.loading.show({
      text: "加载中"
    });
    this.invite_code = this.$store.state.user.userInfo.invite_code;
    this.uid = storage.get("userInfo").uid;
    this.token =storage.get("token");
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
    
  },
  methods: {
    clip() {
      this.copyTextShare(this.invite_code);
    },
    toShare(type) {
       dsBridge.call('inviteShare',{url:this.image,type})
      
    },
    toShareWx() {
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
    },
    saveClick() {
      /* this.$http.post("/amoy/redbag/update-share-num", true, true).then(res => {
        if (res.code == 0) {
        }
      }); */
      window.location.href =
        this.link +
        "/amoy/user/invite?tpl=/uploads/image/99966/0/2019/10/9badf41e751a2102dc0a7a63377dbd4f.jpg" +
        "&uid=" +
        this.$store.state.user.userInfo.uid +
        "&invite_code=" +
        this.$store.state.user.userInfo.invite_code;
    },
    saveImg() {
      let that=this
     // dsBridge.call('saveMediaToAlbums',[this.image])
      dsBridge.call("saveMediaToAlbum", {url: that.image})
    }
  },
  beforeDestroy() {
    this.$vux.loading.hide();
  },
  activated() {
    this.invite_code = this.$store.state.user.userInfo.invite_code;
  }
};
</script>
<style lang="less" scoped>
#shared {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.imgContent {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #111;
  .shareBox {
    position: absolute;
    z-index: 1000;
    top: 0.34rem;
    color: #fff;
    font-size: 0.24rem;
    width: 100%;
    .shareIcon {
      float: left;
      width: 0.45rem;
      height: 0.42rem;
      background: url("../../assets/img/hall/share/share.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.2rem;
      margin-left: 0.3rem;
    }
    .closeIcon {
      float: right;
      width: 0.42rem;
      height: 0.42rem;
      background: url("../../assets/img/hall/share/close.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.35rem;
    }
    span {
      float: left;
    }
  }
  /deep/.swiper {
    width: 100%;
    height: 100%;
    .swiper-button {
      background: none;
      width: 0.8rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      > i {
        font-size: 0.8rem;
        color: #fff;
      }
    }
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-slide {
        width: 100% !important;
      }
    }
  }
  .inviteImg {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #111;
  }
  .funcBox {
    width: 5.6rem;
    height: 0.88rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 0.3rem;
    border-radius: 0.1rem;
    p {
      width: 3.8rem;
      color: #ff4a17;
      font-size: 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      float: left;
    }
    span {
      width: 1.8rem;
      height: 0.88rem;
      line-height: 0.88rem;
      float: left;
      background: linear-gradient(
        -30deg,
        rgba(227, 185, 125, 1) 0%,
        rgba(240, 214, 160, 1) 100%
      );
      color: #333;
      text-align: center;
      font-size: 0.34rem;
      border-radius: 0 0.1rem 0.1rem 0;
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
.botBox {
  width: 100%;
  height: 3rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  .shareTxt {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.3rem;
    color: #2f2f2f;
    text-align: center;
    border-bottom: 1px dashed #efefef;
    position: relative;
    .closeIcon {
      position: absolute;
      width: 0.35rem;
      height: 0.35rem;
      background: url("../../assets/img/close.png") no-repeat;
      background-size: 100% 100%;
      right: 0.3rem;
      top: 0.3rem;
    }
  }
  .bot {
    width: 100%;
    height: 2.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 1rem;
      height: 1.7rem;
      i {
        width: 1rem;
        height: 1rem;
      }
      p {
        color: #333;
        font-size: 0.24rem;
        height: 0.24rem;
        line-height: 0.24rem;
        text-align: center;
      }
      .wxicon {
        background: url("../../assets/img/hall/share/wx.png") no-repeat;
        background-size: 100% 100%;
      }
      .pyqicon {
        background: url("../../assets/img/hall/share/pyq.png") no-repeat;
        background-size: 100% 100%;
      }
      .qqicon {
        background: url("../../assets/img/hall/share/qq.png") no-repeat;
        background-size: 100% 100%;
      }
      .qzicon {
        background: url("../../assets/img/hall/share/qz.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.saveBox {
  position: fixed;
  width: 100%;
  height: 1rem;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  .saveIcon {
    width: 0.6rem;
    height: 0.6rem;
    background: url("../../assets/img/save.png") no-repeat;
    background-size: 100% 100%;
  }
  p {
    width: 100%;
    height: 0.4rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
    text-align: center;
    color: #fff;
  }
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
