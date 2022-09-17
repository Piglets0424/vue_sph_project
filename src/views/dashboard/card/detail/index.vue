<template>
  <div style="height: 150px">
    <div class="card-header">
      <span>{{ title }}</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="card-content">{{ content }}</div>
    <div class="card-charts"><slot name="charts"></slot></div>
    <div class="card-bottom"><slot name="bottom"></slot></div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["title", "content"],
};
</script>

<style lang="scss" scoped>
.card-header {
  span {
    color: gray;
  }
  i {
    float: right;
    color: gray;
  }
}
.card-content {
  margin-top: 5px;
  font-size: 30px;
}
.card-charts {
  height: 70px;
  border-bottom: 1px solid rgb(222, 220, 220);
}
.card-bottom {
  margin-top: 10px;
}
</style>
