<template>
    <div>
        <h1>Vuex_1</h1>
        <!-- <button @click="add">{{$store.state.num}}</button> -->
        <button @click="add">{{num}}</button>
        {{reverse}}
        {{$store.getters.toDou}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data(){
            return {
                val:'haha'
            }
        },
        // computed:{
        //     num(){
        //         return this.$store.state.num;
        //     }
        // },
        // computed:mapState({
        //     num:state=>state.num
        // }),
        // computed:mapState(['num']),
        computed:{
            ...mapState(['num']),
            reverse(){
                return this.val.split('').reverse().join('');
            }
        },
        methods:{
            add(){
                this.$store.commit('increment');
            }
        }
    }
</script>

<style scoped>

</style>