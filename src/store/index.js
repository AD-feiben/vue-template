import Vue from 'vue'
import Vuex from 'vuex'
import i18n, { messages, getLang, setLang } from '@/lang'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    language: getLang()
  },
  mutations: {
    SET_LANGUAGE (state, payload) {
      state.language = payload
      i18n.local = payload
      setLang(payload)
    }
  },
  actions: {
    Change_Language ({ commit }, lang) {
      if (lang in messages) {
        commit('SET_LANGUAGE', lang)
      }
    }
  }
})

export default store
