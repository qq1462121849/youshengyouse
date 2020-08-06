<template>
  <div id="trading" ref="trading">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="toBack()" class="iconfont icon-back"></i>
      <h1>
        DLT/TSC
        <span>{{dealInfo.inc_rate>0?'+'+dealInfo.inc_rate:dealInfo.inc_rate}}%</span>
      </h1>
      <p :style="{top: statusH + 'rem'}" @click="jumpTo('recharge?type=1')">法币交易</p>
    </div>
    <div class="content" :style="{marginTop: statusH+0.88 + 'rem'}">
      <transition>
        <div v-show="tabIndex==1" class="bbjiaoyi">
          <!-- <div class="bbTitle">
            <marquee v-if="rollList.length>0" :interval="3000">
              <marquee-item v-for="(item, index) in rollList" :key="index">{{item}}</marquee-item>
            </marquee>
            <div v-else>暂无交易数据~</div>
          </div>-->
          <!-- <div class="tradingInfo">
            <div class="priceInfo">
              <div class="price_top">
                <p class="price1">{{dealInfo.guide_price}}</p>
                <p class="increase">{{dealInfo.inc_rate>0?'+'+dealInfo.inc_rate:dealInfo.inc_rate}}%</p>
                <i class="kIcon" @click="jumpTo('kLine')"></i>
                <span>深度</span>
                <x-number :min="1" class="numInput" :fillable="true" v-model="page"></x-number>
              </div>
              <div class="price_bot">
                <div class="_bot_left">
                  <div class="__title">
                    <div class="buyNum">买</div>
                    <div class="num">数量</div>
                    <div class="price">价格</div>
                  </div>
                  <div
                    class="priceListInfo"
                    v-for="(item, index) in dealList.buyOrder"
                    :key="index"
                  >
                    <div class="buyList">{{index+1+5*(page-1)}}</div>
                    <div class="numList">{{item.num}}</div>
                    <div class="priceList">{{item.sell_price}}</div>
                  </div>
                </div>
                <div class="_bot_right">
                  <div class="__title">
                    <div class="price">价格</div>
                    <div class="num">数量</div>
                    <div class="buyNum">卖</div>
                  </div>
                  <div
                    class="priceListInfo"
                    v-for="(item, index) in dealList.sellOrder"
                    :key="index"
                  >
                    <div class="priceList">{{item.sell_price}}</div>
                    <div class="numList">{{item.num}}</div>
                    <div class="buyList">{{index+1+5*(page-1)}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="switchTab">
              <div class="tabTitle">
                <tab active-color="#d8ad6c" custom-bar-width="50px" default-color="#666666">
                  <tab-item selected @on-item-click="onItemClick">限价委托</tab-item>
                  <tab-item @on-item-click="onItemClick">市价委托</tab-item>
                </tab>
              </div>
              <div class="tabBox">
                <div v-show="tabbarIndex==1" class="tab1">
                  <div class="tableft">
                    <p class="tabLeftTitle" style="color:#666">买入</p>
                    <x-number :min="0" class="intoNUm" :fillable="true" v-model="buyintoNums"></x-number>
                    <span style="display:block;margin-top:0.23rem;color:#666">单价</span>
                    <input
                      ref="input1"
                      type="number"
                      :placeholder="inputTxtTip"
                      v-model="buyintoPrice"
                      @blur="watchInput(1)"
                    />
                    <p class="canuse">tsc余额{{credit2}}</p>
                    <div class="buyIntoBtn" @click="dealGoods(1,1)">买&nbsp;&nbsp;&nbsp;入</div>
                  </div>
                  <div class="tabright">
                    <p class="tabLeftTitle" style="color:#666">卖出</p>
                    <x-number :min="0" class="intoNUm" :fillable="true" v-model="sellNums"></x-number>
                    <span
                      style="font-size:0.2rem;display:block;height:0.6rem;color:#666
                      "
                    >手续费:{{$store.state.user.userInfo.charge}}%，实际支付:{{(sellPrice*(1+$store.state.user.userInfo.charge/100)).toFixed(2)}}</span>
                    <input
                      type="number"
                      :placeholder="inputTxtTip"
                      v-model="sellPrice"
                      @blur="watchInput(2)"
                      ref="input2"
                    />
                    <p class="canuse">DLT余额{{(credit3*1).toFixed(5)}}</p>
                    <div
                      class="buyIntoBtn"
                      style="background:linear-gradient(90deg,rgba(121,119,125,1) 0%,rgba(67,69,68,1) 100%);color:#d8ad6c"
                      @click="dealGoods(1,9)"
                    >卖&nbsp;&nbsp;&nbsp;出</div>
                  </div>
                </div>
                <div v-show="tabbarIndex==2" class="tab2">
                  <div class="tableft">
                    <p class="tabLeftTitle" style="color:#666">买入</p>
                    <x-number :min="0" class="intoNUm" :fillable="true" v-model="buyintoNums"></x-number>
                    <span style="display:block;margin-top:0.23rem;color:#666">单价</span>
                    <input type="number" v-model="dealInfo.guide_price" disabled />
                    <p class="canuse">tsc余额{{credit2}}</p>
                    <div class="buyIntoBtn" @click="dealGoods(2,1)">买&nbsp;&nbsp;&nbsp;入</div>
                  </div>
                  <div class="tabright">
                    <p class="tabLeftTitle" style="color:#666">卖出</p>
                    <x-number :min="0" class="intoNUm" :fillable="true" v-model="sellNums"></x-number>
                    <span
                      style="font-size:0.2rem;display:block;height:0.6rem;color:#666
                      "
                    >手续费:{{$store.state.user.userInfo.charge}}%，实际支付:{{(sellNums*(1+$store.state.user.userInfo.charge/100)).toFixed(2)}}</span>
                    <input type="number" v-model="dealInfo.guide_price" disabled />
                    <p class="canuse">DLT余额{{credit3}}</p>
                    <div
                      class="buyIntoBtn"
                      style="background:linear-gradient(90deg,rgba(121,119,125,1) 0%,rgba(67,69,68,1) 100%);color:#d8ad6c"
                      @click="dealGoods(2,9)"
                    >卖&nbsp;&nbsp;&nbsp;出</div>
                  </div>
                </div>
              </div>
              <div class="nowweituo">
                <van-action-sheet v-model="showAlert" :actions="actions" @select="onSelect" />
                <p style="color:#666">当前委托</p>
                <p style="color:#666" @click="showAlert=true">{{typeTxt}}</p>
              </div>
            </div>
          </div>-->
          <div class="tradingTopContent">
            <div class="leftBox">
              <div class="tradingType">
                <div class="line"></div>
                <div
                  class="typeleft"
                  :style="{background:tabbarIndex==1?'#34947B':'#403F43',color:tabbarIndex==1?'#fff':'#999'}"
                  @click="tabbarIndex=1"
                >买入</div>
                <div
                  class="typeright"
                  :style="{background:tabbarIndex==2?'#E65459':'#403F43',color:tabbarIndex==2?'#fff':'#999'}"
                  @click="tabbarIndex=2"
                >卖出</div>
              </div>
              <div class="drowpselect">
                <van-dropdown-menu>
                  <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu>
              </div>
              <div class="trandingNum" v-if="value1==1">
                <van-stepper
                  v-model="value"
                  step="0.01"
                  :max="(dealInfo.guide_price*1.1).toFixed(2)"
                  :min="(dealInfo.guide_price*0.9).toFixed(2)"
                />
                <p>≈{{parseInt(value*newNum)}}TSC</p>
              </div>
              <input
                type="number"
                v-else
                class="tradingPrice"
                v-model="dealInfo.guide_price"
                placeholder="以当前最优价格交易"
                disabled
              />
              <div class="tradingPriceNum">
                <input type="number" v-model="newNum" placeholder="数量" />
                <span>DLT</span>
              </div>
              <p v-if="tabbarIndex==1" class="canUseMoney">可用{{(credit2*1).toFixed(2)}}TSC</p>
              <p v-else class="canUseMoney">可用{{(credit3*1).toFixed(2)}}DLT</p>
              <div class="slideBox">
                <van-slider
                  v-if="tabbarIndex==1"
                  v-model="slideValue"
                  @change="onChange"
                  inactive-color="#999"
                  :active-color="tabbarIndex==1?'#34947B':'#E65459'"
                >
                  <div
                    slot="button"
                    :style="{background:tabbarIndex==1?'#34947B':'#E65459'}"
                    class="custom-button"
                  >{{ (slideValue*credit2/dealInfo.guide_price/100).toFixed(0) }}</div>
                </van-slider>
                <van-slider
                  v-else
                  v-model="slideValue"
                  @change="onChange"
                  inactive-color="#999"
                  :active-color="tabbarIndex==1?'#34947B':'#E65459'"
                >
                  <div
                    slot="button"
                    :style="{background:tabbarIndex==1?'#34947B':'#E65459'}"
                    class="custom-button"
                  >{{ (slideValue*credit3/100).toFixed(0) }}</div>
                </van-slider>
              </div>
              <div class="serviceCharge" v-if="tabbarIndex==2">
                <p>当前手续费比例:{{$store.state.user.userInfo.charge}}%</p>
                <p>手续费金额:{{newNum*$store.state.user.userInfo.charge/100}}</p>
              </div>
              <div class="tradingSum" v-if="tabbarIndex==1">
                <span>交易额</span>
                <p v-if="value1==0">{{(newNum*dealInfo.guide_price).toFixed(2)}}&nbsp;TSC</p>
                <p v-if="value1==1">{{(newNum*value).toFixed(2)}}&nbsp;TSC</p>
              </div>
              <div class="tradingSum" v-if="tabbarIndex==2">
                <span>交易额</span>
                <p>{{((newNum*1)+(newNum*$store.state.user.userInfo.charge/100)).toFixed(2)}}&nbsp;DLT</p>
              </div>
              <div
                class="buyBtn"
                @click="dealGoods"
                :style="{background:tabbarIndex==1?'#34947B':'#E65459'}"
              >{{tabbarIndex==1?'买入DLT':'卖出DLT'}}</div>
              <p class="toRecharge" @click="jumpTo('recharge?type=1')" v-if="tabbarIndex==1">TSC充值 ></p>
              <p class="toRecharge" v-else style="color:#2B282D">.</p>
            </div>
            <div class="rightBox">
              <div class="rightTitle">
                <p>价格</p>
                <p>数量</p>
              </div>
              <div class="righttop">
                <div class="priceListInfo" v-for="(item, index) in deepData.sellOrder" :key="index">
                  <div class="bgColor" :style="{width:item.deal_num/item.num*2.9+'rem'}"></div>
                  <div class="priceList">{{item.sell_price}}</div>
                  <div class="numList">{{item.num}}</div>
                </div>
              </div>
              <div class="guideprice">
                <p>{{dealInfo.guide_price}}</p>
                <span>≈{{dealInfo.guide_price}}TSC</span>
              </div>
              <div class="righttop rightbot">
                <div class="priceListInfo" v-for="(item, index) in deepData.buyOrder" :key="index">
                  <div class="bgColor" :style="{width:item.deal_num/item.num*2.9+'rem'}"></div>
                  <div class="priceList">{{item.sell_price}}</div>
                  <div class="numList">{{item.num}}</div>
                </div>
              </div>
              <div class="deepBox">
                <van-dropdown-menu>
                  <van-dropdown-item v-model="value2" :options="option2" @change="changeDeep" />
                </van-dropdown-menu>
              </div>
            </div>
          </div>
          <div class="bargainList">
            <div class="nowEntrust">当前委托</div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
            >
              <div
                class="bargainInfo"
                v-for="(item, index) in entrustData"
                :key="index"
                v-show="unShow.indexOf(index)<0"
              >
                <span
                  class="typeTag"
                  :style="{color:item.type==9?'#d8ad6c':''}"
                >{{item.type==9?'卖单':"买单"}}</span>
                <div class="bargainTop">
                  <p class="time">{{item.created_at}}</p>
                  <p class="status">{{item.status==1?'匹配中':'已完成'}}</p>
                </div>
                <div class="bargainBot">
                  <div>
                    <p>委托量</p>
                    <span>{{item.num}}</span>
                  </div>
                  <div>
                    <p>委托价</p>
                    <span>{{item.sell_price}}</span>
                  </div>
                  <div>
                    <p>成交量</p>
                    <span>{{item.deal_num}}</span>
                  </div>
                  <div>
                    <p>成交均价</p>
                    <span>{{item.deal_price}}</span>
                  </div>
                </div>
                <div class="repeal" v-show="item.status==1" @click="chacelTrad(item.id,index)">撤销</div>
              </div>
            </van-list>
          </div>
        </div>
      </transition>
      <transition>
        <div v-show="tabIndex==2" class="fbjiaoyi">
          <div class="topTab">
            <div class="tabcard">
              <p @click="tabbarIndex2=1" :class="tabbarIndex2==1?'active':''">
                我要买
                <span v-show="tabbarIndex2==1"></span>
              </p>
              <p @click="tabbarIndex2=2" :class="tabbarIndex2==2?'active':''">
                我要卖
                <span v-show="tabbarIndex2==2"></span>
              </p>
            </div>
            <i @click="jumpTo('order')" class="orderIcon"></i>
          </div>
          <!-- 法币交易顶部提示文字 -->
          <div class="topTxtTip">
            <p>最低价{{0.1}}</p>
            <p>最高价{{0.3}}</p>
            <p>最新成交价{{0.3}}</p>
          </div>
          <div class="dealInfocontent">
            <!-- 我要买 -->
            <div class="buyInto" v-show="tabbarIndex2==1">
              <div class="dealInfo" v-for="(item, index) in shopList" :key="index">
                <div class="merchantInfo">
                  <img class="avatar" :src="item.img_url" alt />
                  <p class="nickName">{{item.title}}</p>
                </div>
                <div class="dealNum">
                  <div class="dealNumTop">
                    <p class="top_num">数量 {{item.trade_nums}}</p>
                    <p class="top_price">单价：{{item.unit_price}}DLT</p>
                  </div>
                  <div class="dealNumBot">
                    <p>限额 ￥{{item.min_trade_price}}-￥{{item.max_trade_price}}</p>
                    <p class="totalMoney">￥{{item.trade_nums*item.unit_price}}</p>
                  </div>
                </div>
                <div class="buyType">
                  <div class="payType">
                    <i class="wxPayIcon" v-if="item.wx_config"></i>
                    <i class="bankCard" v-if="item.bank_card_config"></i>
                    <i class="zfb" v-if="item.alipay_config"></i>
                  </div>
                  <span
                    class="buyBtn"
                    @click="toBuy(item.unit_price,item.min_trade_price,item.max_trade_price,item.id)"
                  >购买</span>
                </div>
              </div>
            </div>
            <!-- 我要卖 -->
            <div class="buyInto" v-show="tabbarIndex2==2">
              <div class="dealInfo" v-for="(item, index) in shopList2" :key="index">
                <div class="merchantInfo">
                  <img class="avatar" :src="item.img_url" alt />
                  <p class="nickName">{{item.title}}</p>
                </div>
                <div class="dealNum">
                  <div class="dealNumTop">
                    <p class="top_num">数量 {{item.trade_nums}}</p>
                    <p class="top_price">单价：{{item.unit_price}}</p>
                  </div>
                  <div class="dealNumBot">
                    <p>限额 ￥{{item.min_trade_price}}-￥{{item.max_trade_price}}</p>
                    <p class="totalMoney">￥{{item.trade_nums*item.unit_price}}</p>
                  </div>
                </div>
                <div class="buyType">
                  <div class="payType">
                    <i class="wxPayIcon" v-if="item.wx_config"></i>
                    <i class="bankCard" v-if="item.bank_card_config"></i>
                    <i class="zfb" v-if="item.alipay_config"></i>
                  </div>
                  <span
                    class="sellBtn"
                    @click="toSell(item.unit_price,item.min_trade_price,item.max_trade_price,item.id)"
                  >出售</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <x-dialog
      v-model="showDialogStyle"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
    >
      <div class="txTip">
        <div class="dialogContent">
          <div class="dialogTitle">
            {{tabbarIndex2==1?'购买':'出售'}}
            <i
              @click="showDialogStyle=false"
              class="iconfont icon-close"
            ></i>
          </div>
          <div class="goodprice">
            单价
            <span>{{'￥'+goodsPrice}}</span>
          </div>
          <div class="buyintoType">
            <div>
              <p
                :class="buyIntoType==1?'buintoActive':''"
                @click="buyIntoType=1"
              >按金额{{tabbarIndex2==1?'购买':'出售'}}</p>
              <p
                :class="buyIntoType==2?'buintoActive':''"
                @click="buyIntoType=2"
              >按数量{{tabbarIndex2==1?'购买':'出售'}}</p>
            </div>
            <input
              class="numInput"
              type="number"
              v-model="buyNums"
              :placeholder="buyIntoType==1?'输入交易金额':'输入交易数量'"
            />
            <div class="limitNUm">
              <span>限额：{{'￥'+limitSum1+' — ￥'+limitSum2}}</span>
              <span v-show="buyIntoType==2" class="limitMoey">总额：￥{{buyNums*goodsPrice}}</span>
              <span v-show="buyIntoType==1">交易数量：{{(buyNums/goodsPrice).toFixed(5)}}</span>
            </div>
          </div>
          <div class="payment" v-show="tabbarIndex2==1">
            <p>实付款</p>
            <span>￥{{buyIntoType==1?buyNums:buyNums*goodsPrice}}</span>
          </div>
          <div class="payBtn" @click="toPay">{{tabbarIndex2==1?'下单':'出售'}}</div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Marquee, MarqueeItem, XNumber, Tab, TabItem, XDialog } from "vux";
import http from "../../api/http";
export default {
  components: {
    Marquee,
    MarqueeItem,
    XNumber,
    Tab,
    TabItem,
    XDialog
  },
  data() {
    return {
      loading: false,
      finished: false,
      buyNums: "",
      statusH: 0,
      tabIndex: 1,
      tabbarIndex: 1, //买入卖出类型
      tabbarIndex2: 1,
      value: 10,
      page: 1,
      showDialogStyle: false,
      buyIntoType: 1,
      buyintoNums: 1, //买入数量
      buyintoPrice: "", //买入价格
      sellNums: 1, //卖出数量
      sellPrice: "", //卖出价格
      dealInfo: [], //成交信息
      dealList: [], //盘口数据
      entrustData: [], //委托数据
      entrustPage: 1, //委托数据页码
      shopList: [], //买单
      shopList2: [], //卖单
      goodsPrice: 0, //选中商品的单价
      limitSum1: 0, //总限额
      limitSum2: 0,
      sellId: "",
      isBlur: false, //判断是否失去焦点
      blurTxtTip: "", //失去焦点时的问题提示  扣除手续费
      rollList: [],
      unShow: [], //隐藏列表第几位
      credit2: 0, //法币
      credit3: 0, //DLT
      inputTxtTip: "", //输入框金额提示
      showAlert: false,
      actions: [
        { name: "全部", color: "#DB9551", index: 1 },
        { name: "委托历史", color: "#DB9551", index: 2 }
      ],
      typeTxt: "全部",
      entrustType: "all",
      input1: false,
      input2: false,
      value1: 0, //限价种类
      value2: 1, //深度
      option1: [
        { text: "市价委托", value: 0 },
        { text: "限价委托", value: 1 }
      ],
      option2: [
        { text: "深度1", value: 1 },
        { text: "深度2", value: 2 },
        { text: "深度3", value: 3 },
        { text: "深度4", value: 4 },
        { text: "深度5", value: 5 }
      ],
      value: 1, //买入价格步进器
      slideValue: 10, //滑块值
      newNum: "",
      deepData: [] //深度数据
    };
  },
  created() {
    this.slideValue = 0;
    this.tabbarIndex = this.$route.query.tabIndex || 1;
    this.input1 = this.$route.params.input1 || false;
    this.input2 = this.$route.params.input2 || false;
    this.tabIndex = this.$route.query.index || 1;
    this.credit2 = this.$store.state.user.userInfo.credit2;
    this.credit3 = this.$store.state.user.userInfo.credit3;
    this.getDealInfo();
    this.getShopList(1);
    /* this.getDealList(); */
    this.getDeepData();
    this.getEntrustData();
    /* this.getKlineData(); */
    if (window.api) {
      let size = document.documentElement.clientWidth / 7.5;
      this.statusH = api.safeArea.top / size;
      api.setStatusBarStyle({
        style: "dark"
      });
    }
  },
  mounted() {
    if (this.$store.state.global.input1 == true) {
      this.$nextTick(() => {
        this.$refs.input1.focus();
      });
    } else if (this.$store.state.global.input2 == true) {
      this.$nextTick(() => {
        this.$refs.input2.focus();
      });
    }
  },
  beforeDestroy() {
    this.$store.commit("setInput1", false);
    this.$store.commit("setInput2", false);
  },
  watch: {
    tabbarIndex() {
      this.slideValue = 0;
    },
    page() {
      this.getDeepData();
    },
    buyIntoType(index) {
      if (index == 1) {
      } else if (index == 2) {
      }
    },
    tabbarIndex2(e) {
      this.getShopList(e);
    }
  },
  methods: {
    onItemClick(e) {
      this.tabbarIndex = e == 0 ? "1" : "2";
    },
    toPay() {
      if (this.buyNums <= 0) {
        return this.$vux.toast.text("请输入正确的购买信息！");
      }
      var sum = 0;
      var num = 0;
      if (this.buyIntoType == 1) {
        sum = this.buyNums;
        num = (this.buyNums / this.goodsPrice).toFixed(5);
      } else {
        sum = this.buyNums * this.goodsPrice;
        num = this.buyNums;
      }
      if (this.tabbarIndex2 == 2) {
        this.$http
          .post(
            "/amoy/trade/create-sel-byte-coin",
            {
              sell_id: this.sellId,
              coin_num: num,
              pay_price: sum
            },
            true,
            true
          )
          .then(res => {
            if (res.code == 0) {
              this.$vux.toast.show({
                text: res.msg,
                type: "success",
                position: "middle",
                width: "10em"
              });
              this.showDialogStyle = false;
            }
          });
        return;
      }
      this.$router.push({
        name: "pay",
        query: { sum: sum, id: this.sellId, num: num }
      });
    },
    changeDeep(e) {
      this.page = e;
    },
    dealGoods(entrust, type) {
      if (this.value < (this.dealInfo.guide_price * 0.9).toFixed(2)) {
        return this.$vux.toast.text("交易金额不能低于市场价的90%！");
      }
      var dealinfo = {
        type: this.tabbarIndex == 1 ? "1" : "9",
        entrust: this.value1 == 1 ? "1" : "2",
        trade_num: this.newNum,
        trade_price: this.value1 == 1 ? this.value : this.dealInfo.guide_price
      };
      /*       if (type == 1 && entrust == 1) {
        if (this.buyintoPrice <= 0) {
          return this.$vux.toast.text("请输入正确的购买单价!");
        }
        if (this.buyintoPrice * this.buyintoNums > this.credit2) {
          this.$vux.toast.show({
            type: "cancel",
            text: "超出可用法币余额，请重新设置买入信息!",
            position: "middle",
            width: "10em",
            time: "3000"
          });
          return;
        }
        dealInfo.trade_num = this.buyintoNums;
        dealInfo.trade_price = this.buyintoPrice;
      } else if (type == 9 && entrust == 1) {
        if (this.sellPrice <= 0) {
          return this.$vux.toast.text("请输入正确的出售单价!");
        }
        if (this.sellNums * this.sellPrice > this.credit3) {
          this.$vux.toast.show({
            type: "cancel",
            text: "超出可用DLT余额，请重新设置卖出信息!",
            position: "middle",
            width: "10em",
            time: "3000"
          });
          return;
        }
        dealInfo.trade_num = this.sellNums;
        dealInfo.trade_price = this.sellPrice;
      } else if (type == 1 && entrust == 2) {
        if (this.buyintoNums <= 0) {
          this.$vux.toast.text("请输入正确的买入数量!");
          return;
        }
        if (this.buyintoNums * this.dealInfo.guide_price > this.credit2) {
          this.$vux.toast.show({
            type: "cancel",
            text: "超出可用法币余额，请重新设置买入数量!",
            position: "middle",
            width: "10em",
            time: "3000"
          });
          return;
        }
        dealInfo.trade_num = this.buyintoNums;
        dealInfo.trade_price = this.dealInfo.guide_price;
      } else if (type == 9 && entrust == 2) {
        if (this.sellNums <= 0) {
          this.$vux.toast.text("请输入正确的卖出数量!");
          return;
        }
        if (this.sellNums * this.dealInfo.guide_price > this.credit3) {
          this.$vux.toast.show({
            type: "cancel",
            text: "超出可用DLT余额，请重新设置卖出数量!",
            position: "middle",
            width: "10em",
            time: "3000"
          });
          return;
        }
        dealInfo.trade_num = this.sellNums;
        dealInfo.trade_price = this.dealInfo.guide_price;
      } */
      this.$http
        .post("/amoy/trade/buy-or-sell", dealinfo, true, true)
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$vux.toast.text("已完成！");
            this.entrustData = [];
            this.entrustPage = 1;
            this.getDealList();
            this.getEntrustData();
            this.getUserInfo();
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              position: "middle",
              time: 3000,
              width: "10em"
            });
          }
        });
    },
    getDeepData() {
      this.$http
        .post(
          "/amoy/trade/deep-tray-list",
          {
            page: this.page
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.deepData = res.data;
          }
        });
    },
    chacelTrad(id, index) {
      this.$http
        .post(
          "/amoy/trade/cancel-trade-order",
          {
            trade_id: id
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.$vux.toast.text("撤销成功!");
            this.unShow.push(index);
          }
        });
    },
    getDealInfo() {
      this.$http
        .post(
          "/amoy/trade/coin-trade-hall",
          {
            page: this.page
          },
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.dealInfo = res.data;
            /* this.rollList = this.shuffle(res.data.trade_roll); */
            this.inputTxtTip =
              (res.data.guide_price * 0.9).toFixed(2) +
              "~" +
              (res.data.guide_price * 1.1).toFixed(2) +
              "区间";
          }
        });
    },
    getShopList(type) {
      this.$http
        .post("/amoy/trade/shop-list", { type }, true, true)
        .then(res => {
          if (res.code == 0) {
            if (type == 1) {
              this.shopList = res.data;
            } else {
              this.shopList2 = res.data;
            }
          }
        });
    },
    toBuy(price, min, max, id) {
      this.showDialogStyle = true;
      this.goodsPrice = price; //单价
      this.limitSum1 = min; //限额
      this.limitSum2 = max; //限额
      this.sellId = id; //商家ID
    },
    blurTxt(e) {
      this.isBlur = true;
      this.blurTxtTip =
        this.sellNums * (1 - this.$store.state.user.userInfo.charge / 100) +
        "(手续费" +
        (this.sellNums * this.$store.state.user.userInfo.charge) / 100 +
        ")";
    },
    focusTxt() {
      this.isBlur = false;
    },
    //买单卖单盘口数据
    getDealList() {
      this.$http
        .post(
          "/amoy/trade/tray-list",
          {
            page: this.page,
            type: 1
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.dealList = res.data;
          }
        });
    },
    //获取委托数据
    getEntrustData() {
      this.$http
        .post(
          "/amoy/trade/entrust-data",
          {
            page: this.entrustPage,
            type: this.entrustType
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.entrustData = this.entrustData.concat(res.data);
            if (res.data.length < 10) {
              this.loading = false;
              this.finished = true;
            }
          }
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.entrustPage++;
        this.getEntrustData();
        this.loading = false;
      }, 1000);
    },
    shuffle(arr) {
      var len = arr.length;
      for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = arr[index];
        arr[index] = arr[len - i - 1];
        arr[len - i - 1] = temp;
      }
      return arr;
    },
    watchInput(n) {
      if (n == 1) {
        if (this.buyintoPrice > this.dealInfo.guide_price * 1.1) {
          this.buyintoPrice = (this.dealInfo.guide_price * 1.1).toFixed(2);
        } else if (this.buyintoPrice < this.dealInfo.guide_price * 0.9) {
          this.buyintoPrice = (this.dealInfo.guide_price * 0.9).toFixed(2);
        }
      } else {
        if (this.sellPrice > this.dealInfo.guide_price * 1.1) {
          this.sellPrice = (this.dealInfo.guide_price * 1.1).toFixed(2);
        } else if (this.sellPrice < this.dealInfo.guide_price * 0.9) {
          this.sellPrice = (this.dealInfo.guide_price * 0.9).toFixed(2);
        }
      }
    },
    getUserInfo() {
      this.$http.post("/amoy/user/user-info", true, true).then(res => {
        if (res.code == 0) {
          this.$store.commit("setUserInfo", res.data);
          this.credit2 = res.data.credit2;
          this.credit3 = res.data.credit3;
        }
      });
    },
    //法币交易我要卖
    toSell(price, min, max, id) {
      console.log(id);
      this.showDialogStyle = true;
      this.goodsPrice = price; //单价
      this.limitSum1 = min; //限额
      this.limitSum2 = max; //限额
      this.sellId = id; //商家ID
      /* this.$http.post("/amoy/trade/create-sel-byte-coin"); */
    },
    onSelect(e) {
      this.entrustPage = 1;
      this.entrustData = [];
      this.typeTxt = e.name;
      this.entrustType = e.index == 1 ? "all" : "history";
      this.showAlert = false;
      this.getEntrustData();
    },
    onChange(e) {
      if (this.tabbarIndex == 1) {
        this.newNum = (
          (this.slideValue * this.credit2) /
          this.dealInfo.guide_price /
          100
        ).toFixed(0);
      } else {
        this.newNum = ((this.slideValue * this.credit3) / 100).toFixed(0);
      }
    },
    toBack() {
      if (this.$route.query.intoType == "guide") {
        this.$router.push("home");
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#trading {
  min-height: 100%;
  position: relative;
  background: linear-gradient(
    25deg,
    rgba(31, 28, 33, 1) 0%,
    rgba(50, 48, 53, 1) 100%
  );
  /deep/ .weui-cell {
    .vux-number-input {
      background: none;
      color: #fff;
      border: none;
    }
    .vux-number-selector {
      border: none;
    }
  }
  /deep/ .weui-cell:before {
    border: none;
  }
}
.content {
  padding-bottom: 0.3rem;
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
    span {
      background: rgba(64, 63, 67, 1);
      border-radius: 0.05rem;
      color: #e65459;
      font-size: 0.28rem;
      padding: 0 0.12rem;
    }
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
  p {
    position: absolute;
    right: 0.3rem;
    top: 0;
    height: 100%;
    line-height: 0.88rem;
    font-size: 0.28rem;
  }
}
.bbjiaoyi {
  width: 100%;
  .tradingTopContent {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    > div {
      width: 3.5rem;
    }
    .leftBox {
      .tradingType {
        height: 0.78rem;
        color: #999999;
        font-size: 0.32rem;
        display: flex;
        justify-content: space-around;
        position: relative;
        overflow: hidden;
        > div {
          width: 50%;
          background: #403f43;
          text-align: center;
          line-height: 0.78rem;
        }
        .line {
          position: absolute;
          left: 1.6rem;
          width: 0.45rem;
          height: 1.5rem;
          background: #323035;
          transform: rotate(30deg);
          top: -0.5rem;
        }
      }
      .drowpselect {
        width: 3.2rem;
        height: 0.64rem;
        margin-top: 0.3rem;
        border: 1px solid rgba(171, 171, 171, 1);
        /deep/.van-dropdown-menu {
          background: none;
          height: 0.64rem;
          .van-dropdown-menu__title {
            color: #fff;
            font-size: 0.3rem;
            line-height: 0.64rem;
          }
          .van-popup {
            background: #2b292e;
            width: 3.2rem;
            left: 0.3rem;
            top: 1px;
            > div {
              background: none;
            }
            .van-cell::after {
              border: none;
            }
            .van-dropdown-item__option {
              color: #fff;
            }
            .van-dropdown-item__option--active {
              color: #1989fa;
            }
          }
        }
      }
      .trandingNum {
        width: 3.2rem;
        height: 0.64rem;
        margin-top: 0.3rem;
        border: 1px solid rgba(171, 171, 171, 1);
        border-radius: 0.04rem;
        background: #29272c;
        /deep/.van-stepper {
          height: 0.64rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          > button {
            background: #29272c;
            color: #fff;
          }
          > input {
            width: 1.5rem;
            background: #29272c;
            color: #fff;
          }
          .van-stepper__minus--disabled {
            color: #333;
          }
        }
        p {
          color: #fff;
          font-size: 0.24rem;
          line-height: 0.25rem;
          margin-top: 0.2rem;
        }
      }
      .tradingPriceNum {
        width: 3.2rem;
        height: 0.64rem;
        margin-top: 0.6rem;
        border: 1px solid rgba(171, 171, 171, 1);
        border-radius: 0.04rem;
        > input {
          width: 2rem;
          float: left;
          height: 0.64rem;
          background: none;
          border: none;
          font-size: 0.28rem;
          color: #999;
          padding-left: 0.2rem;
        }
        span {
          float: right;
          margin-right: 0.2rem;
          font-size: 0.3rem;
          color: #fff;
          height: 0.64rem;
          line-height: 0.64rem;
        }
      }
      .canUseMoney {
        color: #ffffff;
        font-size: 0.24rem;
        line-height: 0.25rem;
        margin-top: 0.2rem;
      }
      .slideBox {
        height: 0.4rem;
        width: 3.2rem;
        margin-top: 0.23rem;
        .custom-button {
          padding: 0 0.05rem;
          height: 0.4rem;
          color: #fff;
          text-align: center;
          line-height: 0.4rem;
        }
      }
      .tradingSum {
        color: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 0.3rem;
        line-height: 0.64rem;
        span {
          width: 1rem;
        }
        p {
          width: 2.7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .buyBtn {
        color: #fff;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.32rem;
        border-radius: 0.05rem;
        margin-top: 0.35rem;
      }
      .toRecharge {
        color: #fff;
        text-align: right;
        margin-top: 0.3rem;
        margin-bottom: 0.6rem;
      }
      .tradingPrice {
        width: 2.8rem;
        height: 0.24rem;
        margin-top: 0.3rem;
        border: 1px solid rgba(171, 171, 171, 1);
        border-radius: 0.04rem;
        background: #29272c;
        padding: 0.2rem;
        color: #fff;
        font-size: 0.26rem;
        line-height: 0.24rem;
      }
      .serviceCharge {
        p {
          color: #fff;
          font-size: 0.22rem;
        }
      }
    }
    .rightBox {
      width: 3.5rem;
      .rightTitle {
        padding: 0 0.5rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.28rem;
        color: #fff;
        height: 0.78rem;
        line-height: 0.78rem;
      }
      .righttop {
        width: 3.5rem;
        height: 2.6rem;
        margin-top: 0.2rem;
        overflow: hidden;
        .priceListInfo {
          padding: 0 0.3rem;
          display: flex;
          justify-content: space-between;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.25rem;
          margin-top: 0.2rem;
          position: relative;
          .priceList {
            color: #d55055;
            position: relative;
            z-index: 1;
          }
          .numList {
            color: #999999;
            position: relative;
            z-index: 1;
          }
          .bgColor {
            position: absolute;
            z-index: 0;
            width: 2.9rem;
            height: 0.3rem;
            background: #433338;
          }
        }
      }
      .guideprice {
        font-size: 0.36rem;
        color: #34947b;
        padding-left: 0.3rem;
        p {
          width: 100%;
          height: 0.37rem;
          line-height: 0.37rem;
          float: left;
        }
        span {
          color: #fff;
          font-size: 0.22rem;
          height: 0.23rem;
          line-height: 0.23rem;
          float: left;
        }
      }
      .rightbot {
        .priceListInfo {
          .priceList {
            color: #34947b;
            position: relative;
            z-index: 1;
          }
          .numList {
            color: #999999;
            position: relative;
            z-index: 1;
          }
          .bgColor {
            position: absolute;
            z-index: 0;
            width: 2.9rem;
            height: 0.3rem;
            background: #303839;
          }
        }
      }
      .deepBox {
        margin-left: 0.3rem;
        width: 3.2rem;
        height: 0.64rem;
        margin-top: 0.1rem;
        border: 1px solid rgba(171, 171, 171, 1);
        border-radius: 0.04rem;
        /deep/.van-dropdown-menu {
          background: none;
          height: 0.64rem;
          .van-dropdown-menu__title {
            color: #fff;
            font-size: 0.3rem;
            line-height: 0.64rem;
          }
          .van-popup {
            background: #2b292e;
            width: 3.2rem;
            left: 4rem;
            top: 1px;
            > div {
              background: none;
            }
            .van-cell::after {
              border: none;
            }
            .van-dropdown-item__option {
              color: #fff;
            }
            .van-dropdown-item__option--active {
              color: #1989fa;
            }
          }
        }
      }
    }
  }
  /* .bbTitle {
    height: 0.58rem;
    text-align: center;
    line-height: 0.58rem;
    font-size: 0.26rem;
    color: #666;
    background: linear-gradient(
      25deg,
      rgba(31, 28, 33, 1) 0%,
      rgba(50, 48, 53, 1) 100%
    );
  }
  .tradingInfo {
    background: linear-gradient(
      25deg,
      rgba(31, 28, 33, 1) 0%,
      rgba(50, 48, 53, 1) 100%
    );
    padding: 0 0.23rem;
    overflow: hidden;
    .priceInfo {
      .price_top {
        position: relative;
        height: 0.73rem;
        margin-top: 0.29rem;
        > p {
          float: left;
          color: #34947b;
        }
        .price1 {
          font-size: 0.36rem;
          line-height: 0.36rem;
          font-weight: bolder;
        }
        .increase {
          padding: 0 0.1rem;
          height: 0.32rem;
          line-height: 0.32rem;
          background: rgba(52, 148, 123, 0.2);
          font-size: 0.24rem;
          text-align: center;
          margin-left: 0.3rem;
          border-radius: 0.06rem;
        }
        .kIcon {
          float: left;
          margin-left: 0.2rem;
          width: 0.4rem;
          height: 0.32rem;
          background: url("../../assets/img/hall/K/kIcon.png") no-repeat;
          background-size: 100% 100%;
        }
        span {
          position: absolute;
          right: 2.7rem;
          font-size: 0.24rem;
          color: #666666;
        }
        .numInput {
          position: absolute;
          right: 0;
          top: -0.1rem;
        }
        .weui-cell {
          border: none;
          margin: 0;
          padding: 0;
        }
      }
      .price_bot {
        width: 100%;
        display: flex;
        justify-content: center;
        > div {
          width: 50%;
          .__title {
            display: flex;
            font-size: 0.24rem;
            color: #ccc;
            text-align: center;
            .buyNum {
              width: 0.7rem;
            }
            .num {
              width: 1.4rem;
            }
            .price {
              width: 1.4rem;
            }
          }
          .priceListInfo {
            width: 100%;
            display: flex;
            div {
              text-align: center;
              font-size: 0.28rem;
              color: #999;
            }
            .buyList {
              width: 0.7rem;
            }
            .numList {
              width: 1.4rem;
            }
            .priceList {
              width: 1.4rem;
            }
          }
        }
        ._bot_left {
          .priceList {
            color: #34947b;
          }
        }
        ._bot_right {
          .priceList {
            color: #c23e63;
          }
        }
      }
    }
    .tabTitle /deep/ .vux-tab-wrap {
      .vux-tab {
        background: none;
        .vux-tab-item {
          background: none;
        }
      }
    }
    .tabBox {
      > div {
        height: 4.7rem;
        display: flex;
        justify-content: space-around;
        > div {
          padding-top: 0.38rem;
          width: 2.9rem;
          position: relative;
          .tabLeftTitle {
            font-size: 0.28rem;
            color: #2d2933;
            height: 0.28rem;
            line-height: 0.28re;
          }
          .intoNUm {
            position: relative;
            left: -0.3rem;
            margin: 0;
            padding: 0;
            margin-top: 0.28rem;
          }
          input {
            width: 2.7rem;
            height: 0.64rem;
            border: 1px solid rgba(171, 171, 171, 0.78);
            margin-top: 0.2rem;
            font-size: 0.26rem;
            color: #666;
            padding-left: 0.2rem;
            border-radius: 0.1rem;
          }
          .canuse {
            color: #666;
            font-size: 0.26rem;
            height: 0.26rem;
            line-height: 0.26rem;
            margin: 0.3rem 0;
          }
          .tradingNum {
            font-size: 0.26rem;
            color: #333;
            height: 0.26rem;
            line-height: 0.26rem;
          }
          .buyIntoBtn {
            width: 2.9rem;
            height: 0.64rem;
            background: linear-gradient(
              -30deg,
              rgba(227, 185, 125, 1) 0%,
              rgba(240, 214, 160, 1) 100%
            );
            line-height: 0.64rem;
            text-align: center;
            color: #333;
            font-size: 0.3rem;
            border-radius: 0.05rem;
            margin-top: 0.28rem;
            font-weight: 900;
          }
        }
      }
    }
    .tabBox/deep/.weui-cell {
      .vux-number-input {
        font-size: 0.25rem;
      }
    }
    .nowweituo {
      border-top: 1px solid #666;
      height: 0.8rem;
      padding: 0 0.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 0.3rem;
        color: #333;
      }
    }
  } */
  .bargainList {
    .nowEntrust {
      height: 0.8rem;
      color: #fff;
      font-size: 0.32rem;
      line-height: 0.8rem;
      background: rgba(64, 63, 67, 1);
      padding-left: 0.36rem;
    }
    .bargainInfo {
      width: 6.28rem;
      padding: 0.4rem 0.36rem;
      background: #403f43;
      background-origin: 0.1rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      overflow: hidden;
      position: relative;
      color: #fff;
      border-radius: 0.2rem;
      .typeTag {
        position: absolute;
        top: 0;
        left: 0.2rem;
      }
      .bargainTop {
        height: 0.3rem;
        .time {
          float: left;
          font-size: 0.3rem;
          line-height: 0.3rem;
        }
        .status {
          float: right;
          font-size: 0.28rem;
          line-height: 0.3rem;
          color: #d8ad6c;
        }
      }
      .bargainBot {
        display: flex;
        justify-content: space-around;
        margin-top: 0.5rem;
        div {
          width: 1.5rem;
          text-align: center;
        }
        p {
          font-size: 0.26rem;
        }
        span {
          font-size: 0.26rem;
        }
      }
      .repeal {
        width: 1rem;
        color: #403f43;
        height: 0.44rem;
        border-radius: 0.1rem;
        font-size: 0.26rem;
        line-height: 0.44rem;
        text-align: center;
        float: right;
        margin-top: 0.3rem;
        background: linear-gradient(
          0deg,
          rgba(226, 186, 127, 1),
          rgba(240, 214, 160, 1)
        );
      }
    }
  }
}
.fbjiaoyi {
  .topTab {
    height: 1rem;
    padding: 0 0.32rem;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tabcard {
      width: 2.7rem;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .active {
        color: #333;
        font-size: 0.32rem;
      }
      p {
        color: #999;
        font-size: 0.3rem;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          width: 0.8rem;
          height: 0.06rem;
          background: #4988bd;
        }
      }
    }
    .orderIcon {
      width: 0.28rem;
      height: 0.34rem;
      background: url("../../assets/img/hall/K/order.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .topTxtTip {
    height: 0.58rem;
    background: rgba(242, 242, 242, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      width: 2rem;
      text-align: center;
      font-size: 0.26rem;
      color: #999;
    }
  }
  .dealInfocontent {
    padding: 0 0.32rem;
    background: #fff;
    .dealInfo {
      overflow: hidden;
      border-bottom: 1px solid #efefef;
      padding-bottom: 0.34rem;
      .merchantInfo {
        width: 100%;
        height: 0.6rem;
        overflow: hidden;
        margin-top: 0.2rem;
        .avatar {
          float: left;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
        }
        .nickName {
          float: left;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.3rem;
          color: #333;
          margin-left: 0.26rem;
          width: 4.5rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .price {
          float: right;
          font-size: 0.26rem;
          color: #666;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
      .dealNum {
        .dealNumTop {
          height: 0.3rem;
          margin-top: 0.25rem;
          display: flex;
          justify-content: space-between;
          p {
            font-size: 0.28rem;
            color: #999;
          }
        }
        .dealNumBot {
          display: flex;
          justify-content: space-between;
          height: 0.36rem;
          margin-top: 0.17rem;
          p {
            color: #999;
            font-size: 0.28rem;
          }
          .totalMoney {
            color: #ff4a17;
            font-size: 0.36rem;
            line-height: 0.36rem;
          }
        }
      }
      .buyType {
        height: 0.6rem;
        margin-top: 0.33rem;
        display: flex;
        justify-content: space-between;
        .payType {
          width: 2rem;
          height: 0.6rem;
          i {
            float: left;
            width: 0.36rem;
            height: 0.36rem;
            margin-right: 0.2rem;
          }
          .bankCard {
            background: url("../../assets/img/hall/K/yl.png") no-repeat;
            background-size: 100% 100%;
          }
          .zfb {
            background: url("../../assets/img/hall/K/zfb.png") no-repeat;
            background-size: 100% 100%;
          }
          .wxPayIcon {
            background: url("../../assets/img/hall/my/wx.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .buyBtn {
          width: 1.8rem;
          height: 0.58rem;
          background: rgba(73, 136, 189, 1);
          color: #fff;
          font-size: 0.32rem;
          text-align: center;
          line-height: 0.58rem;
          border-radius: 0.06rem;
        }
        .sellBtn {
          width: 1.8rem;
          height: 0.58rem;
          background: rgba(230, 84, 89, 1);
          color: #fff;
          font-size: 0.32rem;
          text-align: center;
          line-height: 0.58rem;
          border-radius: 0.06rem;
        }
      }
    }
  }
}
.txTip {
  width: 100%;
  height: 6.8rem;
  border-radius: 0.2rem 0.2rem 0 0;
  background: #fff;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  text-align: left;
  .dialogContent {
    height: 100%;
    padding: 0.4rem 0.6rem;
    .dialogTitle {
      height: 0.34rem;
      line-height: 0.34rem;
      font-size: 0.34rem;
      color: #333;
      font-weight: bolder;
      text-align: left;
      position: relative;
      .iconfont {
        position: absolute;
        right: 0;
        width: 0.3rem;
        height: 0.3rem;
        color: #666;
        text-align: center;
        line-height: 0.34rem;
      }
    }
  }
  .goodprice {
    height: 0.3rem;
    font-size: 0.3rem;
    line-height: 0.3rem;
    color: #999;
    text-align: left;
    margin-top: 0.3rem;
    border-bottom: 1px solid #efefef;
    padding-bottom: 0.28rem;
    span {
      color: #ff4a17;
    }
  }
  .buyintoType {
    margin-top: 0.25rem;
    div {
      height: 0.5rem;
      overflow: hidden;
      > p {
        height: 0.45rem;
        width: 1.5rem;
        float: left;
        color: #999;
        font-size: 0.3rem;
        line-height: 0.45rem;
        margin-right: 0.62rem;
      }
    }
    .buintoActive {
      color: #ff4a17;
      border-bottom: 2px solid #ff4a17;
    }
    .numInput {
      width: 6rem;
      height: 0.78rem;
      border-radius: 0.1rem;
      margin-top: 0.28rem;
      border: 1px solid rgba(255, 74, 23, 1);
      font-size: 0.3rem;
      padding-left: 0.3rem;
    }
    .limitNUm {
      height: 0.8rem;
      margin-top: 0.24rem;
      > span {
        float: left;
        width: 100%;
        font-size: 0.26rem;
        color: #999;
      }
    }
  }
  .payment {
    height: 0.35rem;
    margin-top: 0.29rem;
    p {
      font-size: 0.34rem;
      color: #333;
      font-weight: bolder;
      float: left;
      line-height: 0.35rem;
    }
    span {
      color: #ff4a17;
      font-size: 0.34rem;
      float: right;
      line-height: 0.35rem;
    }
  }
  .payBtn {
    width: 6rem;
    height: 0.88rem;
    background: linear-gradient(
      -75deg,
      rgba(255, 72, 23, 1),
      rgba(255, 122, 34, 1)
    );
    color: #fff;
    font-size: 0.34rem;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.08rem;
    margin: 0 auto;
    margin-top: 0.47rem;
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
