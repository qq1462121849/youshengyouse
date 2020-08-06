<template>
  <div id="register">
    <div class="bg">
      <div class="block" @click="exchangeMill"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    exchangeMill() {
      this.$http
        .post(
          "/amoy/machine/exchange-machine",
          {
            mid: 1,
            num: 1
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("兑换成功!");
            this.$http.post("/amoy/index/tips-status", true, true).then(res => {
              if (res.code == 0) {
                let r = res.data;
                if (r.is_look_goods == 0) {
                  this.$router.push("guide4");
                } else {
                  if (r.is_get_fb == 0) {
                    this.$router.push("guide6");
                  } else {
                    this.$router.push("home");
                  }
                }
              }
            });
          } else {
            this.$http.post("/amoy/index/tips-status", true, true).then(res => {
              if (res.code == 0) {
                let r = res.data;
                if (r.is_look_goods == 0) {
                  this.$router.push("guide4");
                } else {
                  if (r.is_get_fb == 0) {
                    this.$router.push("guide6");
                  } else {
                    this.$router.push("home");
                  }
                }
              }
            });
          }
        });
    }
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
    height: 23rem;
    background: url("../../assets/img/tupian/3.png") no-repeat;
    background-size: 100% 100%;
  }
  .block {
    width: 3rem;
    height: 2rem;
    position: absolute;
    right: 0;
    top: 9rem;
    background: rgba(255, 255, 255, 0);
  }
}
</style>

