import { mode } from '@/util/config'
import { shuffle } from '@/util/util'
import * as types from '../types'

const state = {
  isNull: true,
  playing: false,
  fullScreen: false,
  sequenceList: [],
  playList: [],
  mode: mode.sequence,
  currentIndex: -1
}

const getters = {
  isNull: state => state.isNull,
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
  [types.SET_ISNULL_STATE] (state, flag) {
    state.isNull = flag
  },
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
  selectPlay ({commit, state}, {list, index}) {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === mode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAY_LIST, randomList)
      index = randomList.findIndex((item) => {
        return item.songid === list[index].songid
      })
    } else {
      commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
