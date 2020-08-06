<template>
  <div id=" search">
    <div class="topBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="inputBox">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <i class="iconfont2"></i>
        <input
          class="searchTxt"
          type="text"
          placeholder="搜索商品或品牌"
          v-model="text"
          @keyup.enter="toSeachRes"
        />
        <span @click="toSeachRes">搜索</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      text: ""
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    toSeachRes(text) {
      if (!this.text) {
        return this.$vux.toast.text("搜索内容不能为空！");
      }
      this.$router.push({
        name: "searchList",
        query: {
          text: this.text
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.topBox {
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  .inputBox {
    width: 100%;
    margin-top: 0.5rem;
    position: relative;
    .icon-back {
      color: #fff;
      font-size: 0.36rem;
      margin-left: 0.3rem;
    }
    .searchTxt {
      width: 4.5rem;
      height: 0.5rem;
      padding-left: 0.7rem;
      line-height: 0.5rem;
      border: none;
      font-size: 0.3rem;
      border-radius: 0.3rem;
      margin-left: 0.2rem;
    }
    span {
      font-size: 0.3rem;
      color: #fff;
      margin-left: 0.2rem;
    }
    .iconfont2 {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../assets/img/hall/home/search.png") no-repeat;
      background-size: 100% 100%;
      left: 1.05rem;
      top: 0.15rem;
    }
  }
}
</style>