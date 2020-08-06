<template>
  <div id="register">
    <div class="bg" @click="toTrad"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toTrad() {
      this.$router.push("trading?intoType=guide");
    }
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
  height: 20rem;
  position: absolute;
  background: url("../../assets/img/trad/1.png") no-repeat;
  background-size: 100% 100%;
}
</style>

