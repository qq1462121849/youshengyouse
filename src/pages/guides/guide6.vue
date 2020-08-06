<template>
  <div id="register">
    <div class="bg">
      <div class="block" @click="jumpTo('guide7')"></div>
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
    height: 22rem;
    background: url("../../assets/img/tupian/6.png") no-repeat;
    background-size: 100% 100%;
  }
  .block {
    width: 100%;
    height: 1.5rem;
    position: absolute;
    right: 0;
    top: 8.2rem;
    background: rgba(255, 255, 255, 0);
  }
}
</style>

