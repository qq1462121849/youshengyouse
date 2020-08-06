<template>
  <div id="protocol" style="background:#fff;padding:0 0.2rem;">
    <div v-html="txt"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      txt: ""
    };
  },
  created() {
    this.$http.post("/amoy/user/get-user-agreement").then(res => {
      if (res.code == 0) {
        this.txt = res.data;
      }
    });
  }
};
</script>