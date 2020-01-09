<template>
    <div>
        <!-- {{id}} -->
        {{$route.params.id}}
        <img v-if="$route.params.id==1" src="../../assets/1.jpg" alt="">
        <img v-else-if="$route.params.id==2" src="../../assets/2.jpg" alt="">
    </div>
    
</template>

<script>
    export default {
        name:'bb',
        // props:['id']
        created(){
            console.log('组件加载');
        },
        //复用组件中使用beforeRouteUpdate监听
        beforeRouteUpdate(to,from,next){
            // console.log(to);
            console.log('守卫',to.params.id);
            next();
        },
        beforeRouteLeave(to,from,next){
            const b = confirm('确定要切换吗');
            if(b){
                next();
            }else{
                next(false);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>