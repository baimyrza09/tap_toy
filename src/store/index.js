import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    channel: null,
    user: null
  },

  mutations: {
    setChannel(state, channel) {
      state.channel = channel
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {


  },
  modules: {
  }
})

global.store = store

export default store