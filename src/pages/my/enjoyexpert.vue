<template>
  <div id="enjoyexpert">
    <div class="label" @click="lookMOre">
      <p>选择您想体验的达人等级</p>
      <div>
        <span v-show="!level">请选择</span>
        <span style="color:#FF4A17" v-show="level">{{level}}星达人</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div class="label">
      <input type="text" placeholder="请输入联系方式(微信号)" v-model="wxnum" />
    </div>
    <div class="label" style="margin:0;border-top:1px solid #efefef;">
      <input type="text" placeholder="请输入姓名" v-model="name" />
    </div>
    <p class="tip">注：该等级体验期为永久，需支付{{price}}TSC</p>
    <div class="btn" @click="buy">提交</div>
    <div class="picker" v-show="showTool">
      <van-radio-group v-model="radio" @click="change">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            :title="item.title+'达人'"
            clickable
            @click="change(index)"
          >
            <van-radio slot="right-icon" :name="index" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      wxnum: "",
      name: "",
      showTool: false,
      radio: "0",
      level: "",
      list: [],
      price: 0,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png"
    };
  },
  created() {
    this.getList();
    if (window.api) {
      api.setStatusBarStyle({
        style: "dark"
      });
    }
  },
  methods: {
    lookMOre() {
      this.showTool = true;
    },
    change(e) {
      this.radio = e;
      this.level = e * 1;
      this.price = this.list[e + ""]["buy_price"];
      setTimeout(() => {
        this.showTool = false;
      }, 300);
    },
    getList() {
      this.$http.post("/amoy/user/credit-level").then(res => {
        if (res.code == 0) {
          this.list = res.data.member_level_list;
          /* for (const key in res.data.member_level_list) {
            console.log(res.data.member_level_list[key]);
          } */
        }
      });
    },
    buy() {
      if (!this.level) {
        return this.$vux.toast.text("请选择达人等级!");
      }
      if (!this.wxnum) {
        return this.$vux.toast.text("请输入微信号!");
      }
      if (!this.name) {
        return this.$vux.toast.text("请输入姓名!");
      }
      Dialog.confirm({
        title: "购买提示",
        message: "本次购买需支付" + this.price + "法币"
      })
        .then(() => {
          // on confirm
          var info = {
            member_level: this.list[this.radio + ""]["id"],
            wx_number: this.wxnum,
            name: this.name
          };
          this.$http
            .post("/amoy/member/create-member-order", info)
            .then(res => {
              if (res.code == 0) {
                this.$vux.toast.text("购买成功!");
                this.goBack();
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.label {
  height: 1rem;
  padding: 0 0.3rem;
  background: #fff;
  margin-top: 0.2rem;
  p {
    color: #333;
    font-size: 0.3rem;
    line-height: 1rem;
    height: 1rem;
    float: left;
  }
  > div {
    float: right;
    line-height: 1rem;
    span {
      color: #999;
      font-size: 0.28rem;
    }
    .iconfont {
      color: #666;
    }
  }
  input {
    width: 100%;
    border: none;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
  }
}
.picker {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.tip {
  font-size: 0.24rem;
  color: #666;
  padding-left: 0.3rem;
  margin-top: 0.27rem;
  height: 0.25rem;
  line-height: 0.25rem;
}
.btn {
  width: 6.5rem;
  height: 0.88rem;
  background:linear-gradient(-30deg,rgba(227,185,125,1) 0%,rgba(240,214,160,1) 100%);
  border-radius: 0.16rem;
  color: #333;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.34rem;
  margin: 0 auto;
  margin-top: 1.5rem;
}
</style>