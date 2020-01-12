export default {
    namespaced:true,
    state:{
        val:'vue123'
    },
    mutations:{
        changeval:(state,val)=>{
            state.val = val
        }
    }
}