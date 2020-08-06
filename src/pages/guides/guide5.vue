<template>
  <div id="register">
    <div class="bg">
      <div class="block" @click="jumpTo('detail?id=548429397794&intoType=guide')"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>
<style lang="less" scoped>
#register {
  height: 100%;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 15rem;
    background: url("../../assets/img/tupian/5.png") no-repeat;
    background-size: 100% 100%;
  }
  .block {
    width: 100%;
    height: 2rem;
    position: absolute;
    right: 0;
    top: 7.4rem;
    background: rgba(255, 255, 255, 0);
  }
}
</style>

