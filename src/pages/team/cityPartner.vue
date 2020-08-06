<template>
  <div id="partner">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>城市合伙人</h1>
    </div>
    <div class="tab" :style="{top: statusH+0.88 + 'rem'}">
      <tab
        active-color="#333333"
        custom-bar-width="50px"
        default-color="#999999"
        bar-active-color="#FF4A17"
        :line-width="4"
      >
        <tab-item selected @on-item-click="tabIndex=1">今日收益</tab-item>
        <tab-item @on-item-click="tabIndex=2">历史收益</tab-item>
      </tab>
    </div>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: statusH+1.8 + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="content">
        <div class="label" v-for="(item, index) in dataList" :key="index">
          <img class="avatar" src="../../assets/img/hall/logo.png" alt />
          <p class="name">{{item.nickname}}</p>
          <div class="info">
            <p>{{item.price>0?'+'+item.price:item.price}}DLT</p>
            <span>{{item.created_at}}</span>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <!-- <confirm v-model="showZx" :show-cancel-button="false" confirm-text="去联系" @on-confirm="contact">
      <p>对不起，您还不是城市合伙人！ 成为合伙人请联系官方客服！</p>
    </confirm>-->
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import { Tab, TabItem, XDialog, Confirm } from "vux";
import { Dialog } from 'vant';
export default {
  components: {
    Tab,
    TabItem,
    XDialog,
    Confirm,
    MescrollVue
  },
  data() {
    return {
      statusH: 0,
      tabIndex: 1,
      showDialogStyle: false,
      showZx: false,
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        /*  toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        } */
      },
      dataList: [] // 列表数据
    };
  },
  created() {
    /*  this.showZx = this.$store.state.user.userInfo.operator == 0 ? true : false; */
    if (this.$store.state.user.userInfo.operator == 0) {
      Dialog.confirm({
        title: "温馨提示",
        message: "对不起，您还不是城市合伙人！ 成为合伙人请联系官方客服！",
        confirmButtonText:'复制QQ号',
        confirmButtonColor:'#FF4817'
      })
        .then(() => {
          // on confirm
          /* this.$router.push({
            name:'tbauth',
            query:this.$store.state.user.userInfo.service_bridge
          }) */
          this.clip()
        })
        .catch(() => {
          // on cancel
        });
    }
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  watch: {
    tabIndex() {
      this.mescroll.triggerDownScroll();
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      var type = "today";
      // 联网请求
      if (this.tabIndex == 1) {
        type = "today";
      } else {
        type = "other";
      }

      this.$http
        .post(
          "/amoy/user/city-partner",
          {
            page: page.num, // 页码
            type: type
          },
          true,
          true
        )
        .then(response => {
          // 请求的列表数据
          let arr = response.data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    clip() {
      this.copyTextShare(this.$store.state.user.userInfo.official_email);
    },
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 0.88rem;
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
.tab {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  z-index: 100;
  border-top: 1px solid #efefef;
  .bg {
    width: 100%;
    position: absolute;
    bottom: -2px;
    height: 1px;
    background: #fff;
  }
}
.mescroll {
  position: fixed;
  height: 100%;
  background: #fff;
}
.content {
  padding-bottom: 2rem;
  background: #fff;
}
.label {
  padding: 0 0.35rem;
  height: 1.35rem;
  border-bottom: 1px solid #efefef;
  .avatar {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    float: left;
    margin-top: 0.3rem;
  }
  .name {
    width: 3rem;
    height: 1.35rem;
    line-height: 1.35rem;
    color: #333;
    font-size: 0.28rem;
    margin-left: 0.18rem;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info {
    float: right;
    width: 2.7rem;
    height: 1.35rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    p {
      color: #333;
      width: 100%;
      height: 0.3rem;
      font-size: 0.3rem;
      line-height: 0.3rem;
      text-align: right;
    }
    span {
      display: block;
      width: 100%;
      height: 0.24rem;
      font-size: 0.24rem;
      line-height: 0.24rem;
      color: #999;
      margin-top: 0.2rem;
      text-align: right;
    }
  }
}
</style>