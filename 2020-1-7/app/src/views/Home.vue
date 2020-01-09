<template>
  <div>
    <div id="nav">
      {{$route.query.name}}:欢迎你
      <router-link to="/about/hua/id/1" tag="button">About1</router-link>
      <router-link to="/about/mei/id/2" tag="button">About2</router-link>
      <router-link to="/public" tag="button">public</router-link>
      <router-link tag="button" :to="{name:'p4',params:{n:'小红'}}">p4</router-link>
      <router-link tag="button" :to="{name:'p5',params:{nn:'小美'}}">p5</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>