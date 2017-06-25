<template>
  <div class="selected-wrap">
    <v-scroll v-if="selectedList.focus">
      <div class="slide-wrap">
        <v-slide :slideList="selectedList.focus"></v-slide>
      </div>
      <div class="hot-wrap">
        <div v-for="items in selectedList.hotdiss">
          <div v-for="(item, index) in items" v-if="index < 5">
            {{ item.dissname }}
          </div>
        </div>
      </div>
    </v-scroll>
  </div>
</template>

<script>
  import VScroll from '@/components/v-scroll'
  import VSlide from '@/components/v-slide'
  import { getSelected } from '@/api/selected'
  import { ERR_OK } from '@/util/config'
  export default {
    name: 'selected',
    components: {
      VScroll,
      VSlide
    },
    data () {
      return {
        selectedList: []
      }
    },
    created () {
      this.getSelected()
    },
    methods: {
      getSelected () {
        getSelected().then(res => {
          if (res.code === ERR_OK) {
            this.selectedList = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .selected-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .slide-wrap {
    padding: $module-padding;
    background-color: $white;
  }
  .hot-wrap {
    padding: 0 $module-padding;
    background-color: $section-bg-color;
  }
</style>
