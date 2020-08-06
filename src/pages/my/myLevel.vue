<template>
  <div id="myLeavel"  :style="{paddingTop:0.88+$store.state.global.statusH+'rem'}">
    <div class="headerBox" :style="{paddingTop:$store.state.global.statusH+'rem'}">
      <i @click="goBack" class="iconfont icon-back"></i>
      <h1>达人身份</h1>
    </div>
    <div class="content">
        <div class="avator">
            <van-image width="1rem" height="1rem" round :src="avatar" />
            <div class="title">
                <p> 当前等级 <span>{{title}}</span> </p>
            </div>
        </div>
        <div class="leavel">
             <div class="lefts">
                 <p>等级</p>
                 <p style="font-size:0.2rem;">手续费分红</p>
              </div>
              <div class="contain">
                  <van-swipe   :show-indicators="false" :loop="false" :width="width"  :initial-swipe="swiperindex==-1?0:swiperindex">
                        <van-swipe-item  v-for="(item, index) in arr" :key="index"   >
                           <div class="text">
                               <div class="boxs  " v-if="item.title==title">
                                  <van-image width="0.68rem" height="0.68rem" round :src="avatar" />
                                  <span class="ss" style="overflow:hidden;">{{item.title}}</span>
                                  <span class="round " id="te" v-if="index!=arr.length-1"></span>
                              </div>
                              <div class="box" v-else>
                                 <span class="round"  > 
                                      <span class="texthidden">{{item.title.indexOf('合')>-1?'合':item.title}}</span>
                                     <span v-if="index!=arr.length-1" class="color"></span>
                                 </span>
                              </div>
                              <p>{{item.global_rate}}%</p>
                           </div>
                        </van-swipe-item>
                 </van-swipe>
              </div>   
        </div>
        
    </div>
    
    <div class="upgrade" >
        <p class="bragde">达人身份</p>
        <ul v-for="(item,index) in arr" :key="index">
            <li>
                <p>达人身份：{{item.title}}</p>
            </li>
            <li>
                <i >升级条件：</i>  <p><span>直推人数><span>{{item.direct_num}}</span></span>  <span>伞下活跃度><span>{{item.team_num}}</span></span> <span>小区活跃度><span>{{item.team_points_num}}</span></span></p>
            </li>
            <li>
               <p>等级权益: </p> 
               <div>  
                  全网交易手续费{{item.global_rate}}%分红  <br>
                    (赠送：{{item.send_num}}张{{item.machine}})
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
       width:document.documentElement.clientWidth *56/375,
       //arr:[1,2,3,4,5,6,7,8],
        arr:[],
       title:'',
       avatar:'',
       swiperindex:0,
      
    };
  },
  created() {
     this.getlevel()
     
  },
  methods: {
    async getlevel(){
       let res= await this.$http.post('/amoy/poundage/mem-level',{},true,true)
       if(res.code==0){
           this.arr=res.data.mem_levels
           this.avatar=res.data.avatar
           this.title=res.data.level_title
           this.swiperindex=this.arr.findIndex(item=>item.title==this.title)
          
       }
     }
  },
  computed:{
      
  }
};
</script>
<style lang="less" scoped>
#myLeavel{
    .headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background:#322E32;
  box-sizing: content-box;
  
  h1 {
    font-size: 0.34rem;
    color: #fff;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
  .iconfont {
    width: 0.2rem;
    height: 0.88rem;
    line-height: 0.35rem;
    color: #fff;
    line-height: 0.88rem;
    font-size: 0.35rem;
    position: absolute;
    left: 0.3rem;
  }
}
}
#myLeavel{
    background:rgba(247,247,247,1);
    min-height: 100vh;
    background: url('../../assets/img/my/Mask.png') no-repeat top left/7.5rem 3.6rem;
   
    *{
        box-sizing: border-box;
    }
    .content{
        padding: 0.3rem ;
        .avator{
            padding-left: 0.2rem;
             display: flex;
             .title{
                 font-weight:500;
                 margin-left: 0.23rem;
                 color: #fff;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-around;
                 font-size: 0.3rem;
                 span{
                     color:#FFB93C;
                     padding-left: 0.1rem;;
                 }
             }
        }
        .leavel{
            height: 2.12rem;
            margin-top: 0.37rem;
            background:linear-gradient(90deg,rgba(188,154,94,1) 0%,rgba(229,197,131,1) 100%);
            border-radius:0.2rem;
            padding: 0.3rem;
            display: flex;
            .lefts{
               color:rgba(247,247,247,1);
                flex-basis: 1.3rem;
                display: flex;
                font-size: 0.24rem;
                flex-direction: column;
                justify-content: space-between;
               p:first-of-type{
                   padding-top: 0.15rem;
               }
                
            }
            .contain{
                width: 4.94rem;
                .text,
                .van-swipe{
                    height: 100%;
                }
               .texthidden{
                      overflow: hidden;
                       width: 0.46rem;
                        height: 0.46rem;
                        display: inline-block;
                        text-align: center;
                        border-radius: 50%;
               }
                
                .text{
                    position: relative;
                  flex-direction: column;
                    display: flex;
                    justify-content: space-between;
                    p{
                       
                        font-size:0.24rem;
                        font-weight:500;
                       
                        color:rgba(106,48,12,1);
                    }
                    .box{
                        display: flex;
                        padding-top: 0.1rem;
                        align-items: center;
                        flex-direction: row;
                        span{
                            width:0.46rem;
                            height:0.46rem;
                            font-size:0.24rem;
                            color:rgba(106,48,12,1);
                            line-height: 0.46rem;
                            text-align: center;
                            background:linear-gradient(180deg,rgba(250,194,94,1) 0%,rgba(222,154,27,1) 100%);
                            border-radius:50%;
                        }
                       
                    }
                    .boxs{
                        position: relative;
                        .ss{
                            z-index: 6;
                        }
                        span{
                            position: absolute;
                            bottom: 0rem;
                            left: 0.1rem;
                           
                            width:0.48rem;
                            height:0.22rem;
                            line-height: 0.2rem;
                            text-align: center;
                            font-size:0.2rem;
                            font-weight:500;
                            color:rgba(106,48,12,1);
                            background:linear-gradient(-54deg,rgba(250,194,94,1),rgba(222,154,27,1));
                            border-radius:0.1rem;
                           
                        }
                    }
                
                      .box>.round{
                        position: relative;
                        .color{
                            content:'';
                            display:inline-block;
                            width: 0.66rem;
                            height: 0.06rem;
                            position: absolute;
                            right: -0.66rem;
                            top:0.2rem;
                            background:rgba(255,185,60,1);
                            border-radius: 0;
                        }
                    }
                    #te{
                        position:absolute;
                        background:rgba(255,185,60,1);
                       bottom: 0.4rem;
                       left: 0.64rem;
                       height: 0.06rem;
                       z-index: -1;
                       
                    }
                }
               
            }
        }
    }
    .upgrade{
        padding: 0 0.31rem 0.4rem;
        .bragde{
            height: 0.32rem;
            border-left:0.06rem solid rgba(213,181,117,1);
            font-size:0.32rem;
            line-height: 0.32rem;
            font-weight: 500;
            color:rgba(51,51,51,1);
            padding-left: 0.18rem;
            margin:0.29rem 0;
        }
        ul{
            border-radius: 0.1rem;
            overflow: hidden;
            margin-top: 0.2rem;
            >li{
            background: #fff;
            min-height: 1rem;
            border-bottom: 0.02rem solid #ddd;
            padding-top: 0.2rem;
            padding-left: 0.3rem;
            &:first-of-type{
                font-size:0.3rem;
                font-weight:bold;
                color:rgba(106,48,12,1);
            }
            &:nth-of-type(2){
                 height: 1.32rem;
                 display: flex;
                 i{
                   
                    display: inline-block;
                    font-style:normal;
                    
                    width: 1.5rem;
                     min-height: 1.32rem;
                    }
              
                p{ 
                  
                    font-size:0.26rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    display: flex;
                      flex-wrap: wrap;
                    flex-direction: row;
                    
                    >span{
                      
                        color:rgba(51,51,51,1);
                        padding:0  0.1rem;
                        font-size:0.24rem;
                    }
                }
                
            }
             &:nth-of-type(3){
                 display: flex;
                 height: 1.32rem;
                 p{
                     font-size:0.26rem;
                    height: 1rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    padding-right: 0.12rem;
                 }
                
                div{
                    font-size:0.24rem;
                     color:rgba(102,102,102,1);
                     line-height: 0.46rem;
                     padding-left: 0.22rem;
                }
                
            }
          }
            }

    }
    

.van-image--round img{
    z-index: 3;
}
}


</style>