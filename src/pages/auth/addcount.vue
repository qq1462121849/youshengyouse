<template>
  <div id="addcount">
    <div class="headerBox" >
      <i @click="goBack()" class="iconfont icon-back"></i>
      <h1>账户扩容</h1>
    </div>
    <div class="content">
        <div class="nav">
             
            <div class="img">
              <van-image round width="1rem" height="1rem" src="../../assets/img/auth/invite.png"/>
               <!-- <van-image round width="1rem" height="1rem" src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3282272331,4221411858&fm=85&app=92&f=JPG?w=121&h=75&s=EB738E50C94AF6CE44C218C30300E0F8"/> -->
            </div>
            <div class="title">
                <h4>李斯特烦恼</h4>
                <span>当前GST上限：</span>
                <span>100GST</span>
            </div>
        </div>
    </div>
    <div class="show">
        <p>当前拓容次数：<span>2次</span> </p>
        <p>剩余拓容次数：<span>3次</span> </p>
        <p>每次拓容增加GST上限：<span>50GST</span> </p>
    </div>
  
     <van-button class="btn" type="primary">支付50TG</van-button>
  </div>
</template>
<script>

export default {
  components: {
   
  },
  data() {
    return {
  
    };
  },
  mounted() {
    
  },
  methods: {
   
   
  }
};
</script>
<style lang="less" scoped>
#addcount {
    *{
        box-sizing: border-box;
    }
  min-height: 100vh;
  background: #fff;
  background:#F2F2F2 ;
  .headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  color: #fff;
  padding-bottom: 0.4rem;
  background:linear-gradient(-90deg,rgba(35,32,39,1),rgba(55,53,64,1));
  h1 {
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  span {
    position: absolute;
    right: 0.3rem;
    top: 0;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #bebdc4;
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

}
#addcount{
    padding-top: 0.88rem;
    .content{
        padding:10px 15px 0;
        .nav{
            height: 90px;
            background: url('../../assets/img/auth/contbg.png') no-repeat left top/cover;
            display: flex;
            .title{
                 margin-top: 20px;
                 margin-left: 12px;
                h4{
                    font-size:15px;
                    color:#fff;
                }
                span{
                    &:first-of-type{
             
                    font-size:11px;
                    font-weight:500;
                    color:rgba(102,102,102,1); 
                    }
                      &:last-of-type{
                        font-size:14px;
                        font-weight:bold;
                        color:rgba(216,173,108,1); 
                    }
                }
            }
            .img{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                margin-left:23px;
                margin-top: 20px;
              
            }
        }
    }
    .show{
        margin:15px 15px 0;
        background: #fff;
        padding:20px 15px;
        border-radius: 5px;
    }
    .btn{
      margin-left: 50%;
      transform: translateX(-50%);
        border: 0;
       width:250px;
       margin-top: 93px;
        height:44px;
        font-size:17px;
        line-height: 44px;
        background:rgba(214,167,94,1);
        border-radius:4px; 
        color:#fff;
    }
}

  
  
 

</style>

