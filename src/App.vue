<template>
  <div class="music-wrapper">
    <div class="music-content">
      <v-menu></v-menu>
      <v-section></v-section>
      <v-player></v-player>
    </div>
    <v-bg-animate></v-bg-animate>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VMenu from '@/components/v-menu'
  import VSection from '@/components/v-section'
  import VPlayer from '@/components/v-player'
  import VBgAnimate from '@/components/v-bg-animate'
  export default {
    name: 'app',
    components: {
      VMenu,
      VSection,
      VPlayer,
      VBgAnimate
    },
    methods: {
      ...mapMutations([
        'SET_FULL_SCREEN_STATE'
      ])
    },
    watch: {
      '$route' () {
        this.SET_FULL_SCREEN_STATE(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .music-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .music-content {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    z-index: 999;
    margin-left: -600px;
    width: 1200px;
    height: 100%;
    padding-bottom: 60px;
    overflow: hidden;
    background-color: $white;
  }
</style>
