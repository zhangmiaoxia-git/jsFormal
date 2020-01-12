<template>
  <div id="app">
    <button @click="add">{{num}}</button>
    <button @click="add2">异步{{num}}</button>
    <router-link to="/about">关于</router-link>
    <router-view/>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
  computed:{
    ...mapState(['num'])
  },
  methods:{
    ...mapMutations(['increment']),
    add(){
      this.increment();
    },
    add2(){
      this.asyncIncrement();
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
