<template>
  <div class="search" >
     <div class="bg"  :style="{paddingTop: $store.state.global.statusH +0.88+ 'rem'}">
      
         <div class="headerBox"  :style="{paddingTop: $store.state.global.statusH + 'rem'}">
                <i @click="goBack" class="iconfont icon-back"></i>
                <h1>团队搜索</h1>
        </div>
         <form action="/">
                <van-search
                    v-model.trim="value"
                    show-action
                    background="#28272F"
                    shape="round"
                    input-align="center"
                    placeholder="输入手机号码搜索"
                    @search="onSearch"
                     @cancel="value=''"
                >
                <div ref="btn" style="color:#fff;font-size:0.32rem;width:100%;height:100%;background:rgb(40, 39, 47);" slot="action" @click="onSearch">搜索</div>
                </van-search>
           </form>
     </div>
      <main  :style="{top: $store.state.global.statusH +2.54+ 'rem'}" >
          <div class="content" id="empty" v-if="dataList.mobile">
                <ul>
                    <li >
                        <div class="img">
                            <img :src="dataList.avatar" alt="">
                        </div>
                        <div class="text">
                            <h4>{{dataList.mobile}}</h4>
                            <p>{{dataList.created_at}}</p>
                        </div>
                        <aside @click="callphone(dataList.mobile)" >联系TA <van-icon name="arrow" /></aside>
                  </li>
                </ul>
          </div>
          <div class="imgs" v-if="show" style="text-align:center;color:#666;margin-top:1.6rem;">
            <!-- <img src="../../../static/none.png" alt=""> -->
            <van-image width="3rem" height="3rem" src="./static/none.png" />
            <p >暂无数据</p>
          </div>
      </main>
  </div>
</template>
<script>
import {contactService,showNativeToast} from '@/utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
let dom;
export default {
   components: {
			    MescrollVue 
		},
  data() {
    return {
      
       value:'',
       dataList: {}, // 列表数据
       show:false,
    };
  },
  created() {
      
  },
  mounted:()=>dom= document.querySelector('.bg .van-icon-search').style,
  methods: {
    onSearch(){
      this.show=false;
       if (!this.value.length) return  showNativeToast('请先输入您要搜索的内容');
       if(!/\d{11}/.test(this.value)) return  showNativeToast('请先输入正确手机号');
       this.upCallback()
    },
    callphone:number=>contactService(number),
    upCallback () {
      
			      this.$http
        .post(
          "/amoy/poundage/team-search",
          {
           keywords:this.value
          },
          true,
          true
        )
        .then(res => {
          if (res.code === 0) {
            this.value=''
            //if(JSON.stringify(res.data)=="[]" || JSON.stringify(res.data)=="{}")return showNativeToast('暂无团队')
            if (Object.keys(res.data).length == 0) return this.show=true;
            this.dataList=res.data
          
         
          }
        })
        
			 }
    
    
  },

  // watch:{
  //   value:n=>!n.length?dom.display='block':dom.display='none'
  // }
  watch:{
    value(n,o){
      if(n.length>1)return
      if(n.length==0)dom.display='block'
      if(n.length==1)dom.display='none'
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
 background:rgba(40,39,47,1);
  
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



</style>
<style lang="less">
.search{
  .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
     position: absolute;
     left:60px;
     color: #666;
     font-size: 20px;
    }
   
    min-height: 100vh ;
   background:rgba(247,244,248,1);

    *{
        box-sizing: border-box;
    }
    .bg{
        height: 1.7rem;
        background:rgba(40,39,47,1); 
        box-sizing: content-box;
        box-si
        .van-field__control{
           &::placeholder{
           color:#666;
          }
        }  
    }
    .van-search{
         padding:0.66rem 0.3rem 0 0.6rem;
        
    }
      .content{
         ul{
             width: 7rem;
             margin: 0 auto;
             padding-bottom: 0.72rem;
             li{
                 display: flex;
                 flex-wrap: nowrap;
                 align-items: center;
                 margin-top:0.3rem;
                height:1.4rem;
                background:rgba(255,255,255,1);
                box-shadow:0.04rem 0.04rem 0.2rem 0rem rgba(210,210,210,0.39);
                border-radius: 0.1rem;
                padding:0.24rem 0.3rem;
                .img{
                    width: 0.96rem;
                    height: 0.96rem;
                    margin-right:0.26rem;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .text{
                     font-size: 0.28rem;
                     display: flex;
                     flex-direction: column;
                    // justify-content: space-between;
                    h4{
                       font-weight: 500;
                        color:#333;
                        line-height: 32px;
                        margin-top: -2px;
                    }
                    p{
                        color: #888;
                        
                    }
                }
                aside{
                  padding-left: 0.9rem;
                    font-size: 0.32rem;
                    color: #333;
                }
             }
         }
          
  
      }
    .van-search__action{
        padding: 0;
        margin-left: 0.2rem;
    }  
    


}
</style>