<template>
    <div>
        <h1>This is an A page</h1>
        <button @click="add">{{num}}</button>
        <button @click="add2">和b关联</button>
    </div>
</template>

<script>
    import {bus} from '../bus/index'
    export default {
        data(){
            return {
                num:0
            }
        },
        created(){
            //此方法是点击B的时候改变A，给A绑定一个changeb事件
            bus.$on('changeb',(val)=>{
                this.num = val;
            })
        },
        methods:{
            add(){
                this.num++;
            },
            add2(){
                bus.$emit('changea',this.num);
            }
        }
    }
</script>

<style scoped>

</style>