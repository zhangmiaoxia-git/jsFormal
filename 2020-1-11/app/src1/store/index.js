import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0
  },
  mutations: {
    increment(state){
      state.num++
    }
  },
  actions: {
    asyncIncrement({commit}){
      setTimeout(()=>{
        commit('increment');
      },2000);
    }
  },
  modules: {
  }
})
