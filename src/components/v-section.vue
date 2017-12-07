<template>
  <div class="section">
    <div class="search-config">
      <v-controller></v-controller>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import VController from '@/components/v-controller'
  export default {
    name: 'section',
    components: {
      VController
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .section {
    position: relative;
    margin-left: $menu-width;
    height: 100%;
  }
  .search-config {
    padding: 0 $module-padding;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #d5d3d2;
    background-color: #fff;
  }
</style>
