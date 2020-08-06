<template>
  <div id="authentication">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>添加支付宝</h1>
    </div>
    <div class="content" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="label">
        <p>支付宝账号</p>
        <input type="text" placeholder="请输入支付宝账号" v-model="aliPay" />
      </div>
      <div class="label">
        <p>姓名</p>
        <input type="text" v-model="name" disabled  style="background:#fff;" />
      </div>
      <!-- <div class="code">
        <div class="title">收款码</div>
        <div class="imgBox">
          <div class="addIcon" @click="upLoad" v-if="!imgs">
            <i class="iconfont icon-add"></i>
          </div>
          <div class="imgBoxs" v-else>
            <img :src="imgs" alt />
            <i @click="deleatImg" class="iconfont icon-close"></i>
          </div>
          <img v-if="imgD" :src="imgD" alt />
        </div>
      </div> -->
      <div class="btn" @click="save">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      bankCard: "",
      aliPay: "",
      fileList: [],
      name: "",
      imgD: "",
      imgs: ""
    };
  },
  created() {
    this.getDefault();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    save() {
      if (!this.aliPay) {
        return this.$vux.toast.text("请输入支付宝账号");
      }
      this.$http
        .post(
          "/amoy/user/bind-alipay-info",
          {
            alipayid: this.aliPay,
            qrcode: this.imgs || this.imgD,
            up_type: this.imgs.substr(0, 4) == "data" ? "base64" : "url",
            withdraw_to_name: this.name
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("添加成功！");
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          }
        });
    },
    getDefault() {
      this.$http.get("/amoy/user/bind-alipay-info").then(res => {
        if (res.code == 0) {
          this.aliPay = res.data.alipayid;
          this.imgD = res.data.qrcode;
          this.name=res.data.withdraw_to_name
          //this.fileList.push({ content: res.data.qrcode });
          console.log(this.fileList);
        }
      });
    },
    afterRead(e) {
      console.log(this.fileList);
      this.bankCard = e.content;
      this.imgD = "";
    },
    deleteImg(e) {
      this.imgD = "";
      this.bankCard = e.content;
    },
    upLoad() {
      dsBridge.call("getPicture", ret => {
        if (ret) {
          this.imgs = ret;
          this.img = ret;
          this.imgD = "";
        }
      });
    },
    deleatImg() {
      this.imgs = "";
      this.img = "";
      this.imgD = "";
      console.log(this.imgs);
    }
  }
};
</script>
<style lang="less" scoped>
#authentication {
  background: #fff;
  min-height: 100%;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10;
  background: rgba(40, 39, 47, 1);
  color: #fff;
  h1 {
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.content {
  overflow: hidden;
}
.label {
  padding: 0 0.4rem;
  background: #fff;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
  p {
    width: 1.7rem;
    font-size: 0.3rem;
    color: #333;
    height: 1rem;
    line-height: 1rem;
    float: left;
  }
  input {
    width: 4.5rem;
    float: left;
    margin-left: 0.2rem;
    font-size: 0.28rem;
    line-height: 1rem;
    height: 1rem;
    border: none;
  }
}
.code {
  padding: 0 0.3rem;
  margin-top: 0.5rem;
  .title {
    font-size: 0.3rem;
  }
  .imgBox {
    .addIcon {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 1rem;
        color: #ccc;
      }
    }
    .imgBoxs {
      width: 1.5rem;
      height: 1.5re;
      position: relative;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
      i {
        position: absolute;
        right: -0.3rem;
        top: -0.3rem;
        font-size: 0.5rem;
      }
    }
    > img {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.2rem;
    }
  }
}
.btn {
  width: 6.5rem;
  height: 0.88rem;
  background: linear-gradient(
    -30deg,
    rgba(227, 185, 125, 1) 0%,
    rgba(240, 214, 160, 1) 100%
  );
  border-radius: 0.08rem;
  font-size: 0.34rem;
  color: #333;
  line-height: 0.88rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>
