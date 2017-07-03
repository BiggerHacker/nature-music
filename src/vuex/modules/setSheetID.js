import * as types from '../types'

const state = {
  sheetId: ''
}

const getters = {
  sheetId: state => state.sheetId
}

const mutations = {
  [types.SET_SHEET_ID] (state, id) {
    state.sheetId = id
  }
}

export default {
  state,
  getters,
  mutations
}
