<template>
  <div class="module-detail">
    <div class="detail-head clearfix">
      <div class="thrum pull-left" :class="{'thrum-cir': !list.disstid}">
        <img :src="list.logo" alt="">
      </div>
      <div class="illustrate">
        <h2 class="title">{{ list.dissname }}</h2>
        <div class="intro" v-if="list.nickname">
          <span class="name">{{ list.nickname }}</span>
          <span class="time">{{ format(list.ctime) }}创建</span>
          <span class="tag" v-for="item in list.tags">{{ item.name }}</span>
        </div>
        <div class="desc">
          <div class="text" v-html="list.desc"></div>
          <div class="desc all-desc" v-show="descShow" v-iscroll="getIscroll">
            <div>
              <div class="text" v-html="list.desc"></div>
            </div>
            <div class="hide-desc" @click="hideDesc">[收起]</div>
          </div>
          <div class="up" v-show="!descShow" @click="showDesc">[展开]</div>
        </div>
        <div class="config">
          <span class="config-btn config-play-all">
            <i class="iconfont icon-i-player"></i>
            播放全部
          </span>
          <span class="config-btn">
            <i 
              class="iconfont" 
              :class="{'icon-not-collection': !isCollection, 'icon-collection': isCollection}"
            ></i>
            {{ collectionText }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        descShow: false,
        collectionText: '收藏',
        isCollection: false
      }
    },
    activated () {
      this.descShow = false
    },
    methods: {
      format (time) {
        let date = new Date(time * 1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return `${year}-${this.getzero(month)}-${this.getzero(day)}`
      },
      getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      showDesc () {
        this.descShow = true
      },
      hideDesc () {
        this.descShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  @import '~@/assets/scss/mixin';
  .module-detail {
    background-color: $white;
  }
  .detail-head {
    padding: $module-padding;
    background-color: $section-bg-color;
    .thrum {
      width: 150px;
      height: 150px;
      overflow: hidden;
      img {
        width: 100%;
      }
      &.thrum-cir {
        border-radius: 50%;
      }
    }
    .illustrate {
      padding-left: 150px + $module-padding;
      padding-top: $module-sm-padding;
    }
    .title {
      margin: 0;
      line-height: 100%;
      height: 24px;
      @include text-overflow;
    }
    .intro {
      margin-top: $module-margin;
      font-size: $font-size-base;
    }
    .name {
      cursor: pointer;
      color: $black;
      &:hover {
        color: $select-bg-color;
      }
    }
    .time {
      margin-left: $module-sm-margin;
      color: $gray-color;
    }
    .tag {
      display: inline-block;
      margin-left: $module-sm-margin;
      padding: 0 $module-sm-margin;
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      border-radius: $border-radius-base;
      background-color: $select-bg-color;
      color: $white;
    }
    .desc {
      position: relative;
      padding-right: 40px;
      margin-top: $module-sm-margin;
      .text {
        height: 48px;
        overflow: hidden;
        line-height: 24px;
        font-size: $font-size-base;
        color: $gray-color;
      }
      .up {
        position: absolute;
        right: 0;
        bottom: 5px;
        cursor: pointer;
        font-size: $font-size-base;
        color: $black;
        &:hover {
          color: $select-bg-color;
        }
      }
      &.all-desc {
        position: absolute;
        left: -$module-margin;
        top: -($module-padding + $module-sm-margin);
        width: 100%;
        max-height: 300px;
        overflow: hidden;
        background-color: $white;
        border-radius: $border-radius-base;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
        .text {
          padding: $module-padding 0 $module-padding*2 $module-padding;
          height: auto;
          overflow: auto;
        }
        .hide-desc {
          position: absolute;
          right: $module-margin;
          bottom: $module-margin;
          cursor: pointer;
          font-size: $font-size-base;
          color: $black;
          &:hover {
            color: $select-bg-color;
          }
        }
      }
    }
    .config {
      margin-top: $module-sm-margin;
      .config-btn {
        display: inline-block;
        margin-right: $module-margin;
        padding: $module-sm-padding 0;
        width: 102px;
        text-align: center;
        cursor: pointer;
        border: 1px solid $border-color;
        border-radius: $border-radius-base;
        transition: all .18s ease-out;
        color: $black;
        font-size: $font-size-base;
        &:hover {
          color: $select-bg-color;
        }
        &.config-play-all {
          border: 1px solid $select-bg-color;
          background-color: $select-bg-color;
          color: $white;
          .iconfont {
            color: $white;
          }
          &:hover {
            background-color: $select-depth-color;
            border: 1px solid $select-depth-color;
          }
        }
      }
      .iconfont {
        color: $select-bg-color;
        font-size: $font-size-base;
        margin-right: $module-sm-margin;
      }
    }
  }
</style>
