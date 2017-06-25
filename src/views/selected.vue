<template>
  <div class="selected-wrap">
    <v-scroll>
      <div class="slide-wrap" v-if="selectedList.focus">
        <v-slide :slideList="selectedList.focus"></v-slide>
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
    overflow: hidden;
    background-color: $white;
  }
</style>
