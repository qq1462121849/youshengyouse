<template>
  <div id="myTeam" ref="pages">
    <div class="headerBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>我的团队</h1>
    </div>
    <div class="topBg"></div>
    <van-button type="primary" @click="invited" class="btn_invited">邀请好友提升收益</van-button>
    <mescroll-vue
      ref="mescroll"
      :style="{paddingTop: $store.state.global.statusH+1.48 + 'rem'}"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <div class="infocontent" ref="content">
        <div class="teamInfoContent">
          <i class="bgImg"></i>
          <div>
            <div class="infoTop">
              <div>
                <p>团队总活跃度</p>
                <div style="width:2.5rem;display:flex;justify-content:space-between;">
                  <span style="font-size:0.5rem;">{{teamInfo.total_active}}</span>
                  <!-- <span style="font-size:0.2rem;line-height:0.9rem;">/TG</span> -->
                </div>
              </div>
              <div>
                <p>今日新增实名用户</p>
                <div style="width:2rem;display:flex;justify-content:space-between;">
                  <span style="font-size:0.5rem;">{{teamInfo.yesterday_increase_nums}}</span>
                  <span style="font-size:0.2rem;line-height:0.9rem;">/人</span>
                </div>
              </div>
            </div>
            <div class="infoBot">
              <div>
                <p>小区活跃度</p>
                <div style="width:2.5rem;display:flex;justify-content:space-between;">
                  <b style="font-size:0.5rem;">{{teamInfo.house_active}}</b>
                  <!-- <span style="font-size:0.2rem;line-height:0.9rem;">/TG</span> -->
                </div>
              </div>
              <div>
                <p>团队累计实名用户</p>
                <div style="width:2rem;display:flex;justify-content:space-between;">
                  <b style="padding-right:1.2rem;font-size:0.5rem;">{{teamInfo.total_increase_nums}}</b>
                  <span style="font-size:0.2rem;line-height:0.9rem;">/人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="levelInfoContent">
          <div class="progressTxt" @click="jumpTo('memberLevel')">
            <div class="proTxtLeft">
              <p style="font-weight:500;">当前等级</p>
              <span style="font-size:0.4rem;">{{$store.state.user.userInfo.member_level_title}}达人</span>
            </div>
            <div class="proTxtRight">详情 ></div>
          </div>

          <van-swipe :show-indicators="false" :loop="false" :width="116" :initial-swipe="level-1">
            <div id="line"></div>
            <van-swipe-item v-for="(item, index) in teamInfo.all_member_list" :key="index">
              <div class="processBox" @click="jumpTo('memberLevel?index='+item.id)">
                <i :class="'levelbg'+(index*1+1)"></i>
                <div v-if="index>level-1" class="clockIcon"></div>
                <div class="botTxt">
                  <p style="font-weight:700;">{{item.title}}达人</p>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <div class="upLevel" v-if="level<8">
            <div class="title">升级条件</div>
            <div class="upBox">
              <div>
                <p>直邀人数</p>
                <span>
                  <b>{{teamInfo.direct_num}}/{{teamInfo.all_member_list?teamInfo.all_member_list[level].direct_num:0}}</b>
                  <i
                    v-if="teamInfo.all_member_list&&teamInfo.direct_num*1<teamInfo.all_member_list[level].direct_num*1"
                    class="err"
                  ></i>
                  <i v-else class="current"></i>
                </span>
              </div>
              <div>
                <p>伞下团队活跃度</p>
                <span>
                  <b>{{teamInfo.effective_num}}/{{teamInfo.all_member_list?teamInfo.all_member_list[level].team_num:0}}</b>
                  <i
                    v-if="teamInfo.all_member_list&&teamInfo.effective_num*1<teamInfo.all_member_list[level].team_num*1"
                    class="err"
                  ></i>
                  <i v-else class="current"></i>
                </span>
              </div>
              <div @click="jumpTo('integral')">
                <p style="border:none">小区活跃度</p>
                <span>
                  <b>{{teamInfo.team_all_points}}/{{teamInfo.all_member_list?teamInfo.all_member_list[level].team_points_num:0}}</b>
                  <i
                    v-if="teamInfo.all_member_list&&teamInfo.team_all_points*1<teamInfo.all_member_list[level].team_points_num*1"
                    class="err"
                  ></i>
                  <i v-else class="current"></i>
                </span>
              </div>
            </div>
          </div>
        </div>-->
        <div class="tabsContent">
          <div style="background:rgba(247,244,248,1);padding:0.1rem 0;position:sticky">
            <van-sticky>
              <div class="tabsBox" style="font-weight:700;">
                <div class="tab1" @click="fn(1)">
                  <p :class="active==1?'activeColor':''">已实名</p>
                  <i :class="active==1?'selectedIcon':'defaultIcon'"></i>
                </div>
                <div class="tab2" @click="fn(2)">
                  <p :class="active==2?'activeColor':''">未实名</p>
                  <i :class="active==2?'selectedIcon':'defaultIcon'"></i>
                </div>
                <!--  <div class="tab2" @click="fn(3)">
                  <p :class="active==3?'activeColor':''">活跃用户</p>
                  <i :class="active==3?'selectedIcon':'defaultIcon'"></i>
                </div>
                <div class="tab2" @click="fn(4)">
                  <p :class="active==4?'activeColor':''">非活跃用户</p>
                  <i :class="active==4?'selectedIcon':'defaultIcon'"></i>
                </div>-->
                <div class="tab2" @click="jumpTo('/search')">
                  <van-icon name="search" size="0.44rem" />
                </div>
              </div>
              <div class="tabssBox" style="font-weight:700;">
                <div class="tab" style="flex:3">
                  <p>{{heoInfo.real_num}}</p>
                </div>
                <div class="tab" style="flex:3;padding-left:0.1rem;">
                  <p>{{heoInfo.not_real_num}}</p>
                </div>
                <!-- <div class="tab" style="flex:4;padding-left:0.1rem;">
                  <p>{{heoInfo.active_num}}</p>
                </div>
                <div class="tab" style="flex:4;">
                  <p>{{heoInfo.not_active_num}}</p>
                </div>-->
              </div>
              <div class="sortBox">
                <div class="sort" @click="rank(1)">
                  <span :class="classifySort==1||classifySort==4?'activeSpan':''">团队活跃度</span>
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
                  <!-- <img src="../../assets/img/hall/team/shang.png" alt v-if="classifySort === 6" />
                  <img src="../../assets/img/hall/team/xia.png" alt v-else-if="classifySort === 3" />
                  <img src="../../assets/img/hall/team/unsort.png" alt v-else />-->
                </div>
              </div>
            </van-sticky>
          </div>
          <div class="tabListBox">
            <div class="content" id="empty" v-if="!dataList.length"></div>
            <div class="listInfo" v-for="(item, index) in dataList" :key="index">
              <div class="username">
                <img :src="item.avatar?item.avatar:$store.state.user.userInfo.avatar" alt />
                <div class="rightBox">
                  <div>
                    <!-- <p v-if="item.is_fake!=1">{{item.mobile.substr(0, 3) + '****' + item.mobile.substr(7)}}</p> -->
                    <p>{{item.uid}}</p>
                    <span>{{item.created_at}}</span>
                  </div>
                  <div @click="showTip(item.mobile)">联系TA ></div>
                </div>
              </div>
              <div class="labelBox" v-if="active!=2">
                <div>
                  <div class="title">团队活跃度</div>
                  <div class="info">
                    <p>
                      <b>{{item.contribute}}</b>
                    </p>
                  </div>
                </div>
                <div>
                  <div class="title">团队人数</div>
                  <div class="info">
                    <p>
                      <b>{{item.team_num}}</b>人
                    </p>
                  </div>
                </div>
                <div>
                  <div class="title">持有矿机数</div>
                  <div class="info">
                    <p>
                      <b v-if="item.is_fake!=1">{{item.machine_num}}</b>
                      <b v-else>{{item.machine_num || 1 }}</b>台
                    </p>
                  </div>
                </div>
              </div>
              <!-- <div class="nextTxtTip" v-show="active==1">下级团队进度</div>
              <div
                class="nextProgress"
                v-show="active==1"
                @click="jumpTo('teamList?user='+item.mobile+'&uid='+item.uid)"
              >
                <div class="left">
                  <div class="showProgress"></div>
                </div>
                <div class="right">团队详情 ></div>
              </div>-->
              <!-- <div class="toAuthTip" v-show="active==2">实名认证后领取奖励，建议尽快联系实名</div>
              <div class="txtTag" v-show="active==3">
                <span>购买超级矿机为你带来收益增长</span>
                <i class="upIcon"></i>
              </div>
              <div class="txtTag" v-show="active==4">
                <span style="color:#FC0500">超级矿机已过期，及时提醒</span>
                <i class="alertIcon"></i>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <van-popup v-model="showTeacher" @click-overlay="showTeacher=false">
      <div class="teacherBox">
        <div class="avatarBox">
          <img :src="teacher.avatar||$store.state.user.userInfo.avatar" alt />
          <div class="levelBox">
            <i :class="'levelbg'+teacher.member_level"></i>
            <p>{{teacher.member_level_title}}达人</p>
          </div>
        </div>
        <div class="mobileBox">
          <div>
            <p>微信号:{{teacher.wx_number||teacher.mobile}}</p>
            <span class="copy" @click="clip(teacher.mobile)"></span>
          </div>
          <div>
            <p>联系电话:{{teacher.mobile}}</p>
            <span class="copy" @click="clip(teacher.mobile)"></span>
          </div>
        </div>
        <div class="incomeBox">
          <div>
            <p>累计DLT收益</p>
            <span>
              <b>{{(teacher.all_income*1).toFixed(2)}}</b>/DLT
            </span>
          </div>
          <div>
            <p>昨日DLT收益</p>
            <span>
              <b>{{(teacher.yesterday_all_income*1).toFixed(2)}}</b>/DLT
            </span>
          </div>
        </div>
        <div class="label">
          <div>
            <p>团队人数</p>
            <span>{{teacher.team_effective_num}}/人</span>
          </div>
          <div>
            <p>昨日新增人数</p>
            <span>{{teacher.yesterday_effective_num}}/人</span>
          </div>
        </div>
        <div class="label">
          <div>
            <p>个人矿机数</p>
            <span>{{teacher.machine_num}}/台</span>
          </div>
          <div>
            <p>团队矿机数</p>
            <span>{{teacher.team_machine_num}}/台</span>
          </div>
        </div>
        <div class="setMyConcat" @click="jumpTo('setInfo?type=5')">
          我也要设置我的联系方式
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { contactService } from "@/utils";
import MescrollVue from "mescroll.js/mescroll.vue";
import { XDialog } from "vux";
export default {
  components: {
    XDialog,
    MescrollVue
  },
  data() {
    return {
      teacher: [],
      showTeacher: false,
      level: this.$store.state.user.userInfo.member_level * 1,
      tabIndex: 1,
      showDialogStyle: false,
      teamInfo: {},
      myTeam: [],
      fansIndex: -1,
      active: 1,
      classifySort: 1,
      mescroll: null,
      mescrollDown: {},
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        //callback: this.downCallback
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 2 //每页数据条数,默认2
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        onScroll: this.onScrollT,
        noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "empty", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./static/none.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [], // 列表数据
      scrollTop: 0,
      heoInfo: {}
    };
  },
  // watch: {
  //   active(index) {

  //     this.dataList = [];
  //    // this.classifySort = 1;
  //     if (index == 1) {
  //       this.upCallback(
  //         this.mescrollUp.page,
  //         this.mescroll,
  //         "effective",
  //         "income",
  //         "DESC"
  //       );
  //     } else if (index == 2) {
  //       this.upCallback(
  //         this.mescrollUp.page,
  //         this.mescroll,
  //         "unEffective",
  //         "nothing",
  //         "DESC"
  //       );
  //     } else if (index == 3) {
  //       this.upCallback(
  //         this.mescrollUp.page,
  //         this.mescroll,
  //         "encourage",
  //         "nothing",
  //         "DESC"
  //       );
  //     } else if (index == 4) {
  //       this.upCallback(
  //         this.mescrollUp.page,
  //         this.mescroll,
  //         "remind",
  //         "nothing",
  //         "DESC"
  //       );
  //     }
  //   },
  //   classifySort(val) {
  //     var sort = val % 3;
  //     console.log(val, sort);
  //     var types =
  //       this.active == 1
  //         ? "effective"
  //         : this.active == 2
  //         ? "unEffective"
  //         : this.active == 3
  //         ? "encourage"
  //         : "remind";
  //     if (sort == 1) {
  //       //收益
  //       if (val == 1) {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "income",
  //           "DESC"
  //         );
  //       } else {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "income",
  //           "ASC"
  //         );
  //       }
  //     } else if (sort == 2) {
  //       //团队人数
  //       if (val == 2) {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "team",
  //           "DESC"
  //         );
  //       } else {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "team",
  //           "ASC"
  //         );
  //       }
  //     } else if (sort == 0) {
  //       //矿机
  //       if (val == 3) {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "machine",
  //           "DESC"
  //         );
  //       } else {
  //         this.upCallback(
  //           this.mescrollUp.page,
  //           this.mescroll,
  //           types,
  //           "machine",
  //           "ASC"
  //         );
  //       }
  //     }
  //   }
  // },
  created() {
    // this.$http.post("/amoy/user/my-new-team", true, true).then(res => {
    //   if (res.code == 0) {
    //     this.teamInfo = res.data;
    //   }
    // });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.mescroll.scrollTo(sessionStorage.getItem("teamScrollTop") * 1, 0);
    });
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("teamScrollTop", this.scrollTop);
    next();
  },
  methods: {
    invited() {
      dsBridge.call("openWin", "/invite");
    },
    fn(index) {
      this.active = index;
      this.mescroll.resetUpScroll();
    },
    showTip(number) {
      contactService(number);
    },
    clipTxt(txt) {
      this.copyTextShare(txt);
    },
    lookMore(index) {
      this.fansIndex = index;
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
      this.mescroll.resetUpScroll();
    },
    // getListData(type, sort, sort_type) {
    //   var info = {
    //     type: type,
    //     sort: sort,
    //     sort_type: sort_type,
    //     page: 1
    //   };
    //   this.$http.post("/amoy/poundage/my-team", info, true, true).then(res => {
    //     if (res.code == 0) {
    //       this.myTeam = res.data;
    //     }
    //   });
    // },
    clip(mobile) {
      this.copyTextShare(mobile);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll, type, sort, sort_type) {
      let result;

      switch (this.classifySort) {
        case 1:
          result = {
            sort_filed: "income",
            sort: 2
          };
          break;
        case 4:
          result = {
            sort_filed: "income",
            sort: 1
          };
          break;
        case 2:
          result = {
            sort_filed: "team_num",
            sort: 2
          };
          break;
        case 5:
          result = {
            sort_filed: "team_num",
            sort: 1
          };
          break;
        case 3:
          result = {
            sort_filed: "machine",
            sort: 2
          };
          break;
        case 6:
          result = {
            sort_filed: "machine",
            sort: 1
          };
          break;
      }

      this.$http
        .post(
          "/amoy/poundage/my-team",
          {
            page: page.num, // 页码
            type: this.active,
            ...result
          },
          true,
          true
        )
        .then(response => {
          if (response.code === 0) {
            // 请求的列表数据
            this.teamInfo = response.data;
            this.heoInfo = response.data.team_statistics;

            let arr = response.data.team_list;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(this.dataList.length);
            });
          } else {
            mescroll.endErr();
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    downCallback() {
      if (this.active != 1) {
        /* this.classifySort = 1; */
        this.active = 1;
        /* this.upCallback(1, this.mescroll, "effective", "income", "DESC"); */
      } else {
        this.mescroll.endDownScroll();
      }
    },
    onScrollT(mescroll, y, isUp) {
      this.scrollTop = y;
      // console.log(this.scrollTop);
    }
  }
};
</script>
<style lang="less" scoped>
#myTeam {
  min-height: 100vh;
  overflow: scroll;
  .btn_invited {
    width: 7.5rem;
    height: 0.98rem;
    background: rgba(214, 167, 94, 1);
    line-height: 0.98rem;
    position: fixed;
    bottom: 0;
    color: #fff;
    font-size: 0.3rem;
    border: 0;
  }
  .tabssBox {
    display: flex;
    justify-content: space-around;
    // width: 690px;
    padding: 0 30px;
    .tab {
      flex: 1;
      text-align: left;
      color: #666;
      padding-left: 0.8rem;
    }
  }
}
#line {
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  top: 0.9rem;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  box-sizing: content-box;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  h1 {
    font-size: 0.34rem;
    color: #fff;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 1.28rem;
    line-height: 0.42rem;
    color: #fff;
    line-height: 1rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
.topBg {
  width: 100%;
  height: 3rem;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  position: fixed;
  top: 0;
  border-radius: 0 0 5% 5%;
  z-index: 0;
}
.infocontent {
  overflow: scroll;
  padding-bottom: 1rem;
  position: relative;
  .teamInfoContent {
    padding: 0 0.3rem;
    height: 4.02rem;
    position: relative;
    z-index: 1;
    .bgImg {
      position: absolute;
      width: 2.5rem;
      height: 1.8rem;
      background: url("../../assets/img/qie/team.png") no-repeat;
      background-size: 100% 100%;
      right: 0.5rem;
      bottom: 0.3rem;
    }
    > div {
      width: 6rem;
      height: 4.02rem;
      background: linear-gradient(
        270deg,
        rgba(234, 190, 123, 1) 0%,
        rgba(197, 148, 69, 1) 100%
      );
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.24rem;
      padding: 0 0.45rem;
      display: flex;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
      > div {
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        > div {
          width: 48%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          overflow: hidden;
          p {
            width: 100%;
          }
          div {
            width: 100%;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.4rem;
              font-weight: 700;
            }
            b {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
  .levelInfoContent {
    padding: 0 0.32rem;
    margin-top: 0.54rem;
    background: #fff;
    .progressTxt {
      margin-top: 0.17rem;
      height: 0.5rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .proTxtLeft {
        width: 4rem;
        height: 0.5rem;
        float: left;
        display: flex;
        align-items: center;
        p {
          height: 0.5rem;
          line-height: 0.5rem;
          float: left;
          color: #d8ad6c;
          margin-left: 0.15rem;
          margin-right: 0.2rem;
        }
        span {
          font-size: 0.3rem;
          font-weight: 700;
        }
      }
      .proTxtRight {
        float: right;
        color: #29262a;
        font-size: 0.24rem;
        line-height: 0.5rem;
        height: 0.5rem;
      }
    }

    .upLevel {
      margin-top: 0.2rem;
      .title {
        color: #d6a566;
        font-size: 0.26rem;
      }
      .upBox {
        margin-top: 0.1rem;
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        > div {
          width: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        p {
          width: 100%;
          height: 0.48rem;
          line-height: 0.48rem;
          text-align: center;
          border-right: 1px solid #ccc;
        }
        span {
          display: block;
          margin-left: 0.2rem;
          height: 0.3rem;
          overflow: hidden;
          b {
            font-weight: normal;
            float: left;
          }
          .err {
            float: left;
            width: 0.16rem;
            height: 0.16rem;
            background: url("../../assets/img/err.png") no-repeat;
            background-size: 100% 100%;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
          }
          .current {
            float: left;
            width: 0.16rem;
            height: 0.16rem;
            background: url("../../assets/img/cur.png") no-repeat;
            background-size: 100% 100%;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
  .teamInfoList {
    width: 6.9rem;
    height: 1.4rem;
    background: #403f43;
    border-radius: 0.14rem;
    margin: 0 auto;
    margin-top: 0.44rem;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 2.2rem;
      height: 1.4rem;
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      p {
        width: 100%;
        font-size: 0.26rem;
        text-align: center;
      }
      span {
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
      }
    }
    > i {
      width: 2px;
      height: 0.78rem;
      background: url("../../assets/img/hall/my/er/lineW.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .tabsContent {
    margin-top: 0.3rem;
    overflow: hidden;
    .tabsBox {
      width: 6.98rem;
      margin: auto;
      height: 0.6rem;
      display: flex;
      justify-content: space-around;
      color: #666;
      font-size: 0.28rem;
      margin-top: 0.2rem;
      > div {
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

    .tabListBox {
      // margin-top: 0.3rem;
      background: #eee;
      padding-bottom: 0rem;
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
    .tabListBox {
      .listInfo:first-of-type {
        //padding-top:0.6rem ;
      }
    }
  }
}
.processBox {
  border-radius: 0.1rem;
  width: 100%;
  height: 1.8rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .clockIcon {
    width: 0.6rem;
    height: 0.6rem;
    background: url("../../assets/img/clock.png") no-repeat center center;
    background-size: 40% 40%;
    background-color: #f4e4ca;
    border-radius: 50%;
    margin-bottom: 0.4rem;
  }
  .botTxt {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.25rem;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    margin-top: 0.1rem;
    p {
      text-align: center;
    }
  }
}
.mescroll {
  position: fixed;
  bottom: 1rem;
  top: 0;
  height: auto;
}
#myTeam {
  min-height: 100%;
  background: #fff;
}
.levelbg1 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/1.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg2 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/2.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg3 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/3.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg4 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/4.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg5 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/5.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg6 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/6.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg7 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/7.png") no-repeat;
  background-size: 100% 100%;
}
.levelbg8 {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../assets/img/8.png") no-repeat;
  background-size: 100% 100%;
}
.teacherBox {
  width: 6.4rem;
  height: 5.8rem;
  background: #fff;
  border-radius: 0.2rem;
  padding: 0.25rem 0.2rem;
  .avatarBox {
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > img {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
    }
  }
  .levelBox {
    position: absolute;
    left: 4rem;
    width: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.29rem;
      font-weight: 700;
    }
  }
  .mobileBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    > div {
      display: flex;
      align-items: center;
      p {
        font-size: 0.24rem;
      }
      .copy {
        margin-left: 0.2rem;
        width: 0.3rem;
        height: 0.35rem;
        background: url("../../assets/img/hall/my/copy.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .incomeBox {
    width: 6.3rem;
    height: 1.37rem;
    margin-top: 0.3rem;
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      width: 2.5rem;
      height: 1.37rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      font-size: 0.25rem;
      > p {
        width: 100%;
        text-align: center;
      }
      span {
        b {
          font-size: 0.31rem;
        }
      }
    }
  }
  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.25rem;
    font-size: 0.24rem;
    margin-top: 0.24rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 3rem;
      p {
        margin-right: 0.1rem;
      }
    }
  }
  .setMyConcat {
    text-align: center;
    color: #bcb9bc;
    font-size: 0.28rem;
  }
}
.toFixed {
  position: fixed;
  top: 0.8rem;
  width: 100%;
  z-index: 10000;
}
</style>
