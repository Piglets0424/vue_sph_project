<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card
          ><Detail title="总销售额" :content="`￥${totalSales.salesTotal}`">
            <template v-slot:charts>
              <div style="padding-top: 40px">
                <span class="week"
                  >周同比 {{ totalSales.salesGrowthLastMonth }}%
                  <i
                    v-if="totalSales.salesGrowthLastMonth > 0"
                    class="el-icon-caret-top"
                    style="color: red"
                  ></i>
                  <i
                    v-else
                    class="el-icon-caret-bottom"
                    style="color: rgb(3, 134, 71)"
                  ></i>
                </span>
                <span class="day"
                  >日同比 {{ totalSales.salesGrowthLastDay }}%
                  <i
                    v-if="totalSales.salesGrowthLastDay < 0"
                    class="el-icon-caret-bottom"
                    style="color: rgb(3, 134, 71)"
                  ></i>
                  <i v-else class="el-icon-caret-top" style="color: red"></i
                ></span>
              </div>
            </template>
            <template slot="bottom">
              <span>日销售额￥{{ totalSales.salesToday }}</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="访问量" :content="views.visitTotal">
            <template v-slot:charts>
              <LineChart :chartData="views.visitTrend"></LineChart>
            </template>
            <template slot="bottom">
              <span>日访问量 {{ views.visitToday }}</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="支付笔数" :content="payNum.payTotal">
            <template v-slot:charts>
              <Histogram :chartData="payNum.payTrend"></Histogram>
            </template>
            <template slot="bottom">
              <span>转化率 {{ payNum.payRate }}%</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="运营活动效果" :content="`${activity.activityRate}%`">
            <template v-slot:charts>
              <ProgressBar :chartData="activity.activityRate"></ProgressBar>
            </template>
            <template slot="bottom">
              <span class="week"
                >周同比 {{ activity.activityGrowthLastMonth }}%
                <i
                  v-if="activity.activityGrowthLastMonth > 0"
                  class="el-icon-caret-top"
                  style="color: red"
                ></i
                ><i
                  v-else
                  class="el-icon-caret-bottom"
                  style="color: rgb(3, 134, 71)"
                ></i
              ></span>
              <span class="day"
                >日同比 {{ activity.activityGrowthLastDay }}%
                <i
                  v-if="activity.activityGrowthLastDay < 0"
                  class="el-icon-caret-bottom"
                  style="color: rgb(3, 134, 71)"
                ></i
                ><i v-else class="el-icon-caret-top" style="color: red"></i
              ></span>
            </template> </Detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./detail/index.vue";
import LineChart from "./lineChart/index.vue";
import Histogram from "./histogram/index.vue";
import ProgressBar from "./progressBar/index.vue";
import { mapGetters } from "vuex";
export default {
  name: "Card",
  components: { Detail, LineChart, Histogram, ProgressBar },
  computed: {
    ...mapGetters("home", ["totalSales"]),
    ...mapGetters("home", ["views"]),
    ...mapGetters("home", ["payNum"]),
    ...mapGetters("home", ["activity"]),
  },
};
</script>

<style lang="scss" scoped>
.day {
  margin-left: 25px;
}
.box-card {
  width: 480px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
