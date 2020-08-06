<template>
  <div id="feedback">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>申诉</h1>
    </div>
    <div class="feedBoxCore" :style="{paddingTop: statusH + 'rem'}">
      <div class="CoreBox">
        <div class="describe">
          <textarea
            class="describeTop"
            maxlength="500"
            name="site"
            v-model="text"
            id
            cols="42"
            rows="3"
            placeholder="请输入问题反馈或建议"
          ></textarea>
          <div class="describeBtn">{{text.length}}/500</div>
        </div>
      </div>
      <div
        class="picBox"
        style="display:flex;justify-content: flex-start;flex-wrap: wrap;overflow:hidden;height:1.64rem;padding-top:0.16rem;"
      >
        <div class="picCoreBox">
          <van-uploader :show-upload="false" v-model="fileList" multiple :max-count="4" />
        </div>
        <div class="picBox2" @click="fn">
          <div>
            <img src="./../../assets/my/addPic.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="feedBtnBox">
      <div @click="feedBack()">提交</div>
    </div>
  </div>
</template>
<script>
import Uploader from "vant/lib/uploader";
import "vant/lib/uploader/style";
export default {
  components: {
    Uploader
  },
  data() {
    return {
      statusH: 0,
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true },
      ],
      num: 0,
      img: "",
      text: ""
    };
  },
  created() {
    let safeArea = dsBridge.call("receiveParams", "safeAreaTop1");
    let size = document.documentElement.clientWidth / 7.5;
    if (safeArea == "123") {
      this.statusH = 0;
    } else {
      this.statusH = safeArea / size;
    }
  },
  methods: {
    feedBack() {
      if (this.text.trim().length == 0) {
        return this.$vux.toast.text("反馈内容不能为空！");
      }
      let photo = {};
      this.fileList.forEach((item, index) => {
        if (index == 0) {
          photo.image = this.fileList[index].content;
        } else {
          photo["image" + index] = this.fileList[index].content;
        }
      });

      this.$http
        .post("/amoy/user/feedback", {
          type: 1,
          content: this.text,
          contact: this.$store.state.user.userInfo.mobile,
          // image: this.fileList[0].content,
          // image1: this.fileList[1].content,
          // image2: this.fileList[2].content,
          // image3: this.fileList[3].content
          ...photo
        })
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("反馈成功！");
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          }
        });
    },
    fn() {
      // alert()
      //let token = dsBridge.call("receiveParams", "token");
     // alert(token);
     this.$vux.toast.text("您已完成实名认证！");
      dsBridge.call("getPicture", ret => {
        //alert(ret)
        if (ret) {
          this.fileList.push({
            content: ret
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#feedback {
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  /deep/.van-uploader__preview-image {
    display: block;
    width: 1.52rem;
    height: 1.52rem;
    overflow: hidden;
    border-radius: 8px;
  }
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
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
.feedBoxCore {
  margin-top: 0.88rem;
  overflow: hidden;
  .CoreBox {
    padding: 0 0.3rem;
    margin: 0.3rem 0;
    .describe {
      width: 100%;
      height: 3.9rem;
      background: rgba(247, 247, 247, 1);
      border-radius: 0.1rem;
      overflow: hidden;
      .describeTop {
        font-size: 0.3rem;
        padding: 0.3rem 5% 0 5%;
        height: 3rem;
        width: 90%;
        outline: none;
        overflow-y: scroll;
        border: none;
        background: rgba(247, 247, 247, 1);
      }
      .describeBtn {
        height: 0.6rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.5rem;
        text-align: right;
        margin-right: 0.3rem;
      }
    }
  }
  .picBox {
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    .picCoreBox {
      // width: 1.5rem;
      // height: 1.5rem;
      position: relative;
      .picCore1 {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        width: 0.3rem;
        height: 0.3rem;
      }
      .picCore2 {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: 0;
      }
    }
  }
  .picBox2 {
    // margin-top: .2rem;
    // padding: 0 .3rem;
    > div {
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f7f7f7;
      > img {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
  }
}
.feedBtnBox {
  position: fixed;
  bottom: 1.7rem;
  display: flex;
  justify-content: center;
  width: 100%;
  > div {
    width: 5rem;
    height: 0.88rem;
    background: rgba(214, 167, 94, 1);
    border-radius: 0.08rem;
    font-size: 0.34rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 0.88rem;
  }
}
</style>
