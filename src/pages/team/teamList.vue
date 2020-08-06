<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>{{$route.query.user}}的团队</h1>
      <span
        :style="{top: statusH + 'rem'}"
        @click="jumpTo('teamDetail?uid='+$route.query.uid)"
      >团队明细 ></span>
    </div>
    <div
      style="background:#F7F4FA;padding:0.1rem 0;position:relative;z-index:10"
      :style="{paddingTop: statusH+0.88 + 'rem'}"
    >
      <div class="tabsBox">
        <div class="tab1" @click="active=1">
          <p :class="active==1?'activeColor':''">已实名</p>
          <i :class="active==1?'selectedIcon':'defaultIcon'"></i>
        </div>
        <div class="tab2" @click="active=2">
          <p :class="active==2?'activeColor':''">未实名</p>
          <i :class="active==2?'selectedIcon':'defaultIcon'"></i>
        </div>
        <div class="tab2" @click="active=3">
          <p :class="active==3?'activeColor':''">活跃用户</p>
          <i :class="active==3?'selectedIcon':'defaultIcon'"></i>
        </div>
        <div class="tab2" @click="active=4">
          <p :class="active==4?'activeColor':''">非活跃用户</p>
          <i :class="active==4?'selectedIcon':'defaultIcon'"></i>
        </div>
      </div>
      <div v-if="active==1" class="sortBox">
        <div class="sort" @click="rank(1)">
          <span :class="classifySort==1||classifySort==4?'activeSpan':''">总贡献收益</span>
          <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 4" />
          <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 1" />
          <img src="../../assets/img/hall/team/unsort.png" alt v-else />
        </div>
        <div class="sort" @click="rank(2)">
          <span :class="classifySort==2||classifySort==5?'activeSpan':''">团队人数</span>
          <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 5" />
          <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 2" />
          <img src="../../assets/img/hall/team/unsort.png" alt v-else />
        </div>
        <div class="sort" @click="rank(3)">
          <span :class="classifySort==3||classifySort==6?'activeSpan':''">矿机数</span>
          <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 6" />
          <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 3" />
          <img src="../../assets/img/hall/team/unsort.png" alt v-else />
        </div>
      </div>
    </div>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      :style="{top:active==1?'2.8'*1+statusH+'rem':'2'*1+statusH+'rem'}"
    >
      <div class="content">
        <div class="listInfo" v-for="(item, index) in dataList" :key="index">
          <div class="username">
            <img :src="item.avatar?item.avatar:$store.state.user.userInfo.avatar" alt />
            <div class="rightBox">
              <div>
                <p>{{item.mobile}}</p>
                <span>{{'2020.02.03 16:40:40'}}</span>
              </div>
              <div @click="clip(item.mobile)">联系TA ></div>
            </div>
          </div>
          <div class="labelBox" v-show="active==1">
            <div>
              <div class="title">总贡献收益</div>
              <div class="info">
                <p>
                  <b>{{(item.team_all_income*1).toFixed(2)}}</b>DLT
                </p>
              </div>
            </div>
            <div>
              <div class="title">团队总人数</div>
              <div class="info">
                <p>
                  <b>{{item.team_effective_num}}</b>人
                </p>
              </div>
            </div>
            <div>
              <div class="title">持有矿机数</div>
              <div class="info">
                <p>
                  <b>{{item.machine_num}}</b>台
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="nextTxtTip" v-show="active==1">下级团队进度</div> -->
          <!-- <div
            class="nextProgress"
            v-show="active==1"
            @click="jumpTo('teamList?user='+item.mobile)"
          >
            <div class="left">
              <div class="showProgress"></div>
            </div>
            <div class="right">团队详情 ></div>
          </div>-->
          <div class="toAuthTip" v-show="active==2">实名认证后领取奖励，建议尽快联系实名</div>
          <div class="txtTag" v-show="active==3">
            <span>购买超级矿机为你带来收益增长</span>
            <i class="upIcon"></i>
          </div>
          <div class="txtTag" v-show="active==4">
            <span style="color:#FC0500">超级矿机已过期，及时提醒</span>
            <i class="alertIcon"></i>
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
      active: 1,
      classifySort: 1,
      statusH: 0,
      roundValue: 1,
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
      data: []
    };
  },
  watch: {
    active(index) {
      this.classifySort = 1;
      if (index == 1) {
        this.upCallback(
          this.mescrollUp.page,
          this.mescroll,
          "effective",
          "team",
          "DESC"
        );
      } else if (index == 2) {
        this.upCallback(
          this.mescrollUp.page,
          this.mescroll,
          "unEffective",
          "nothing",
          "DESC"
        );
      } else if (index == 3) {
        this.upCallback(
          this.mescrollUp.page,
          this.mescroll,
          "encourage",
          "nothing",
          "DESC"
        );
      } else if (index == 4) {
        this.upCallback(
          this.mescrollUp.page,
          this.mescroll,
          "remind",
          "nothing",
          "DESC"
        );
      }
    },
    classifySort(val) {
      var sort = val % 3;
      console.log(val, sort);
      var types =
        this.active == 1
          ? "effective"
          : this.active == 2
          ? "unEffective"
          : this.active == 3
          ? "encourage"
          : "remind";
      if (sort == 1) {
        //收益
        if (val == 1) {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "income",
            "DESC"
          );
        } else {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "income",
            "ASC"
          );
        }
      } else if (sort == 2) {
        //团队人数
        if (val == 2) {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "team",
            "DESC"
          );
        } else {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "team",
            "ASC"
          );
        }
      } else if (sort == 0) {
        //矿机
        if (val == 3) {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "machine",
            "DESC"
          );
        } else {
          this.upCallback(
            this.mescrollUp.page,
            this.mescroll,
            types,
            "machine",
            "ASC"
          );
        }
      }
    }
  },
  created() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll, type, sort, sort_type) {
      this.$http
        .post(
          "/amoy/user/direct-list ",
          {
            uid: this.$route.query.uid,
            page: page.num, // 页码
            type: type || "effective",
            sort: sort || "income",
            sort_type: sort_type || "DESC"
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            // 请求的列表数据
            let arr = response.data;
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
    clip(mobile) {
      this.copyTextShare(mobile);
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  min-height: 100%;
  background: #f7f4fa;
}
.mescroll {
  position: fixed;
  bottom: 0;
  top: 2.8rem;
  height: auto;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
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
  span {
    position: absolute;
    right: 0.2rem;
    height: 100%;
    line-height: 0.88rem;
    font-size: 0.25rem;
    top: 0;
    color: #bfbec5;
  }
}
.content {
  .listInfo {
    margin-bottom: 0.2rem;
    background: #fff;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    > div {
      width: 6.9rem;
      margin: 0 auto;
    }
    .username {
      font-size: 0.28rem;
      height: 1rem;
      line-height: 0.3rem;
      color: #ffffff;
      display: flex;
      img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        align-items: center;
      }
      .rightBox {
        width: 5.7rem;
        height: 1rem;
        margin-left: 0.25rem;
        display: flex;
        > div {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        > div:first-of-type {
          width: 4.5rem;
          p {
            width: 100%;
            color: #111;
            font-size: 0.22rem;
          }
          span {
            color: #817e81;
            font-size: 0.2rem;
          }
        }
        > div:last-of-type {
          width: 1.5rem;
          color: #222;
        }
      }
    }
    .labelBox {
      margin-top: 0.1rem;
      height: 1.9rem;
      background: linear-gradient(
        270deg,
        rgba(234, 190, 123, 1) 0%,
        rgba(197, 148, 69, 1) 100%
      );
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.1rem;
      > div {
        width: 2.3rem;
        color: #fff;
        text-align: center;
        .title {
          height: 0.36rem;
          line-height: 0.36rem;
          font-size: 0.27rem;
          border-right: 1px solid #eee;
        }
        .info {
          margin-top: 0.3rem;
          p {
            b {
              font-size: 0.34rem;
            }
          }
        }
      }
    }
    .nextTxtTip {
      margin-top: 0.4rem;
      font-size: 0.25rem;
    }
    .nextProgress {
      height: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.1rem;
      padding-bottom: 0.2rem;
      .left {
        width: 4.5rem;
        height: 0.1rem;
        background: rgba(226, 181, 112, 0.37);
        border-radius: 0.1rem;
        overflow: hidden;
        .showProgress {
          width: 3rem;
          height: 100%;
          background: #e2b470;
        }
      }
      .right {
        width: 1.5rem;
      }
    }
    .toAuthTip {
      text-align: center;
      color: #cb9c55;
      margin-top: 0.3rem;
      font-size: 0.28rem;
      padding-bottom: 0.3rem;
    }
    .txtTag {
      height: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 0.28rem;
      text-align: center;
      margin-top: 0.45rem;
      color: #05a232;
      display: flex;
      justify-content: center;
      align-items: center;
      .upIcon {
        width: 0.35rem;
        height: 0.35rem;
        background: url("../../assets/img/hall/team/up.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.1rem;
      }
      .alertIcon {
        width: 0.35rem;
        height: 0.35rem;
        background: url("../../assets/img/hall/team/alert.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.1rem;
      }
    }
  }
}
.tabsBox {
  width: 100%;
  height: 0.6rem;
  display: flex;
  justify-content: space-around;
  color: #666;
  font-size: 0.28rem;
  margin-top: 0.2rem;
  > div {
    width: 1.5rem;
    height: 0.6rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    p {
      width: 100%;
      line-height: 0.3rem;
      height: 0.3rem;
      text-align: center;
      margin-bottom: 0.05rem;
    }
    .activeColor {
      color: #d8ad6c;
    }
    .selectedIcon {
      width: 0.8rem;
      height: 0.03rem;
      background: #d6a566;
    }
    .defaultIcon {
      width: 0.8rem;
      height: 0.03rem;
      background: rgba(247, 244, 248, 1);
    }
  }
}
.sortBox {
  position: relative;
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
</style>
