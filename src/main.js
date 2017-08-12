import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store'

import VIscroll from 'viscroll'
import Lazyload from 'vue-lazyload'

import '@/assets/scss/index.scss'

Vue.use(VIscroll, {
  mouseWheel: true,
  scrollbars: true,
  fadeScrollbars: true,
  interactiveScrollbars: true,
  preventDefault: true,
  tap: false,
  bounce: false,
  disableTouch: true,
  disableMouse: true,
  disablePointer: true
})

Vue.use(Lazyload, {
  error: require('./assets/images/lazyloading.png'),
  loading: require('./assets/images/lazyloading.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
