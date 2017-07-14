<template>
  <div class="player">
    <div class="mini-player">
      <span @click="fullScreenUp">mini-player</span>
    </div>
    <div class="spread-player" :class="{'spread-player-up': fullScreen}" :style="{height: spreadHeight}">
      <span @click="fullScreenDown">spread</span>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'player',
    data () {
      return {
        spreadHeight: 0
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen'
      ])
    },
    created () {
      this.spreadHeight = document.body.clientHeight + 'px'
      window.addEventListener('resize', () => {
        this.spreadHeight = document.body.clientHeight + 'px'
      })
    },
    methods: {
      fullScreenUp () {
        this.SET_FULL_SCREEN_STATE(true)
      },
      fullScreenDown () {
        this.SET_FULL_SCREEN_STATE(false)
      },
      ...mapMutations([
        'SET_FULL_SCREEN_STATE'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .player {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
  }
  .mini-player {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    border-top: 1px solid $border-color;
    background-color: $white;
  }
  .spread-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
    width: 1200px;
    margin: 0 auto;
    transition: all .3s ease-out;
    transform: translateY(100%);
    background-color: #000;
    color: $white;
    &.spread-player-up {
      transform: translateY(0);
    }
  }
</style>
