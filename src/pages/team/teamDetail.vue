<template>
  <div id="mill">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>团队明细</h1>
    </div>
    <div class="content" :style="{paddingTop: statusH+0.88 + 'rem'}">
      <div class="label">
        <p>团队总人数</p>
        <span>
          <b>{{detail.team_all_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队总实名人数</p>
        <span>
          <b>{{detail.team_effective_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队总未实名人数</p>
        <span>
          <b>{{detail.team_no_effective_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队未卖过DLT的总人数</p>
        <span>
          <b>{{detail.team_no_buy_DLT_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队卖过DLT的总人数</p>
        <span>
          <b>{{detail.team_buy_DLT_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队未提现TSC总人数</p>
        <span>
          <b>{{detail.team_no_withdraw_tsc_nums}}/人</b>
        </span>
      </div>
      <div class="label" style="margin-bottom:0.2rem;">
        <p>团队已提现TSC总人数</p>
        <span>
          <b>{{detail.team_withdraw_tsc_nums}}/人</b>
        </span>
      </div>
      <div class="label">
        <p>团队体验矿机总数</p>
        <span>
          <b>{{detail.team_experience_machine_nums}}/台</b>
        </span>
      </div>
      <!-- <div class="label">
        <p>团队新手矿机总数</p>
        <span>
          <b>{{detail.team_new_machine_nums}}/台</b>
        </span>
      </div>-->
      <div class="label">
        <p>团队初级矿机总数</p>
        <span>
          <b>{{detail.team_primary_machine_nums}}/台</b>
        </span>
      </div>
      <div class="label">
        <p>团队中级矿机总数</p>
        <span>
          <b>{{detail.team_middle_machine_nums}}/台</b>
        </span>
      </div>
      <div class="label">
        <p>团队高级矿机总数</p>
        <span>
          <b>{{detail.team_senior_machine_nums}}/台</b>
        </span>
      </div>
      <!-- <div class="label">
        <p>团队进阶矿机总数</p>
        <span>
          <b>{{detail.team_advanced_machine_nums}}/台</b>
        </span>
      </div>-->
      <div class="label">
        <p>团队达人矿机总数</p>
        <span>
          <b>{{detail.team_snappy_machine_nums}}/台</b>
        </span>
      </div>
      <div class="label">
        <p>团队超级矿机总数</p>
        <span>
          <b>{{detail.team_super_machine_nums}}/台</b>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      detail: []
    };
  },
  created() {
    if (window.api) {
      api.setStatusBarStyle({
        style: "light"
      });
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
    }
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$http
        .post("/amoy/user/team-detail", {
          uid: this.$route.query.uid
        })
        .then(res => {
          if (res.code == 0) {
            this.detail = res.data;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#mill {
  min-height: 100%;
  background: #f7f4f8;
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
}
.label {
  padding: 0 0.6rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  height: 1rem;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #efefef;
}
</style>
