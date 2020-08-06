<template>
  <div id="newTrade">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <div>
        <span @click="fn(1)" :class="tabIndex==1?'active':''">TG交易</span>
        <span @click="fn(2)" :class="tabIndex==2?'active':''">GST交易</span>
      </div>
    </div>
    <div class="content" :style="{marginTop: 1.5+statusH + 'rem'}">
      <transition>
        <mescroll-vue
          ref="mescroll"
          :style="{top: statusH + 1.6+'rem'}"
          :down="mescrollDown"
          :up="mescrollUp"
          @init="mescrollInit"
          v-if="tabIndex==1"
        >
          <div class="tradView">
            <div class="topBox">
              <div class="dealInfo">
                <div>
                  <p>买量</p>
                  <p>{{config.num}}</p>
                </div>
                <div>
                  <p>成交(昨/今)</p>
                  <p>{{config.deal_yesterday_num+'/'+config.deal_today_num}}</p>
                </div>
              </div>
             
            </div>
            <div class="searchBox">
              <div class="topBox">
                <i class="searchIcon"></i>
                <input type="text" placeholder="输入您想要搜索的手机号" v-model="searchTxt" />
                <span @click="search">搜索</span>
              </div>
              <div class="sortBox">
                <div class="sort" @click="rank(1)">
                  <span :class="classifySort==1||classifySort==4?'activeSpan':''">时间</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 4" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 1" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
                <div class="sort" @click="rank(2)">
                  <span :class="classifySort==2||classifySort==5?'activeSpan':''">单价</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 5" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 2" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
                <div class="sort" @click="rank(3)">
                  <span :class="classifySort==3||classifySort==6?'activeSpan':''">数量</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 6" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 3" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
              </div>
            </div>
            <div class="listBox">
              <div class="listInfo" v-for="(item, index) in dataList" :key="index">
                <div class="leftBox" v-if="item.is_businessman==0"></div>
                <div class="leftBoxuu  leftBox" v-else>市</div>
                <div class="rightBox">
                  <div class="title" v-if="item.is_businessman==0">{{item.mobile}}</div>
                  <div class="title" v-else>{{item.nickname}}</div>
                  <div class="midBox">
                    <p>
                      价格:
                      <span>{{item.unit_price}}CNY</span>
                    </p>
                    <p>
                      数量:
                      <span>{{(item.coin_num*1).toFixed(2)}}</span>
                    </p>
                    <span @click="jumpTo('sell?id='+item.trade_no+'&type='+tabIndex)">出售</span>
                  </div>
                  <div class="botBox">最近7日内成交{{item.sum}}笔</div>
                </div>
              </div>
            </div>
            <div class="floatBtn3   "  v-if="dataList.length>=50">
                求购单只展示50单
            </div>
            <div
              class="floatBtn2"
              @click="jumpTo('buyTG?type='+tabIndex)"
            >购买TG</div>
          </div>
        </mescroll-vue>
      </transition>
      <transition>
        <mescroll-vue
          ref="mescroll"
          :style="{top: statusH + 1.6+'rem'}"
          :down="mescrollDown"
          :up="mescrollUp"
          @init="mescrollInit"
          v-if="tabIndex==2"
        >
          <div class="tradView">
            <div class="topBox">
             <div class="topBox">
              <div class="dealInfo">
                <div>
                  <p>买量</p>
                  <p>{{config.num}}</p>
                </div>
                <div>
                  <p>成交(昨/今)</p>
                   <p>{{config.deal_yesterday_num+'/'+config.deal_today_num}}</p>
                </div>
              </div>
             
            </div>
              <!-- <div class="tabBox">
            
                <span class="active" >TG/GST</span>
              </div> -->
            </div>
            <div class="searchBox">
              <div class="topBox">
                <i class="searchIcon"></i>
                <input type="text" placeholder="输入您想要搜索的手机号" v-model="searchTxt" />
                <span @click="search">搜索</span>
              </div>
              <div class="sortBox">
                <div class="sort" @click="rank(1)">
                  <span :class="classifySort==1||classifySort==4?'activeSpan':''">时间</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 4" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 1" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
                <div class="sort" @click="rank(2)">
                  <span :class="classifySort==2||classifySort==5?'activeSpan':''">单价</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 5" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 2" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
                <div class="sort" @click="rank(3)">
                  <span :class="classifySort==3||classifySort==6?'activeSpan':''">数量</span>
                  <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 6" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 3" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />
                </div>
              </div>
            </div>
            <div class="listBox">
              <div class="listInfo" v-for="(item, index) in dataList" :key="index">
              <div class="leftBox" v-if="item.is_businessman==0"></div>
                <div class="leftBoxuu  leftBox" v-else>市</div>

                <div class="rightBox">
                  <div class="title" v-if="item.is_businessman==0">{{item.mobile}}</div>
                  <div class="title" v-else>{{item.nickname}}</div>
                  <div class="midBox">
                    <p>
                      价格:
                      <span>{{item.unit_price}}{{tabIndex2==1?'USDT':'TG'}}</span>
                    </p>
                    <p>
                      数量:
                      <span>{{(item.coin_num*1).toFixed(2)}}</span>
                    </p>
                    <span @click="jumpTo('sell?id='+item.trade_no+'&type='+tabIndex)">出售</span>
                  </div>
                  <div class="botBox">最近7日内成交{{item.sum}}笔</div>
                </div>
              </div>
            </div>
            <div class="floatBtn3   "  v-if="bool">
                求购单只展示50单
            </div>
            <div
              class="floatBtn2"
              @click="jumpTo('buyTG?type='+tabIndex)"
            >购买GST</div>
          </div>
        </mescroll-vue>
      </transition>
    </div>
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
      statusH: 0,
      tabIndex: 1,
      tabIndex2: 2,
      mescroll: null,
      mescrollDown: {},
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
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>'
      },
      dataList: [], // 列表数据
      searchTxt: "",
      classifySort: 2,
      config: [],
      bool:false
    };
  },
  created() {
    if (window.api) {
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
      api.setStatusBarStyle({
        style: "dark"
      });
    }
    this.$nextTick(()=>this.mescroll.triggerDownScroll())
    this.getConfig();
  },
  watch: {
    classifySort(e) {
      this.mescroll.triggerDownScroll();
    },
    tabIndex2(e) {
      this.mescroll.triggerDownScroll();
      if (this.tabIndex == 1) {
        this.getConfig();
      }
    }
  },
  methods: {
    fn(i){
      this.tabIndex=i
      this.bool=false
      this.getConfig()
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      if (this.tabIndex == 1) {
        let order_type = 1; //时间数量排序
        let order_sort = 1; //升序降序
        if (this.classifySort % 3 == 1) {
          order_type = 1;
          if (this.classifySort == 1) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        } else if (this.classifySort % 3 == 2) {
          order_type = 2;
          if (this.classifySort == 2) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        } else if (this.classifySort % 3 == 0) {
          order_type = 3;
          if (this.classifySort == 3) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        }
        let p = {};
        if (this.searchTxt) {
          p = {
            page: page.num, // 页码
            order_type,
            order_sort,
            mobile: this.searchTxt,
          //  type: this.tabIndex 
          };
        } else {
          p = {
            page: page.num, // 页码
            order_type,
            order_sort,
           // type: this.tabIndex
          };
        }
        this.$http.post("/amoy/trade/tg-order-list", p, true, true)
          .then(response => {
            if (response.code === 0) {
              // 请求的列表数据
              this.sum = response.data.sum;
              let arr = response.data.list;
              // 如果是第一页需手动置空列表
              if (page.num === 1) this.dataList = [];
              // 把请求到的数据添加到列表
              this.dataList = this.dataList.concat(arr);
              if(arr.length==0&& this.dataList.length>=50){
                this.bool=true
              }else{
                this.bool=false
              }
              // 数据渲染成功后,隐藏下拉刷新的状态
              this.$nextTick(() => {
                mescroll.endSuccess(this.dataList.length);
              });
            }
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
          });
      } else if (this.tabIndex == 2) {
        let order_type = 1; //时间数量排序
        let order_sort = 1; //升序降序
        if (this.classifySort % 3 == 1) {
          order_type = 1;
          if (this.classifySort == 1) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        } else if (this.classifySort % 3 == 2) {
          order_type = 2;
          if (this.classifySort == 2) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        } else if (this.classifySort % 3 == 0) {
          order_type = 3;
          if (this.classifySort == 3) {
            order_sort = 2;
          } else {
            order_sort = 1;
          }
        }
        let p = {};
        if (this.searchTxt) {
          p = {
            page: page.num, // 页码
            order_type,
            order_sort,
            mobile: this.searchTxt,
            type: this.tabIndex
          };
        } else {
          p = {
            page: page.num, // 页码
            order_type,
            order_sort,
            type: this.tabIndex
          };
        }
        this.$http
          .post("/amoy/trade/seek-order-lists", p, true, true)
          .then(response => {
            if (response.code === 0) {
              // 请求的列表数据
              this.sum = response.data.sum;
              let arr = response.data.list;
              // 如果是第一页需手动置空列表
              if (page.num === 1) this.dataList = [];
              // 把请求到的数据添加到列表
              this.dataList = this.dataList.concat(arr);
              // 数据渲染成功后,隐藏下拉刷新的状态
              this.$nextTick(() => {
                mescroll.endSuccess(this.dataList.length);
              });
            }
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
          });
      }
    },
    rank(sort) {
      if (sort == 1) {
        if (this.classifySort === 1) {
          this.classifySort = 4;
        } else {
          this.classifySort = 1;
        }
      } else if (sort == 2) {
        if (this.classifySort === 2) {
          this.classifySort = 5;
        } else {
          this.classifySort = 2;
        }
      } else if (sort == 3) {
        if (this.classifySort === 3) {
          this.classifySort = 6;
        } else {
          this.classifySort = 3;
        }
      }
    },
    search() {
     
      this.mescroll.triggerDownScroll();
    },
    getConfig() {
      this.$http
        .post("/amoy/trade/new-statistics", { type: this.tabIndex }, true, true)
        .then(res => {
          if (res.code == 0) {
            this.config = res.data;
          }
        });
    }
  }
};
</script>
<style lang="less">
.headerBox {
  width: 100%;
  height: 1.5rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  color: #fff;
  > div {
    width: 4.6rem;
    height: 0.72rem;
    border: 1px solid #aaa;
    border-radius: 0.1rem;
    margin: 0.4rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 2.3rem;
      height: 100%;
      line-height: 0.72rem;
      text-align: center;
      font-size: 0.3rem;
      color: #acacac;
    }
    span:first-of-type {
      border-right: 1px solid #aaa;
    }
    .active {
      background: linear-gradient(#e3b97d, #f0d6a0);
      color: #3c3c3d;
    }
  }
}

.mescroll {
  position: fixed;
  bottom: 0;
  height: auto;
}
.tradView {
  position: relative;
  .scrollBox {
    height: 0.6rem;
    background: #dfdfdf;
    /deep/.vux-marquee {
      width: 100%;
      height: 0.6rem !important;
      color: #111;
      .vux-marquee-box li {
        height: 0.6rem;
        width: 100%;
        text-align: center;
        line-height: 0.6rem;
      }
    }
  }
  .searchBox {
    height: 1.84rem;
    background: #fff;
    overflow: hidden;
    .topBox {
      margin-top: 0.3rem;
      display: flex;
      height: 0.7rem;
      align-items: center;
      justify-content: space-around;
      position: relative;
      input {
        width: 5.24rem;
        padding-left: 0.8rem;
        height: 0.66rem;
        background: #f0f0f0;
        border-radius: 0.1rem;
        border: none;
      }
      span {
        font-size: 0.32rem;
        color: #333;
      }
      .searchIcon {
        position: absolute;
        width: 0.26rem;
        height: 0.26rem;
        background: url("./img/search.png") no-repeat;
        background-size: 100% 100%;
        left: 0.5rem;
      }
    }
  }
  .sortBox {
    z-index: 1000;
    display: flex;
    height: 0.6rem;
    margin-top: 0.2rem;
    .sort {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
      span {
        font-size: 0.28rem;
        color: #a7a8a7;
        margin-right: 0.1rem;
      }
      .activeSpan {
        color: #d8ad6c;
      }
      img {
        width: 0.18rem;
      }
    }
    .sort:last-of-type {
      border: none;
    }
    .changeStyle {
      flex: 1;
      img {
        width: 0.36rem;
      }
    }
    .multiple {
      position: absolute;
      // bottom: -2.64rem;
      top: 0.9rem;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 1001;
      div {
        font-size: 0.28rem;
        height: 0.88rem;
        line-height: 0.88rem;
        padding-left: 0.3rem;
      }
      .select {
        color: #ff2556;
      }
    }
  }
  .listBox {
    padding-bottom: 1.5rem;
    .listInfo {
      width: 7rem;
      height: 1.65rem;
      padding-top: 0.3rem;
      background: #fff;
      border-radius: 0.15rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-around;
      .leftBox {
        width: 0.86rem;
        height: 0.86rem;
        background: url("./img/t.png") no-repeat;
        background-size: 100% 100%;
      }
      .leftBoxuu{
        background: #d6a75e;
        width: 0.66rem;
        height: 0.56rem;
        color: #fff;
        font-size: 0.34rem;
        text-align: center;
      }
      .rightBox {
        width: 5.8rem;
        .title {
          font-size: 0.3rem;
          height: 0.5rem;
          line-height: 0.5rem;
        }
        .midBox {
          display: flex;
          height: 0.55rem;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 0.26rem;
            color: #666666;
            span {
              color: #d6a75e;
            }
          }
          > span {
            width: 1.2rem;
            height: 0.52rem;
            border: 1px solid #d6a75e;
            border-radius: 0.1rem;
            color: #d6a75e;
            font-size: 0.26rem;
            text-align: center;
            line-height: 0.52rem;
          }
        }
        .botBox {
          font-size: 0.26rem;
          color: #666666;
        }
      }
    }
  }
  .floatBtn2 {
    position: fixed;
    bottom: 1.5rem;
    width: 5rem;
    height: 0.88rem;
    background: #d6a75e;
    color: #fff;
    line-height: 0.88rem;
    text-align: center;
    z-index: 1000;
    border-radius: 0.1rem;
    left: 1.25rem;
    font-size: 0.3rem;
  }
   .floatBtn3 {
      position: fixed;
   
    width: 5rem;
    height: 0.88rem;
    color: #d6a75e;
   
    line-height: 0.88rem;
    text-align: center;
    z-index: 1000;
   
    left: 1.25rem;
    font-size: 0.3rem;
   
    bottom: 2.2rem;
    
  }
  .topBox {
    background: #fff;
    margin-top: 0.2rem;
    .dealInfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div {
        width: 3.5rem;
        height: 1.6rem;
        background: #e5b875;
        border-radius: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        color: #fff;
        align-items: center;
        align-content: center;
        p {
          width: 100%;
          text-align: center;
          font-size: 0.28rem;
        }
      }
    }
    .tabBox {
      display: flex;
     padding-left: 0.2rem;
      border-bottom: 1px solid #eee;
      height: 0.8rem;
      align-items: center;
      font-size: 0.3rem;
      color: #666666;
      .active {
        color: #333;
        font-weight: 700;
      
      }
    }
  }
}
</style> 