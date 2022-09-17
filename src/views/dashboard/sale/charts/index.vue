<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  props: ["chartData", "title"],
  data() {
    return {
      /** @type EChartsOption */
      option: {
        title: {
          text: `${this.title}趋势`,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "访问量",
            type: "bar",
            barWidth: "50%",
            data: this.chartData,
          },
        ],
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
       let myChart = echarts.init(this.$refs.charts);
    myChart.setOption(this.option);
    }
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style>
.charts {
  width: 1050px;
  height: 300px;
}
</style>
