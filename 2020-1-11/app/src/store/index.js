import {INCREMENT} from './createActions';
export default {
  namespaced:true,
  state:{
    num:0,
    num2:0
  },
  mutations:{
    CHANGE_NUM2(state,payload){
      switch(payload){
        case 'INCREMENT':
          state.num2++;
          break;
        case 'DECREMENT':
          state.num2--;
          break;
      }
    },
    [INCREMENT](state){
      state.num++;
    },
    aaa(){
      console.log('index');
    }
  },
  actions:{
    asyncIncrement({commit}){
      setTimeout(()=>{
        commit('INCREMENT');
      },2000)
    }
  }
}