<template>
  <div id="guide">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>新手指南</h1>
    </div>
    <div class="content" :style="{paddingTop: statusH+1 + 'rem'}">
      <div
        class="label"
        v-for="(item, index) in guideList"
        :key="index"
        @click="jumpTo('guideDetail?id='+item.id)"
      >
        <p>{{item.title}}</p>
        <i class="iconfont icon-right"></i>
      </div>
      <!--       <div class="label">
        <p>关于DLT矿机相关问题</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label">
        <p>关于DLT星级达人相关问题</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label">
        <p>关于DLT团队相关问题</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label">
        <p>关于DLT积分相关问题</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label">
        <p>关于DLT交易相关问题</p>
        <i class="iconfont icon-right"></i>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: this.$store.state.global.statusH,
      guideList: []
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
    this.getDuideList();
  },
  methods: {
    getDuideList() {
      this.$http.post("/amoy/index/article-list", true, true).then(res => {
        if (res.code == 0) {
          this.guideList = res.data;
        }
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
.content {
  .label {
    padding: 0 0.55rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    background: #fff;
    font-size: 0.3rem;
    border-bottom: 1px solid #efefef;
    p {
      font-weight: 700;
    }
  }
  .label:nth-of-type(2n) {
    margin-bottom: 0.2rem;
  }
}
</style>
