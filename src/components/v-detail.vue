<template>
  <div class="module-detail">
    <div v-html="list.desc"></div>
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
