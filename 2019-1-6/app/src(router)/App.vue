<template>
  <div>
      <router-link to="/" tag="button">首页</router-link>
      <router-link to="/about" tag="button">关于</router-link>
      <router-link to="/public" tag="button">公共页</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>