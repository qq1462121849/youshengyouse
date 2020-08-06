<template>
  <div id="main">
    <div class="headerBox" :style="{paddingTop: statusH + 'rem'}">
      <i @click="goBack()" class="iconfont icon-back" :style="{top: statusH+0.2 + 'rem'}"></i>
      <h1>DLT</h1>
    </div>
    <div class="dealInfo" :style="{marginTop: statusH+0.88 + 'rem'}">
      <div class="leftBox">
        <h2 :style="{color:priceData.inc_rate>0?'#3DAC91':'#CE5065'}">{{priceData.guide_price||0}}</h2>
        <p>
          ≈{{(priceData.guide_price*1).toFixed(2)||0}}CNY
          <span
            :style="{color:priceData.inc_rate>0?'#3DAC91':'#CE5065'}"
          >{{priceData.inc_rate>0?' +'+(priceData.inc_rate*1).toFixed(2):' '+(priceData.inc_rate*1).toFixed(2)}}%</span>
        </p>
      </div>
      <div class="rightBox">
        <div>
          <p>高</p>
          <span>{{priceData.max_price||0}}</span>
        </div>
        <div>
          <p>低</p>
          <span>{{priceData.min_price||0}}</span>
        </div>
        <div>
          <p>24H</p>
          <span>{{priceData.trade_day_all_price||0}}</span>
        </div>
      </div>
      <!-- <div class="botBox">
        <van-tabs
          background="#152131"
          title-active-color="#4B84C4"
          color="#4B84C4"
          v-model="typeActive"
          @click="choose()"
        >
          <van-tab title="15分钟"></van-tab>
          <van-tab title="1小时"></van-tab>
          <van-tab title="4小时"></van-tab>
          <van-tab title="日线"></van-tab>
        </van-tabs>
      </div>-->
    </div>
    <div id="myChart" ref="myChart"></div>
    <div class="stockInfo">
      <div class="tabbar">
        <tab :line-width="3" active-color="#4081CB" custom-bar-width="40px">
          <tab-item selected @on-item-click="selectIndeX(1)">盘口</tab-item>
          <tab-item @on-item-click="selectIndeX(2)">成交</tab-item>
        </tab>
      </div>
      <div class="contentList">
        <div v-show="selectIndex==1" class="pankou">
          <div>
            <div class="topTitle">
              <p class="maipan">买盘</p>
              <p class="shuliangL">数量(DLT)</p>
              <p class="jiage">价格(TSC)</p>
              <p class="shuliangR">数量(DLT)</p>
              <p class="maipanR">卖盘</p>
            </div>
            <div class="botContent">
              <div class="buyslid">
                <div class="label" v-for="(item, index) in dealList1" :key="index">
                  <div class="pantype">{{index+1}}</div>
                  <div class="panNum">{{item.num}}</div>
                  <div class="panprice priceL">{{item.sell_price}}</div>
                </div>
              </div>
              <div class="sellsild">
                <div class="label" v-for="(item, index) in dealList2" :key="index">
                  <div class="panprice priceR">{{item.sell_price}}</div>
                  <div class="panNum panNumR">{{item.num}}</div>
                  <div class="pantype">{{index+1}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectIndex==2" class="chengjiao">
          <div class="cjTitle">
            <p class="cjtime">时间</p>
            <p class="cjdir">方向</p>
            <p class="cjprice">价格(TSC)</p>
            <p class="cjnum">数量(DLT)</p>
          </div>
          <div class="cjList">
            <div class="cjlabel" v-for="(item, index) in dealInfo" :key="index">
              <p class="timeInfo">{{item.created_at}}</p>
              <p
                class="dirInfo"
                :style="{color:item.type==1?'#03ad8f':'#d14b64'}"
              >{{item.type==1?'买入':'卖出'}}</p>
              <p class="priceInfo">{{item.deal_price}}</p>
              <p class="numInfo">{{item.deal_num}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="floatBtn">
      <div style="background:#03ad8f" @click="goback(1)">买入</div>
      <div style="background: #d14b64;" @click="goback(2)">卖出</div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Tab, TabItem } from "vux";
import Socket from "../../plugin/socket";
export default {
  name: "echarts",
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
      timer: null,
      priceData: 0,
      statusH: 0,
      resData: "",
      kData: [],
      selectIndex: 1,
      echartsOption: {
        tooltip: {
          show: true,
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          formatter: function(a) {
            console.log(a);
            if (a.length == 1) {
              return a[0].seriesName + "：" + a[0].value[1];
            } else {
              return (
                a[0].name +
                "</br>开：" +
                a[0].value[1] +
                "</br>收：" +
                a[0].value[2] +
                "</br>低：" +
                a[0].value[3] +
                "</br>高：" +
                a[0].value[4] +
                "</br>MA5：" +
                a[1].value +
                "</br>MA10：" +
                a[2].value +
                "</br>MA30：" +
                a[3].value
              );
            }
          },
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          textStyle: {
            fontSize: 10
          }
        },
        /* legend: [
          {
            data: ["MA5"],
            inactiveColor: "#777",
            textStyle: {
              color: "#B6B29D",
              fontSize: 8
            },
            left: 0,
            itemWidth: 0,
            itemHeight: 0
          },
          {
            data: ["MA10"],
            inactiveColor: "#777",
            textStyle: {
              color: "#83A2A8",
              fontSize: 8
            },
            left: 25,
            itemWidth: 0,
            itemHeight: 0
          },
          {
            data: ["MA30"],
            inactiveColor: "#777",
            textStyle: {
              color: "#9C91D4",
              fontSize: 8
            },
            left: 56,
            itemWidth: 0,
            itemHeight: 0
          }
        ], */
        grid: [
          /* {
            left: "3%",
            right: "11%",
            top: "10%",
            bottom: "15%"
          }, */
          {
            left: "3%",
            right: "11%",
            top: "1%",
            height: "80%"
          }
        ],
        xAxis: [
          /* {
            type: "category",
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#31394F",
                opacity: 0.3
              }
            },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax"
          }, */
          {
            type: "category",
            /* gridIndex: 1, */
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: true, interval: "auto" },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax"
          }
        ],
        yAxis: [
          /* {
            show: true,
            scale: true,
            position: "right",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#31394F",
                opacity: 0.3
              }
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              formatter: function(value) {
                return value.toFixed(2);
              }
            }
          }, */
          {
            scale: true,
            /*  gridIndex: 1, */
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: true },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            startValue: 30,
            endValue: 80
          }
        ],
        visualMap: {
          show: false,
          seriesIndex: 0,
          dimension: 2,
          precision: 1,
          pieces: [
            {
              value: 1,
              color: "#d14b64"
            },
            {
              value: -1,
              color: "#00b28f"
            }
          ]
        },
        series: [
          /* {
            type: "candlestick",
            data: [],
            barMaxWidth: "20",
            itemStyle: {
              normal: {
                color: "#00b28f",
                color0: "#d14b64",
                borderColor: "#00b28f",
                borderColor0: "#d14b64"
              }
            },
            markPoint: {
              itemStyle: {
                color: "rgba(0,0,0,0)"
              },
              label: {
                normal: {
                  color: "#fff",
                  offset: [0, 18],
                  formatter: function(param) {
                    return param != null
                      ? Math.round(param.value).toFixed(2)
                      : "";
                  }
                }
              },
              data: [
                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest"
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest"
                }
              ],
              tooltip: {
                formatter: function(param) {
                  return param.name + "<br>" + (param.data.coord || "");
                }
              }
            }
          },
          {
            name: "MA5",
            type: "line",
            data: [],
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#B6B29D"
            }
          },
          {
            name: "MA10",
            type: "line",
            data: [],
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#83A2A8"
            }
          },
          {
            name: "MA30",
            type: "line",
            data: [],
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#9C91D4"
            }
          }, */
          {
            name: "Volume",
            type: "bar",
            /* xAxisIndex: 1,
            yAxisIndex: 1, */
            data: []
          }
        ],
        /* graphic: {
          type: "image",
          id: "logo",
          left: "9",
          bottom: "18%",
          z: 1000,
          bounding: "raw",
          style: {
            image:
              "https://gdtljr.oss-cn-shenzhen.aliyuncs.com/logo-tou-ming.png",
            width: 120,
            height: 35,
            fill: "#999"
          }
        }, */
        backgroundColor: "#151F32",
        textStyle: {
          color: "#798697"
        }
      },
      dealList1: [], //盘口数据
      dealList2: [], //盘口数据
      page: 0,
      page1: 0,
      dealInfo: [], //成交订单信息
      KlineData: [],
      typeActive: 0,
      websock: null
    };
  },
  created() {
    //this.initWebSocket();
    this.websock = new Socket("ws://47.240.15.231:8081", e => {
      let data = JSON.parse(e.data);
      if (data.tag === "newTradePrice") {
        this.priceData = data.data;
      } else if (data.tag === "panKou") {
        this.dealList1 = data.data.buyOrder;
        this.dealList2 = data.data.sellOrder;
      } else if (data.tag === "newTradeData") {
        this.dealInfo = data.data;
      }
    });
    this.$http
      .post("/amoy/trade/k-line-data", {
        time_padding: "fifteen_minutes",
        day_padding: "three_month"
      })
      .then(res => {
        if (res.code == 0) {
          console.log("============================");
          console.log(res.data);
          this.kData = res.data;
          this.echartsOption.dataZoom[0].startValue = res.data.length - 38;
          this.echartsOption.dataZoom[0].endValue = res.data.length;
          this.setEchartOption(res.data);
          this.myChart = echarts.init(document.getElementById("myChart"));
          this.myChart.setOption(this.echartsOption);
        }
      });
    this.getDealList();
    this.getDealInfo();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    api.setStatusBarStyle({
      style: "light"
    });
  },

  methods: {
    setEchartOption(data) {
      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      this.resData = this.splitData(this.kData);
      /* this.echartsOption.xAxis[0].data = this.resData.categoryData; */
      this.echartsOption.xAxis[0].data = this.resData.volumes;
      /* this.echartsOption.series[0].data = this.resData.values;
      this.echartsOption.series[1].data = calculateMA(5, this.resData.values);
      this.echartsOption.series[2].data = calculateMA(10, this.resData.values);
      this.echartsOption.series[3].data = calculateMA(30, this.resData.values); */
      this.echartsOption.series[0].data = this.resData.volumes;
      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumes = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0]);
          values.push(rawData[i]);
          volumes.push([
            i,
            rawData[i][4],
            rawData[i][0] > rawData[i][1] ? 1 : -1,
            rawData[i][0]
          ]);
        }
        return {
          categoryData: categoryData,
          values: values,
          volumes: volumes
        };
      }
      function calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
          if (i < dayCount) {
            result.push("-");
            continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data[i - j][1] * 1;
          }
          result.push((sum / dayCount).toFixed(2));
        }
        return result;
      }
    },
    handler() {},
    //买单卖单盘口数据
    getDealList() {
      this.$http
        .post(
          "/amoy/trade/tray-list",
          {
            type: 2
          },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.priceData = res.data.topData;
            this.dealList1 = res.data.buyOrder;
            this.dealList2 = res.data.sellOrder;
          }
        });
    },
    //获取成交订单
    getDealInfo() {
      this.$http.post("/amoy/trade/trade-match-order").then(res => {
        if (res.code == 0) {
          this.dealInfo = res.data;
        }
      });
    },
    selectIndeX(type) {
      this.selectIndex = type;
    },
    choose() {
      this.kData = [];
      var type = "";
      if (this.typeActive == 0) {
        type = "fifteen_minutes";
      } else if (this.typeActive == 1) {
        type = "one_hour";
      } else if (this.typeActive == 2) {
        type = "four_hour";
      } else if (this.typeActive == 3) {
        type = "day";
      }
      this.$http
        .post(
          "/amoy/trade/k-line-data",
          { time_padding: type, day_padding: "three_month" },
          true,
          true
        )
        .then(res => {
          if (res.code == 0) {
            this.kData = res.data;
            this.echartsOption.dataZoom[0].startValue = res.data.length - 38;
            this.echartsOption.dataZoom[0].endValue = res.data.length;
            this.setEchartOption();
            this.myChart = echarts.init(document.getElementById("myChart"));
            this.myChart.setOption(this.echartsOption);
          }
        });
    },
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumes.push([
          i,
          rawData[i][4],
          rawData[i][0] > rawData[i][1] ? 1 : -1,
          rawData[i][0]
        ]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
    },
    goback(type) {
      if (type == 1) {
        this.$store.commit("setInput1", true);
      } else if (type == 2) {
        this.$store.commit("setInput2", true);
      }
      this.$router.push({
        name: "trading",
        query: {
          tabIndex: type
        }
      });
    }
  },
  beforeDestroy() {
    this.websock.close();
  }
};
</script>
<style lang="less" scoped>
#main {
  min-height: 100%;
  background: #0f1925;
  padding-bottom: 1rem;
}
.headerBox {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #152131;
  color: #fff;
  .iconfont {
    position: absolute;
    top: 0.2rem;
    left: 0.3rem;
  }
  h1 {
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
    font-weight: normal;
  }
}
.dealInfo {
  padding: 0 0.3rem;
  height: 1.8rem;
  background: #152131;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .leftBox {
    width: 4rem;
    height: 1.6rem;
    overflow: hidden;
    > h2 {
      margin-top: 0.2rem;
      color: #b0416f;
      font-size: 0.5rem;
      height: 0.4rem;
      line-height: 0.4rem;
    }
    p {
      color: #7483a4;
      font-size: 0.24rem;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-top: 0.3rem;
      span {
        color: #b0416f;
      }
    }
  }
  .rightBox {
    width: 1.8rem;
    height: 1.6rem;
    > div {
      height: 0.31rem;
      font-size: 0.28rem;
      line-height: 0.3rem;
      display: flex;
      margin-top: 0.2rem;
      justify-content: space-between;
      p {
        color: #63718b;
        font-size: 0.24rem;
      }
      span {
        color: #eee;
      }
    }
  }
  .botBox {
    height: 0.8rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    /deep/.van-tabs {
      width: 100%;
      .van-tabs__wrap {
        height: 0.8rem;
      }
      .van-tab {
        line-height: 0.8rem;
        font-size: 0.24rem;
      }
      .van-tabs__wrap::after {
        border: none;
      }
    }
  }
}
#myChart {
  width: 100%;
  height: 2rem;
  margin: 0 auto;
}
.tabbar /deep/ .vux-tab {
  background: #152131;
}
.tabbar /deep/ .vux-tab-item {
  background: none;
}
.tabbar /deep/ .vux-tab-ink-bar {
  background: #152131 !important;
}
.contentList {
  margin-top: 0.1rem;
  background: #152131;
  border: none;
  .topTitle {
    height: 0.8rem;
    color: #ccc;
    display: flex;
    align-items: center;
    p {
      text-align: center;
      font-size: 0.2rem;
    }
    .maipan {
      width: 1rem;
    }
    .shuliangL {
      width: 1.7rem;
      text-align: left;
    }
    .jiage {
      width: 2rem;
      text-align: center;
    }
    .shuliangR {
      width: 1.7rem;
      text-align: right;
    }
    .maipanR {
      width: 1rem;
      text-align: center;
    }
  }
  .botContent {
    display: flex;
    > div {
      width: 50%;
    }
    .label {
      width: 100%;
      display: flex;
      div {
        color: #fff;
        font-size: 0.2rem;
      }
      .pantype {
        width: 1rem;
        text-align: center;
      }
      .panNum {
        width: 1.7rem;
        text-align: left;
      }
      .panNumR {
        text-align: right;
      }
      .panprice {
        width: 1rem;
      }
      .priceL {
        color: #3eb89b;
      }
      .priceR {
        color: #b0416f;
      }
    }
  }
}
.cjTitle {
  height: 0.8rem;
  display: flex;
  color: #ccc;
  align-items: center;
  font-size: 0.2rem;
  .cjtime {
    padding-left: 0.3rem;
    width: 1.7rem;
  }
  .cjdir {
    width: 0.8rem;
    text-align: center;
  }
  .cjprice {
    width: 2.5rem;
    text-align: center;
  }
  .cjnum {
    width: 2rem;
    text-align: right;
  }
}
.cjList {
  width: 100%;
  .cjlabel {
    width: 100%;
    display: flex;
    color: #fff;
    font-size: 0.2rem;
    .timeInfo {
      padding-left: 0.3rem;
      width: 1.7rem;
      text-align: left;
    }
    .dirInfo {
      width: 0.8rem;
      text-align: center;
    }
    .priceInfo {
      width: 2.5rem;
      text-align: center;
    }
    .numInfo {
      width: 2rem;
      text-align: right;
    }
  }
}
.floatBtn {
  width: 100%;
  height: 1rem;
  background: rgba(26, 41, 64, 1);
  position: fixed;
  bottom: 0rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    width: 2.5rem;
    height: 0.7rem;
    border-radius: 0.03rem;
    background: linear-gradient(
      -30deg,
      rgba(227, 185, 125, 1) 0%,
      rgba(240, 214, 160, 1) 100%
    );
    color: #fff;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.3rem;
  }
}
</style>







