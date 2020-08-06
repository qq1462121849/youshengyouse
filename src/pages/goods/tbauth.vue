<template>
  <div id="tbauth">
    <div class="headerBox">
      <i
        @click="toBack"
        class="iconfont icon-back"
        :style="{top: this.$store.state.global.statusH + 'rem'}"
      ></i>
      <h1></h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    var browser = api.require("webBrowser");
    let toUrl = "";
    if (this.$route.query.urlPay) {
      toUrl =
        this.$route.query.urlPay +
        "?payPrice=" +
        this.$route.query.payPrice +
        "&uid=" +
        this.$route.query.uid +
        "&pay_type=" +
        this.$route.query.pay_type +
        "&operator_id=" +
        this.$route.query.operator_id;
    } else {
      toUrl = this.$route.query.url;
    }
    browser.openView(
      {
        url: toUrl,
        rect: {
          x: 0,
          y: 70,
          w: "auto",
          h: "auto"
        }
      },
      function(ret, err) {
        switch (ret.state) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          default:
            break;
        }
      }
    );
    var that = this;
    api.addEventListener(
      {
        name: "keyback"
      },
      function(ret, err) {
        that.toBack();
      }
    );
  },
  methods: {
    toBack() {
      let that = this;
      let browser = api.require("webBrowser");
      browser.historyBack(function(ret, err) {
        if (!ret.status) {
          browser.closeView();
          that.$router.go(-1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 1.3rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #fff;
  h1 {
    font-size: 0.34rem;
    color: #333;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #333;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
</style>
