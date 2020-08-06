<template>
  <div id="register">
    <div class="bg" @click="jumpTo('guide12')"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
#register {
  height: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../../assets/img/trad/4.png") no-repeat;
  background-size: 100% 100%;
}
</style>

