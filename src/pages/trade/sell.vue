<template>
  <div id="exchange">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back"></i>
       <h1>{{$route.query.type==1?'出售TG':'出售GST'}}</h1>
    </div>
    <div class="dealBox" :style="{marginTop: statusH+1 + 'rem'}">
      <div class="balance" v-if="$route.query.type<4">
        <h2>{{config.balance}}</h2>
        <p>可出售余额</p>
      </div>
      <div class="label">
        <span>单价</span>
        <p>{{config.unit_price}} {{$route.query.type==1?'CNY':'TG'}}</p>
      </div>
      <label class="label" for="num">
        <span>数量</span>
        <!-- <input type="number" id="num" v-model="num" :placeholder="$t('buy.txt')" /> -->
        <p>{{(config.coin_num*1).toFixed(2)}} {{$route.query.type==1?'TG':'GST'}}</p>
      </label>
      <div class="label">
        <span>总价</span>
        <p>{{config.total_price}} {{$route.query.type==1?'CNY':'TG'}}</p>
      </div>
    </div>
    <div class="txtTip">{{config.message}}</div>
    <div class="btn" @click="submit">确认</div>

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '8rem' }"
      close-icon="cross"
      closeable
    >
      <div class="title">请输入交易密码</div>
      <div class="pwdBox">
        <van-password-input :value="pwd" :focused="showKeyboard" @focus="showKeyboard = true" />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </van-popup>
     <van-popup  class="pup_login" v-model="showb" :style="{ height: '30%',width:'70%' }"    >
          <div class="tips" >短信验证码确认</div>
           <div class="phone">
                <input  type="number"  disabled v-model.trim="formData.mobile"  />
                <span class="img"></span>
			    </div>
            <div class="password">
                  <input type="text"  v-model.trim="sms_code"  placeholder="请输入验证码"/>
                  <span class="img passimg"></span>
                  <span class="sm_code" :class="[load ? '' : 'txt_hui']" @click="getCode">{{codeContent}}</span>
		    	</div>
          <van-button class="btn_sure"  @click="sure">确认</van-button>
      </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusH: 0,
      num: 1000000,
      price: 1,
      config: [],
      pwd: "",
      showKeyboard: false,
      show: false,
      showb:false,
      codeContent:'发送验证码',
      formData:{
        type:'lock_tg_trade',
        mobile:'',
      },
      sms_code:'',
      	load:true,
    };
  },
  created() {
    this.getConfig();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next(vm => {
      if (from.name == "orderInfo") {
        vm.$router.go(-1);
      }
    });
  },
  methods: {
    countDown(num){
				if(num>0){
					this.codeContent = '重新获取' + num + 's'
					setTimeout(()=>{
						this.countDown(num-1)
					},1000)
				}else{
					this.codeContent='发送验证码'
					this.load = true
				}
      },
      getCode(){
				if(this.load){
			
					if(!/(^1[[0-9]{10}$)/.test(this.formData.mobile))
				   	return	  this.$vux.toast.text("请输入正确的手机号码");
					
          this.load = false;
          this.$http.post("/amoy/auth/sms-verifycode",this.formData,true).then(res=>{
              if(res.code==0){
              this.$vux.toast.text("发送成功");
						
							this.countDown(60)
						}else{
							this.load = true;
							
						}	
          }).catch(() => {
						this.load = true;
					})
				
				}
			},
    getConfig() {
      let url = "";
      if (this.$route.query.type ==1) {
        url = "/amoy/trade/tg-order-detail";
      } else {
         url = "/amoy/trade/sell-order-detail";
      }
      this.$http
        .post(
          url,
          {
            order_id: this.$route.query.id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.config = res.data;
            this.formData.mobile=res.data.my_mobile
          }
        });
    },
    submit() {
      this.showb=true


    },
    sure(){
      this.showb=false
      
      this.show = true;
      this.showKeyboard = true;
      
    },
    onInput(key) {
      this.pwd = (this.pwd + key).slice(0, 6);
      if (this.pwd.length == 6) {
        let url = "";
        if (this.$route.query.type ==1) {
          url = "/amoy/trade/lock-tg-order";
        } else {
          url = "/amoy/trade/lock-sell-order";
        }
        this.showKeyboard = true;
        this.show = false;
        this.$http
          .post(
            url,
            {
              order_id: this.$route.query.id,
              pay_password: this.pwd,
              sms_code:this.sms_code
            },
            true,
            true
          )
          .then(res => {
            if (res.code == 0) {
              this.sms_code=''
              this.$vux.toast.text("提交成功！");
              if (this.$route.query.type > 3) {
                this.$router.push("/newPayProof?id=" + this.$route.query.id);
              } else {
                setTimeout(() => {
                  this.goBack();
                }, 500);
              }
            }
          });
      }
    },
    onDelete() {
      this.pwd = this.pwd.slice(0, this.pwd.length - 1);
    }
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  background: rgba(40, 39, 47, 1);
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
.dealBox {
  background: #fff;
  .balance {
    height: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    h2 {
      width: 100%;
      text-align: center;
      font-size: 0.6rem;
    }
    p {
      width: 100%;
      font-size: 0.3rem;
      text-align: center;
      color: #666;
    }
  }
  .label {
    width: 7.1rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    border-bottom: 1px solid #eee;
    span {
      font-size: 0.28rem;
      color: #333;
    }
    p {
      color: #d6a75e;
      font-size: 0.3rem;
    }
    input {
      text-align: right;
      width: 4rem;
      font-size: 0.3rem;
      border: none;
      color: #d6a75e;
    }
  }
}
.txtTip {
  padding-left: 0.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #aaa;
}
.btn {
  width: 5rem;
  height: 0.88rem;
  background: linear-gradient(-75deg, #d6a75e, #d6a75e);
  color: #fff;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.34rem;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.van-popup {
  .title {
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.3rem;
    font-size: 0.3rem;
  }
  .pwdBox {
    .van-password-input {
      margin: 0;
      width: 100%;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      li {
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        border: 1px solid #aaa;
        -webkit-flex: none;
        border-radius: 0.1rem;
        margin: 0 0.1rem;
      }
      .van-hairline--surround::after {
        border-width: 0;
      }
    }
  }
}
</style>
<style lang="less" scoped>

.pup_login{
  border-radius: 0.2rem;
  padding:0.33rem;
  input{
      padding-left: 0.1rem;
      height: 0.6rem;
        border:1px solid #ddd;
       
    }
  .phone{
     margin-top: 0.4rem;
     input{
       width: 5rem;
       margin-bottom: 0.4rem;
        border-radius: 0.1rem 0 0 0.1rem;
     }
    
  }
  .password{
    display: flex;
    flex-wrap: nowrap;

    input{
      width: 3.4rem;
    }
    .sm_code{
      color:#fff;
      height: 0.63rem;
      display: inline-block;
      line-height: 0.63rem;
      // margin-top: -0.12rem;
      width: 1.55rem;
      text-align: center;
      border-radius: 0 0.1rem  0.1rem 0;
      background: linear-gradient(#e3b97d, #f0d6a0);
    }
  }
  .btn_sure{
    width: 5rem;
    color: #fff;
     background: #e5b875;
     text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
      margin-top: 0.6rem;
  }
  .tips{
    text-align: center;
    font-size: 0.28rem;
  }
}
</style>