<template>
  <div id="register">
    <div class="bg">
      <div class="bgImg" @click="jumpTo('guide8')"></div>
      <!-- <div class="closeIcon"></div> -->
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
    background: url("../../assets/img/guide/7-2.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .bgImg {
    width: 6.3rem;
    height: 8.2rem;
    background: url("../../assets/img/guide/7-1.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .closeIcon {
    width: 0.5rem;
    height: 0.5rem;
    background: url("../../assets/img/hall/share/close.png") no-repeat center center;
    background-size: 80% 80%;
    border-radius: 50%;
    border: 1px solid #fff;
    margin: 0 auto;
    margin-top: 0.5rem;
  }
}
</style>

