<template>
  <div class="pagination">
    <span class="btn prev" v-if="current !== 1" @click="prevPage">
      <i class="iconfont icon-prev"></i>
    </span>
    <span class="btn pages" v-if="allPage !== 1" :class="{active: current === 1}" @click="goPage(1)">
      1
    </span>
    <span class="btn clip" v-if="prevClip">...</span>
    <span 
      class="btn pages" 
      :class="{active: current === index}" 
      v-for="index in pages" 
      :key="index"
      @click="goPage(index)"
    >{{ index }}</span>
    <span class="btn clip" v-if="nextClip">...</span>
    <span class="btn pages" :class="{active: allPage === current}" @click="goPage(allPage)">{{ allPage }}</span>
    <span class="btn next" v-if="current !== allPage" @click="nextPage">
      <i class="iconfont icon-next"></i>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      allPage: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        current: 1,
        prevClip: false,
        nextClip: false
      }
    },
    methods: {
      prevPage () {
        this.current--
      },
      nextPage () {
        this.current++
      },
      goPage (index) {
        if (index !== this.current) {
          this.current = index
        }
      }
    },
    computed: {
      pages () {
        let result = []
        if (this.current > 3) {
          result.push(this.current - 2)
          result.push(this.current - 1)
          if (this.current > 4) {
            this.prevClip = true
          }
        } else {
          this.prevClip = false
          for (let i = 2; i < this.current; i++) {
            result.push(i)
          }
        }
        if (this.current !== this.allPage && this.current !== 1) {
          result.push(this.current)
        }
        if (this.current < (this.allPage - 2)) {
          result.push(this.current + 1)
          result.push(this.current + 2)
          if (this.current <= (this.allPage - 3)) {
            this.nextClip = true
          }
        } else {
          this.nextClip = false
          for (let i = (this.current + 1); i < this.allPage; i++) {
            result.push(i)
          }
        }
        return result
      }
    },
    watch: {
      current (newCurrent) {
        this.$emit('update', newCurrent)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .pagination {
    display: inline-block;
    .btn {
      display: inline-block;
      margin-left: $module-sm-padding;
      width: 30px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      border: 1px solid $border-color;
      color: $black;
      &:first-child {
        margin-left: 0;
      }
      .iconfont {
        position: relative;
        top: -2px;
        font-size: 12px;
      }
    }
    .pages,
    .prev,
    .next {
      &:hover {
        background-color: $select-bg-color;
        border: 1px solid $select-bg-color;
        color: $white;
      }
    }
    .clip {
      &:hover {
        cursor: auto;
      }
    }
    .pages.active {
      background-color: $select-bg-color;
      border: 1px solid $select-bg-color;
      color: $white;
    }
  }
</style>
