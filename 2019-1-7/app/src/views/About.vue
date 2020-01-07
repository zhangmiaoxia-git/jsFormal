<template>
  <div class="about">
    <router-link to="/">Home</router-link> |
    <router-link to="/about/hua/id/1">About1</router-link>
    <router-link to="/about/mei/id/2">About2</router-link>
    <router-link to="/public">public</router-link>
    <h1>This is an about page</h1>
    <!-- 动态路由第一种方式 -->
    <!-- <div v-if="$route.params.id == 1">
        About1的页面
    </div>
    <div v-if="$route.params.id == 2">
        About2的页面
    </div> -->

    <!-- 动态路由第二种方式 -->
    <div>
      用户：{{$route.params.username}}
      <p v-if="$route.params.id == 1">1111111111</p>
      <p v-if="$route.params.id == 2">2222222222</p>
    </div>
  </div>
</template>

<script>
  /*
    $route   获取路由的信息(属性)
    $router  跳转路由的方法(方法)
    this.$route.params.id   获取路由传递的参数
  */
export default {
    data(){
      return {
        num:0
      }
    },
    //created函数第一次就需要请求接口
    created(){
      this.num = 1;
      if(this.$route.params.id === '1'){
        setTimeout(()=>{
          console.log('请求接口1');
        },1000);
      }else if(this.$route.params.id === '2'){
        setTimeout(()=>{
          console.log('请求接口2');
        },1000);
      }
    },
    //同一个组件中，第一次点击不会触发，当路由发生改变时触发
    watch:{
      '$route'(to,from){
        if(to.params.id === '1'){
          setTimeout(()=>{
            console.log('请求接口1');
          },1000);
        }else if(to.params.id === '2'){
          setTimeout(()=>{
            console.log('请求接口2');
          },1000);
        }
      }
    }
}
</script>
