<template>
  <ul class="singer-list clearfix">
    <li v-for="item in list">
      <router-link :to="{path: '/singer/' + item.mid}">
        <img class="thumb" :src="item.pic" :onerror="errImg">
        <p class="name">{{ item.name }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'singer-list',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        errImg: 'this.src="' + require('@/assets/images/error_singer.png') + '"'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .singer-list {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      float: left;
      padding: 0 $module-padding;
      width: 20%;
      &:first-child {
        margin-left: -$module-margin;
      }
    }
    a {
      display: block;
      padding: $module-padding;
      text-decoration: none;
      text-align: center;
      background-color: $section-bg-color;
      color: $black;
    }
    .thumb {
      width: 100%;
      border-radius: 50%;
    }
    .name {
      margin: $module-margin 0 0;
      line-height: 100%;
      font-size: $font-size-base;
    }
  }
</style>
