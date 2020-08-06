<template>
  <div id="myPage">
    <div class="headBox" :style="{paddingTop: $store.state.global.statusH + 'rem'}">
      <h1>
        个人中心
        <i @click="jumpTo('setting')" class="setting"></i>
        <i @click="jumpTo('message')" class="msg"></i>
        <i
          class="redTip"
          v-if="teamInfo.is_read"
          :style="{top: $store.state.global.statusH+0.15 + 'rem'}"
        ></i>
      </h1>
    </div>
    <div class="bgcolor" :style="{top: $store.state.global.statusH+2.3 + 'rem'}"></div>
    <div class="content" ref="content" :style="{top: $store.state.global.statusH+0.88 + 'rem'}">
      <div class="userinfocontent">
        <van-uploader :max-count="1" v-model="fileList" :after-read="afterRead" />
        <img class="avatar" :src="avatar" alt />
        <div class="userinforight">
          <p class="nickname">
            <span>{{userInfo.nickname||$store.state.user.userInfo.nickname}}</span>
            <!--  <img class="levelbg" src="../../assets/img/1.png" alt /> -->
            <!-- <i :class="'levelbg'+$store.state.user.userInfo.member_level"></i> -->
          </p>
          <div class="_botFunc">
            <p>
              邀请码
              <!-- <span v-if="hideCode==true">{{'*******'}}</span> -->
              <span>{{ userInfo.invite_code||$store.state.user.userInfo.invite_code}}</span>
            </p>
            <span class="clipTxt" @click="clip(userInfo.invite_code)">复制</span>
            <!-- <i class="eyes" v-if="hideCode==false" @click="hideCodes"></i>
            <i class="openeyes" v-else @click="hideCodes"></i>-->
            <!-- <i class="copy" @click="clip(userInfo.invite_code)"></i> -->
          </div>
        </div>
      </div>
      <div class="moneyInfoContent">
        <div class="DLT">
          <div class="DLTTop">
            <span>DLT余额</span>
            <span>
              <i></i>
              <b @click.stop="jumpTo('trading')">去交易</b>
            </span>
          </div>
          <div class="numContent">
            <h3>{{hideCode==true?'*******': userInfo.credit3?(userInfo.credit3*1).toFixed(2):0}}</h3>/DLT
            <p>≈{{hideCode==true?'*******':userInfo.credit3?(userInfo.credit3*$store.state.user.userInfo.guide_price).toFixed(2):0}}CNY</p>
          </div>
        </div>
        <div class="DLT tsc">
          <div class="DLTTop">
            <span>TSC余额</span>
            <span style="border:none">
              <i class="withDraw"></i>
              <b @click.stop="jumpTo('recharge?type=2')">去提现</b>
            </span>
          </div>
          <div class="numContent">
            <h3>{{userInfo.credit2}}</h3>/TSC
            <p>≈{{userInfo.credit2}}CNY</p>
          </div>
        </div>
        <div class="leftBox" @click="jumpTo('earningInfo')">
          <p>昨日收益</p>
          <b>{{userInfo.yesterday_all_income}}</b>
          <span>≈{{(userInfo.yesterday_all_income*$store.state.global.guidePrice).toFixed(2)}}CNY</span>
        </div>
        <div class="rightBox">
          <p>DLT30日涨幅</p>
          <b>
            {{userInfo.point_rate}}%
            <i></i>
          </b>
        </div>
      </div>
      <div class="labelContent">
        <div class="getMoreearn" @click="jumpTo('share')">
          <p>零成本获得更多收益</p>
          <span>升级达人</span>
        </div>
        <div class="iconBox1">
          <div @click="jumpTo('recharge?type=1')">
            <i class="tsc"></i>
            <p>TSC充值</p>
          </div>
          <div @click="jumpTo('earningInfo')">
            <i class="myearn"></i>
            <p>我的收益</p>
            <!-- <div class="redTip"></div> -->
          </div>
          <div>
            <i class="mykj" @click="jumpTo('mill')"></i>
            <p>我的矿机</p>
          </div>
          <div @click="jumpTo('shareImg')">
            <i class="invite"></i>
            <p>邀请好友</p>
          </div>
        </div>
        <div class="bgColor"></div>
      </div>
      <div class="levelInfoContent">
        <div class="progressTxt" @click="jumpTo('memberLevel')">
          <div class="proTxtLeft">
            <p>当前等级</p>
            <span>{{$store.state.user.userInfo.member_level_title}}达人</span>
          </div>
          <div class="proTxtRight">详情 ></div>
        </div>
        <!-- <div class="processBox">
          <div class="topLevelIconBox">
            <div v-show="level==1">
              <i class="levelbg1"></i>
              <i class="clockIcon" v-show="false"></i>
            </div>
            <div v-show="level==1">
              <i class="levelbg2"></i>
              <i class="clockIcon" v-show="true"></i>
            </div>
            <div v-show="level==1">
              <i class="levelbg3"></i>
              <i class="clockIcon" v-show="true"></i>
            </div>
            <div v-show="level>1">
              <i :class="'levelbg'+(level-1)"></i>
              <i class="clockIcon" v-show="false"></i>
            </div>
            <div v-show="level>1">
              <i :class="'levelbg'+level"></i>
              <i class="clockIcon" v-show="level<=1"></i>
            </div>
            <div v-show="level>1">
              <i :class="'levelbg'+(level+1)"></i>
              <i class="clockIcon" v-show="true"></i>
            </div>
          </div>
          <div class="line"></div>
          <div class="botTxt">
            <p v-show="level>1">{{level-1}}星达人</p>
            <p>{{level}}星达人</p>
            <p>{{level*1+1}}星达人</p>
            <p v-show="level<=1">{{level*1+2}}星达人</p>
          </div>
        </div>-->
        <van-swipe
          :show-indicators="false"
          :loop="false"
          @change="changeIndex"
          :width="116"
          :initial-swipe="level-1"
        >
          <div id="line"></div>
          <van-swipe-item v-for="(item, index) in teamInfo.all_member_list" :key="index">
            <div class="processBox" @click="jumpTo('memberLevel?index='+item.id)">
              <i :class="'levelbg'+(index*1+1)"></i>
              <div v-if="index>level-1" class="clockIcon"></div>
              <div class="botTxt">
                <p>{{item.title}}达人</p>
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
              <p>团队总有效人数</p>
              <span>
                <b>{{teamInfo.effective_num}}/{{teamInfo.all_member_list?teamInfo.all_member_list[level].team_num:0}}</b>
                <i
                  v-if="teamInfo.all_member_list&&teamInfo.effective_num*1<teamInfo.all_member_list[level].team_num*1"
                  class="err"
                ></i>
                <i v-else class="current"></i>
              </span>
            </div>
            <div>
              <p style="border:none">团队总积分</p>
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
      </div>
      <div class="myMillInfoContent">
        <div class="millBot">
          <div>今日任务 浏览{{userInfo.task_num}}个商品</div>
          <span v-if="userInfo.already_task_num*1>=userInfo.task_num">已完成</span>
          <span v-else @click="jumpTo('home')">做任务 ></span>
        </div>
        <div class="millTop">
          <p>
            持有矿机数量
            <b>{{userInfo.my_machine_count}}</b>
          </p>
          <span @click="jumpTo('mill')">详情 ></span>
        </div>
      </div>
      <!-- <div class="myTeamContent">
        <div class="label1">
          <div>
            <i class="millIcon"></i>
            <p>我的团队总人数：{{userInfo.team_num}}</p>
          </div>
          <p>
            <span @click="jumpTo('team')">详情</span>
            <i class="iconfont icon-right"></i>
          </p>
        </div>
        <div class="myTeamBot">
          <div class="_left">
            <p>今日团队收益</p>
            <span>{{userInfo.today_team_income}}DLT</span>
          </div>
          <div class="line"></div>
          <div class="_right">
            <p>昨日团队收益</p>
            <span>{{userInfo.yesterday_team_income}}DLT</span>
          </div>
        </div>
      </div>-->
      <div class="iconContent">
        <div @click="jumpTo('mallIncome')">
          <i class="iconInfo"></i>
          <p>商城收益</p>
        </div>
        <div @click="jumpTo('goodorder?index=1')">
          <i class="iconInfo iconInfo2"></i>
          <p>我的订单</p>
        </div>
        <div @click="showTeachers">
          <i class="iconInfo iconInfo3"></i>
          <p>我的导师</p>
        </div>
        <div @click="jumpTo('guide')">
          <i class="iconInfo iconInfo4"></i>
          <p>新手指南</p>
        </div>
        <div @click="global()">
          <i class="iconInfo iconInfo5"></i>
          <p>全球节点</p>
        </div>
        <!-- <div @click="jumpTo('cityPartner')"> -->
        <div @click="$vux.toast.text('该功能暂未开通~')">
          <i class="iconInfo iconInfo6"></i>
          <p>合伙人</p>
        </div>
        <div @click="jumpTo('feedBack')">
          <i class="iconInfo iconInfo7"></i>
          <p>意见反馈</p>
        </div>
        <div @click="showWxNum=true">
          <i class="iconInfo iconInfo8"></i>
          <p>联系我们</p>
        </div>
      </div>
    </div>
    <transition>
      <div class="tip" v-if="showTip">
        <div class="tipBox">
          <i class="colseIcon" @click="showTip=false"></i>
          <img
            class="avatar"
            :src="teacher.teacher_avatar||$store.state.user.userInfo.avatar"
            alt="头像"
          />
          <div class="username">
            <p>{{teacher.teacher_nickname||teacher.teacher_mobile}}</p>
            <span></span>
          </div>
          <div class="label">
            <p>手机号：{{teacher.teacher_mobile}}</p>
            <img @click="clip(teacher.teacher_mobile)" src="../../assets/img/pho.png" alt />
          </div>
          <div class="label">
            <p>微信号：{{teacher.teacher_wx_number||teacher.teacher_mobile}}</p>
            <img
              @click="clip(teacher.teacher_wx_number||teacher.teacher_mobile)"
              src="../../assets/img/copy.png"
              alt
            />
          </div>
        </div>
      </div>
    </transition>
    <van-popup v-model="showTeacher" @click-overlay="showTeacher=false">
      <div class="teacherBox">
        <div class="avatarBox">
          <img :src="teacher.avatar||$store.state.user.userInfo.avatar" alt />
          <div class="levelBox">
            <i :class="'levelbg'+teacher.member_level"></i>
            <p>{{teacher.member_level+'星达人'}}</p>
          </div>
        </div>
        <!-- <div class="takeIncome">
          <p>为我带来收益</p>
          <span>
            <b>{{teacher.credit3}}</b>/DLT
          </span>
        </div>-->
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
              <b>{{teacher.tbc_income||0}}</b>/DLT
            </span>
          </div>
          <div>
            <p>昨日DLT收益</p>
            <span>
              <b>{{teacher.yesterday_tbc_income||0}}</b>/DLT
            </span>
          </div>
        </div>
        <div class="label">
          <div>
            <p>团队人数</p>
            <span>{{teacher.team_num}}/人</span>
          </div>
          <div>
            <p>昨日新增人数</p>
            <span>{{teacher.yesterday_add_num}}/人</span>
          </div>
        </div>
        <div class="label">
          <div>
            <p>个人矿机数</p>
            <span>{{teacher.self_machine_num}}/台</span>
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
    <van-popup v-model="showWxNum" @click-overlay="showWxNum=false">
      <div class="wxNumBox">
        <div class="title">客服邮箱</div>
        <div class="wxNum">{{$store.state.user.userInfo.wx_num}}</div>
        <div class="txtTip">* 请复制邮箱号进行客服服务</div>
        <div class="btn" @click="clipWx($store.state.user.userInfo.wx_num)">复制</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      level: this.$store.state.user.userInfo.member_level * 1,
      showTip: false,
      userInfo: [],
      hideCode: false,
      teamInfo: [],
      nowLevel: 4,
      teacher: "",
      showTeacher: false,
      avatar: this.$store.state.user.userInfo.avatar,
      fileList: [],
      tabIndex: 0,
      showWxNum: false
    };
  },
  created() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
    }
    this.getTeamInfo();
    this.getUserInfo();
    this.getMyTeacher();
  },
  methods: {
    //复制微信客服号
    clipWx(num) {
      this.showWxNum = false;
      this.clip(num);
    },
    afterRead(e) {
      this.avatar = e.content;
      this.$store.state.user.userInfo.avatar = e.content;
      this.fileList = [];
      this.$http
        .post(
          "/amoy/user/update-user-info",
          {
            avatar: this.avatar
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("更换成功！");
          }
        });
    },
    teacherShow() {
      if (this.teacher.length == 0) {
        return this.$vux.toast.text("暂无导师");
      }
      this.showTip = true;
    },
    clip(code) {
      this.copyTextShare(code);
    },
    realName() {
      if (this.$store.state.user.userInfo.is_realname) {
        this.$vux.toast.text("您已完成实名认证！");
      } else {
        this.$router.push("auth");
      }
    },
    changeIndex(index) {
      console.log(index);
    },
    getUserInfo() {
      this.$http.post("/amoy/user/user-info", true, true).then(res => {
        if (res.code == 0) {
          this.$store.commit("setUserInfo", res.data);
          this.$store.commit("setGuidePrice", res.data.guide_price);
          this.userInfo = res.data;
          this.nowLevel = res.data.member_level;
        }
      });
    },
    getMyTeacher() {
      this.$http.post("/amoy/user/my-teacher").then(res => {
        if (res.code == 0) {
          this.teacher = res.data;
        }
      });
    },
    getTeamInfo() {
      this.$http.post("/amoy/user/my-new-team", true, true).then(res => {
        if (res.code == 0) {
          this.teamInfo = res.data;
        }
      });
    },
    global() {
      this.$vux.toast.text("该功能暂未开通~");
    },
    showTeachers() {
      if (!this.teacher.mobile) {
        return this.$vux.toast.text("暂无导师！");
      }
      this.showTeacher = true;
    }
  },
  activated() {
    this.getUserInfo();
  },
  beforeDestroy() {
    sessionStorage.setItem("contentScroll", this.$refs.content.scrollTop);
  },
  beforeRouteLeave(to, from, next) {
    // ...
    sessionStorage.setItem("contentScroll", this.$refs.content.scrollTop);
    next();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next(vm => {
      vm.$refs.content.scrollTop = sessionStorage.getItem("contentScroll");
    });
  }
};
</script>
<style lang="less" scoped>
.wxNumBox {
  width: 5rem;
  height: 3rem;
  background: #fff;
  border-radius: 0.1rem;
  .title {
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
  }
  .wxNum {
    text-align: center;
    font-size: 0.3rem;
    font-weight: 700;
    height: 0.32rem;
    line-height: 0.32rem;
    margin-top: 0.3rem;
  }
  .txtTip {
    color: #f00;
    font-size: 0.26rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
  }
  .btn {
    width: 3rem;
    height: 0.5rem;
    background: rgba(231, 192, 135, 1);
    line-height: 0.5rem;
    color: #fff;
    text-align: center;
    border-radius: 0.1rem;
    margin: 0 auto;
    box-shadow: 4px 4px 1px 0px rgba(200, 200, 200, 0.18);
    margin-top: 0.3rem;
  }
}
#line {
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  top: 0.9rem;
}
#myPage {
  background: #fff;
  min-height: 100%;
  /deep/.van-popup {
    background: none;
  }
}
.teacherBox {
  width: 6.4rem;
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
  .takeIncome {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > p {
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
    > span {
      b {
        color: #d7a85f;
        font-size: 0.32rem;
      }
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
.headBox {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  height: 2.5rem;
  overflow: hidden;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
  > h1 {
    padding-top: 0.2rem;
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
    line-height: 0.32rem;
    height: 0.32rem;
    .setting {
      position: absolute;
      width: 0.36rem;
      height: 0.36rem;
      background: url("../../assets/img/hall/my/setting.png") no-repeat;
      background-size: 100% 100%;
      right: 0.3rem;
    }
    .msg {
      position: absolute;
      width: 0.36rem;
      height: 0.36rem;
      background: url("../../assets/img/hall/my/san/msg.png") no-repeat;
      background-size: 100% 100%;
      right: 0.9rem;
    }
    .redTip {
      position: absolute;
      right: 0.83rem;
      width: 0.1rem;
      height: 0.1rem;
      border-radius: 50%;
      background: #f00;
    }
  }
}
.bgcolor {
  width: 100%;
  height: 2rem;
  position: fixed;
  z-index: 0;
  border-radius: 0 0 8% 8%;
  background: linear-gradient(
    -90deg,
    rgba(35, 32, 39, 1) 0%,
    rgba(55, 53, 64, 1) 100%
  );
}
.content {
  position: fixed;
  z-index: 5;
  width: 100%;
  width: 6.9rem;
  margin-left: 0.3rem;
  height: 100%;
  overflow: scroll;
  background: #fff;
  .userinfocontent {
    height: 1.5rem;
    overflow: hidden;
    position: relative;
    padding-bottom: 0.1rem;
    background: linear-gradient(
      -90deg,
      rgba(35, 32, 39, 1) 0%,
      rgba(55, 53, 64, 1) 100%
    );
    /deep/.van-uploader {
      position: absolute;
      left: 0.3rem;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      overflow: hidden;
      opacity: 0;
    }
    .avatar {
      width: 1.18rem;
      height: 1.18rem;
      border-radius: 50%;
      border: 5px solid rgb(82, 81, 83);
      float: left;
    }
    .userinforight {
      width: 5.1rem;
      float: left;
      margin-left: 0.28rem;
      height: 1.2rem;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      .nickname {
        color: #fff;
        font-size: 0.3rem;
        height: 0.32rem;
        line-height: 0.32rem;
        width: 100%;
        span {
          float: left;
        }
      }
      ._botFunc {
        width: 100%;
        height: 0.3rem;
        margin-top: 0.2rem;
        line-height: 0.3rem;
        p {
          float: left;
          font-size: 0.28rem;
          color: #666;
          span {
            color: #d8ad6c;
            margin-left: 0.27rem;
          }
        }
        .copy {
          float: right;
          margin-right: 0.45rem;
          width: 0.3rem;
          height: 0.35rem;
          background: url("../../assets/img/hall/my/copy.png") no-repeat;
          background-size: 100% 100%;
        }
        .eyes {
          float: right;
          width: 0.33rem;
          height: 0.18rem;
          background: url("../../assets/img/hall/my/eyes.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 0.1rem;
          margin-left: 0.07rem;
        }
        .openeyes {
          float: right;
          width: 0.4rem;
          height: 0.25rem;
          background: url("../../assets/img/my/open.png") no-repeat;
          background-size: 100% 100%;
          margin-top: 0.03rem;
        }
        .clipTxt {
          float: left;
          padding: 0 0.05rem;
          color: #d6a75e;
          border: 1px solid #d6a75e;
          font-size: 0.26rem;
          border-radius: 0.05rem;
          margin-left: 0.3rem;
        }
      }
    }
  }
  .moneyInfoContent {
    padding: 0.46rem 0.3rem 0 0.53rem;
    height: 3.8rem;
    background: linear-gradient(
      270deg,
      rgba(234, 190, 123, 1) 0%,
      rgba(197, 148, 69, 1) 100%
    );
    border-radius: 0.1rem;
    position: relative;
    top: -0.1rem;
    > div {
      width: 100%;
      margin-bottom: 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .DLTTop {
        height: 0.3rem;
        width: 100%;
        color: #fff;
        span {
          font-size: 0.3rem;
          line-height: 0.3rem;
          float: left;
        }
        span:last-of-type {
          width: 1.7rem;
          height: 0.61rem;
          line-height: 0.61rem;
          text-align: center;
          float: right;
          color: #a57b3d;
          margin-top: 0.1rem;
          display: flex;
          align-items: center;
          i {
            width: 0.5rem;
            height: 0.5rem;
            background: url("../../assets/img/qie/1.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
          .withDraw {
            width: 0.5rem;
            height: 0.5rem;
            background: url("../../assets/img/qie/2.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
          b {
            height: 0.32rem;
            padding: 0 0.1rem;
            line-height: 0.32rem;
            font-weight: normal;
            font-size: 0.26rem;
            border: 1px solid #fff;
            color: #fff;
            border-radius: 0.5rem;
          }
        }
      }
      .numContent {
        margin-top: 0.3rem;
        display: flex;
        font-size: 0.22rem;
        line-height: 0.5rem;
        color: #fff;
        h3 {
          font-size: 0.36rem;
          line-height: 0.4rem;
        }
        p {
          font-size: 0.24rem;
          line-height: 0.25rem;
          margin-top: 0.17rem;
          color: #eaeaea;
        }
      }
    }
    .tsc {
      .numContent {
        color: #fff;
      }
      .DLTTop {
        span {
          color: #fff;
        }
        span:last-of-type {
          color: #fff;
          background: none;
          border: 2px solid #eee;
        }
      }
    }
    .leftBox {
      width: 3.5rem;
      p {
        font-size: 0.25rem;
        color: #fff;
      }
      b {
        font-size: 0.25rem;
        color: #fff;
        display: block;
      }
      span {
        color: #eaeaea;
        font-size: 0.2rem;
      }
    }
    .rightBox {
      width: 2.4rem;
      height: 1.65rem;
      background: url("../../assets/img/hall/my/bg2.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0.3rem;
      bottom: 0rem;
      margin-bottom: 0;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      color: #fff;
      font-size: 0.26rem;
      p {
        width: 100%;
        text-align: center;
      }
      b {
        margin-left: 0.5rem;
        font-size: 0.3rem;
      }
    }
  }
  .labelContent {
    margin-top: 0.55rem;
    .getMoreearn {
      display: flex;
      padding: 0 0.3rem;
      align-items: center;
      height: 1rem;
      box-shadow: 3px 3px 20px 0px rgba(210, 210, 210, 1);
      justify-content: space-between;
      p {
        color: #d19e76;
        font-size: 0.3rem;
      }
      span {
        width: 1.3rem;
        height: 0.4rem;
        background: linear-gradient(
          270deg,
          rgba(234, 190, 123, 1) 0%,
          rgba(197, 148, 69, 1) 100%
        );
        line-height: 0.4rem;
        font-size: 0.24rem;
        color: #fff;
        border-radius: 0.5rem;
        text-align: center;
      }
    }
    .iconBox1 {
      display: flex;
      justify-content: space-around;
      padding: 0.4rem 0;
      > div {
        width: 1.5rem;
        height: 0.8rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        position: relative;
        p {
          width: 100%;
          text-align: center;
          color: #111;
          font-size: 0.25rem;
        }
        i {
          width: 0.45rem;
          height: 0.45rem;
        }
        .redTip {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f00;
          top: 0;
          right: 0.5rem;
        }
        .tsc {
          background: url("../../assets/img/hall/my/san/tsc.png") no-repeat;
          background-size: 100% 100%;
        }
        .myearn {
          background: url("../../assets/img/hall/my/san/wdsy.png") no-repeat;
          background-size: 100% 100%;
        }
        .mykj {
          background: url("../../assets/img/hall/my/san/wdkj.png") no-repeat;
          background-size: 100% 100%;
        }
        .invite {
          background: url("../../assets/img/hall/my/san/yqhy.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .levelInfoContent {
    padding: 0 0.32rem;
    margin-top: 0.54rem;
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
        padding-bottom: 0.3rem;
        > div {
          width: 2rem;
        }
        p {
          width: 100%;
          text-align: center;
          height: 0.48rem;
          line-height: 0.48rem;
          border-right: 1px solid #ccc;
        }
        span {
          margin-left: 0.2rem;
          height: 0.3rem;
          overflow: hidden;
          display: flex;
          justify-content: center;
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
  .myMillInfoContent {
    width: 6.9rem;
    overflow: hidden;
    .millTop {
      padding: 0.25rem 0.3rem;
      height: 0.87rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        color: #d7a65c;
        font-size: 0.3rem;
        b {
          font-size: 0.35rem;
          color: #111;
          margin-left: 0.1rem;
        }
      }
      span {
        font-size: 0.28rem;
      }
    }
    .millBot {
      width: 6.9rem;
      height: 0.9rem;
      background: linear-gradient(
        270deg,
        rgba(234, 190, 123, 1) 0%,
        rgba(197, 148, 69, 1) 100%
      );
      div {
        float: left;
        font-size: 0.3rem;
        line-height: 0.9rem;
        color: rgba(250, 250, 250, 0.8);
        margin-left: 0.6rem;
      }
      span {
        float: right;
        margin-right: 0.3rem;
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.9rem;
      }
    }
  }
  .myTeamContent {
    width: 6.9rem;
    height: 1.87rem;
    background: #403f43;
    border-radius: 0.08rem;
    margin-top: 0.31rem;
    overflow: hidden;
    .label1 {
      padding: 0 0.3rem;
      height: 0.3rem;
      margin-bottom: 0.3rem;
      margin-top: 0.27rem;
      div {
        width: 4rem;
        float: left;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.26rem;
        color: #fff;
        .millIcon {
          float: left;
          width: 0.26rem;
          height: 0.26rem;
          margin-top: 0.02rem;
          background: url("../../assets/img/hall/my/er/team.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.2rem;
        }
      }
      > p {
        float: right;
        width: 1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.24rem;
        color: #fff;
        display: flex;
        align-items: center;
        i {
          margin-left: 0.1rem;
        }
      }
    }
    .myTeamBot {
      height: 0.8rem;
      width: 100%;
      display: flex;
      justify-content: center;
      > div {
        p {
          color: #a7a8a7;
          font-size: 0.25rem;
        }
        span {
          color: #d8ad6c;
          font-size: 0.3rem;
        }
      }
      ._left {
        padding-left: 0.3rem;
        width: 3.1rem;
        height: 0.8rem;
      }
      ._right {
        padding-left: 0.3rem;
        width: 3.1rem;
        height: 0.8rem;
      }
      .line {
        width: 2px;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/er/line.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .iconContent {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    > div {
      width: 1.5rem;
      height: 1.4rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      i {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/scsy.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo2 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/wddd.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo3 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/wdds.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo4 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/xszn.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo5 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/qqjd.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo6 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/hhr.png") no-repeat center
          center;
        background-size: 80% 80%;
      }
      .iconInfo7 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/yjfk.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      .iconInfo8 {
        width: 0.8rem;
        height: 0.8rem;
        background: url("../../assets/img/hall/my/san/mobile.png") no-repeat
          center center;
        background-size: 80% 80%;
      }
      p {
        width: 100%;
        height: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        font-size: 0.24rem;
        color: #a8a8a8;
      }
    }
  }
  .nowLevel {
    width: 6.9rem;
    height: 2.9rem;
    background: url("../../assets/img/hall/my/er/bg.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.5rem;
    overflow: hidden;
    .nowLevelTitle {
      height: 0.4rem;
      padding: 0 0.3rem;
      margin-top: 0.2rem;
      p {
        float: left;
      }
      span {
        float: right;
        color: #c0914e;
        font-size: 0.24rem;
      }
      .nowLevels {
        color: #c0914e;
        font-size: 0.24rem;
      }
      .daren {
        margin-left: 0.4rem;
        .levelIcon {
          float: left;
          width: 0.32rem;
          height: 0.32rem;
          background: url("../../assets/img/hall/my/level.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
      }
    }
    .progress {
      height: 0.72rem;
      width: 100%;
      background: #246;
      margin-top: 0.34rem;
      position: relative;
      .bgPro {
        height: 2px;
        width: 100%;
        background: #fff;
        position: absolute;
        top: 0.24rem;
        left: 0;
      }
      .bgProN {
        height: 2px;
        width: 17%;
        background: #111;
        position: absolute;
        top: 0.24rem;
      }
    }
    .botInfo {
      margin-top: 0.4rem;
      height: 0.7rem;
      width: 100%;
      display: flex;
      justify-content: center;
      > div {
        width: 2.3rem;
        height: 0.7rem;
        color: #ad884e;
        p {
          text-align: center;
        }
        span {
          display: block;
          text-align: center;
        }
      }
      .line {
        width: 2px;
        height: 0.7rem;
        background: url("../../assets/img/hall/my/er/lineW.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .global {
    width: 6.9rem;
    height: 1.33rem;
    background: url("../../assets/img/hall/my/er/tl.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.37rem;
  }
  .botNavIcon {
    width: 100%;
    height: 0.9rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.66rem;
    margin-bottom: 4.5rem;
    > div {
      width: 1.1rem;
      height: 0.9rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      i {
        width: 0.37rem;
        height: 0.44rem;
        background: url("../../assets/img/hall/my/er/wddd.png") no-repeat;
        background-size: 100% 100%;
      }
      .iconnav1 {
        background: url("../../assets/img/hall/my/er/wdds.png") no-repeat;
        background-size: 100% 100%;
      }
      .iconnav2 {
        background: url("../../assets/img/hall/my/er/xszn.png") no-repeat;
        background-size: 100% 100%;
      }
      .iconnav3 {
        background: url("../../assets/img/hall/my/er/wtfk.png") no-repeat;
        background-size: 100% 100%;
      }
      p {
        font-size: 0.26rem;
        color: #a8a8a8;
        height: 0.28rem;
        line-height: 0.28rem;
        text-align: center;
      }
    }
  }
  .progress/deep/.van-swipe {
    height: 0.72rem;
    overflow: hidden;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    .van-swipe-item {
      width: 2.3rem !important;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      p {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 0.22rem;
      }
    }
  }
  .bgColor {
    height: 0.2rem;
    background: rgba(247, 244, 248, 1);
  }
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
.tip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: rgba(51, 51, 51, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .tipBox {
    width: 4.6rem;
    height: 4.9rem;
    background: #403f43;
    border-radius: 0.1rem;
    position: relative;
    .colseIcon {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../assets/img/qb/smrz/close.png") no-repeat;
      background-size: 100% 100%;
      top: 0.3rem;
      right: 0.3rem;
    }
    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      margin: 0 auto;
      display: block;
      margin-top: 0.8rem;
    }
    .username {
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
      line-height: 0.3rem;
      height: 0.3rem;
      margin-top: 0.25rem;
      margin-bottom: 0.65rem;
    }
    .label {
      width: 100%;
      display: flex;
      justify-content: space-around;
      color: #a7a8a7;
      font-size: 0.24rem;
      height: 0.25rem;
      line-height: 0.25rem;
      margin-bottom: 0.23rem;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
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
