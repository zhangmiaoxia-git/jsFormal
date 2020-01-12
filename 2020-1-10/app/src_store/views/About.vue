<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/vuex1" tag="button">vue-state-mutations</router-link>
    <router-link to="/about/vuex_actions" tag="button">vue-vuex_actions</router-link>
    <router-link to="/about/vuex_getters" tag="button">vue-vuex_getters</router-link>
    <router-view></router-view>
  </div>
</template>
