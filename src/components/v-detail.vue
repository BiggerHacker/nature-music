<template>
  <div class="module-detail">
    <div>{{ list }}</div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: {
      list: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
