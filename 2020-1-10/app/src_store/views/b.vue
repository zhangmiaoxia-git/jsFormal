<template>
    <div>
        <h1>This is an B page</h1>
        <button @click="add">{{num2}}</button>
        <button @click="add2">和a关联</button>
    </div>
</template>

<script>
    import {bus} from '../bus/index';
    export default {
        data(){
            return {
                num2:0
            }
        },
        created(){
            bus.$on('changea',(val)=>{
                this.num2 = val;
            })
        },
        methods:{
            add(){
                this.num2++;
            },
            add2(){
                bus.$emit('changeb',this.num2);
            }
        }
    }
</script>

<style scoped>

</style>