<template>
  <div id="ranking">
    <div class="bg" :style="{paddingTop:0.88+$store.state.global.statusH+'rem'}">
      <div class="headerBox" :style="{paddingTop:$store.state.global.statusH+'rem'}">
        <i @click="goBack" class="iconfont icon-back"></i>
        <h1>排行榜</h1>
      </div>
    </div>
        <div class="content">
            <van-tabs
                @click="fnClick"
                v-model="activeName"
                title-active-color="#fff"
                title-inactive-color="#fff"
                color="#fff"
                background="#28272F"
                :border="false"
            >
                <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" :name="item.name">

                </van-tab>
            </van-tabs>
             <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                <ul class="uu"  id="empty">
                    <li v-for="(item,index) in dataList" :key="index">
                      <div class="img">
                          <img v-if="index==0" src="../../assets/img/my/seggghff.png" alt />
                          <img v-else-if="index==1" src="../../assets/img/my/egddteews1.png" alt />
                          <img v-else-if="index==2" src="../../assets/img/my/lsues.png" alt />
                          <span v-else style="color:#D6A75E">{{String(++index).padStart(2,0)}}</span>
                      </div>
                      <div class="person">
                          <div class="photo">
                          <img :src="item.avatar" alt />
                          </div>
                          <div class="rghs">
                            <span class="van-ellipsis">{{item.nickname.substr(0, 3) + '****' + item.nickname.substr(7)}}</span>
                            <!-- <span>ID：123456</span> -->
                          </div>
                      </div>
                      <aside v-if="activeName == 1">{{item.sum}}</aside>
                      <aside v-else-if="activeName == 2">推广{{item.sum}}人</aside>
                      <aside v-else>¥{{item.sum}}</aside>
                    </li>
                </ul>
            </mescroll-vue>
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
      activeName: "1",
      tabList: [
        { title: "威望值", name: "1" },
        { title: "拉新", name: "2" },
        { title: "收益", name: "3" },
        { title: "广告收益", name: "4" }
      ],
      dataList: [], // 列表数据
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.downCallback
      },
      mescrollUp: { // 上拉加载的配置.
        auto: true,
        callback: this.upCallback, // 上拉回调,此处简写; 相当于
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 6 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '努力加载中...',
        noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        empty: {
        //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: 'empty', //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/none.png",  //图标,,支持网络图
          tip: "暂无相关数据~" //提示
        }
	   },
    };
  },
  created () {

  },
  methods: {
    fnClick (name) {
      this.activeName = name
      this.dataList = []
      this.downCallback()
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    downCallback () {
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    upCallback (page, mescroll) {
      this.$http.post('/amoy/poundage/rank-list', {type: this.activeName, page: page.num}, true, true).then(response => {
        if (response.code === 0) {
          let arr = response.data
          if (page.num === 1) this.dataList = []
          this.dataList = this.dataList.concat(arr)
          console.log('mescroll', mescroll.endSuccess)
          this.$nextTick(() => {
            mescroll.endSuccess(this.dataList.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch(e => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    }
  }
}
</script>
<style scoped>
  /*通过fixed固定mescroll的高度*/
#app .mescroll {
    position: fixed;
    top: 2.58rem;
    bottom: 0;
    height: auto;


  }
</style>
<style lang="less" scoped>
 #ranking .headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(40, 39, 47, 1);
  box-sizing: content-box;
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
</style>
<style lang="less">
#ranking {
  min-height: 100vh;
  background: rgba(247, 244, 248, 1);
  .van-tabs__line {
    bottom: 0.16rem;
    width: 0.6rem !important;
    height: 0.08rem;
    background: rgb(255, 255, 255);
    border-radius: 0.06rem 0.06rem 0rem 0rem;
  }

  * {
    box-sizing: border-box;
  }
  .bg {
    height: 2.58rem;
    background: rgba(40, 39, 47, 1);
  }
  .content {
    margin-top: -0.88rem;
    .van-tab {
      font-weight: 400;
      font-size: 0.3rem;
    }
    .van-tab--active {
      .van-tab__text{
         font-weight: 500;
        font-size: 0.34rem;
      }

    }
  }
  .uu {
    width: 7rem;
    margin: 0 auto;
    font-size: 0.3rem;
    padding-bottom: 0.72rem;
    li {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 0.3rem;
      border-radius: 0.1rem;
      height: 1.4rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0.04rem 0.04rem 0.2rem 0rem rgba(210, 210, 210, 0.39);
      padding: 0.26rem 0.3rem;
      justify-content: space-between;
      aside {
        padding-left: .1rem;

        font-size: 0.3rem;

        font-weight: 500;
        color: rgba(214, 167, 94, 1);
      }
      .img {
        width: 0.54rem;
        height: 0.44rem;
        img {
          width: 100%;
        }
      }
      .person {
        display: flex;
        flex: 1;
        .rghs {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span{
            display: block;
            width: 100%;
            max-width: 2.5rem;
          }
        }
        .photo {
          color: #333;
          margin-left: 0.3rem;
          margin-right: 0.16rem;
          margin-top: 0.04rem;
          height: 0.88rem;
          width: 0.88rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
