<template>
  <div class="slide" @mouseenter="clear" @mouseleave="autoPlay">
    <ul class="slide-list">
      <li :class="slideCLS[index]" v-for="(item, index) in slideList">
        <a 
          class="item" 
          :href="item.jumpurl ? item.jumpurl : 'https://y.qq.com/n/yqq/album/'+ item.id +'.html'"
          target="_blank"
        >
          <img :src="item.pic" :alt="item.title">
        </a>
      </li>
    </ul>
    <div class="slide-btn prev" @click="prevSlide">
      <i class="iconfont icon-prev"></i>
    </div>
    <div class="slide-btn next" @click="nextSlide">
      <i class="iconfont icon-next"></i>
    </div>
    <div class="slide-mod">
      <span class="item" :class="{active: index === currentIndex}" v-for="(item, index) in slideList"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slide',
    props: {
      slideList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        slideCLS: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8', 'item-9'],
        currentIndex: 0
      }
    },
    created () {
      if (this.slideList) {
        this.autoPlay()
      }
    },
    methods: {
      prevSlide () {
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.currentIndex = this.slideCLS.length - 1
        }
        this.slideCLS.push(this.slideCLS[0])
        this.slideCLS.shift()
      },
      nextSlide () {
        this.currentIndex++
        if (this.currentIndex > this.slideCLS.length - 1) {
          this.currentIndex = 0
        }
        this.slideCLS.unshift(this.slideCLS[this.slideCLS.length - 1])
        this.slideCLS.pop()
      },
      autoPlay () {
        this.timer = setInterval(() => {
          this.nextSlide()
        }, 2000)
      },
      clear () {
        clearInterval(this.timer)
      }
    },
    watch: {
      '$route' (to, from) {
        if (from.name === 'selected') {
          this.clear()
        } else if (to.name === 'selected') {
          this.autoPlay()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .slide {
    position: relative;
    overflow: hidden;
    &:hover {
      .slide-btn {
        opacity: 1
      }
    }
    .slide-btn {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 15;
      padding: 0 12px;
      height: 100%;
      line-height: 210px;        
      opacity: 0;
      transition: all .18s ease-out;
      cursor: pointer;
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }
    .iconfont {
      color: $white;
      font-size: 24px;
    }
    .slide-mod {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 16;
      padding: 12px 0;
      width: 100%;
      text-align: center;
      .item {
        display: inline-block;
        margin-right: $module-margin;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $select-bg-color;
      }
      .active {
        background-color: $white;
      }
    }
  }
  .slide-list {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    height: 210px;
    li {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      width: 525px;
      height: 210px;
      transition: all 300ms ease-out;
      &.item-1 {
        transform: translateX(-$slide-margin) scale(.8);
      }
      &.item-2 {
        transform: translateX(0) scale(.8);
        transform-origin: 0 50%;
      }
      &.item-3 {
        transform: translateX($slide-margin) scale(1);
        z-index: 12;
      }
      &.item-4 {
        transform: translateX($slide-margin*2) scale(.8);
        transform-origin: 100% 50%;
        z-index: 11;
      }
      &.item-5 {
        transform: translateX($slide-margin*3) scale(.8);
      }
      &.item-6 {
        transform: translateX($slide-margin*4) scale(.8);
      }
      &.item-7 {
        transform: translateX($slide-margin*5) scale(.8);
      }
      &.item-8 {
        transform: translateX($slide-margin*6) scale(.8);
      }
      &.item-9 {
        transform: translateX($slide-margin*7) scale(.8);
      }
    }
    .item {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
