<template>
  <div id="my2">
    <div class="header">
      <div class="userInfo">
        <img :src="userInfo.avatar" alt />
        <div class="right_info">
          <div>
            <p>{{userInfo.nickname}}</p>
            <span>UID:{{userInfo.uid}}</span>
          </div>
          <div class="code">
            邀请码：
            <span>{{userInfo.invite_code}}</span>
            <i class="clip" @click="copyTextShare(userInfo.invite_code)"></i>
          </div>
        </div>
      </div>
      <div class="botInfo">
        
        <div>
          <p>GST余额</p>
          <span>{{userInfo.credit2}}</span>
        </div>
        <div  @click="jumpTo('USDTList')">
          <p>TG余额</p>
          <span>{{userInfo.credit5}}</span>
        </div>
        <!-- <div >
          <p>USDT余额</p>
          <span>{{userInfo.credit7}}</span>
        </div> -->
      </div>
    </div>
    <div class="orderBox">
      <div class="title">
        <i class="orderIcon"></i>
        <p>我的订单</p>
      </div>
      <div class="iconBox">
        <div @click="jumpTo('newOrder?type=1')">
          <i class="gua"></i>
          <p>挂单中</p>
        </div>
        <div @click="jumpTo('newOrder?type=2')">
          <i class="trade"></i>
          <p>交易中</p>
        </div>
        <div @click="jumpTo('newOrder?type=3')">
          <i class="complate"></i>
          <p>已完成</p>
        </div>
        <div @click="jumpTo('newOrder?type=4')">
          <i class="end"></i>
          <p>已失效</p>
        </div>
      </div>
    </div>
    <div class="funBox">
      <div class="label" @click="jumpTo('feedback')">
        <i class="feedback"></i>
        <p>交易规则</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label" @click="jumpTo('newServe')">
        <i class="contact"></i>
        <p>联系客服</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label" @click="jumpTo('setPwd')">
        <i class="pwd"></i>
        <p>交易密码</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="label" @click="jumpTo('setAccount')">
        <i class="account"></i>
        <p>设置收款账户</p>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: []
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$http.post("/amoy/trade/user-detail").then(res => {
        if (res.code == 0) {
          this.userInfo = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 2.43rem;
  padding-top: 1rem;
  background: linear-gradient(#232027, #373540);
  .userInfo {
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    > img {
      width: 1rem;
      height: 1rem;
      border: 0.1rem solid rgba(100, 100, 100, 0.5);
      border-radius: 50%;
    }
    .right_info {
      width: 4rem;
      height: 1rem;
      margin-left: 0.3rem;
      > div {
        display: flex;
        align-items: center;

        p {
          font-size: 0.36rem;
          color: #fff;
          font-weight: 700;
        }
        span {
          color: #fff;
          font-size: 0.24rem;
          margin-left: 0.2rem;
        }
      }
      .code {
        color: #9e9e9e;
        font-size: 0.24rem;
        span {
          color: #d8ad6c;
          margin-left: 0;
          font-size: 0.28rem;
        }
        .clip {
          width: 0.22rem;
          height: 0.25rem;
          background: url("./img/clip.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 0.3rem;
        }
      }
    }
  }
  .botInfo {
    padding: 0 0.3rem;
    height: 1.5rem;
    display: flex;
  //  justify-content: space-between;
    align-items: center;
    position: relative;
    top: 0.5rem;
    > div {
      width: 5rem;
      height: 1.5rem;
      background: url("./img/bg.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      p {
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
        color: #b6781f;
      }
      span {
        width: 100%;
        text-align: center;
        font-size: 0.36rem;
        color: #333;
      }
    }
  }
}
.orderBox {
  width: 6.9rem;
  height: 2.86rem;
  background: #fff;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 1rem;
  .title {
    padding: 0 0.3rem;
    height: 1rem;
    display: flex;
    align-items: center;
    .orderIcon {
      width: 0.38rem;
      height: 0.38rem;
      background: url("./img/my/order.png") no-repeat;
      background-size: 100% 100%;
    }
    p {
      font-size: 0.3rem;
      color: #333;
      margin-left: 0.1rem;
    }
  }
  .iconBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    height: 1.2rem;
    margin-top: 0.2rem;
    > div {
      width: 0.9rem;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      .gua {
        width: 0.88rem;
        height: 0.88rem;
        background: url("./img/my/1.png") no-repeat;
        background-size: 100% 100%;
      }
      .trade {
        width: 0.88rem;
        height: 0.88rem;
        background: url("./img/my/2.png") no-repeat;
        background-size: 100% 100%;
      }
      .complate {
        width: 0.88rem;
        height: 0.88rem;
        background: url("./img/my/3.png") no-repeat;
        background-size: 100% 100%;
      }
      .end {
        width: 0.88rem;
        height: 0.88rem;
        background: url("./img/my/4.png") no-repeat;
        background-size: 100% 100%;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
        color: #666;
      }
    }
  }
}
.funBox {
  width: 6.3rem;
  height: 4.1rem;
  background: #fff;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  padding: 0.1rem 0.3rem;
  .label {
    display: flex;
    align-items: center;
    height: 1rem;
    border-bottom: 1px solid #eeeeee;
    p {
      width: 5rem;
      font-size: 0.3rem;
      color: #333;
      margin-left: 0.3rem;
    }
    .feedback {
      width: 0.38rem;
      height: 0.38rem;
      background: url("./img/my/wt.png") no-repeat;
      background-size: 100% 100%;
    }
    .contact {
      width: 0.38rem;
      height: 0.38rem;
      background: url("./img/my/lx.png") no-repeat;
      background-size: 100% 100%;
    }
    .pwd {
      width: 0.38rem;
      height: 0.38rem;
      background: url("./img/my/jy.png") no-repeat;
      background-size: 100% 100%;
    }
    .account {
      width: 0.38rem;
      height: 0.38rem;
      background: url("./img/my/sz.png") no-repeat;
      background-size: 100% 100%;
    }
    .iconfont {
      color: #999;
    }
  }
  .label:last-of-type {
    border: none;
  }
}
.btn {
  width: 5rem;
  height: 0.88rem;
  font-size: 0.32rem;
  color: #fff;
  background: #d6a75e;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  text-align: center;
  line-height: 0.88rem;
}
</style>