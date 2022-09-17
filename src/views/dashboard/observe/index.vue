<template>
  <el-row :gutter="10" style="margin-top: 10px">
    <el-col :span="12"
      ><el-card>
        <div slot="header" class="clearfix">
          <span>线上热门搜索</span>
          <el-dropdown style="float: right">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="width: 100%; height: 300px">
          <div class="chart">
            <LineChart
              title="搜索用户数"
              count="123212"
              percentage="1"
              :chartData="saleRank.online.value"
            ></LineChart>
            <LineChart
              title="人均搜索次数"
              count="2.7"
              percentage="0"
              :chartData="saleRank.shop.value"
            ></LineChart>
          </div>
          <el-table
            border
            :data="tableData"
            style="width: 97%; margin-top: 10px"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="index" label="排名" width="80">
            </el-table-column>
            <el-table-column prop="name" label="搜索关键字" width="180">
            </el-table-column>
            <el-table-column prop="address" label="用户数" sortable>
            </el-table-column>
            <el-table-column prop="address" label="周涨幅" sortable>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 10px; text-align: center"
            layout="prev, pager, next"
            :total="1000"
          >
          </el-pagination>
        </div> </el-card
    ></el-col>
    <el-col :span="12"
      ><el-card>
        <div slot="header" class="clearfix">
          <span>销售额类别占比</span>
          <div style="float: right; margin: -7px 0">
            <el-radio-group v-model="radio" size="small">
              <el-radio-button label="全部渠道"></el-radio-button>
              <el-radio-button label="线上"></el-radio-button>
              <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <PieChart></PieChart></el-card
    ></el-col>
  </el-row>
</template>

<script>
import PieChart from "./pieChart/index.vue";
import LineChart from "./lineChart/index.vue";
import { mapGetters } from "vuex";
export default {
  name: "Observe",
  data() {
    return {
      radio: "全部渠道",
      index:0,
      tableData:[]
    };
  },
  components: { PieChart, LineChart },
  computed: {
    ...mapGetters('home', ["searchWord"]),
    ...mapGetters('home', ["saleRank"]),
  },
  mounted() {
  },
};
</script>

<style>
.chart {
  display: flex;
  justify-content: space-between;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
