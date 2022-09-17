<template>
  <div class="lineChart" ref="lineChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  props: ["chartData"],
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
              color: "purple",
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
                    color: "purple", // 0% 处的颜色
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
          right: "-10%",
          left: "-10%",
          bottom: 10,
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
  methods:{
    drawChart(){
      // 初始化echarts实例
    let lineChart = echarts.init(this.$refs.lineChart);
    // this.option.series[0].data = this.chartData;
    lineChart.setOption(this.option);
    }
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style>
.lineChart {
  width: 100%;
  height: 100%;
}
</style>
