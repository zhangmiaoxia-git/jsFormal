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
    component: () => import('../views/About.vue'),
    children:[
      {
        path:'b/:id',
        name:'bb',
        component:()=>import('../views/params/b.vue'),
        // props:true
        // beforeEnter(){
        //   console.log('组件进入');
        // }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   console.log(to);
//   console.log(from);
//   console.log('切换路由');
//   next();
// })

export default router
