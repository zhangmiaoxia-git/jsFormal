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
    meta:{reg:true},
    component: () => import('../views/About.vue')
  },
  {
    path:'/public',
    name:'public',
    component:()=>import('../views/Public.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  }
]

import {islogin} from '../api/api'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to,from,next)=>{
    //每次切换路由的时候，验证是否有路由元信息，如果有，那么需要校验是否登录，如果没有登录，则跳转到登录页
    const b = to.matched.some(item=>item.meta.reg);
    if(b){
        let flg = await islogin();
        if(flg){
          next();
        }else{
          next('/login');
        }
    }else{
      next();
    }
});

export default router
