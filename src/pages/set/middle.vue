<template>
  <div id="middle">
    <div class="box">
      <icon type="safe_success" is-msg></icon>
      <p>{{txt}}成功</p>
      <div v-if="type=='auth'">
        <a v-if="os=='ios'" :href="url1">返回应用，查询实名结果</a>
        <a v-else href="tradhall://?type=auth">返回应用</a>
      </div>
      <div v-if="type=='pay'">
        <a v-if="os=='ios'" :href="url2">返回应用</a>
        <a v-else href="tradhall://?type=pay">返回应用</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vux";
export default {
  components: {
    Icon
  },
  data() {
    return {
      type: "",
      txt: "",
      os: "",
      url1: "",
      url2: ""
    };
  },
  created() {
    this.url1 = "http://" + resUrl + "/h5/#/faceAuth?type=auth";
    this.url2 = "http://" + resUrl + "/h5#/recharge";
    console.log(this.url1, this.url2);
    this.os = this.appSource();
    this.type = this.$route.query.type || "";
    if (this.type == "auth") {
      this.txt = "实名认证";
    } else if (this.type == "pay") {
      this.txt = "付款";
    }
  },
  methods: {
    appSource() {
      const u = navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        return "ios";
      } else {
        return "andriod";
      }
    }
  }
};
</script>
<style lang="less" scoped>
#middle {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 100%;
    height: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.35rem;
    }
    a {
      font-size: 0.3rem;
      text-decoration: underline;
    }
  }
}
</style>