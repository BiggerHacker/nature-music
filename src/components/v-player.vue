<template>
  <div class="player">
    <div class="mini-player">mini</div>
    <div class="spread-player" :style="{height: spreadHeight}">spread</div>
  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
        spreadHeight: 0
      }
    },
    created () {
      this.spreadHeight = document.body.clientHeight + 'px'
      window.addEventListener('resize', () => {
        this.spreadHeight = document.body.clientHeight + 'px'
      })
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
    background-color: $select-bg-color;
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
    transition: all .18s ease-out;
    transform: translateY(100%);
    background-color: $black;
    color: $white;
  }
</style>
