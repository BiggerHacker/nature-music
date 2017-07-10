import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Player from './modules/player'

export default new Vuex.Store({
  modules: {
    Player
  },
  strict: process.env.NODE_ENV !== 'production'
})
