import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforeEach from '../components/beforeEach.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BeforeEach
  },
  {
    path:'/b1',
    component:()=>import('../components/b1.vue'),
    //记录从哪里来的  
    beforeEnter: (to, from, next) => {
        console.log(to);
        console.log(from);
        if(from.fullPath === '/b2' && to.fullPath === '/b1'){
            next('/');
        }else{
            next();
        }
    }
  },
  {
      path:'/b2',
      component:()=>import('../components/b2.vue')
  },
  {
    path:'/foo/:id',
    component:()=>import('../components/foo.vue')
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

//beforeEnter全局的优先级大
router.beforeEach((to,from,next)=>{
    // console.log(to);
    // console.log(from);
    if(from.fullPath === '/b2' && to.fullPath === '/b1'){
        next('/p4');
    }else{
        next();
    }
});

export default router
