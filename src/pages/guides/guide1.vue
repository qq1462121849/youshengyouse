<template>
  <div id="register">
    <div class="bg"></div>
    <van-popup v-model="show" :closeable="false" @click-overlay="jumpTo('home')">
      <div class="codeBox">
        <i class="icon"></i>
        <p class="title">实名认证</p>
        <p class="desc">实名领取体验矿机赚</p>
        <p class="money">110%收益</p>
        <span @click="jumpTo('auth?intoType=guide')">去实名认证</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  created() {
    this.getStatus();
  },
  methods: {
    getStatus() {
      this.$http.post("/amoy/index/tips-status", true, true).then(res => {
        if (res.code == 0) {
          let r = res.data;
          if (r.is_real_name == 0) {
            this.show = true;
          } else {
            if (r.is_get_live_machine == 0) {
              this.$router.push("guide2");
            } else {
              if (r.is_look_goods == 0) {
                this.$router.push("guide4");
              } else {
                /* if (r.is_finish_task == 0) {
                  this.$router.push("guide4");
                } else { */
                if (r.is_get_fb == 0) {
                  this.$router.push("guide6");
                }
                //}
              }
            }
          }
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
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  /deep/.van-popup {
    border-radius: 0.2rem;
    background: #fff;
  }
}
.bg {
  width: 100%;
  height: 2rem;
  position: absolute;
  background: url("../../assets/img/logo.png") no-repeat center;
  background-size: 2.2rem 100%;
  top: 1.5rem;
}
.codeBox {
  width: 5.5rem;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  .icon {
    width: 1.07rem;
    height: 1.07rem;
    background: url("../../assets/img/guide/1.png") no-repeat;
    background-size: 100% 100%;
  }
  p {
    width: 100%;
    text-align: center;
  }
  .title {
    font-size: 0.3rem;
    height: 0.34rem;
    line-height: 0.34rem;
    margin-top: 0.2rem;
  }
  .desc {
    color: #9e9b9e;
    margin-top: 0.5rem;
    font-size: 0.26rem;
  }
  .money {
    color: #e6bf8a;
    font-size: 0.28rem;
  }
  span {
    width: 4.74rem;
    height: 0.81rem;
    background: rgba(231, 192, 135, 1);
    box-shadow: 4px 4px 1px 0px rgba(200, 200, 200, 0.18);
    font-size: 0.28rem;
    color: #fff;
    text-align: center;
    line-height: 0.81rem;
    border-radius: 0.1rem;
    margin-top: 0.51rem;
  }
}
</style>

