<template>
  <div style="width: 50%">
    <span class="header">{{ title }} <i class="el-icon-info"></i></span>
    <span class="count"
      >{{ count
      }}<span v-if="percentage == 1"
        >17.1<i class="el-icon-caret-top"></i> </span
      ><span v-else
        >26.2<i
          style="color: rgb(3, 134, 71)"
          class="el-icon-caret-bottom"
        ></i> </span
    ></span>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Linechart",
  props: ["title", "count", "percentage", "chartData"],
  data() {
    return {
      /** @type EChartsOption */
      option: {
        // x轴
        xAxis: {
          type: "category",
          show: false,
        },
        // y轴
        yAxis: {
          show: false,
        },
        // 系列
        series: [
          {
            data: this.chartData,
            type: "line",
            // 平滑
            smooth: true,
            // 拐点
            itemStyle: {
              opacity: 0,
            },
            // 线条颜色
            lineStyle: {
              color: "#5470c6",
            },
            // 填充颜色
            areaStyle: {
              // 渐变色
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#5470c6", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
        // 网格
        grid: {
          top: 0,
          right: "0",
          left: "-10%",
          bottom: "-5%",
        },
      },
    };
  },
  watch: {
    chartData: function (newVal) {
      this.option.series[0].data = newVal;
      this.drawChart();
    },
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(this.$refs.chart);
      myChart.setOption(this.option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: block;
  color: grey;
  width: 100%;
}
.count {
  display: block;
  margin-top: 15px;
  font-size: 25px;
  font-weight: 500;
  span {
    margin-left: 30px;
    font-size: 18px;
    color: grey;
    i {
      color: red;
    }
  }
}
.chart {
  width: 100%;
  height: 75px;
}
</style>
