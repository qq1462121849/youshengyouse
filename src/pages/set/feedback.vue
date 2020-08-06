<template>
  <div id="feedback">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>交易规则</h1>
    </div>
    <div class="box"  :style="{paddingTop: $store.state.global.statusH +1+ 'rem'}">
      <h3>规则详情:</h3>
       <p v-html="rule"></p>
    </div>
    <!-- <div class="content" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="title">
        <p>问题/意见描述</p>
        <p>{{text.length}}/500</p>
      </div>
      <textarea class="text" placeholder="请填写10字以上的问题，方便我们更好地帮你解决" v-model="text"></textarea>
      <div class="imgcontent">
        <div class="addIcon" @click="upLoad" v-if="imgs.length==0">
          <i class="iconfont icon-add"></i>
        </div>
        <div class="imgBox" v-else>
          <img :src="imgs[0]" alt />
          <i @click="deleatImg" class="iconfont icon-close"></i>
        </div>
      </div>
      <div class="btn" @click="feedBack">提交</div>
    </div> -->
  </div>
</template>
<script>
import Uploader from "vant/lib/uploader";
import "vant/lib/uploader/style";
export default {
  components: {
    Uploader
  },
  data() {
    return {
      statusH: 0,
      fileList: [],
      num: 0,
      img: [],
      text: "",
      imgs: [],
      rule:'',
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.feedBack()
  },
  methods: {
    feedBack() {
      // if (this.text.trim().length == 0) {
      //   return this.$vux.toast.text("反馈内容不能为空！");
      // }
      this.$http.post("/amoy/trade/trade-rule", {
          // type: 1,
          // content: this.text,
          // contact: this.$store.state.user.userInfo.mobile
          /* image: this.fileList[0].content */
        })
        .then(res => {
          if (res.code == 0) {
              this.rule=res.data
          }
        });
    },
 
  }
};
</script>
<style lang="less" scoped>
#feedback {
  height: 100%;
  overflow: hidden;
  .box{
   
    width: 90%;
    margin: 0 auto;
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
.content {
  height: 100%;
  background: #fff;
  .title {
    padding: 0 0.3rem;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.28rem;
    color: #000;
  }
  .text {
    display: block;
    width: 7rem;
    padding: 0 0.25rem;
    height: 4.5rem;
    border: none;
    resize: none;
    background: #fefefe;
    margin: 0 auto;
  }
  .btn {
    width: 100%;
    height: 0.88rem;
    background: rgba(214, 167, 94, 1);
    color: #fff;
    line-height: 0.88rem;
    font-size: 0.34rem;
    text-align: center;
    margin-top: 2rem;
  }
}
.imgcontent {
  margin-left: 0.3rem;
  width: 2rem;
  height: 2rem;
  position: relative;
  .closeIcon {
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    background: url("../../assets/img/hall/order/close.png") no-repeat;
    background-size: 100% 100%;
    right: 0.1rem;
    top: 0.1rem;
  }
  .addIcon {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 1rem;
      color: #ccc;
    }
  }
  .imgBox {
    width: 1.5rem;
    height: 1.5re;
    position: relative;
    > img {
      display: block;
      width: 100%;
      height: 100%;
    }
    i {
      position: absolute;
      right: -0.3rem;
      top: -0.3rem;
      font-size: 0.5rem;
    }
  }
}
</style>
