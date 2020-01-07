import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    //主体一样，部分内容不一样，则使用动态路由
    //动态路由第一种方式
    // path: '/about/:id',  //动态路由(动态传递参数)   this.$route.params.id   获取路由传递的参数
    //动态路由第二种方式
    path: '/about/:username/id/:id',
    component: () => import('../views/About.vue')
  },
  {
    //嵌套路由需要使用children配置
    path:'/public/',
    component:()=>import('../views/public.vue'),
    children:[
      {
        path:'p1',
        component:()=>import('../views/p1.vue')
      },
      {
        path:'p2',
        component:()=>import('../views/p2.vue')
      },
      //如果进入public下没有指定的children，默认添加一个组件，可以再path上写''
      {
        path:'',
        component:()=>import('../views/p3.vue')
      }
    ]
  },
  {
    path:'/login',
    component:()=>import('../views/login.vue')
  },
  {
    path:'/p4',
    name:'p4',
    props:true,
    component:()=>import('../views/p4.vue')
  },
  {
    path:'/p5',
    name:'p5',
    props:(route)=>({
      n:route.params.nn
    }),
    component:()=>import('../views/p5.vue')
  },
  //重定向
  {
    path:'/p6',
    redirect:to=>{
      return '/p4';
    }
  },






  {
    path:'*',
    component:()=>import('../views/404.vue')
  }







]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,  //当前路径（这里是根目录）
  routes
})

export default router
