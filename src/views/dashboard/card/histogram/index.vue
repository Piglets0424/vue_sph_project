<template>
  <div class="histogram" ref="histogram"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Histogram",
  props:['chartData'],
  data() {
    return {
      /** @type EChartsOption */
      option: {
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: this.chartData,
            type: "bar",
          },
        ],
        grid: {
            top: 60,
            left: 0,
            bottom: 60,
            right: 0,
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
        let myChart = echarts.init(this.$refs.histogram);
    myChart.setOption(this.option);
    }
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style>
.histogram {
  width: 100%;
  height: 100%;
}
</style>
