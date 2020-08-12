<template>
  <div id="proof">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>提交支付凭证</h1>
    </div>
    <div class="content" :style="{marginTop: statusH +0.88+ 'rem'}">
      <div class="topBox">
        <div class="time">
          <div class="point_s"></div>
          <div class="point_m"></div>
          <div class="point_b"></div>
          <div class="thunderIcon"></div>
          <div class="endTime">
            距离结束还有
            <span>{{h}}</span>:
            <span>{{m}}</span>:
            <span>{{s}}</span>
          </div>
          <div class="point_b"></div>
          <div class="point_m"></div>
          <div class="point_s"></div>
        </div>
      </div>
      <div class="accountBox">
        <div class="title">
          支付宝账户：{{config.alipay}}
          <span class="clipTxt" @click="copyTextShare(config.alipay)">复制</span>
        </div>
        <div class="title">姓名：{{config.withdraw_to_name}}</div>
        <!-- <img @click="showBig=true" class="zfb" :src="config.qrcode" alt="aliPay" /> -->
      </div>
      <div class="accountBox" style="margin-top:0.3rem">
        <p>
          收款账户：{{config.bank_account}}
          <span
            class="clipTxt"
            @click="copyTextShare(config.bank_account)"
          >复制</span>
        </p>
        <p>收款人姓名：{{config.bank_account_name}}</p>
        <p>银行：{{config.bank_name}}</p>
        <p>开户行：{{config.bank_open_name}}</p>
      </div>
      <div class="orderInfo">
        <div class="title">订单信息</div>
        <div class="num">
          数量：
          <span>{{config.coin_num}}</span>
        </div>
        <div class="num">
          支付金额：
          <span>￥{{config.pay_price}}</span>
        </div>
        
         <div class="num">
          订单号：
          <span>{{config.trade_no}}</span>
          <span class="clipTxt" style="color:#fff" @click="copyTextShare(config.trade_no)">复制</span>
        </div>
        <div class="num">
          出售人：
          <span>{{config.sell_mobile}}</span>
          <span class="clipTxt" style="color:#fff" @click="copyTextShare(config.sell_mobile)">复制</span>
        </div>
      </div>
      <div class="orderInfo">
        <div class="title">上传支付凭证</div>
        <!-- <van-uploader
          :after-read="afterRead"
          v-model="fileList"
          @delete="deleteRead()"
          :max-count="3"
        />-->
        <div class="addIcon" @click="upLoad" v-if="imgs.length==0">
          <i class="iconfont icon-add"></i>
        </div>
        <div class="box" v-else>
            <div class="imgBox"  v-for="(item,index) in imgs" :key="index" >
              <img  :src="item" alt />
              <i @click="deleatImg" class="iconfont icon-close"></i>
            </div>
        </div>
        
      </div>
      <div class="botomBox">
            <div class="btn"  @click="shensu" style="background:rgba(153, 153, 153, 1)">提交申诉</div>
           <div class="btn"  @click="submit" >提交支付凭证</div>
           

      </div>
     
    </div>
    <van-popup v-model="Shensupicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="Shensupicker = false"
            @confirm="confirmShensu"
          />
    </van-popup>
    <van-popup v-model="showBig">
      <div id="authReward1">
        <img :src="config.qrcode" alt="支付宝收款码" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
  data() {
    return {
      statusH: 0,
      h: 24,
      m: 59,
      s: 59,
      img: [],
      fileList: [],
      config: [],
      timer: null,
      showBig: false,
      Shensupicker:false,
     // columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],//申诉原因
      columns:[],
      imgs: []
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getConfig();
  },
  methods: {
       confirmShensu(value){
       
         
         this.Shensupicker=false;
          this.$http.post(
          "/amoy/trade/buy-trade-complain",
          {
            order_id: this.$route.query.id,
            complain_reason:value
          },
          true,
          
        ).then(res=>{
          if(res.code==0){
            this.$vux.toast.text(res.msg);
          }
        })
         
       },       
       shensu(){
         Dialog.confirm({
         title: '温馨提示',
           message: '您确认进行申诉吗?',
          }).then(() => {
          // on confirm
           this.Shensupicker=true    
        })
      .catch(() => {
        // on cancel
        this.Shensupicker=false    
      });
         
       
    },
    getConfig() {
      this.$http
        .get(
          "/amoy/trade/tg-upload-pay-info",
          {
            order_id: this.$route.query.id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.config = res.data;
            this.columns=res.data.complain_reason
            let time = res.data.period_time;
            this.imgs=res.data.img_url.split(',')
            this.timer = setInterval(() => {
              time--;
              if (time > 0) {
                console.log(time);
                this.h = this.diffTime(time).h;
                this.m = this.diffTime(time).m;
                this.s = this.diffTime(time).s;
              } else {
                clearInterval(this.timer);
              }
            }, 1000);
          }
        });
    },
    diffTime(d1) {
      let h = parseInt((d1 / 60 / 60) % 24);
      let m = parseInt((d1 / 60) % 60);
      let s = parseInt(d1 % 60);
      return {
        h: h >= 10 ? h : "0" + h,
        m: m >= 10 ? m : "0" + m,
        s: s >= 10 ? s : "0" + s
      };
    },
    /* afterRead(e) {
      var arr = [];
      this.fileList.forEach(e => {
        arr.push(e.content);
      });
      this.img = arr;
    },
    deleteRead() {
      var arr = [];
      this.fileList.forEach(e => {
        arr.push(e.content);
      });
      this.img = arr;
    }, */
    submit() {
      if (this.img.length == 0) {
        return this.$vux.toast.text("请上传凭证！");
      }
      this.$http
        .post(
          "/amoy/trade/tg-upload-pay-info?order_id=" + this.$route.query.id,
          { order_id: this.$route.query.id, trade_img: this.img },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("提交成功！");
            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          }
        });
    },
    upLoad() {
      dsBridge.call("getPicture", ret => {
        if (ret) {
          this.imgs.push(ret);
          this.img.push(ret);
        }
      });
    },
    deleatImg() {
      this.imgs = [];
      this.img = [];
      console.log(this.imgs);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#proof {
  min-height: 100%;
  padding-bottom: 1.2rem;
  .botomBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
  > div {
    width: 2.3rem;
    height: 0.7rem;
   color: #fff;
    border: 1px solid rgba(153, 153, 153, 1);
    font-size: 0.28rem;
   
    line-height: 0.7rem;
    text-align: center;
    float: right;
    
  }
}
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  background: #32303a;

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
.content {
  padding: 0 0.3rem;
  .topBox {
    .time {
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .point_s {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #666;
      }
      .point_m {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #666;
        margin: 0 0.1rem;
      }
      .point_b {
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        background: #666;
      }
      .thunderIcon {
        width: 0.2rem;
        height: 0.25rem;
        //background: url("../../assets/img/l.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
      .endTime {
        margin: 0 0.2rem;
        font-size: 0.25rem;
        font-weight: 700;
        span {
          background: #333;
          border-radius: 0.1rem;
          color: #fff;
          padding: 0.05rem;
        }
      }
    }
  }
  .accountBox {
    background: #fff;
    margin: 0 auto;
    border-radius: 0.1rem;
    padding: 0.3rem;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .zfb {
      width: 2rem;
      height: 3rem;
      border: 1px solid #ccc;
      border-radius: 0.1rem;
      display: block;
      margin: 0.2rem auto;
    }
    .usdtBox {
      display: flex;
      align-items: center;
      background: #f7f7f7;
      border-radius: 0.1rem;
      padding: 0.3rem;
      .copyIcon {
        width: 0.3rem;
        height: 0.4rem;
        //background: url("../../assets/img/copy.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
    }
    p {
      font-size: 0.3rem;
    }
  }
  .orderInfo {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.25rem;
    border-radius: 0.1rem;
    .title {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .num {
      color: #666666;
      font-size: 0.28rem;
      height: 0.5rem;
      line-height: 0.5rem;
      span {
        color: #d6a75e;
      }
    }
    .addIcon {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 1rem;
        color: #ccc;
      }
    }
    .imgBox {
      width: 1.5rem;
      height: 1.5re;
      position: relative;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
      i {
        position: absolute;
        right: -0.3rem;
        top: -0.3rem;
        font-size: 0.5rem;
      }
    }
  }
  .imgBox {
    > img {
      display: block;
      width: 90%;
      margin: 0.2rem auto;
    }
  }
}
.clipTxt {
  padding: 0 0.1rem;
  background: chocolate;
  color: #fff;
  font-weight: normal;
  border-radius: 0.1rem;
  font-size: 0.28rem;
}
.btn {
  width: 5rem;
  height: 0.88rem;
  background: #d6a75e;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.88rem;
  margin: 0 auto;
  margin-top: 0.5rem;
}
#authReward1 {
  width: 5rem;
}
</style>