<template>
  <div class="loading">
    <img src="../assets/images/loading.gif" alt="">
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .loading {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
