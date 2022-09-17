<template>
  <div class="right">
    <h3>门店{{ title }}排名</h3>
    <ul>
      <li v-for="(data, index) in dataList" :key="index">
        <span>{{ data.no }}</span
        ><span>{{ data.name }}</span
        ><span>{{ data.money }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  props: ["title", "dataList"],
};
</script>

<style lang="scss" scoped>
.right {
  h3 {
    margin: 0;
    padding: 0;
  }
  ul {
    margin: 20px 0;
    padding: 0;
    list-style-type: none;
    li {
      margin: 20px 0;
      display: flex;
      font-size: 16px;
      justify-content: flex-start;
      span {
        text-align: left;
        display: block;
        &:first-child {
          width: 50px;
        }
        &:nth-child(2) {
          width: 200px;
        }
      }
    }
  }
  height: 300px;
}
</style>
