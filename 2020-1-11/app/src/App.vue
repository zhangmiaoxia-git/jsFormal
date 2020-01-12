<template>
  <div id="app">
    <input type="text" :value="123456" ref="txt" @blur="blur">
    <button @click="add">非异步{{num}}</button>
    <button @click="add2">异步{{num}}</button>
    <button @click="add3">触发aaa</button>
    <router-link to="/about">关于</router-link>
    {{va}}
    <router-view/>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
export default {
  computed:{
    ...mapState({
      num:state=>state.a.num,
      val:state=>state.b.val
    }),
    ...mapGetters({
      va:'b/reverse'
    }),
  },
  methods:{
    ...mapMutations(['a/INCREMENT','b/changeval','b/aaa']),
    ...mapActions(['a/asyncIncrement']),
    add(){
      this['a/INCREMENT']();
    },
    add2(){
      this['a/asyncIncrement']();
    },
    add3(){
      this['b/aaa']();
    },
    blur(){
      this['b/changeval'](this.$refs.txt.value);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
