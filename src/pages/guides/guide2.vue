<template>
  <div id="register">
    <div class="bg"></div>
    <van-popup v-model="show" :closeable="false" @click-overlay="jumpTo('home')">
      <div class="codeBox">
        <i class="icon"></i>
        <p class="title">DLT矿机兑换必读</p>
        <div class="box">
          <div>
            <i class="iconNum"></i>
            <p>
              1、点击
              <br />兑换矿机
            </p>
          </div>
          <div>
            <i class="iconNum iconNum2"></i>
            <p>
              2、做浏览
              <br />任务领收益
            </p>
          </div>
          <div>
            <i class="iconNum iconNum3"></i>
            <p>
              3、矿机
              <br />收益自动到账
            </p>
          </div>
        </div>
        <div class="tipTxt">
          <div class="_title">提醒</div>
          <p>1、每日浏览商品任务完成后可以获得收益。</p>
          <p>2、续期DLT矿机，获得最大收益。</p>
        </div>
        <div class="btn" @click="jumpTo('guide3')">去兑换</div>
      </div>
    </van-popup>
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
    background: url("../../assets/img/guide/2.png") no-repeat;
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
  .box {
    width: 5.7rem;
    height: 1.98rem;
    margin-top: 0.5rem;
    border-radius: 0.1rem;
    background: rgba(231, 192, 135, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 1.8rem;
      height: 1.4rem;
      border-right: 1px solid #fff;
      color: #fff;
      font-size: 0.3rem;
      .iconNum {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 auto;
        background: url("../../assets/img/guide/2-1.png") no-repeat;
        background-size: 100% 100%;
      }
      .iconNum2 {
        background: url("../../assets/img/guide/2-2.png") no-repeat;
        background-size: 100% 100%;
      }
      .iconNum3 {
        background: url("../../assets/img/guide/2-3.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    > div:last-of-type {
      border: none;
    }
  }
  .tipTxt {
    margin-top: 0.3rem;
    ._title {
      font-weight: 700;
      font-size: 0.28rem;
    }
    p {
      width: 100%;
      text-align: left;
    }
  }
  .btn {
    width: 4.74rem;
    height: 0.81rem;
    background: rgba(22, 21, 24, 1);
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.81rem;
    text-align: center;
    border-radius: 0.1rem;
    margin-top: 1rem;
  }
}
</style>

