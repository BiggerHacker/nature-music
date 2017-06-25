<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'scroll'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .scroll {
    padding: $module-padding;
  }
</style>
