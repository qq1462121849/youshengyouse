<template>
  <div id="myBody">
    <div class="herdBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
        <i @click="goBack()" class="iconfont icon-back"></i>
        <h1>合成</h1>
      </div>
      <div class="topPicBox">分红合成价格：{{configInfo.need_tg_num}}TG+{{configInfo.need_gst_num}}GST</div>
    </div>
    <mescroll-vue ref="mescroll" class="mescroll" :style="{paddingTop: statusH + 'rem'}" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div id="empty">
        <div class="CoreListBoxd">
          <div class="cpmpoundListBox" v-for="(items,index) in dataList" :key="index">
            <div class="cpmpoundListCorBox">
              <div class="cpmpoundListCore" v-for="(item,index) in items" :key="index">
                <img src="./../../assets/my/compound1.png" alt="">
                <div class="core1" v-if="item.dragon_status == 1">收益中</div>
                <div class="core1" v-if="item.dragon_status == 1">当前收益:￥{{item.dragon_balance}}</div>
                <div class="core2" v-if="item.dragon_status == 0">已出局</div>
                <div class="core3" v-if="item.dragon_status == 0" @click="compound(item.id)">再次合成</div>
              </div>
            </div>
            <div class="listCoreBTN"></div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <div class="compoundBott">
      <div class="compoundBott1"><div @click="compound()">合成</div></div>
      <div class="compoundBott2"><div></div></div>
    </div>
  </div>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  components: {
    MescrollVue
  },
  data () {
    return {
      configInfo: '',
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
          warpId:	"empty",
          icon: "./static/none.png",
          tip: "暂无相关数据~"
        },
      },
      dataList: []
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

  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.$http.post("/amoy/dragon/my-dragon", {page: page.num}, true, true).then(res => {
        if (res.code === 0) {
          let arr = res.data === '' ? [] : res.data
          if (page.num === 1) this.dataList = []
          this.dataList = this.dataList.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(this.dataList.length)
          })
        }
      }).catch(e => {
        mescroll.endErr()
      })
    },
    // 合成
    compound (id) {
      this.$http.post('/amoy/dragon/exchange-dragon', {did: id}, true, true).then(res => {
        if (res.code === 0) {
          console.log(res.msg)
        }
      })
    },
    getConfig () {
      this.$http.post('/amoy/dragon/dragon-config', {}, true, true).then(res => {
        this.configInfo = res.data
      })
    }
  },
  mounted () {
    this.getConfig()
  }
}
</script>
<style lang="less" scoped>
#myBody{
  width: 100%;
  height: 100vh;
  background: #192231;
  .mescroll{
    position: fixed;
    top: 1.8rem;
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
    .topPicBox{
      margin-top: .88rem;
      height: .92rem;
      line-height: .92rem;
      text-align: center;
      font-size: .24rem;
      font-weight:500;
      color:rgba(110,231,234,1)
    }
  }
  .CoreListBoxd{
    margin-bottom: 2.6rem;
    .cpmpoundListBox{
      padding: 0 .2rem;
      .cpmpoundListCorBox{
        display: flex;
        justify-content: space-around;
        .cpmpoundListCore{
          height: 2.9rem;
          min-width: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          >img{
            width: 1.4rem;
            height: 1.4rem;
          }
          >.core1{
            font-size: .24rem;
            font-weight:500;
            color:rgba(110,231,234,1);
          }
          >.core2{
            font-size: .24rem;
            font-weight:500;
            color: #dddddd;
          }
          >.core3{
            width: 1.2rem;
            height: .36rem;
            border:1px solid rgba(110,231,234,1);
            border-radius: .18rem;
            line-height: .36rem;
            text-align: center;
            color:rgba(110,231,234,1);
            font-size: .2rem;
          }
        }
      }
      .listCoreBTN{
        width: 100%;
        height: .04rem;
        background:linear-gradient(90deg,rgba(25,34,49,1) 1%,rgba(51,108,125,1) 53%,rgba(25,34,49,1) 100%);
      }
    }
  }
  .compoundBott{
    position: fixed;
    bottom: 0;
    z-index: 99999;
    width: 100%;
    background: #192231;
    .compoundBott1{
      display: flex;
      justify-content: center;
      >div{
        width: 2.54rem;
        height: .81rem;
        background: url(./../../assets/my/compound2.png) 0 0 no-repeat;
        background-size: 2.54rem .81rem;
        font-size: .28rem;
        font-weight:bold;
        color:rgba(110,231,234,1);
        line-height: .81rem;
        text-align: center;
      }
    }
    .compoundBott2{
      display: flex;
      justify-content: center;
      >div{
        width: 6rem;
        height: 1.7rem;
        background: url(./../../assets/my/compound3.png) 0 0 no-repeat;
        background-size: 6rem 1.7rem;
      }
    }
  }
}
</style>
