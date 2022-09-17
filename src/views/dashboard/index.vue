<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from './card/index.vue';
import Sale from './sale/index.vue';
import Observe from './observe/index.vue';

export default {
    name: "Dashboard",
    components: { Card, Sale, Observe },
    mounted(){
      this.$store.dispatch('home/getData')
    },
}
</script>

<style lang="scss" scoped>

</style>
