<template>
  <div id="myBody">
    <div class="herdBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="headerBox">
        <i @click="goBack()" class="iconfont icon-back"></i>
        <h1>全球手续费分红公示</h1>
      </div>
    </div>
    <mescroll-vue ref="mescroll" class="mescroll" :style="{paddingTop: statusH + 'rem'}" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="mescrollBox">
        <div class="fenhongBox">
          <div>
            <div>昨日全球手续费</div>
            <div>12570.65000023 BT</div>
          </div>
          <div>
            <div>今日全球手续费</div>
            <div>12570.65000023 BT</div>
          </div>
        </div>
        <div class="fenHongDesc">
          <p>每天凌晨00：05开始发放前一日手续费分红</p>
          <p>因数据时时变动，今日预计分红只做参考，具体金额以实际到账为准</p>
        </div>
        <div id="dxd">
          <div class="ListBoxCore">
            <div class="ListBox" v-for="(item ,index) in dataList" :key="index">
              <div class="coreTit">1星达人</div>
              <div class="coreTit2">
                <div>昨日每人分红</div>
                <div>今日预计分红</div>
              </div>
              <div class="coreTit3">
                <div>12570.65000023 BT</div>
                <div>12570.65000023 BT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      statusH:'',
      time: 30 * 60 * 60 * 1000,
      mescroll: null, 
      mescrollDown: {}, 
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0, 
          size: 9 
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        empty: {
          warpId:	"dxd", 
          icon: "./static/none.png", 
          tip: "暂无相关数据~" 
        },
      },
      dataList:[]
    };
  },
  created () {
    let safeArea = dsBridge.call('receiveParams', 'safeAreaTop1')
    let size = (document.documentElement.clientWidth / 7.5)
    if (safeArea == '123'){
      this.statusH = 0
    } else {
      this.statusH = (safeArea / size)
    }
  },
  mounted () {

  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.$http.post("/amoy/machine/machine-list",
        {
          page: page.num, 
          type: 'property',
        },true,true).then(response => {
        if (response.code === 0) {
          let arr = response.data;
          if (page.num === 1) this.dataList = [];
          this.dataList = this.dataList.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.dataList.length);
          });
        }
      })
      .catch(e => {
        mescroll.endErr();
      });
    },
  }
};
</script>
<style lang="less" scoped>
#myBody{
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
  .mescroll{
    position: fixed;
    top: .88rem;
    bottom: 0;
    height: auto; 
  }
  .herdBox{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;
    height: 1.8rem;
    .headerBox {
      width: 100%;
      height: 0.88rem;
      background: #192231;
      position: fixed;
      top: 0;
      z-index: 10000;
      h1 {
        font-size: 0.34rem;
        color: #fff;
        text-align: center;
        line-height: 0.88rem;
        font-weight: normal;
      }
      .iconfont {
        width: 0.2rem;
        height: 0.88rem;
        line-height: 0.35rem;
        color: #fff;
        line-height: 0.88rem;
        font-size: 0.35rem;
        position: absolute;
        left: 0.3rem;
      }
    }
  }
  .mescrollBox{
    padding: 0 .3rem;
    .fenhongBox{
      display: flex;
      justify-content: space-between;
      margin: .4rem 0;
      >div{
        width: 3.3rem;
        height: 1.68rem;
        background:linear-gradient(90deg,rgba(234,190,123,1),rgba(197,148,69,1));
        box-shadow: 0 .08rem 0.16rem 0 rgba(202,153,76,0.26);
        border-radius: .2rem;
        >div{
          margin-left: .24rem;
          color: #ffffff;
        }
        >div:nth-child(1){
          height: 1rem;
          line-height: 1rem;
          font-size: .24rem;
          font-weight:bold;
        }
        >div:nth-child(2){
          font-size: .3rem;
          font-weight:bold;
        }
      }
    }
    .fenHongDesc{
      font-size: .22rem;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
    .ListBoxCore{
      margin-top: .2rem;
      .ListBox{
        padding: .4rem .3rem;
        margin-bottom: .2rem;
        background: #ffffff;
        border-radius: .1rem;
        .coreTit{
          font-size: .32rem;
          font-weight:bold;
          color:rgba(50,50,50,1);
        }
        .coreTit2{
          display: flex;
          >div{
            width: 50%;
            font-size: .26rem;
            font-weight:400;
            color:rgba(50,50,50,1);
          }
        }
        .coreTit3{
          display: flex;
          >div{
            width: 50%;
            font-size: .3rem;
            font-weight:bold;
            color:rgba(50,50,50,1);
          }
        }
      }
    }
  }
}
</style>