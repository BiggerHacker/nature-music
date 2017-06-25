<template>
  <div class="menu">
    <div class="profile-wrap">
      <div class="profile">
        <div class="thrum"></div>
        <div class="name">何遇™</div>
      </div>
    </div>
    <div class="nav-wrap">
      <v-scroll>
        <v-nav :typeTitle="'音乐馆'" :typeName="musicHall"></v-nav>
      </v-scroll>
    </div>
  </div>
</template>

<script>
  import VNav from '@/components/v-nav'
  import VScroll from '@/components/v-scroll'
  export default {
    name: 'menu',
    components: {
      VNav,
      VScroll
    },
    created () {
      this.musicHall = [
        {
          link: '/selected',
          name: '精选',
          iconName: 'icon-selected'
        },
        {
          link: '/rank',
          name: '排行',
          iconName: 'icon-rank'
        },
        {
          link: '/sheet',
          name: '歌单',
          iconName: 'icon-sheet'
        },
        {
          link: '/singer',
          name: '歌手',
          iconName: 'icon-singer'
        }
      ]
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .menu {
    position: relative;
    float: left;
    width: $menu-width;
    height: 100%;
    background-color: $menu-bg-color;
  }
  .profile-wrap {
    padding: 0 $module-padding;
  }
  .profile {
    padding: $module-padding*2 0 $module-padding;
    border-bottom: 1px solid #d5d3d2;
    .thrum {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      border-radius: 50%;
      background: url(~@/assets/images/thrum.jpg) no-repeat center center;
      background-size: cover;
    }
    .name {
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: $font-size-base;
      color: $black;
    }
  }
  .nav-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 128px;
    width: 100%;
    overflow-y: scroll;
  }
</style>
