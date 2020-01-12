import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // redirect:'/about/vuex1',
    children:[
      {
        path:'vuex1',
        component:()=>import('../views/vuex_1.vue')
      },
      {
        path:'vuex_actions',
        component:()=>import('../views/vuex_actions.vue')
      },
      {
        path:'vuex_getters',
        component:()=>import('../views/vuex_getters.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router