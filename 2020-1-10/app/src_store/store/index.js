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
    },
    // asyncIncrement(state){
    //   setTimeout(()=>{
    //     state.num++
    //   },2000)
    // }
  },
  getters:{
    toDou(state){
      return state.num<10?'0'+state.num:''+state.num;
    }
  },
  actions: {
    asyncIncrement(context){
      setTimeout(()=>{
          context.commit("increment");
      },2000);
    }
  }
})
