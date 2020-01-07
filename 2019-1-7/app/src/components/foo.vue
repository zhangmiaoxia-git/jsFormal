<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){
            //只有第一次触发了
            console.log(this.$route.params);
        },
        beforeRouteUpdate(to,from,next){
            next();
        },
        beforeRouteLeave (to, from, next){
            let b = confirm('确定要换吗');
            if(b){
                next()
            }else{
                next(false);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>