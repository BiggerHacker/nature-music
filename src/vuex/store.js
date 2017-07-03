import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setSheetID from './modules/setSheetID'

let debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    setSheetID
  },
  strict: debug
})
