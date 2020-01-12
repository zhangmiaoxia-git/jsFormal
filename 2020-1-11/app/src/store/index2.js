const state = {
    val:'vue456'
}

const mutations = {
    changeval(state,newVal){
        state.val = newVal;
    },
    aaa(){
        console.log('index2');
    }
}

const getters = {
    reverse(){
        return state.val.split('').reverse().join('')
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    getters
}