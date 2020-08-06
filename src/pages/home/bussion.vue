<template>
  <div class="bussion">
    <div class="headerBox">
      <i @click="goBack()" class="iconfont icon-back"></i>
      <div class="box">
        <van-button class="btn">币币交易</van-button>
        <van-button class="btn">法笔交易</van-button>
      </div>
    </div>
    <div class="notice">
        <van-swipe style="height:29px;" vertical :autoplay="3300"  :show-indicators="false">
             <van-swipe-item v-for="item in 6" :key="item">
                 {{item}}匿名用户以**元每枚的价格卖出**枚淘币
             </van-swipe-item>
        </van-swipe>
    </div>
      
    
    <div>
      <div class="banner">
        <div class="title">
          <span class="first">7445.85</span>
          <span class="second">+0.32%</span>
          <img src="../../assets/img/kline.png" alt />
        </div>
        <div class="deep">
          <span style="padding-right:0.6em;">深度</span>
          <van-stepper v-model="value" />
        </div>
      </div>
    </div>
    <div class="tables">
      <table class="buy">
        <tr>
          <th class="first">买</th>
          <th class="secod">数量</th>
          <th style="text-align:right;">价格</th>
        </tr>
        <tr>
          <td class="first">1</td>
          <td class="secod">0.211300</td>
          <td class="three">9404.60</td>
        </tr>
        <tr>
          <td class="first">2</td>
          <td class="secod">1.211300</td>
          <td class="three">9404.90</td>
        </tr>
        <tr>
          <td class="first">3</td>
          <td class="secod">1.211300</td>
          <td class="three">9404.60</td>
        </tr>
        <tr>
          <td class="first">4</td>
          <td class="secod">1.211300</td>
          <td class="three">9404.60</td>
        </tr>
        <tr>
          <td class="first">5</td>
          <td class="secod">1.211300</td>
          <td class="three">9404.60</td>
        </tr>
      </table>
      <table class="sell">
        <tr>
          <th style="text-align:left;">价格</th>
          <th class="secod">数量</th>
          <th class="three">卖</th>
        </tr>
        <tr>
          <td class="first">9404.60</td>
          <td class="secod">0.211300</td>
          <td class="three">1</td>
        </tr>
        <tr>
          <td class="first">9404.90</td>
          <td class="secod">1.211300</td>
          <td class="three">2</td>
        </tr>
        <tr>
          <td class="first">9404.60</td>
          <td class="secod">1.211300</td>
          <td class="three">3</td>
        </tr>
        <tr>
          <td class="first">9404.60</td>
          <td class="secod">1.211300</td>
          <td class="three">4</td>
        </tr>
        <tr>
          <td class="first">9404.60</td>
          <td class="secod">1.211300</td>
          <td class="three">5</td>
        </tr>
      </table>
    </div>
    <div class="trnd">
        <van-tabs v-model="active" title-inactive-color="#999" title-active-color="#333" line-width="1rem">
            <van-tab title="限价委托" name="a">
                <ul >
                    <li class="trend_first">
                        <p style="font-weight:500;">买入</p>
                        <van-stepper v-model="value" />
                        <div class="text">
                            
                            <van-field v-model="text" placeholder="请输入买入数量"  />
                        </div>
                        <p class="title">可用6300.02</p>
                        <p style="padding-top:0;">交易额 7400</p>
                        <van-button class="btn" >买入</van-button>
                    </li>
                   <li class="trend_first">
                        <p style="font-weight:500;">卖出</p>
                        <van-stepper v-model="value" />
                        <div class="text">
                            
                            <van-field v-model="text" placeholder="100(手续费30%)"  />
                        </div>
                        <p class="title">可用6300.02</p>
                        <p style="padding-top:0;">交易额 --</p>
                        <van-button class="btn"  style="background:#E65459">卖出</van-button>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="市价委托" name="b">
                   <ul >
                    <li class="trend_first">
                        <p style="font-weight:500;">买入</p>
                        <van-stepper v-model="value" />
                        <div class="text">
                            
                            <van-field v-model="text" placeholder="请输入买入数量"  />
                        </div>
                        <p class="title">可用6300.02</p>
                        <p style="padding-top:0;">交易额 7400</p>
                        <van-button class="btn" >买入</van-button>
                    </li>
                   <li class="trend_first">
                        <p style="font-weight:500;">卖出</p>
                        <van-stepper v-model="value" />
                        <div class="text">
                            
                            <van-field v-model="text" placeholder="100(手续费30%)"  />
                        </div>
                        <p class="title">可用6300.02</p>
                        <p style="padding-top:0;">交易额 --</p>
                        <van-button class="btn"  style="background:#E65459">卖出</van-button>
                    </li>
                </ul>
            </van-tab>
         </van-tabs>
    </div>
    <div class="mian">
        <div class="tent">
            <span>当前委托</span>
             <span>全部</span>
        </div>
       <ul class="show">
           <li v-for=" i in 3" :key="i">
               <div class="time">
                   <span>2019-10-26 13:38</span>
                   <span>已成交</span>
               </div>
               <table width="6.28rem">
                   <tr>
                       <td>委托量</td>
                       <td>委托价</td>
                       <td>成交量</td>
                       <td>成交均价</td>
                   </tr>
                   <tr>
                       <td>100</td>
                       <td>78.00</td>
                       <td>90</td>
                       <td>77.5</td>
                   </tr>
               </table>  
               <div class="btn">
                   <van-button type="default">撤销</van-button>  
               </div>
               
           </li>
           
       </ul>
    </div>
    






  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 1,
      active:'a',
      text:'',
    };
  },
  created() {


     
  },

  methods: {}
};
</script>
<style lang="less" scoped>
.headerBox {
  width: 100%;
  height: 1.28rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: linear-gradient(-90deg, rgba(35, 32, 39, 1), rgba(55, 53, 64, 1));
  h1 {
    font-size: 0.34rem;
    color: #333;
    text-align: center;
    line-height: 1.28rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 1.28rem;
    line-height: 0.35rem;
    color: #fff;
    line-height: 1.28rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
  .box {
    width: 3.88rem;
    height: 0.6rem;
    margin: auto;
    display: flex;
    padding-top: 0.56rem;

    border-radius: 0.08rem;
    .btn {
      width: 1.94rem;
      color: #fff;
      height: 0.6rem;
      font-size: 0.3rem;
      background: rgba(38, 35, 43, 1);
      border: 1Px solid rgba(153, 153, 153, 1);
      &:first-of-type {
        border-right: 1Px;
      }
    }
  }
}
.bussion {
  padding-top: 1.28rem;
  background: rgba(223, 223, 223, 1);
  min-height: 100vh;
  .notice {
    text-align: center;
    height: 0.58rem;
    line-height: 0.58rem;
  }
  .banner {
    padding: 0.33rem 0.23rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .deep {
      display: flex;
      span {
        font-size: 0.24rem;
        color: rgba(51, 51, 51, 1);
      }
      .van-stepper{
          height: 0.36rem;
          border: 0.02rem solid rgba(171, 171, 171, 0.78);
          /deep/.van-stepper__input{
             margin:0; 
             height: 0.36rem;
             background: #fff;
         }
         /deep/button{
             height: 0.36rem;
             background:#fff;
         }
      }
      
    }
    .title {
      position: relative;
      .first {
        font-size: 0.36rem;
        font-weight: bold;
        color: rgba(52, 148, 123, 1);
        padding-right: 1.2rem;
      }
      .second {
        position: absolute;
        top: 0.06rem;
        left: 1.64rem;
        background: rgba(52, 148, 123, 0.2);
        height: 0.44rem;
        line-height: 0.48rem;
        border-radius: 0.06rem;
        color: #34947b;
        font-size: 0.24rem;
      }
      img {
        width: 0.4rem;
        height: 0.36rem;
      }
    }
  }
  .tables {
    display: flex;
    padding: 0 0.23rem;
    background: #fff;
    table {
      color: #999;
      tr {
        th {
          font-weight: 400;
          font-size: 0.2rem;
        }
      }
    }
    .buy {
      tr {
        .first {
          width: 0.6rem;
          text-align: left;
        }
        .secod {
          width: 2rem;
          text-align: left;
        }
        .three {
          color: #3ca586;
        }
      }
    }
    .sell {
      tr {
        .first {
          width: 1.8rem;
          text-align: left;
          color: #cb4c68;
        }
        .three {
          width: 0.6rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
<style lang="less">
.bussion{
   
    .trnd{
        background: #fff;
        padding:0 0.5rem;
        ul{
            display: flex;
            justify-content: space-between;
           
        }
         .van-tabs__line {

        background: #666;
    
        }  
        .van-stepper{
            display: flex;
            >input{
                order:-1;
                width: 1.76rem;
                height: 0.64rem;
                background: transparent;
                border:0.02rem solid rgba(171, 171, 171, 0.78);
                border-radius:0.04rem;
                margin: 0;
                color:#666;
            }
            >button{
                 background: transparent;
                height: 0.64rem;
               
            }
            .van-stepper__minus{
                order: 2;
                 border:0.02rem solid rgba(171, 171, 171, 0.78);
                 border-radius: 0 0.04rem 0.04rem 0;
                 border-left: 0;
            }
            .van-stepper__plus{
                border-top:0.02rem solid rgba(171, 171, 171, 0.78);
                border-bottom: 0.02rem solid rgba(171, 171, 171, 0.78);
                border-radius: 0;
                
            }
        }
        .trend_first{
            p{
              font-size: 0.2rem;
              padding: 0.28rem 0; 
              color:#2D2933; 
            }
            .text{
                padding-top: 0.2rem;
                .van-cell{
                    width:2.9rem;

                    padding:0.12rem 0.2rem;
                    border:0.02rem solid rgba(171, 171, 171, 0.78);
                    border-radius:0.04rem;
                  input::placeholder{
                      color:#CDCDCD;
                  }
                }
            }
            .title{
                font-size:0.26rem;
                padding-bottom: 0.2rem;
                color:rgba(102,102,102,1);

            }
            .btn{
                width:2.9rem;
                height:0.64rem;
                line-height: 0.64rem;
                text-align: center;
                background:rgba(73,136,189,1);
                border-radius:0.04rem;
                color:#fff;
                margin-bottom: 0.29rem;
            }
        }
    }
    .mian{
        border-top: 0.02rem solid #F2F2F2;
        background: #F2F2F2;
      .tent{
          padding:0 0.35rem;
          height: 0.8rem;
          background: #fff;
          display: flex;
          justify-content: space-between;
          span{
            font-size:0.3rem;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:0.8rem;
          }
      }
       .show{
        padding: 0 0.25rem;
        padding-bottom:0.36rem ;
        li{
            background: #fff;
            margin-top: 0.2rem;
           
            border-radius:0.1rem;
            padding:  0.36rem ;
            .time{
                display: flex;
                justify-content: space-between;
                span:first-of-type{
                   
                    font-size:0.3rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                   
                }
                  span:last-of-type{
                    font-size:0.28rem;
                    font-weight:500;
                    color:rgba(230,84,89,1);
             
                   
                }
            }
            table{
                widows: 6.28rem;
                margin-top: 0.2rem;
                text-align: center;
                tr{
                    &:last-of-type{
                        color:#666;
                    }
                     &:first-of-type{
                        color:#333;
                    }
                    td{
                    height: 0.6rem;
                   }
                }
                
            }
        }
        .btn{
            padding-top: 0.1rem;
            display: flex;
            justify-content: flex-end;
            .van-button--default{
                width:1rem;
                height:0.44rem;
                background:rgba(255,255,255,1);
                line-height: 0.44rem;
                padding: 0;
                font-size:0.26rem;
                color:#666;
                border:0.02rem solid rgba(102,102,102,1);
                border-radius:0.1rem;
            }
        }
       }
    }
   
}
</style>
