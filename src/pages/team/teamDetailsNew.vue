<template>
  <div id="teamDetails">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>团队详情</h1>
    </div>
    <mescroll-vue ref="mescroll" class="mescroll" :style="{paddingTop: statusH + 'rem'}" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div>
        <div class="DetailsBox">
          <div class="DetailsTopBox">
            <div class="TopBox1">
              <div class="topTitle1">团队总人数</div>
              <div class="topTitle2 topTitle">14</div>
              <div class="topTitle1">团队有效人数</div>
              <div class="topTitle2">14</div>
            </div>
            <div class="TopBox2">
              <div class="topRigBox1">昨日团队收益</div>
              <div class="topRigBox2">657.09672tcb</div>
              <div class="topRigBox3 topRigBox">≈￥2787</div>
              <div class="topRigBox1">今日团队收益</div>
              <div class="topRigBox2">657.09672tcb</div>
              <div class="topRigBox3">≈￥2787</div>
            </div>
          </div>
          <!-- 进度 -->
          <div class="progressBar">
            <van-progress :percentage="30" stroke-width=".12rem" :show-pivot="false" color="#FEC974" track-color="#666666" />
            <div class="progressBarCore">
              <div>
                <img class="barPic1" src="./../../assets/my/dengji1.png" alt="">
                <span>1星达人</span>
                <img class="barPic2" src="./../../assets/my/left2.png" alt="">
              </div>
              <div>2星达人</div>
            </div>
          </div>
          <!--  -->
          <div class="detailsCore1">
            <div class="detailsCore1Co">
              <div>有效直推</div>
              <div>2</div>
            </div>
            <div class="detailsCore2Co"></div>
            <div class="detailsCore1Co">
              <div>有效直推</div>
              <div>2</div>
            </div>
            <div class="detailsCore2Co"></div>
            <div class="detailsCore1Co">
              <div>有效直推</div>
              <div>2</div>
            </div>
          </div>
          <!-- 昨日全球手续费分红 -->
          <div class="shouxuTitle">
            <img src="./../../assets/my/fenhong.png" alt="">
            <span>昨日全球手续费分红</span>
          </div>
          <!--  -->
          <div class="darenBox">
            <div class="darenBoxCore" v-for="(item,index) in 4" :key="index">
              <div>
                <div></div>
                <div>5星达人</div>
              </div>
              <div>325.48973tcb/人</div>
            </div>
          </div>
          <!--  -->
        </div>
        <!-- tab -->
        <div class="DetailsTab">
          <van-tabs v-model="active" @click="tabTop" color="rgba(226,186,127,1)" line-width=".5rem" line-height=".08rem">
            <van-tab name="0" title="有效直推"></van-tab>
            <van-tab name="1" title="未实名"></van-tab>
          </van-tabs>
        </div>
        <div class="DetailsTab2">
          <div class="tabCoreBox" @click="tabCut(index)" v-for="(item,index) in tabList" :key="index">
            <div class="tabCoreTop" v-if="index!=4">
              <div class="topTitle">{{item.tit}}</div>
              <div>
                <img class="topPic" v-if="tab2Index == index && tabShow" src="./../../assets/my/dTab2.png" alt="">
                <img class="topPic" v-else-if="tab2Index == index && !tabShow" src="./../../assets/my/dTab3.png" alt="">
                <img class="topPic" v-else src="./../../assets/my/dTab1.png" alt="">
              </div>
            </div>
            <div class="tabCoreTop" v-if="index==4">
              <img src="./../../assets/my/chera.png" alt="">
            </div>
            <div class="tabCoreBtn" v-if="index!=4 && tab2Index == index "></div>
          </div>
        </div>
        <!-- list -->
        <div id="dxd">
          <div class="ListBoxCore">
            <div class="ListBox" v-for="(item,index) in dataList" :key="index">
              <div class="listCo1">
                <div>45112131213</div>
                <div></div>
                <div>1星达人</div>
              </div>
              <div class="listCo2"><span>团队有效人数</span><span>3</span></div>
              <div class="listCo2"><span>团队总收益</span><span>12tcb</span></div>
              <div class="listCo2"><span>直推人数&nbsp;&nbsp;></span><span>3</span></div>
              <div class="listCo3"><span>今日任务未完成</span><span>联系他</span></div>
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
      active: 1,
      tab2Index: 0,
      tabShow: true,
      tabList:[{tit:'团队人数',index:0},{tit:'直推人数',index:1},{tit:'达人',index:2},{tit:'收益',index:3},{tit:'',index:4}],
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
    tabCut(index) {
      if (index!=4) {
        this.tab2Index = index
        this.tabShow = !this.tabShow
        console.log(this.tab2Index,this.tabShow)
      } else {
        console.log("搜索")
      }
    },
    tabTop (val,title) {
      console.log(val,title)
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.$http.post("/amoy/home/goods-list",
        {
          page: page.num, 
          type: '1',
        },true,true).then(response => {
        if (response.code === 0) {
          let arr = response.data;
          if (page.num === 1) this.dataList = [];
          this.dataList = this.dataList.concat(arr.goodsList);
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
<style lang="less">
  .van-tabs--line{
    .van-tabs__wrap{
      height: 1rem;
    }
    .van-tab.van-tab--active{
      color: #B97C1F;
    }
     .van-tab{
      color: #666666;
    }
    .van-tab__text.van-tab__text--ellipsis{
      font-size: .28rem;
      font-weight:bold;
    }
  }
</style>
<style lang="less" scoped>
#teamDetails{
  width: 100%;
  height: 100vh;
  background: #ffffff;
  .mescroll{
    position: fixed;
    top: .88rem;
    bottom: 0;
    height: auto; 
  }
  .headerBox {
    width: 100%;
    height: 0.88rem;
    position: fixed;
    top: 0;
    z-index: 10000;
    background:linear-gradient(-90deg,rgba(35,32,39,1) 0%,rgba(55,53,64,1) 100%);
    h1 {
      font-size: 0.34rem;
      color: #ffffff;
      text-align: center;
      line-height: 0.88rem;
      font-weight: normal;
    }
    .iconfont {
      width: 0.2rem;
      height: 0.88rem;
      line-height: 0.35rem;
      color: #ffffff;
      line-height: 0.88rem;
      font-size: 0.35rem;
      position: absolute;
      left: 0.3rem;
    }
  }
  .DetailsBox{
    // margin-top: .88rem;
    padding: 0 .32rem;
    overflow: hidden;
    .DetailsTopBox{
      display: flex;
      justify-content: space-between;
      margin: .32rem 0 .54rem 0;
      .TopBox1{
        width: 3.26rem;
        height: 2.88rem;
        background: url(./../../assets/my/teambg1.png) 0 0 no-repeat;
        background-size: 3.26rem 2.88rem;
        >div{
          padding-left: .22rem;
        }
        .topTitle1{
          font-size: .26rem;
          font-weight:500;
          color:rgba(192,145,78,1);
          margin-top: .15rem;
        }
        .topTitle2{
          font-size: .32rem;
          font-weight:800;
          color:rgba(60,60,61,1);
        }
        .topTitle{
          margin-bottom: .45rem;
        }
      }
      .TopBox2{
        width: 3.26rem;
        height: 2.88rem;
        background: url(./../../assets/my/teambg2.png) 0 0 no-repeat;
        background-size: 3.26rem 2.88rem;
        >div{
          padding-left: .22rem;
        }
        .topRigBox1{
          font-size: .26rem;
          font-weight:500;
          color:rgba(168,168,168,1);
          margin-top: .15rem;
        }
        .topRigBox2{
          font-size: .32rem;
          font-weight:800;
          color:rgba(216,173,108,1);
        }
        .topRigBox3{
          font-size: .2rem;
          font-weight:500;
          color:rgba(216,173,108,1);
        }
      }
    }
    .progressBar{
      .progressBarCore{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .88rem;
        >div:nth-child(1){
          display: flex;
          align-items: center;
          .barPic1{
            width: .4rem;
            height: .4rem;
          }
          >span{
            font-size: .28rem;
            font-weight:500;
            color:rgba(185,124,31,1);
            margin: 0 .2rem;
          }
          .barPic2{
            width: .1rem;
            height: auto;
          }
        }
        >div:nth-child(2){
          font-size: .24rem;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
      }
    }
    .detailsCore1{
      height: 1.4rem;
      background:rgba(64,63,67,1);
      border-radius: .14rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .2rem;
      .detailsCore1Co{
        width: 32.6%;
        height: .8rem;
        font-size: .26rem;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
      }
      .detailsCore2Co{
        width: 1%;
        height: .8rem;
        background:linear-gradient(0deg,rgba(102,102,102,0) 0%,rgba(102,102,102,0.99) 49%,rgba(102,102,102,0) 100%);
        border-right: 0.5%;
      }
    }
    .shouxuTitle{
      height: 1.2rem;
      display: flex;
      align-items: center;
      >img{
        width: .22rem;
        height: auto;
      }
      >span{
        font-size: .26rem;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-left: .2rem;
      }
    }
    .darenBox{
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #E8E8E8;
      .darenBoxCore{
        width: 50%;
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: .4rem;
        >div:nth-child(1){
          display: flex;
          align-items: center;
          >div:nth-child(1){
            width: .36rem;
            height: .36rem;
            background:rgba(185,124,31,1);
          }
          >div:nth-child(2){
            font-size: .26rem;
            font-weight:500;
            color:rgba(102,102,102,1);
            margin-left: .18rem;
          }
        }
        >div:nth-child(2){
          font-size: .3rem;
          font-weight:500;
          color:rgba(185,124,31,1);
        }
      }
    }
    // 
  }
  .DetailsTab{
    height: 1rem;
    border-bottom: 1px solid #E8E8E8;
  }
  .DetailsTab2{
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
    .tabCoreBox{
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tabCoreTop{
        display: flex;
        align-items: center;
        margin: .4rem  0 .1rem 0;
        .topTitle{
          font-size: .24rem;
          font-weight:500;
          color:rgba(167,168,167,1);
          margin-right: .1rem;
        }
        .topPic{
          width: .15rem;
        }
        >img{
          width: .31rem;
          height: .31rem;
        }
      }
      .tabCoreBtn{
        width: .5rem;
        height: .08rem;
        background:linear-gradient(-90deg,rgba(226,186,127,1) 0%,rgba(240,214,160,1) 100%);
        border-radius: .04rem;
      }
    }
  }
  .ListBoxCore{
    padding: 0 .3rem;
    margin-bottom: .8rem;
    .ListBox{
      height: 3.2rem;
      background:rgba(64,63,67,1);
      border-radius: .14rem;
      margin-bottom: .2rem;
      padding: 0 .3rem;
      .listCo1{
        display: flex;
        align-items: center;
        height: .94rem;
        >div:nth-child(1){
          font-size: .28rem;
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
        >div:nth-child(2){
          width: .26rem;
          height: .26rem;
          background:rgba(112,112,112,1);
          margin: 0 .1rem 0 .2rem;
        }
        >div:nth-child(3){
          font-size: .24rem;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
      }
      .listCo2{
        display: flex;
        justify-content: space-between;
        margin-bottom: .1rem;
        >span:nth-child(1){
          font-size: .26rem;
          font-weight:500;
          color:rgba(167,168,167,1);
        }
        >span:nth-child(2){
          font-size: .26rem;
          font-weight:bold;
          color:rgba(216,173,108,1);
        }
      }
      .listCo3{
        display: flex;
        justify-content: space-between;
        >span:nth-child(1){
          font-size: .28rem;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
        >span:nth-child(2){
          width: 1.2rem;
          height: .4rem;
          background:linear-gradient(-30deg,rgba(227,185,125,1) 0%,rgba(240,214,160,1) 100%);
          border-radius: .2rem;
          line-height: .4rem;
          text-align: center;
          font-size: .24rem;
          font-weight:bold;
          color:rgba(60,60,61,1);
         }
      }
    }
  }
}
</style>