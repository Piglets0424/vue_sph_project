<template>
  <div class="pieChart" ref="pieChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieChart",
  data() {
    return {
      /** @type EChartsOption */
      option: {
        title: {
          text: "搜索引擎",
          textStyle: {
            fontSize: "14px",
            color: "gray",
            fontWeight: "normal",
          },
          subtext: "1048",
          subtextStyle: {
            fontSize: "30px",
            color: "black",
          },
          left: "center",
          top: "40%",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "销售额占比",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outside",
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    const myChart = echarts.init(this.$refs.pieChart);
    myChart.on("mouseover", (params) => {
      let { name, value } = params.data;
      this.option.title.text = name;
      this.option.title.subtext = value;
      myChart.setOption(this.option);
    });
    myChart.setOption(this.option);
  },
};
</script>

<style>
.pieChart {
  width: 100%;
  height: 300px;
}
</style>
