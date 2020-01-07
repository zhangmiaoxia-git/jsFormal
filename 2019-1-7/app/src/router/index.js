import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforeEach from '../components/beforeEach.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BeforeEach,
    children:[
        {
            path:'foo2',
            component:()=>import('../components/foo2.vue'),
            meta:{requiresAuth:true}
        },
        {
            path:'foo3',
            component:()=>import('../components/foo3.vue'),
            meta:{requiresAuth:true}
        },
        {
            path:'foo4',
            component:()=>import('../components/foo4.vue')
        }
    ]
  },
  
  {
    path:'*',
    component:()=>import('../views/404.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from,next)=>{
    if(to.matched.some(item=>item.meta.requiresAuth)){
        if(!localStorage.getItem('login')){
            next({
                path:'/login?topath='+to.path
            });
        }else{
            next();
        }
    }else{
        next();
    }
})

export default router
