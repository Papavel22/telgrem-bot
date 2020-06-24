import Vue from 'vue'
import Vuex from 'vuex'
import BotsService from '../services/BotsService'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    bots: [
    ]
  },
  getters: {
    bots: state => state.bots
  },
  mutations: {
    changeState (state, data) {
      state.bots = data
    },
    delBot (state, id) {
      const index = state.bots.findIndex(bot => bot.id === id)
      state.bots.splice(index, 1)
    },
    addBot (state, botData) {
      state.bots.push(botData)
      console.log(botData)
    },
    editBot (state, botData) {
      const botIndex = state.bots.findIndex(bot => bot.id === botData.id)
      state.bots.splice(botIndex, 1, botData)
    }
  },
  actions: {
    async delBot ({commit}, id) {
      try {
        console.log(id)
        await BotsService.delBot(id)
        commit('delBot', id)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchBot ({commit}) {
      try {
        const res = await BotsService.index()
        commit('changeState', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async createBot ({commit}, botData) {
      try {
        await BotsService.crateBot(botData)
        this.dispatch('fetchBot')
      } catch (e) {
        console.log(e)
      }
    },
    async editBot ({commit}, botData) {
      try {
        await BotsService.editBot(botData)
        commit('editBot', botData)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
