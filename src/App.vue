<template>
  <div class="music-wrapper">
    <v-menu></v-menu>
    <v-section></v-section>
    <v-player></v-player>
  </div>
</template>

<script>
  import VMenu from '@/components/v-menu'
  import VSection from '@/components/v-section'
  import VPlayer from '@/components/v-player'
  export default {
    name: 'app',
    components: {
      VMenu,
      VSection,
      VPlayer
    }
  }
</script>

<style lang="scss" scoped>
  .music-wrapper {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 60px;
    overflow: hidden;
  }
</style>
