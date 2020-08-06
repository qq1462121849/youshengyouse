<template>
  <div id="guidedetail">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>新手指南</h1>
    </div>
    <div
      class="title"
      :style="{paddingTop: statusH+0.88 + 'rem'}"
    >{{detail.title}}</div>
    <img class="imgBig" :src="detail.img" alt />
    <div class="text" v-html="detail.content">{{detail.content}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detail: "",
      id: "",
      statusH: ''
    };
  },
  created() {
    let safeArea = dsBridge.call('receiveParams', 'safeAreaTop1')
    let size = (document.documentElement.clientWidth / 7.5)
    if (safeArea == '123') {
      this.statusH = 0
    } else {
      this.statusH = (safeArea / size)
    }
    this.id = this.$route.query.id;
    this.$http
      .post("/amoy/index/article-detail", { id: this.id }, true, true)
      .then(res => {
        if (res.code == 0) {
          this.detail = res.data;
        }
      });
  }
};
</script>
<style lang="less" scoped>
#guidedetail {
  background: #fff;
  min-height: 100%;
  padding: 0 0.2rem;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  left: 0;
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
}
.title {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.34rem;
}
.imgBig {
  width: 90%;
  display: block;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.text {
  font-size: 0.26rem;
  line-height: 0.44rem;
  // text-indent: 2em;
  margin-top: 0.2rem;
}
</style>
