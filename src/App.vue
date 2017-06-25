<template>
  <div class="music-wrapper">
    <v-menu></v-menu>
    <v-section></v-section>
  </div>
</template>

<script>
  import VMenu from '@/components/v-menu'
  import VSection from '@/components/v-section'
  export default {
    name: 'app',
    components: {
      VMenu,
      VSection
    }
  }
</script>

<style lang="scss" scoped>
  .music-wrapper {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 60px;
    overflow: hidden;
  }
</style>
