<template>
  <div class="album">
    <div class="title">
      <h4 class="name">曲目列表</h4>
      <div class="btns">
        <div class="btn prev active">&lt;</div>
        <div class="btn next">&gt;</div>
      </div>
    </div>
    <div class="body">曲目</div>
  </div>
</template>

<script>
  export default {
    name: 'album'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .album {
    .title {
      padding: $module-padding;
      border-bottom: 1px solid $border-color;
      overflow: hidden;
    }
    .btns {
      float: right;
      overflow: hidden;
    }
    .btn {
      float: left;
      margin-left: $module-margin;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      border-radius: 50%;
      border: 1px solid $select-bg-color;
      color: $select-bg-color;
      &.active {
        border: 1px solid #e9e9e9;
        color: #e9e9e9;
      }
    }
    .name {
      float: left;
      margin: 5px 0 0;
      font-weight: normal;
      line-height: 100%;
    }
    .body {
      padding: $module-padding;
    }
  }
</style>
