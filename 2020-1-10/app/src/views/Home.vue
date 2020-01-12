<template>
  <div>
    <!-- 输入框: <input type="text" :value="$store.state.store2.val"> -->
    输入框: <input type="text" :value="v" ref="txt">
    {{$store.state.store2.val}}
    <button @click="changeVal">确定修改</button>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  export default {
    computed:{
      ...mapState({
        v:({store2:{val}})=>val
      })
    },
    methods:{
      ...mapMutations(['store2/changeval']),
      changeVal(){
        this['store2/changeval'](this.$refs.txt.value);
      }
    }
  }
</script>

<style scoped>

</style>