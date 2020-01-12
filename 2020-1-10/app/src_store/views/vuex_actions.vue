<template>
    <div>
        <h1>Vuex_2</h1>
        <button @click="add">非异步{{num}}</button>
        <button @click="add2">异步{{num}}</button>
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex';
    export default {
        computed:{
            ...mapState(['num'])
        },
        methods:{
            ...mapMutations(['increment']),
            ...mapActions(['asyncIncrement']),
            add(){
                this.increment();
            },
            add2(){
                // this.$store.dispatch('asyncIncrement');
                this.asyncIncrement();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>