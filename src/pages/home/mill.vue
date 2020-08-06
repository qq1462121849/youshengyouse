<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <!--  <i @click="goBack()" class="iconfont icon-back"></i> -->
      <h1>我的矿机</h1>
    </div>
    <div class="bg"></div>
    <!-- <div class="tabsContent">
      <div class="topInfo">
        <div class="label">
          <div class="left">昨日收益</div>
          <div class="right">
            <p>DLT30天涨幅</p>
            <span>+{{millInfo.point_rate}}%</span>
          </div>
        </div>
        <div class="price">
          <b>{{millInfo.yesterday_income}}</b>/DLT
        </div>
        <div class="label">
          <div class="left">矿机累计收益</div>
          <div class="right">
            <p>运行矿机</p>
            <span>{{millInfo.run_machine_num}}/台</span>
          </div>
        </div>
        <div class="label">
          <div class="left">
            <b>{{millInfo.all_machine_income}}</b>/DLT
          </div>
          <div class="right">
            <p>过期矿机</p>
            <span>{{millInfo.expire_machine_num}}/台</span>
          </div>
        </div>
      </div>
      <div class="tabBox">
        <div @click="active=1">
          <p :class="active==1?'activeTxt':''">矿机兑换</p>
          <i :class="active==1?'activeIcon':''"></i>
        </div>
        <div @click="active=2">
          <p :class="active==2?'activeTxt':''">我的矿机</p>
          <i :class="active==2?'activeIcon':''"></i>
        </div>
        <div @click="active=3">
          <p :class="active==3?'activeTxt':''">过期矿机</p>
          <i :class="active==3?'activeIcon':''"></i>
        </div>
      </div>
    </div>-->
    <div class="content" :style="{marginTop: statusH+6 + 'rem'}">
      <div class="millListBox">
        <mescroll-vue
          ref="mescroll"
          :style="{paddingTop: statusH + 'rem'}"
          :down="mescrollDown"
          :up="mescrollUp"
          @init="mescrollInit"
        >
          <div class="tabsContent">
            <div class="topInfo">
              <div class="bgImg"></div>
              <div class="label">
                <div class="left">昨日收益</div>
                <div class="right">
                  <p>DLT30天涨幅</p>
                  <span>{{$store.state.user.userInfo.point_rate}}%</span>
                </div>
              </div>
              <div class="price">
                <b>{{(millInfo.yesterday_income*1).toFixed(2)}}</b>/DLT
              </div>
              <div class="label">
                <div class="left">矿机累计收益</div>
                <div class="right">
                  <p>运行矿机</p>
                  <span>{{millInfo.run_machine_num}}/台</span>
                </div>
              </div>
              <div class="label">
                <div class="left">
                  <b>{{(millInfo.all_machine_income*1).toFixed(2)}}</b>/DLT
                </div>
                <div class="right">
                  <p>过期矿机</p>
                  <span>{{millInfo.expire_machine_num}}/台</span>
                </div>
              </div>
            </div>
            <div
              class="tabBox"
              :class="headerFixed?'fixedHead':''"
              :style="{top:headerFixed?statusH+0.88+'rem':'0'}"
            >
              <div @click="active=1">
                <p :class="active==1?'activeTxt':''">矿机兑换</p>
                <i :class="active==1?'activeIcon':''"></i>
              </div>
              <div @click="active=2">
                <p :class="active==2?'activeTxt':''">我的矿机</p>
                <i :class="active==2?'activeIcon':''"></i>
              </div>
              <div @click="active=3">
                <p :class="active==3?'activeTxt':''">过期矿机</p>
                <i :class="active==3?'activeIcon':''"></i>
              </div>
            </div>
          </div>
          <transition>
            <div v-show="active==1" style="background:#fff">
              <div
                class="millInfo"
                v-for="(item, index) in millData"
                v-show="item.is_show==1"
                :key="index"
              >
                <div class="topMillInfo">
                  <img v-if="item.id==1||item.id==2" src="../../assets/img/hall/mill/1.png" alt />
                  <img v-if="item.id==3" src="../../assets/img/hall/mill/2.png" alt />
                  <img v-if="item.id==4" src="../../assets/img/hall/mill/3.png" alt />
                  <img v-if="item.id==5" src="../../assets/img/hall/mill/4.png" alt />
                  <img v-if="item.id==6" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==7" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==8" src="../../assets/img/hall/mill/6.png" alt />
                  <p>{{item.title}}</p>
                  <span>
                    30天DLT收益比例
                    <b>{{item.earning_rate}}</b>
                  </span>
                </div>
                <div class="midMillInfo">
                  <div class="label">
                    <p>
                      投入所需
                      <span>{{item.exchange_coin}}</span>
                      /DLT
                    </p>
                    <p>
                      运行天数
                      <span>{{item.use_nums}}</span>
                      /天
                    </p>
                  </div>
                  <div class="label">
                    <p>
                      预计产量
                      <span>{{item.total_produce_coin}}</span>
                      /DLT
                    </p>
                    <p>
                      任务周期
                      <span>{{item.use_nums}}</span>
                      /天
                    </p>
                  </div>
                </div>
                <div class="botMillInfo">
                  <div>
                    可兑
                    <span>{{item.property_num}}/{{item.buy_nums}}</span>
                  </div>
                  <div>
                    奖励积分
                    <b>{{item.increase_points_num}}</b>
                  </div>
                  <button @click="exchange(index)" v-if="item.id==1">实名领取</button>
                  <button @click="exchange(index)" v-else>兑换</button>
                </div>
              </div>
            </div>
          </transition>
          <transition>
            <div v-show="active==2" style="background:#fff">
              <div class="millInfo" v-for="(item, index) in millData" :key="index">
                <div class="topMillInfo">
                  <img v-if="item.id==1||item.id==2" src="../../assets/img/hall/mill/1.png" alt />
                  <img v-if="item.id==3" src="../../assets/img/hall/mill/2.png" alt />
                  <img v-if="item.id==4" src="../../assets/img/hall/mill/3.png" alt />
                  <img v-if="item.id==5" src="../../assets/img/hall/mill/4.png" alt />
                  <img v-if="item.id==6" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==7" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==8" src="../../assets/img/hall/mill/6.png" alt />
                  <p>{{item.title}}</p>
                  <span style="text-align: right;color:#CEA674">正在运行</span>
                </div>
                <div class="midMillInfo">
                  <div class="label">
                    <p>
                      预计产出
                      <span>{{item.expect_money}}</span>
                      /DLT
                    </p>
                    <p>
                      剩余天数
                      <span>{{item.surplus_nums}}</span>
                      /天
                    </p>
                  </div>
                  <div class="label">
                    <p>
                      已经产出
                      <span>{{item.already_money}}</span>
                      /DLT
                    </p>
                    <p>
                      剩余周期
                      <span>{{item.surplus_nums}}</span>
                      /天
                    </p>
                  </div>
                </div>
                <div class="botMillInfo">
                  <p style="color:#656265">运行周期 {{item.time_range}}</p>
                  <span
                    v-if="item.is_finish==0"
                    style="font-weight:700;"
                    @click="jumpTo('home')"
                  >今日未完成 ></span>
                  <span v-if="item.is_finish==1" style="font-weight:700;">今日已完成</span>
                </div>
              </div>
            </div>
          </transition>
          <transition>
            <div v-show="active==3" style="background:#fff">
              <div class="millInfo" v-for="(item, index) in millData" :key="index">
                <div class="topMillInfo">
                  <img v-if="item.id==1||item.id==2" src="../../assets/img/hall/mill/1.png" alt />
                  <img v-if="item.id==3" src="../../assets/img/hall/mill/2.png" alt />
                  <img v-if="item.id==4" src="../../assets/img/hall/mill/3.png" alt />
                  <img v-if="item.id==5" src="../../assets/img/hall/mill/4.png" alt />
                  <img v-if="item.id==6" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==7" src="../../assets/img/hall/mill/5.png" alt />
                  <img v-if="item.id==8" src="../../assets/img/hall/mill/6.png" alt />
                  <p>{{item.title}}</p>
                  <span style="text-align:right">已过期{{item.created_at*1000 | formatTimer}}</span>
                </div>
                <div class="midMillInfo">
                  <div class="label">
                    <p>
                      投入所需
                      <span>{{item.exchange_coin}}</span>
                      /DLT
                    </p>
                    <p>
                      运行天数
                      <span>{{item.use_nums}}</span>
                      /天
                    </p>
                  </div>
                  <div class="label">
                    <p>
                      预计产量
                      <span>{{item.total_produce_coin}}</span>
                      /DLT
                    </p>
                    <p>
                      任务周期
                      <span>{{item.use_nums}}</span>
                      /天
                    </p>
                  </div>
                </div>
                <div class="botMillInfo">
                  <p style="color:#656265">运行周期 {{item.time_range}}</p>
                  <button @click="exchange(index)">再次兑换</button>
                </div>
                <div class="timebg"></div>
              </div>
            </div>
          </transition>
        </mescroll-vue>
      </div>
    </div>
    <transition>
      <div v-if="showExchange" class="exchange">
        <div>
          <div class="millDetail">
            <div class="title">
              <p>矿机详情</p>
              <i @click="hideExchange" class="closeIcon"></i>
            </div>
            <div class="millInfo">
              <div class="millTitle">{{showMillInfo.title}}</div>
              <div class="monthIncome">月收益{{showMillInfo.earning_rate}}起</div>
              <div class="monthIncomeDrtail">
                <p>
                  月化收益
                  <span>{{showMillInfo.earning_rate}}</span>起
                </p>
                <p>投入资金{{showMillInfo.exchange_coin*1+'-'+showMillInfo.exchange_coin*10}}DLT</p>
              </div>
            </div>
            <div class="exchangeNum">
              <div class="exchangeNumtitle">选择投入DLT数量</div>
              <div class="progress">
                <div
                  class="num"
                >{{exchangeNum*showMillInfo.exchange_coin}}DLT,{{exchangeNum*showMillInfo.increase_points_num}}积分</div>
                <van-slider
                  @change="changeValue"
                  v-model="value"
                  active-color="#deaf64"
                  :step="100/(showMillInfo.buy_nums-showMillInfo.property_num)"
                >
                  <div slot="button" class="custom-button"></div>
                </van-slider>
              </div>
              <div class="exchangeBox">
                <p>兑换矿机数(可兑换{{exchangeNum}}/{{(showMillInfo.buy_nums-showMillInfo.property_num)}})</p>
                <van-stepper
                  v-model="exchangeNum"
                  :max="showMillInfo.buy_nums-showMillInfo.property_num"
                />
              </div>
            </div>
            <div class="payPrice">
              <p>
                共需支付
                <b>{{exchangeNum*showMillInfo.exchange_coin}}</b>DLT
              </p>
              <span>余额 {{$store.state.user.userInfo.credit3}}DLT</span>
            </div>
            <div class="preIncome">
              30天预计产出
              <b>{{showMillInfo.total_produce_coin*exchangeNum}}</b> DLT
            </div>
            <div class="payBtn" @click="toCharge(showMillInfo.id)">兑换</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import axios from "axios";
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      statusH: 0,
      active: 1,
      type: "exchange",
      done: 0,
      millInfo: [],
      myMillNums: 0,
      showExchange: false,
      showMillInfo: [],
      exchangeNum: 1,
      value: 1,
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        onScroll: this.onScroll
      },
      millData: [], // 列表数据
      headerFixed: false
    };
  },
  watch: {
    active(e) {
      this.millData = [];
      if (e == 1) {
        this.type = "exchange";
        this.mescroll.triggerDownScroll();
      } else if (e == 2) {
        this.type = "property";
        this.mescroll.triggerDownScroll();
      } else if (e == 3) {
        this.type = "expire";
        this.mescroll.triggerDownScroll();
      }
    },
    exchangeNum(e) {
      this.value =
        (100 / (this.showMillInfo.buy_nums - this.showMillInfo.property_num)) *
        e;
    }
  },
  created() {
    this.$http.post("/amoy/machine/my-machine-info", true, true).then(res => {
      if (res.code == 0) {
        this.millInfo = res.data;
      }
    });
    /* this.getMilllList("exchange"); */
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    }
  },
  methods: {
    getMilllList(type) {
      this.$http
        .post(
          "/amoy/machine/machine-list",
          {
            type: this.type
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.millData = res.data;
          }
        });
    },
    exchange(index) {
      if (
        this.millData[index].id == 1 &&
        this.$store.state.user.userInfo.is_realname == 0
      ) {
        this.$vux.toast.text("请先完成实名认证!");
        this.$router.push("auth");
        return;
      }
      this.showMillInfo = this.millData[index];
      if (
        this.showMillInfo.buy_nums * 1 <=
        this.showMillInfo.property_num * 1
      ) {
        this.$vux.toast.text("当前矿机已全部兑换!");
        return;
      }
      this.showExchange = true;
      this.value =
        100 / (this.showMillInfo.buy_nums - this.showMillInfo.property_num);
    },
    hideExchange() {
      this.showExchange = false;
      this.exchangeNum = 1;
      this.value = 0;
    },
    changeValue(e) {
      let i = this.showMillInfo.buy_nums - this.showMillInfo.property_num;
      let num = parseInt((e / 100) * i);
      this.exchangeNum = num >= 1 ? num : 1;
    },
    toCharge(id) {
      this.$vux.loading.show({
        text: "兑换中..."
      });
      this.showExchange = false;
      this.$http
        .post(
          "/amoy/machine/exchange-machine",
          {
            mid: id,
            num: this.exchangeNum
          },
          true,
          true
        )
        .then(res => {
          this.$vux.loading.hide();

          this.exchangeNum = 1;
          this.value = 0;
          if (res.code == 0) {
            this.$vux.toast.text("兑换成功!");
            this.mescroll.triggerDownScroll();
          }
        });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      this.$http
        .post(
          "/amoy/machine/machine-list",
          {
            type: this.type,
            page: page.num
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            // 请求的列表数据
            let arr = response.data;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.millData = [];
            // 把请求到的数据添加到列表
            this.millData = this.millData.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(this.millData.length);
            });
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    onScroll(mescroll, y, isUp) {
      this.scrollTop = y;
      if (y > 200) {
        this.headerFixed = true;
      } else {
        this.headerFixed = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  min-height: 100%;
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
.fixedHead {
  width: 100%;
  position: fixed !important;
  top: 0.88rem;
  left: 0;
  z-index: 10000;
}
.bg {
  width: 100%;
  height: 2.2rem;
  position: fixed;
  top: 0.8rem;
  left: 0;
  background: rgba(40, 39, 47, 1);
  border-radius: 0 0 6% 6%;
}
.tabsContent {
  padding-top: 0.3rem;
  width: 100%;
  .tabBox {
    height: 1rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      p {
        width: 100%;
        text-align: center;
      }
      i {
        width: 0.5rem;
        height: 0.08rem;
      }
    }
  }
  .topInfo {
    position: relative;
    width: 6.2rem;
    padding: 0 0.35rem;
    height: 3.35rem;
    background: linear-gradient(
      270deg,
      rgba(234, 190, 123, 1) 0%,
      rgba(197, 148, 69, 1) 100%
    );
    border-radius: 0.1rem;
    padding-top: 0.3rem;
    margin: 0 auto;
    color: #fff;
    font-size: 0.26rem;
    .bgImg {
      position: absolute;
      width: 2.8rem;
      height: 2rem;
      background: url("../../assets/img/qie/3.png") no-repeat;
      background-size: 100% 100%;
      right: 0.3rem;
      bottom: 0.5rem;
    }
    .label {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 0.35rem;
      .left {
        width: 50%;
        line-height: 0.4rem;
        b {
          font-size: 0.33rem;
        }
      }
      .right {
        width: 50%;
        display: flex;
        justify-content: space-between;
      }
    }
    .price {
      b {
        font-size: 0.5rem;
      }
    }
  }

  .activeTxt {
    color: #d8ad6c;
  }
  .activeIcon {
    width: 0.5rem;
    height: 0.08rem;
    background: url("../../assets/img/hall/team/selected.png") no-repeat;
    background-size: 100% 100%;
  }
}
.content {
  padding-bottom: 0.2rem;
  overflow: hidden;
  .millListBox {
    .millInfo {
      padding: 0.35rem 0.4rem;
      height: 3.5rem;
      background: #fff;
      box-shadow: 3px 3px 20px 0px rgba(210, 210, 210, 0.39);
      margin: 0 auto;
      margin-bottom: 0.2rem;
      position: relative;
      .topMillInfo {
        z-index: 10;
        height: 0.7rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        position: relative;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.2rem;
        }
        p {
          font-size: 0.3rem;
          font-weight: 700;
          margin-left: 0.3rem;
        }
        span {
          width: 3.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 0.54rem;
          color: #6d6a6d;
          b {
            font-size: 0.35rem;
            color: #d8ad6c;
          }
        }
      }
      .midMillInfo {
        z-index: 10;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.5rem;
        position: relative;
        > .label {
          display: flex;
          justify-content: space-between;
          margin-top: 0.3rem;
          p {
            color: #615e61;
            width: 50%;
            text-align: center;
            font-size: 0.26rem;
            span {
              color: #111;
              font-weight: 700;
              margin-left: 0.1rem;
            }
          }
        }
      }
      .botMillInfo {
        position: relative;
        z-index: 10;
        height: 1.1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        > div {
          width: 1.5rem;
          height: 1.1rem;
          font-size: 0.26rem;
          color: #5c5a5d;
          display: flex;
          align-items: center;
          line-height: 1.1rem;
          span {
            color: #111;
          }
          b {
            font-size: 0.37rem;
            color: #d3a565;
          }
        }
        > div:nth-of-type(2) {
          width: 2.8rem;
        }
        button {
          width: 1.3rem;
          height: 0.4rem;
          background: linear-gradient(
            270deg,
            rgba(234, 190, 123, 1) 0%,
            rgba(197, 148, 69, 1) 100%
          );
          color: #fff;
          line-height: 0.4rem;
          font-size: 0.22rem;
        }
      }
      .timebg {
        width: 2.5rem;
        height: 2.5rem;
        background: url("../../assets/img/hall/mill/entTime.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 0.7rem;
        top: 0.6rem;
        border-radius: 50%;
        z-index: 0;
      }
    }
  }
}
.exchange {
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.8);
  position: fixed;
  top: 0;
  z-index: 10000;
  > div {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .millDetail {
    background: #fff;
    padding: 0 0.25rem;
    border-radius: 0.1rem 0.1rem 0 0;
    overflow: hidden;
    .title {
      height: 0.5rem;
      position: relative;
      margin-top: 0.45rem;
      p {
        font-size: 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
      }
      .closeIcon {
        position: absolute;
        top: 0.075rem;
        right: 0.5rem;
        width: 0.35rem;
        height: 0.35rem;
        background: url("../../assets/img/close.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .millInfo {
      width: 6.2rem;
      height: 1.2rem;
      background: #faf7fa;
      border-radius: 0.1rem;
      margin-top: 0.9rem;
      padding: 0.4rem;
      .millTitle {
        font-size: 0.3rem;
        font-weight: 700;
      }
      .monthIncome {
        text-align: right;
        font-size: 0.25rem;
        line-height: 0.25rem;
      }
      .monthIncomeDrtail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 0.26rem;
          span {
            font-size: 0.44rem;
            color: #dbad69;
          }
        }
      }
    }
    .exchangeNum {
      width: 6.2rem;
      height: 2.5rem;
      background: #faf7fa;
      padding: 0.5rem 0.4rem;
      margin-top: 0.35rem;
      .exchangeNumtitle {
        font-weight: 700;
        font-size: 0.28rem;
        line-height: 0.28rem;
      }
      .progress {
        height: 1rem;
        margin-top: 0.4rem;
        width: 100%;
        overflow: hidden;
        .num {
          text-align: center;
          font-size: 0.26rem;
        }
        /deep/.van-slider {
          width: 90%;
          margin: 0 auto;
          margin-top: 0.3rem;
          .van-slider__bar {
            height: 4px;
          }
        }
        .custom-button {
          width: 10px;
          color: #fff;
          height: 20px;
          font-size: 10px;
          line-height: 18px;
          text-align: center;
          background-color: #deaf64;
          border-radius: 0.1rem;
        }
      }
      .exchangeBox {
        display: flex;
        font-size: 0.25rem;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 0.2rem;
        /deep/.van-stepper {
          .van-stepper__minus {
            color: #111;
          }
          .van-stepper__plus {
            color: #111;
          }
          .van-stepper__input {
            font-size: 0.3rem;
            color: #111;
          }
        }
      }
    }
    .payPrice {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      p {
        font-size: 0.26rem;
        color: #111;
        b {
          font-size: 0.4rem;
          color: #dbae67;
        }
      }
      span {
        color: #858384;
        font-size: 0.24rem;
      }
    }
    .preIncome {
      width: 4rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.26rem;
      text-align: center;
      color: #111;
      background: #eee;
      float: right;
    }
    .payBtn {
      width: 100%;
      height: 0.93rem;
      background: rgba(214, 167, 94, 1);
      font-size: 0.3rem;
      color: #fff;
      line-height: 0.93rem;
      text-align: center;
      margin-top: 0.7rem;
    }
  }
}
.mescroll {
  position: fixed;
  top: 0.8rem;
  bottom: 0;
  height: auto;
  padding-bottom: 50px;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
</style>
