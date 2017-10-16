<template>
  <div class="nav">
    <h4 class="title">{{ typeTitle }}</h4>
    <ul class="list">
      <li v-for="(item, index) in typeName" :key="index">
        <router-link :to="item.link">
          <i class="iconfont" :class="item.iconName"></i>
          <span class="text">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'nav',
    props: {
      typeTitle: {
        type: String,
        default: ''
      },
      typeName: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .nav {
    padding: $module-padding;
    font-size: $font-size-base;
    .title {
      margin: 0 0 $module-sm-margin;
      padding: 0 $module-sm-padding;
      font-weight: normal;
      color: #70706e;
    }
    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        width: 100%;
        height: $nav-height;
        line-height: $nav-height;
      }
      a {
        padding: 0 $module-sm-padding;
        display: block;
        text-decoration: none;
        cursor: default;
        color: $black;
        &.router-link-active {
          border-radius: $border-radius-base;
          background-color: $select-bg-color;
          color: $white;
        }
      }
      .iconfont,
      .text {
        vertical-align: middle;
      }
      .text {
        margin-left: $module-sm-margin;
      }
    }
  }
</style>
