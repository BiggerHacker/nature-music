<template>
  <div class="drag" @mousedown="dragDown"></div>
</template>

<script>
  export default {
    name: 'drag',
    methods: {
      dragDown (ev) {
        this.$emit('dragDown', ev)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .drag {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    width: $module-sm-margin;
    height: 40px;
    transition: opacity .18s ease-out;
    border-radius: $border-radius-bg;
    background-color: $select-bg-color;
  }
</style>
