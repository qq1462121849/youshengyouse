<template>
  <div id="myBody">
    <div class="myTopBOX" id='myTopBOX'>
      <div class="headerBox" ref="header" :style="{paddingTop: statusH + 'rem'}">
        <i @click="dsBridge.call('closeWin')" class="iconfont icon-back xps1"></i>
        <span class="span1 xps2">矿卡</span>
        <span class="span2 xps3">矿卡超市</span>
      </div>
      <div></div>
    </div>
    <mescroll-vue ref="mescroll" class="mescroll" :style="{paddingTop: statusH + 'rem'}" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div id="dxd">

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
      mescroll: null, 
      mescrollDown: {}, 
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0, 
          size: 10 
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
  .mescroll{
    position: fixed;
    top: 4.5rem;
    bottom: 0;
    height: auto; 
  }
  .myTopBOX{
    height: 4.5rem;
    background:linear-gradient(-90deg,rgba(35,32,39,1) 0%,rgba(55,53,64,1) 100%);
    .headerBox {
      width: 100%;
      height: 0.88rem;
      // position: fixed;
      // top: 0;
      // z-index: 10000;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background:linear-gradient(-90deg,rgba(35,32,39,1) 0%,rgba(55,53,64,1) 100%);
      .xps1{
        width: 2rem;
      }
      .xps2{
        width: 2rem;
        text-align: center;
      }
      .xps3{
        width: 2rem;
        text-align: right;
      }
      >.iconfont{
        margin-left: .3rem;
      }
      >.span1{
        font-size:.26rem;
        font-weight:500;
      }
      >.span2{
        font-size:.22rem;
        font-weight:400;
        margin-right: .3rem;
      }
    }

  }
}
</style>