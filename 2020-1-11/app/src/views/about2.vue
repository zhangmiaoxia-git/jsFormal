<template>
    <div>
        <h1>ABOUT2</h1>
        <p>{{$store.state.a.num}}</p>
        <p>{{$store.state.b.val}}</p>
        <button @click="del">-</button>{{num2}}
        <button @click="add">+</button>
    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapState} from 'vuex';
    export default {
        computed:{
            ...mapState({
                num2:state=>state.a.num2
            })
        },
        methods:{
            ...mapMutations(['a/CHANGE_NUM2']),
            del(){
                this['a/CHANGE_NUM2']('DECREMENT');
            },
            add(){
                this['a/CHANGE_NUM2']('INCREMENT')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>