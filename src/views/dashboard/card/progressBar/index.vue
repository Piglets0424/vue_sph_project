<template>
  <div class="progressBar" ref="progressBar"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProgressBar",
  props: ["chartData"],
  watch: {
    chartData: function (newVal) {
      this.option.series[0].data = [newVal];
      this.drawChart();
    },
  },
  data() {
    return {
      /** @type EChartsOption */
      option: {
        xAxis: {
          show: false,
          min: 0,
          max: 100,
        },
        yAxis: {
          type: "category",
          show: false,
        },
        series: [
          {
            data: [this.chartData],
            type: "bar",
            barWidth: "30%",
            // echarts-disable-next-line
            color: "rgb(133, 211, 15)",
            showBackground: true,
            backgroundStyle: {
              color: "#eee",
            },
            // label: {
            //   show: true,
            //   formatter: "|",
            //   position: "right",
            // },
          },
        ],
      },
    };
  },
  methods: {
    // 绘制图表
    drawChart() {
      let myChart = echarts.init(this.$refs.progressBar);
      myChart.setOption(this.option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style>
.progressBar {
  width: 100%;
  height: 100%;
}
</style>
<!-- <template>
  <div class="bar">
    <div class="bar_in"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
};
</script>

<style>
.bar {
  width: 90%;
  height: 15px;
  background-color: #eee;
}
.bar_in {
  width: 78%;
  height: 100%;
  background-color: rgb(133, 211, 15);
  /* transition: 过度属性（一般写all） 过度时间; */
  /* 过渡：谁过度给谁加 */
  transition: all 1s;
}
</style> -->
