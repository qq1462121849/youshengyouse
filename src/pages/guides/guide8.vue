<template>
  <div id="register">
    <div class="bg">
      <div class="skip" @click="jumpTo('home')">跳过</div>
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
    height: 100%;
    background: url("../../assets/img/tupian/8.png") no-repeat;
    background-size: 100% 100%;
  }
  .skip {
    width: 1rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    position: absolute;
    color: #fff;
    font-size: 0.3rem;
    padding: 0 0.1rem;
    border: 1px solid #fff;
    border-radius: 0.1rem;
    right: 1rem;
    bottom: 2rem;
  }
}
</style>

