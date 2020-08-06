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
      <div class="botBox">
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
      </div>
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
          <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="5">
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
          </van-list>
        </div>
        <!-- <div v-show="selectIndex==2" class="chengjiao">
          <van-list v-model="loading1" :finished="finished1" @load="onLoad1" :offset="10">
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
                <p class="priceInfo">{{item.sell_price}}</p>
                <p class="numInfo">{{item.num}}</p>
              </div>
            </div>
          </van-list>
        </div>-->
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
            console.log(a)
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
        legend: [
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
        ],
        grid: [
          {
            left: "3%",
            right: "11%",
            top: "10%",
            bottom: "15%"
          },
          {
            left: "3%",
            right: "11%",
            bottom: "1%",
            height: "8%"
          }
        ],
        xAxis: [
          {
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
          },
          {
            type: "category",
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax"
          }
        ],
        yAxis: [
          {
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
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            startValue: 1960,
            endValue: 2000,
            xAxisIndex: [0, 1]
          }
          /* {
            show: true,
            type: "slider",
            y: "90%",
            start: 0,
            end: 100,
            borderColor: "rgba(255,255,255,0)",
            dataBackground: {
              lineStyle: { color: "#43AB93", opacity: 1 },
              areaStyle: { color: "#43AB93" }
            },
            fillerColor: "rgba(167,183,204,0)",
            handleSize: 0
          } */
        ],
        visualMap: {
          show: false,
          seriesIndex: 4,
          dimension: 2,
          precision: 0.01,
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
          {
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
          },
          {
            name: "Volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
            barMaxWidth: "20"
          }
        ],
        /* graphic: {
          type: "text",
          id: "logo",
          left: "10",
          bottom: "22%",
          z: 0,
          bounding: "raw",
          style: {
            text: "淘链金融",
            font: "italic bolder 24px cursive",
            fill: "#999"
          }
        }, */
        graphic: {
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
        },
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
      loading: false,
      finished: false,
      loading1: false,
      finished1: false,
      KlineData: [],
      typeActive: 0,
      kData: []
    };
  },
  created() {
    this.$http
      .post("/amoy/trade/k-line-data", {
        time_padding: "fifteen_minutes",
        day_padding: "three_month"
      })
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
    this.getDealList();
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    api.setStatusBarStyle({
      style: "light"
    });
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getDealList();
    }, 300000);
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  methods: {
    setEchartOption() {
      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      /* this.resData = splitData([
        ["2013/1/24", 2320.26, 2320.26, 2287.3, 2362.94],
        ["2013/1/25", 2300, 2291.3, 2288.26, 2308.38],
        ["2013/1/28", 2295.35, 2346.5, 2295.35, 2346.92],
        ["2013/1/29", 2347.22, 2358.98, 2337.35, 2363.8],
        ["2013/1/30", 2360.75, 2382.48, 2347.89, 2383.76],
        ["2013/1/31", 2383.43, 2385.42, 2371.23, 2391.82],
        ["2013/2/1", 2377.41, 2419.02, 2369.57, 2421.15],
        ["2013/2/4", 2425.92, 2428.15, 2417.58, 2440.38],
        ["2013/2/5", 2411, 2433.13, 2403.3, 2437.42],
        ["2013/2/6", 2432.68, 2434.48, 2427.7, 2441.73],
        ["2013/2/7", 2430.69, 2418.53, 2394.22, 2433.89],
        ["2013/2/8", 2416.62, 2432.4, 2414.4, 2443.03],
        ["2013/2/18", 2441.91, 2421.56, 2415.43, 2444.8],
        ["2013/2/19", 2420.26, 2382.91, 2373.53, 2427.07],
        ["2013/2/20", 2383.49, 2397.18, 2370.61, 2397.94],
        ["2013/2/21", 2378.82, 2325.95, 2309.17, 2378.82],
        ["2013/2/22", 2322.94, 2314.16, 2308.76, 2330.88],
        ["2013/2/25", 2320.62, 2325.82, 2315.01, 2338.78],
        ["2013/2/26", 2313.74, 2293.34, 2289.89, 2340.71],
        ["2013/2/27", 2297.77, 2313.22, 2292.03, 2324.63],
        ["2013/2/28", 2322.32, 2365.59, 2308.92, 2366.16],
        ["2013/3/1", 2364.54, 2359.51, 2330.86, 2369.65],
        ["2013/3/4", 2332.08, 2273.4, 2259.25, 2333.54],
        ["2013/3/5", 2274.81, 2326.31, 2270.1, 2328.14],
        ["2013/3/6", 2333.61, 2347.18, 2321.6, 2351.44],
        ["2013/3/7", 2340.44, 2324.29, 2304.27, 2352.02],
        ["2013/3/8", 2326.42, 2318.61, 2314.59, 2333.67],
        ["2013/3/11", 2314.68, 2310.59, 2296.58, 2320.96],
        ["2013/3/12", 2309.16, 2286.6, 2264.83, 2333.29],
        ["2013/3/13", 2282.17, 2263.97, 2253.25, 2286.33],
        ["2013/3/14", 2255.77, 2270.28, 2253.31, 2276.22],
        ["2013/3/15", 2269.31, 2278.4, 2250, 2312.08],
        ["2013/3/18", 2267.29, 2240.02, 2239.21, 2276.05],
        ["2013/3/19", 2244.26, 2257.43, 2232.02, 2261.31],
        ["2013/3/20", 2257.74, 2317.37, 2257.42, 2317.86],
        ["2013/3/21", 2318.21, 2324.24, 2311.6, 2330.81],
        ["2013/3/22", 2321.4, 2328.28, 2314.97, 2332],
        ["2013/3/25", 2334.74, 2326.72, 2319.91, 2344.89],
        ["2013/3/26", 2318.58, 2297.67, 2281.12, 2319.99],
        ["2013/3/27", 2299.38, 2301.26, 2289, 2323.48],
        ["2013/3/28", 2273.55, 2236.3, 2232.91, 2273.55],
        ["2013/3/29", 2238.49, 2236.62, 2228.81, 2246.87],
        ["2013/4/1", 2229.46, 2234.4, 2227.31, 2243.95],
        ["2013/4/2", 2234.9, 2227.74, 2220.44, 2253.42],
        ["2013/4/3", 2232.69, 2225.29, 2217.25, 2241.34],
        ["2013/4/8", 2196.24, 2211.59, 2180.67, 2212.59],
        ["2013/4/9", 2215.47, 2225.77, 2215.47, 2234.73],
        ["2013/4/10", 2224.93, 2226.13, 2212.56, 2233.04],
        ["2013/4/11", 2236.98, 2219.55, 2217.26, 2242.48],
        ["2013/4/12", 2218.09, 2206.78, 2204.44, 2226.26],
        ["2013/4/15", 2199.91, 2181.94, 2177.39, 2204.99],
        ["2013/4/16", 2169.63, 2194.85, 2165.78, 2196.43],
        ["2013/4/17", 2195.03, 2193.8, 2178.47, 2197.51],
        ["2013/4/18", 2181.82, 2197.6, 2175.44, 2206.03],
        ["2013/4/19", 2201.12, 2244.64, 2200.58, 2250.11],
        ["2013/4/22", 2236.4, 2242.17, 2232.26, 2245.12],
        ["2013/4/23", 2242.62, 2184.54, 2182.81, 2242.62],
        ["2013/4/24", 2187.35, 2218.32, 2184.11, 2226.12],
        ["2013/4/25", 2213.19, 2199.31, 2191.85, 2224.63],
        ["2013/4/26", 2203.89, 2177.91, 2173.86, 2210.58],
        ["2013/5/2", 2170.78, 2174.12, 2161.14, 2179.65],
        ["2013/5/3", 2179.05, 2205.5, 2179.05, 2222.81],
        ["2013/5/6", 2212.5, 2231.17, 2212.5, 2236.07],
        ["2013/5/7", 2227.86, 2235.57, 2219.44, 2240.26],
        ["2013/5/8", 2242.39, 2246.3, 2235.42, 2255.21],
        ["2013/5/9", 2246.96, 2232.97, 2221.38, 2247.86],
        ["2013/5/10", 2228.82, 2246.83, 2225.81, 2247.67],
        ["2013/5/13", 2247.68, 2241.92, 2231.36, 2250.85],
        ["2013/5/14", 2238.9, 2217.01, 2205.87, 2239.93],
        ["2013/5/15", 2217.09, 2224.8, 2213.58, 2225.19],
        ["2013/5/16", 2221.34, 2251.81, 2210.77, 2252.87],
        ["2013/5/17", 2249.81, 2282.87, 2248.41, 2288.09],
        ["2013/5/20", 2286.33, 2299.99, 2281.9, 2309.39],
        ["2013/5/21", 2297.11, 2305.11, 2290.12, 2305.3],
        ["2013/5/22", 2303.75, 2302.4, 2292.43, 2314.18],
        ["2013/5/23", 2293.81, 2275.67, 2274.1, 2304.95],
        ["2013/5/24", 2281.45, 2288.53, 2270.25, 2292.59],
        ["2013/5/27", 2286.66, 2293.08, 2283.94, 2301.7],
        ["2013/5/28", 2293.4, 2321.32, 2281.47, 2322.1],
        ["2013/5/29", 2323.54, 2324.02, 2321.17, 2334.33],
        ["2013/5/30", 2316.25, 2317.75, 2310.49, 2325.72],
        ["2013/5/31", 2320.74, 2300.59, 2299.37, 2325.53],
        ["2013/6/3", 2300.21, 2299.25, 2294.11, 2313.43],
        ["2013/6/4", 2297.1, 2272.42, 2264.76, 2297.1],
        ["2013/6/5", 2270.71, 2270.93, 2260.87, 2276.86],
        ["2013/6/6", 2264.43, 2242.11, 2240.07, 2266.69],
        ["2013/6/7", 2242.26, 2210.9, 2205.07, 2250.63],
        ["2013/6/13", 2190.1, 2148.35, 2126.22, 2190.1]
      ]); */
      /* this.resData = splitData([
        [10452.74, 10409.85, 10367.41, 10554.96, 168890000],
        [10411.85, 10544.07, 10411.85, 10575.92, 221290000],
        [10543.85, 10538.66, 10454.37, 10584.07, 191460000],
        [10535.46, 10529.03, 10432, 10587.55, 225490000],
        [10530.07, 10592.44, 10480.59, 10651.99, 237770000],
        [10589.25, 10458.89, 10420.52, 10603.48, 223250000],
        [10461.55, 10485.18, 10389.85, 10543.03, 197960000],
        [10485.18, 10427.18, 10341.19, 10539.25, 197310000],
        [10428.67, 10538.37, 10426.89, 10573.85, 186280000],
        [10534.52, 10553.85, 10454.52, 10639.03, 260090000],
        [10556.37, 10600.51, 10503.7, 10666.88, 254170000],
        [10601.4, 10528.66, 10447.92, 10676.96, 224300000],
        [10522.77, 10623.62, 10453.11, 10665.7, 214920000],
        [10624.22, 10623.18, 10545.03, 10717.4, 219720000],
        [10625.25, 10568.29, 10490.14, 10691.77, 234260000],
        [10568, 10702.51, 10510.44, 10725.18, 186170000],
        [10701.1, 10609.92, 10579.33, 10748.81, 206560000],
        [10610.07, 10468.37, 10412.44, 10703.25, 247660000],
        [10467.41, 10510.29, 10369.92, 10611.56, 273970000],
        [10510.22, 10488.07, 10385.56, 10551.03, 208990000],
        [10487.78, 10499.18, 10395.55, 10614.44, 224800000],
        [10499.48, 10505.18, 10414.15, 10571.48, 183810000],
        [10503.11, 10470.74, 10394.81, 10567.85, 227760000],
        [10469.33, 10495.55, 10399.92, 10566.37, 187810000]
      ]); */
      /* this.resData = splitData(JSON.parse(sessionStorage.getItem("kline"))); */
      this.resData = splitData(this.kData);
      this.echartsOption.xAxis[0].data = this.resData.categoryData;
      this.echartsOption.xAxis[1].data = this.resData.volumes;
      this.echartsOption.series[0].data = this.resData.values;
      this.echartsOption.series[1].data = calculateMA(5, this.resData.values);
      this.echartsOption.series[2].data = calculateMA(10, this.resData.values);
      this.echartsOption.series[3].data = calculateMA(30, this.resData.values);
      this.echartsOption.series[4].data = this.resData.volumes;
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
            rawData[i][0] > rawData[i][1] ? 1 : -1
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
        .post("/amoy/trade/tray-list", {
          type: 2
        })
        .then(res => {
          if (res.code == 0) {
            this.priceData = res.data.topData;
            this.loading = false;
            this.finished = true;
            this.dealList1 = res.data.buyOrder;
            this.dealList2 = res.data.sellOrder;
          }
        });
    },
    //获取成交订单
    /* getDealInfo() {
      this.$http.post("/amoy/trade/entrust-data").then(res => {
        if (res.code == 0) {
          this.dealInfo = res.data;
          this.loading1 = false;
          this.finished1 = true;
        }
      });
    }, */
    //获取K线图数据
    getKlineData() {
      this.$http.post("/amoy/trade/k-line-data").then(res => {
        if (res.code == 0) {
          this.KlineData = res.data;
        }
      });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page++;
        this.getDealList();
        this.loading = false;
      }, 1000);
    },
    onLoad1() {
      // 异步更新数据
      setTimeout(() => {
        this.page1++;
        /* this.getDealInfo(); */
        this.loading1 = false;
      }, 1000);
    },
    selectIndeX(type) {
      this.selectIndex = type;
    },
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        /* volumes.push([
          i,
          rawData[i][4],
          rawData[i][0] > rawData[i][1] ? 1 : -1
        ]); */
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
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
  height: 2.4rem;
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
  height: 8rem;
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







