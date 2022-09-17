<template>
  <el-card style="margin-top: 10px">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="销售额">
          <el-row :gutter="10">
            <el-col :span="18">
              <Charts :chartData="orderInfo.orderFullYear"  title="销售额"></Charts
            ></el-col>
            <el-col :span="6">
              <Leaderboard title="销售额" :dataList="orderInfo.orderRank"></Leaderboard>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="访问量">
          <el-row :gutter="10">
            <el-col :span="18">
              <Charts :chartData="userInfo.userFullYear" title="访问量"></Charts
            ></el-col>
            <el-col :span="6">
              <Leaderboard title="访问量" :dataList="userInfo.userRank"></Leaderboard>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="rightArea">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-left: 10px; width: 270px"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import Charts from "./charts/index.vue";
import Leaderboard from "./leaderboard/index.vue";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "销售额",
      value1: "",
    };
  },
  methods: {},
  components: { Charts, Leaderboard },
  computed: {
    ...mapGetters("home", ["orderInfo"]),
    ...mapGetters("home", ["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.rightArea {
  position: absolute;
  right: 0;
  span {
    margin: 0 7px;
  }
}
.tab {
  width: 100%;
}
::v-deep .el-tabs__item {
  font-size: 20px;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
::v-deep .el-card__header {
  border: none;
}
</style>
