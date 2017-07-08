import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setSheetID from './modules/setSheetID'

export default new Vuex.Store({
  modules: {
    setSheetID
  },
  strict: process.env.NODE_ENV !== 'production'
})
