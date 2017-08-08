<template>
  <ul class="hot-list">
    <li class="pull-left" v-for="(item, index) in list" v-if="index < 5">
      <div class="pic" v-lazy:background-image="item.url" @click="select(item.id)">
        <div class="player">
          <div class="player-icon" @click.stop="player(item.id)">
            <i class="iconfont icon-player"></i>
          </div>
        </div>
      </div>
      <div class="name" @click="select(item.id)">{{ item.name }}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'list',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      select (id) {
        this.$emit('selectSheet', id)
      },
      player (id) {
        this.$emit('playerHotlist', id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .hot-list {
    margin: 0;
    margin-left: -$module-margin;
    padding: 0;
    list-style: none;
    overflow: hidden;
    li {
      width: 182px;
      overflow: hidden;
      margin-left: $module-margin;
    }
    .pic {
      position: relative;
      padding-top: 100%;
      cursor: pointer;
      background-size: cover;
      &:hover {
        .player {
          opacity: 1;
        }
      }
      .player {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: opacity .18s ease-out;
        background-color: rgba(0, 0, 0, .6);
      }
      .player-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 44px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        border-radius: 50%;
        transition: all .18s ease-out;
        background-color: $select-bg-color;
        &:hover {
          background-color: $select-depth-color;
        }
      }
      .iconfont {
        transition: color .18s ease-out;
        font-size: 24px;
        color: $white;
        &:hover {
          color: $white;
        }
      }
    }
    .name {
      margin-top: $module-sm-margin;
      max-height: 38px;
      line-height: 18px;
      overflow: hidden;
      cursor: pointer;
      transition: color .18s ease-out;
      font-size: $font-size-base;
      &:hover {
        color: $select-bg-color;
      }
    }
  }
</style>
