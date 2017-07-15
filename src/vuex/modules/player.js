import { mode } from '@/util/config'
import * as types from '../types'

const state = {
  playing: false,
  fullScreen: false,
  sequenceList: [],
  playList: [],
  mode: mode.sequence,
  currentIndex: -1
}

const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  sequenceList: state => state.sequenceList,
  playList: state => state.playList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {}
  }
}

const mutations = {
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN_STATE] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

const actions = {
  selectPlay ({commit}, {list, index}) {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_CURRENT_INDEX, index)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
